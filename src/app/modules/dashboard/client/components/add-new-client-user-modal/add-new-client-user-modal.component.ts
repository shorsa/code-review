import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { NZ_MODAL_DATA, NzModalService } from 'ng-zorro-antd/modal';
import { Observable, combineLatest, filter } from 'rxjs';
import { selectIsLoading } from 'src/app/app-store/app-state/app-state.selectors';
import { CommonConstants, PatternsConstants } from 'src/app/core/constants';
import { PermissionClaimsEnum, PhoneCodeEnum, UserRoleEnum } from 'src/app/shared/enums';
import { markAsDirtyForm } from 'src/app/shared/helpers';
import { ClientUserModel, SelectOptionModel } from 'src/app/shared/models';
import { getDepartmentOptionsAction } from '../../../departments/store/department.actions';
import { selectDepartmentsOptions } from '../../../departments/store/department.selectors';
import { RequestCreateClientUserModel, RequestUpdateClientUserModel } from '../../models';
import * as clientUserActions from '../../store/client-users.actions';
import * as clientSelectors from '../../store/client.selectors';

@Component({
  selector: 'app-add-new-client-user-modal',
  templateUrl: './add-new-client-user-modal.component.html',
  styleUrls: ['./add-new-client-user-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddNewClientUserModalComponent implements OnInit, OnDestroy {
  readonly phoneCodes: SelectOptionModel<PhoneCodeEnum>[] = CommonConstants.phoneCodes;
  readonly clientViewDetailsPermission = PermissionClaimsEnum.ClientViewDetails;

  readonly nzModalData: { editClientUserId?: string; viewOnly?: boolean } =
    inject(NZ_MODAL_DATA);

  wasAttemptToSubmitForm: boolean = false;
  formGroup!: FormGroup;
  clientId?: string;
  clientUserInitDetails?: ClientUserModel;
  departmentListOptions?: SelectOptionModel[];
  isLoading$?: Observable<boolean>;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private modal: NzModalService,
    private route: ActivatedRoute,
    private store$: Store
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.initializationVariables();
    this.getDepartmentOptions();
    this.getClientUserDetails();
  }

  private getDepartmentOptions(): void {
    const departmentOptions$ = this.store$.select(selectDepartmentsOptions);

    const clientUserDetails$ = this.store$.select(
      clientSelectors.selectClientUserDetails
    );

    combineLatest([departmentOptions$, clientUserDetails$]).subscribe(
      ([departmentOptions, clientUserDetails]) => {
        if (departmentOptions && Object.keys(departmentOptions).length) {
          this.departmentListOptions = departmentOptions[this.clientId!]?.map((item) => ({
            label: item.name,
            value: item.id,
          }));
        }
        if (clientUserDetails) {
          this.formGroup.patchValue({
            firstName: clientUserDetails?.applicationUser.firstName,
            lastName: clientUserDetails?.applicationUser.lastName,
            email: clientUserDetails?.applicationUser.email,
            phone: clientUserDetails?.applicationUser.phoneNumber,
            departmentIds: clientUserDetails?.clientUserDepartments.map(
              (item) => item.departmentId
            ),
            canBookOnline: clientUserDetails.canBookOnline,
            phoneCode:
              clientUserDetails.applicationUser.phoneCode ?? PhoneCodeEnum.England,
            isSuperuser: clientUserDetails?.isSuperuser,
          });

          this.clientUserInitDetails = clientUserDetails;
        }
        this.changeDetector.detectChanges();
      }
    );
  }

  private buildForm(): void {
    this.formGroup = this.formBuilder.group({
      firstName: [
        { value: null, disabled: this.nzModalData?.viewOnly },
        [Validators.required, Validators.minLength(1)],
      ],
      lastName: [
        { value: null, disabled: this.nzModalData?.viewOnly },
        [Validators.required, Validators.minLength(1)],
      ],
      email: [
        { value: null, disabled: this.nzModalData?.viewOnly },
        [Validators.required, Validators.pattern(PatternsConstants.PATTERN_EMAIL)],
      ],
      phone: [
        { value: null, disabled: this.nzModalData?.viewOnly },
        [
          Validators.required,
          Validators.min(100000000),
          Validators.max(9999999999),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
      departmentIds: [{ value: null, disabled: this.nzModalData?.viewOnly }],
      phoneCode: [
        { value: PhoneCodeEnum.England, disabled: this.nzModalData?.viewOnly },
        [Validators.required],
      ],
      isSuperuser: [
        { value: false, disabled: this.nzModalData?.viewOnly },
        [Validators.required],
      ],
      canBookOnline: [
        { value: false, disabled: this.nzModalData?.viewOnly },
        [Validators.required],
      ],
    });

    this.formGroup.get('email')?.valueChanges.subscribe((value: string) => {
      this.formGroup
        .get('email')
        ?.setValue(value?.toLocaleLowerCase(), { emitEvent: false });
    });
  }

  private getClientUserDetails(): void {
    if (!this.nzModalData.editClientUserId) return;

    this.store$.dispatch(
      clientUserActions.clientUserGetByIdAction({
        payload: { id: this.nzModalData.editClientUserId },
      })
    );
  }

  private initializationVariables(): void {
    this.isLoading$ = this.store$.select(selectIsLoading);

    this.route.queryParams.pipe(filter((val) => !!val)).subscribe((params) => {
      this.clientId = params[CommonConstants.QUERY_ID];
      this.store$.dispatch(
        getDepartmentOptionsAction({
          payload: {
            pageIndex: 0,
            pageSize: CommonConstants.PAGE_SIZE_OPTIONS[1],
            clientIds: [this.clientId!],
          },
        })
      );
    });
  }

  handleCancel() {
    this.modal.closeAll();
  }

  submitForm(): void {
    this.wasAttemptToSubmitForm = true;
    markAsDirtyForm(this.formGroup);

    if (this.formGroup.invalid) return;

    if (this.nzModalData.editClientUserId) {
      this.updateClientUser();
    } else {
      this.createClientUser();
    }
  }

  updateClientUser(): void {
    const model: RequestUpdateClientUserModel = {
      id: this.nzModalData.editClientUserId!,
      firstName: this.formGroup.value.firstName,
      lastName: this.formGroup.value.lastName,
      email: this.formGroup.value.email,
      phone: this.formGroup.value.phone,
      phoneCode: this.formGroup.value.phoneCode,
      isSuperuser: this.formGroup.value.isSuperuser,
      clientId: this.clientId!,
      departmentIds: this.formGroup.value.departmentIds,
      applicationUserId: this.clientUserInitDetails?.applicationUserId!,
      canBookOnline: this.formGroup.value.canBookOnline,
    };

    this.store$.dispatch(clientUserActions.clientUserUpdateAction({ payload: model }));
  }

  createClientUser(): void {
    const model: RequestCreateClientUserModel = {
      firstName: this.formGroup.value.firstName,
      lastName: this.formGroup.value.lastName,
      email: this.formGroup.value.email,
      phone: this.formGroup.value.phone,
      phoneCode: this.formGroup.value.phoneCode,
      isSuperuser: this.formGroup.value.isSuperuser,
      clientId: this.clientId!,
      departmentIds: this.formGroup.value.departmentIds,
      role: UserRoleEnum.ClientAdministrator,
      canBookOnline: this.formGroup.value.canBookOnline,
    };
    this.store$.dispatch(clientUserActions.clientUsersCreateAction({ payload: model }));
  }

  ngOnDestroy(): void {
    this.store$.dispatch(clientUserActions.clearClientUserDetailsDataAction());
  }
}
