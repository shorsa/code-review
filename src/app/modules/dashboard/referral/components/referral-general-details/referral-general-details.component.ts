import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable, Subscription, filter } from 'rxjs';
import { selectIsLoading } from 'src/app/app-store/app-state/app-state.selectors';
import { CommonConstants, RoutesConstants } from 'src/app/core/constants';
import {
  IsActiveFilterEnum,
  PermissionClaimsEnum,
  ReferralStatusEnum,
} from 'src/app/shared/enums';
import { markAsDirtyForm } from 'src/app/shared/helpers';
import { SelectOptionModel } from 'src/app/shared/models';
import { UserPermissionsProvider } from 'src/app/shared/providers/user-permissions.provider';
import { ResponseGetClientOptionsModelItem } from '../../../client/models';
import {
  ResponseGetPatientOptionsModelItem,
  ResponsePatientListItem,
} from '../../../patients/models/patients';
import { ResponseGetProductOptionsModelItem } from '../../../products/models';
import { ReferralDetailsModel, RequestCreateReferralModel } from '../../models';
import * as referralActions from '../../state/referral.actions';
import * as referralSelectors from '../../state/referral.selectors';

@Component({
  selector: 'app-referral-general-details',
  templateUrl: './referral-general-details.component.html',
  styleUrls: ['./referral-general-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReferralGeneralDetailsComponent implements OnInit, OnDestroy {
  @Input() referralId?: string;

  @Output() changeProductItem: EventEmitter<ResponseGetProductOptionsModelItem> =
    new EventEmitter();

  private subscriptions$: Subscription = new Subscription();

  readonly permissionToEditReferral = PermissionClaimsEnum.ReferralUpdate;

  referralDetails?: ReferralDetailsModel;
  isLoading$?: Observable<boolean>;
  wasAttemptToSubmitForm: boolean = false;
  formGroup!: FormGroup;
  departmentListOptions?: SelectOptionModel[];
  clientListOptions?: ResponseGetClientOptionsModelItem[];
  patientListOptions?: ResponseGetPatientOptionsModelItem[];
  productListOptions?: ResponseGetProductOptionsModelItem[];
  formGroupIsValid: any;
  patientId?: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private notificationService: NzNotificationService,
    private changeDetection: ChangeDetectorRef,
    private store$: Store,
    private router: Router,
    private modal: NzModalService,
    private readonly userPermissionsProvider: UserPermissionsProvider
  ) {
    this.buildForm();
  }

  get getCurrentPatient(): ResponseGetPatientOptionsModelItem | undefined {
    return this.patientListOptions?.find(
      (item) => item.id === this.formGroup.get('patientId')?.value
    );
  }

  get showFieldsByUserRoles(): boolean {
    return this.userPermissionsProvider.isOHRDRoles;
  }

  get getHasPermissionToEdit(): boolean {
    if (this.userPermissionsProvider.isOHRDRoles) return true;
    return (
      this.referralDetails?.status === ReferralStatusEnum.AwaitingSubmit ||
      this.referralDetails?.status === ReferralStatusEnum.AwaitingClient
    );
  }

  ngOnInit() {
    this.initializationSelects();
    this.getRoutedData();
    this.subscriptionsFormChanges();
    this.handleSearchProduct('');
  }

  handleSearchClient(value: string): void {
    this.store$.dispatch(
      referralActions.getClientOptionsAction({
        payload: {
          searchText: value,
          pageIndex: 0,
          pageSize: CommonConstants.PAGE_SIZE_OPTIONS[1],
        },
      })
    );
  }

  handleSearchDepartments(value: string): void {
    this.store$.dispatch(
      referralActions.getDepartmentOptionsAction({
        payload: {
          departmentNameSearch: value,
          clientIds: [this.formGroup.get('clientId')?.value],
          pageIndex: 0,
          pageSize: CommonConstants.PAGE_SIZE_OPTIONS[1],
        },
      })
    );
  }

  handleSearchPatient(value: string): void {
    this.store$.dispatch(
      referralActions.getPatientOptionsAction({
        payload: {
          searchText: value,
          departments: this.formGroup.get('departmentIds')?.value ?? [],
          pageIndex: 0,
          pageSize: CommonConstants.PAGE_SIZE_OPTIONS[1],
          isActiveFilter: IsActiveFilterEnum.Active,
        },
      })
    );
  }

  handleSearchProduct(value: string): void {
    this.store$.dispatch(
      referralActions.getProductOptionsAction({
        payload: {
          searchText: value,
          pageIndex: 0,
          pageSize: CommonConstants.PAGE_SIZE_OPTIONS[1],
        },
      })
    );
  }

  cancel(): void {
    this.router.navigate([
      RoutesConstants.DASHBOARD_INDEX,
      RoutesConstants.DASHBOARD_REFERRAL,
    ]);
  }

  handleSubmitForm(): void {
    this.wasAttemptToSubmitForm = true;
    markAsDirtyForm(this.formGroup);
    if (!this.formGroup.get('departmentIds')?.value.length) {
      this.notificationService.info(
        '',
        'Please, assign at least one department to client user account in order to create referrals'
      );
      return;
    }

    if (this.formGroup.invalid) return;

    this.createReferral();
  }

  private createReferral(): void {
    const model: RequestCreateReferralModel = {
      patientId: this.patientId ?? this.formGroup.value.patientId,
      date: new Date(),
      productId: this.formGroup.value.productTypeId,
    };

    this.store$.dispatch(referralActions.referralCreateAction({ payload: model }));
  }

  private getRoutedData(): void {
    this.activatedRoute.queryParams.pipe(filter((val) => !!val)).subscribe((params) => {
      this.patientId = params[CommonConstants.QUERY_PATIENT_ID];
      const clientId = params[CommonConstants.QUERY_CLIENT_ID];
      let departmentIds = params[CommonConstants.QUERY_DEPARTMENT_IDS];

      if (typeof departmentIds == 'string') {
        departmentIds = [departmentIds];
      }

      if (this.patientId && clientId && departmentIds) {
        this.handleSearchClient('');
        this.setValueAndDisableControl('clientId', clientId);
        this.setValueAndDisableControl('departmentIds', departmentIds);
        this.setValueAndDisableControl('patientId', this.patientId);
        this.handleSearchDepartments('');
        this.handleSearchPatient('');
      }

      const referralId = params[CommonConstants.QUERY_ID];
      if (referralId) {
        this.store$.dispatch(
          referralActions.referralGetByIdAction({ payload: { id: referralId } })
        );
      }
    });
  }

  private buildForm(): void {
    this.formGroup = this.formBuilder.group({
      clientId: [null, [Validators.required]],
      departmentIds: [{ value: null, disabled: true }, [Validators.required]],
      patientId: [{ value: null, disabled: true }, [Validators.required]],
      productTypeId: [
        { value: null, disabled: !this.getHasPermissionToEdit && this.referralId },
        [Validators.required],
      ],
    });
  }

  private subscriptionsFormChanges(): void {
    // if (!this.getHasPermissionToEdit && this.referralId) return;

    this.subscriptions$.add(
      this.formGroup.get('clientId')?.valueChanges.subscribe((value) => {
        if (this.referralDetails) return;
        if (value) {
          this.store$.dispatch(
            referralActions.getDepartmentOptionsAction({
              payload: {
                clientIds: [value],
                pageIndex: 0,
                pageSize: 500,
              },
            })
          );
          this.formGroup.get('departmentIds')?.enable();
          this.formGroup.get('departmentIds')?.setValue(null);
          this.formGroup.get('departmentIds')?.updateValueAndValidity();
        } else {
          this.setValueAndDisableControl('departmentIds', null);
          this.store$.dispatch(referralActions.clearDepartmentOptionsAction());
        }
      })
    );

    this.subscriptions$.add(
      this.formGroup.get('departmentIds')?.valueChanges.subscribe((value) => {
        if (this.referralDetails) return;
        if (value) {
          this.handleSearchPatient('');
          this.formGroup.get('patientId')?.enable();
          this.formGroup.get('patientId')?.setValue(null);
          this.formGroup.get('patientId')?.updateValueAndValidity();
        } else {
          this.setValueAndDisableControl('patientId', null);
        }
        this.store$.dispatch(referralActions.clearPatientOptionsAction());
      })
    );

    this.subscriptions$.add(
      this.formGroup.get('productTypeId')?.valueChanges.subscribe((productId) => {
        if (!productId) return;
        this.handleChangeProduct(productId);
      })
    );
  }

  private handleChangeProduct(productId: string): void {
    if (
      !this.referralDetails ||
      !productId ||
      this.referralDetails?.product.id === productId
    )
      return;

    const currentProduct: ResponseGetProductOptionsModelItem | undefined =
      this.productListOptions?.find((item) => item.id === productId);

    if (this.referralDetails?.referralType === currentProduct?.referralType) {
      this.store$.dispatch(
        referralActions.referralChangeSameProductTypeAction({
          payload: {
            referralId: this.referralDetails!.id,
            productId: currentProduct!.id,
          },
        })
      );
    } else {
      this.confirmChangeProductModal(currentProduct!);
    }
  }

  private confirmChangeProductModal(
    newProduct: ResponseGetProductOptionsModelItem
  ): void {
    this.modal.info({
      nzTitle: 'Update product',
      nzContent:
        '<p>Please, fill out the referral form again because the new product type has a different form or requires additional details compared to the previous product.</p>',
      nzOnOk: () => this.changeProduct(newProduct),
      nzOkText: 'Change',
      nzOnCancel: () => this.setOldProductValue(),
      nzCancelText: 'Cancel',
    });
  }

  private setOldProductValue(): void {
    this.formGroup.get('productTypeId')?.setValue(this.referralDetails?.product.id);
  }

  private changeProduct(newProduct: ResponseGetProductOptionsModelItem): void {
    this.changeProductItem.emit(newProduct);
  }

  private setValueAndDisableControl(
    controlName: string,
    value: string | string[] | null
  ) {
    this.formGroup.get(controlName)?.setValue(value);
    this.formGroup.get(controlName)?.disable();
    this.formGroup.get(controlName)?.updateValueAndValidity();
  }

  private initializationSelects(): void {
    this.isLoading$ = this.store$.select(selectIsLoading);

    this.subscriptions$.add(
      this.store$
        .select(referralSelectors.selectReferralDetails)
        .pipe(filter((val) => val !== undefined))
        .subscribe((data) => {
          if (!data) return;
          this.referralDetails = data;

          this.clientListOptions = [data.client];
          this.formGroup.get('clientId')?.setValue(data.client.id);
          this.formGroup.get('clientId')?.disable();

          this.departmentListOptions = data.departments?.map((item) => ({
            label: item.name,
            value: item.id,
          }));

          const departmentsIds = data.departments?.map((item) => item.id);
          this.setValueAndDisableControl('departmentIds', departmentsIds ?? []);

          this.patientListOptions = [data.patient];

          this.setValueAndDisableControl('patientId', data.patient.id);

          const { name: productName, id: productId } = data.product;

          // this.productListOptions = [
          //   { name: productName, id: productId, referralType: data.referralType },
          // ];

          this.formGroup
            .get('productTypeId')
            ?.setValue(data.product.id, { emitEvent: false });

          if (!this.getHasPermissionToEdit && this.referralId) {
            this.formGroup.get('productTypeId')?.disable();
          }

          this.changeDetection.detectChanges();
        })
    );

    this.subscriptions$.add(
      this.store$
        .select(referralSelectors.selectClientOptions)
        .pipe(filter((val) => val !== undefined))
        .subscribe((data) => {
          if (!data) return;
          this.clientListOptions = data;
          this.changeDetection.detectChanges();
        })
    );

    this.subscriptions$.add(
      this.store$
        .select(referralSelectors.selectDepartmentOptions)
        .pipe(filter((val) => val !== undefined))
        .subscribe((data) => {
          if (!data) return;
          const clientId = this.formGroup.get('clientId')!.value;
          this.departmentListOptions = data[clientId]?.map((item) => ({
            label: item.name,
            value: item.id,
          }));
          this.changeDetection.detectChanges();
        })
    );

    this.subscriptions$.add(
      this.store$
        .select(referralSelectors.selectPatientOptions)
        .pipe(filter((val) => val !== undefined))
        .subscribe((data) => {
          if (!data) return;
          this.patientListOptions = data;
          this.changeDetection.detectChanges();
        })
    );

    this.subscriptions$.add(
      this.store$
        .select(referralSelectors.selectProductsOptions)
        .pipe(filter((val) => val !== undefined))
        .subscribe((data) => {
          if (!data) return;
          this.productListOptions = data;
          this.changeDetection.detectChanges();
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }
}
