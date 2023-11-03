import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription, filter } from 'rxjs';
import { selectIsLoading } from 'src/app/app-store/app-state/app-state.selectors';
import {
  CommonConstants,
  PatternsConstants,
  RoutesConstants,
} from 'src/app/core/constants';
import { PhoneCodeEnum, UserRoleEnum } from 'src/app/shared/enums';
import { markAsDirtyForm } from 'src/app/shared/helpers';
import { OHRDUserModel, SelectOptionModel } from 'src/app/shared/models';
import { ResponseGetPermissionsListModel } from '../../../permissions/models';
import * as permissionsActions from '../../../permissions/store/permissions.actions';
import * as permissionsSelectors from '../../../permissions/store/permissions.selectors';
import { RequestCreateStuffUserModel, RequestUpdateStaffUserModel } from '../../models';
import * as staffAction from '../../store/staff.actions';
import { selectStaffDetails } from '../../store/staff.selectors';
import { PermissionItem, ViewPermissionModel } from '../../models/view-permission.model';

@Component({
  templateUrl: './staff-management.component.html',
  styleUrls: ['./staff-management.component.scss'],
})
export class StaffManagementComponent implements OnInit, OnDestroy {
  private subscriptions$: Subscription = new Subscription();

  readonly phoneCodes: SelectOptionModel<PhoneCodeEnum>[] = CommonConstants.phoneCodes;
  readonly rolesOptions: SelectOptionModel<UserRoleEnum>[] =
    CommonConstants.rolesOptions.filter(
      (item) =>
        item.value === UserRoleEnum.OHRDAdministrator ||
        item.value === UserRoleEnum.OHRDSuperuser
    );

  roleListIsLoading: boolean = false;
  staffUserId?: string;
  wasAttemptToSubmitForm: boolean = false;
  formGroup!: FormGroup;
  staffUserData?: OHRDUserModel;
  isLoading$?: Observable<boolean>;
  isLoadingPermissionsList: boolean = false;
  private allPermissionsList?: Omit<
    ResponseGetPermissionsListModel,
    'message' | 'success'
  >;

  permissionViewList?: ViewPermissionModel;

  constructor(
    private formBuilder: FormBuilder,
    private store$: Store,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.getQueryParams();
    this.getAllPermissions();
    this.initializingSelectors();
  }

  private initializingSelectors(): void {
    this.isLoading$ = this.store$.select(selectIsLoading);

    this.subscriptions$.add(
      this.store$
        .select(selectStaffDetails)
        .pipe(filter((val) => val !== undefined))
        .subscribe((res) => {
          if (!res) return;
          this.staffUserData = res;
          this.formGroup.patchValue({
            firstName: res.applicationUser.firstName,
            lastName: res.applicationUser.lastName,
            email: res.applicationUser.email,
            phone: res.applicationUser.phoneNumber,
            phoneCode: res.applicationUser.phoneCode,
            canTriage: res.canTriage,
            role: res.role,
            //doesn't get after get or doesn't update
          });
        })
    );
    this.subscriptions$.add(
      this.store$
        .select(permissionsSelectors.selectPermissionsList)
        .pipe(filter((val) => val !== undefined))
        .subscribe((res) => {
          if (!res) return;

          this.allPermissionsList = res;
        })
    );

    this.subscriptions$.add(
      this.store$
        .select(permissionsSelectors.selectPermissionsByEnum)
        .pipe(filter((val) => val !== undefined))
        .subscribe((res) => {
          if (!res) return;
          this.permissionViewList = this.getCheckedList(res.role.claims);
        })
    );
  }

  getCheckedList(roleClaims: string[]): ViewPermissionModel {
    if (!this.allPermissionsList) {
      return {};
    }

    const result: ViewPermissionModel = {};
    Object.entries(this.allPermissionsList).forEach(([key, value]) => {
      const prop = key as keyof ViewPermissionModel;
      const claims = Object.entries(value).map(([claim, label]) => ({
        label: label as any,
        value: claim,
        isChecked: roleClaims.includes(claim),
      }));
      result[prop] = claims;
    });

    return result;
  }

  permissionGroupIsEmpty(permissions?: PermissionItem[]): boolean {
    if (!permissions) return true;
    return !permissions.find((item) => item.isChecked);
  }

  get getIsSelectedOHRDAdmin(): boolean {
    return this.formGroup.get('role')?.value === UserRoleEnum.OHRDAdministrator;
  }

  private buildForm(): void {
    this.formGroup = this.formBuilder.group({
      firstName: [null, [Validators.required, Validators.minLength(1)]],
      lastName: [null, [Validators.required, Validators.minLength(1)]],
      email: [
        null,
        [Validators.required, Validators.pattern(PatternsConstants.PATTERN_EMAIL)],
      ],
      phone: [
        null,
        [
          Validators.required,
          Validators.min(100000000),
          Validators.max(9999999999),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
      phoneCode: [PhoneCodeEnum.England, [Validators.required]],
      canTriage: [false, [Validators.required]],
      role: [null, [Validators.required]],
    });

    this.formGroup.get('email')?.valueChanges.subscribe((value: string) => {
      this.formGroup
        .get('email')
        ?.setValue(value?.toLocaleLowerCase(), { emitEvent: false });
    });

    this.handleChangeRole();
  }

  private handleChangeRole(): void {
    this.formGroup.get('role')?.valueChanges.subscribe((role) => {
      if (!role) return;
      this.getPermissionsList(role);
    });
  }

  private getAllPermissions(): void {
    this.store$.dispatch(permissionsActions.getListAction());
  }

  private getPermissionsList(role: UserRoleEnum): void {
    this.roleListIsLoading = false;
    this.store$.dispatch(
      permissionsActions.getPermissionsByEnumAction({ payload: { role } })
    );
  }

  private getQueryParams(): void {
    this.activatedRoute.queryParams.pipe(filter((val) => !!val)).subscribe((params) => {
      this.staffUserId = params[CommonConstants.QUERY_ID];
      if (this.staffUserId) {
        this.getStaffUserById(this.staffUserId);
      }
    });
  }

  private getStaffUserById(staffId: string) {
    this.store$.dispatch(staffAction.staffGetByIdAction({ payload: { id: staffId } }));
  }

  handleCancel(): void {
    this.router.navigate([
      RoutesConstants.DASHBOARD_INDEX,
      RoutesConstants.DASHBOARD_STAFF,
    ]);
  }

  submitForm(): void {
    this.wasAttemptToSubmitForm = true;
    markAsDirtyForm(this.formGroup);

    if (this.formGroup.invalid) return;

    if (this.staffUserData) {
      this.updateClientUser();
    } else {
      this.createClientUser();
    }
  }

  updateClientUser(): void {
    const model: RequestUpdateStaffUserModel = {
      id: this.staffUserData!.id,
      firstName: this.formGroup.value.firstName,
      lastName: this.formGroup.value.lastName,
      email: this.formGroup.value.email,
      phone: this.formGroup.value.phone,
      phoneCode: this.formGroup.value.phoneCode,
      canTriage: this.formGroup.value.canTriage,
      role: this.formGroup.value.role,
      applicationUserId: this.staffUserData!.applicationUserId,
    };

    this.store$.dispatch(staffAction.staffUpdateAction({ payload: model }));
  }

  createClientUser(): void {
    const model: RequestCreateStuffUserModel = {
      firstName: this.formGroup.value.firstName,
      lastName: this.formGroup.value.lastName,
      email: this.formGroup.value.email,
      phone: this.formGroup.value.phone,
      phoneCode: this.formGroup.value.phoneCode,
      canTriage: this.formGroup.value.canTriage,
      role: this.formGroup.value.role,
    };

    this.store$.dispatch(staffAction.staffCreateAction({ payload: model }));
  }

  ngOnDestroy(): void {
    this.store$.dispatch(staffAction.clearStaffDetailsDataAction());
    this.subscriptions$.unsubscribe();
  }
}
