import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NgxPermissionsService } from 'ngx-permissions';
import { Observable, filter } from 'rxjs';
import { selectIsLoading } from 'src/app/app-store/app-state/app-state.selectors';
import {
  CommonConstants,
  PatternsConstants,
  RoutesConstants,
} from 'src/app/core/constants';
import { fadeDownInput } from 'src/app/shared/animation/animated-ngif-fade-down-input';
import {
  InvoiceTypeEnum,
  PermissionClaimsEnum,
  PhoneCodeEnum,
} from 'src/app/shared/enums';
import { markAsDirtyForm } from 'src/app/shared/helpers';
import { ClientModel, SelectOptionModel } from 'src/app/shared/models';
import { UserPermissionsProvider } from 'src/app/shared/providers/user-permissions.provider';
import { CancellationFeeTypeEnum } from '../../enums';
import { RequestCreateClientModel, RequestUpdateClientModel } from '../../models';
import {
  clientCreateAction,
  clientGetByIdAction,
  clientUpdateAction,
} from '../../store/client.actions';
import { selectClientDetails } from '../../store/client.selectors';
import { ClientGeneralDetailsConstants } from './client-general-details.constants';

@Component({
  selector: 'app-client-general-details',
  templateUrl: './client-general-details.component.html',
  styleUrls: ['./client-general-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeDownInput],
})
export class ClientGeneralDetailsComponent implements OnInit {
  @Input() clientId?: string;

  clientDetails?: ClientModel;

  readonly clientUpdatePermission = PermissionClaimsEnum.ClientUpdate;
  readonly clientCreatePermission = PermissionClaimsEnum.ClientCreate;

  readonly invoiceTypes: SelectOptionModel<InvoiceTypeEnum>[] =
    CommonConstants.invoiceTypes;
  readonly cancellationFeeOptions: SelectOptionModel<CancellationFeeTypeEnum>[] =
    ClientGeneralDetailsConstants.cancellationFeeOptions;
  readonly phoneCodes: SelectOptionModel<PhoneCodeEnum>[] = CommonConstants.phoneCodes;

  isLoading$?: Observable<boolean>;
  wasAttemptToSubmitForm: boolean = false;
  documentPasswordIsVisible: boolean = false;
  formGroup!: FormGroup;
  cancellationFeeType: CancellationFeeTypeEnum = CancellationFeeTypeEnum.Fixed;

  constructor(
    private formBuilder: FormBuilder,
    private changeDetection: ChangeDetectorRef,
    private store$: Store,
    private router: Router,
    private ngxPermissionsService: NgxPermissionsService,
    private readonly userPermissionsProvider: UserPermissionsProvider
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.initializationSelects();
    if (this.clientId) {
      this.store$.dispatch(clientGetByIdAction({ payload: { id: this.clientId } }));
    }
  }

  get getCanViewClientsList(): boolean {
    const canViewClientsList = this.userPermissionsProvider.isHasPermission(
      PermissionClaimsEnum.ClientViewAll
    );

    return canViewClientsList;
  }

  get getIsOHRDAdminOrSuperuser(): boolean {
    return (
      this.userPermissionsProvider.isOHRDSuperuser ||
      this.userPermissionsProvider.isOHRDAdministrator
    );
  }

  private initializationSelects(): void {
    this.isLoading$ = this.store$.select(selectIsLoading);

    this.store$
      .select(selectClientDetails)
      .pipe(filter((val) => val !== undefined))
      .subscribe((data) => {
        if (!data) return;
        this.clientDetails = data;

        this.formGroup.patchValue(this.clientDetails);

        this.cancellationFeeType = this.clientDetails.cancellationFeeType;

        if (this.clientDetails.cancellationFee) {
          this.formGroup.get('isCancellationFee')?.setValue(true);
        }

        if (this.clientDetails.documentPassword) {
          this.formGroup.get('documentPasswordRequired')?.setValue(true);
        }

        this.disableFormGroup();

        this.changeDetection.detectChanges();
      });
  }

  private buildForm(): void {
    this.formGroup = this.formBuilder.group({
      fullName: [null, this.getIsOHRDAdminOrSuperuser ? [Validators.required] : null],
      documentPasswordRequired: [
        this.getIsOHRDAdminOrSuperuser ? false : null,
        this.getIsOHRDAdminOrSuperuser ? [Validators.required] : null,
      ],
      documentPassword: [null],
      contactPersonName: [null, [Validators.required]],
      contactPersonEmail: [
        null,
        [Validators.required, Validators.pattern(PatternsConstants.PATTERN_EMAIL)],
      ],
      contactPersonPhone: [
        null,
        [
          Validators.required,
          Validators.min(100000000),
          Validators.max(9999999999),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
      phoneCode: [PhoneCodeEnum.England, [Validators.required]],
      invoiceType: [
        this.getIsOHRDAdminOrSuperuser ? InvoiceTypeEnum.Monthly : null,
        this.getIsOHRDAdminOrSuperuser ? [Validators.required] : null,
      ],
      includeOnSageReport: [
        this.getIsOHRDAdminOrSuperuser ? false : null,
        this.getIsOHRDAdminOrSuperuser ? [Validators.required] : null,
      ],
      purchaseOrderRequired: [
        this.getIsOHRDAdminOrSuperuser ? false : null,
        this.getIsOHRDAdminOrSuperuser ? [Validators.required] : null,
      ],
      invoiceEmailAddress: [
        null,
        this.getIsOHRDAdminOrSuperuser
          ? [Validators.required, Validators.pattern(PatternsConstants.PATTERN_EMAIL)]
          : null,
      ],

      includePatientNameOnClinicalReports: [
        this.getIsOHRDAdminOrSuperuser ? false : null,
        this.getIsOHRDAdminOrSuperuser ? [Validators.required] : null,
      ],
      kpiRequired: [
        this.getIsOHRDAdminOrSuperuser ? false : null,
        this.getIsOHRDAdminOrSuperuser ? [Validators.required] : null,
      ],
      statsRequired: [
        this.getIsOHRDAdminOrSuperuser ? false : null,
        this.getIsOHRDAdminOrSuperuser ? [Validators.required] : null,
      ],

      isCancellationFee: [
        false,
        this.getIsOHRDAdminOrSuperuser ? [Validators.required] : null,
      ],
      cancellationFee: [null],
      isActive: [true, this.getIsOHRDAdminOrSuperuser ? [Validators.required] : null],
      cancellationFeeType: [
        this.getIsOHRDAdminOrSuperuser ? CancellationFeeTypeEnum.Percent : null,
        this.getIsOHRDAdminOrSuperuser ? [Validators.required] : null,
      ],
    });

    this.subscribesOnChangesForm();

    this.ngxPermissionsService.permissions$.subscribe((permissions) => {
      const updatePermission = Object.keys(permissions).find(
        (item) => item === PermissionClaimsEnum.ClientUpdate
      );
      if (!updatePermission && this.clientDetails) {
        this.formGroup.disable();
        this.formGroup.updateValueAndValidity();
      }
    });
  }

  private disableFormGroup(): void {
    this.ngxPermissionsService.permissions$.subscribe((permissions) => {
      const updatePermission = Object.keys(permissions).find(
        (item) => item === PermissionClaimsEnum.ClientUpdate
      );
      if (!updatePermission && this.clientDetails) {
        this.formGroup.disable();
        this.formGroup.updateValueAndValidity();
      }
    });
  }

  private subscribesOnChangesForm(): void {
    this.formGroup.get('contactPersonEmail')?.valueChanges.subscribe((value: string) => {
      this.formGroup
        .get('contactPersonEmail')
        ?.setValue(value?.toLocaleLowerCase(), { emitEvent: false });
    });

    this.formGroup.get('invoiceEmailAddress')?.valueChanges.subscribe((value: string) => {
      this.formGroup
        .get('invoiceEmailAddress')
        ?.setValue(value?.toLocaleLowerCase(), { emitEvent: false });
    });

    this.formGroup
      .get('documentPasswordRequired')
      ?.valueChanges.subscribe((isRequired) => {
        const documentPasswordControl = this.formGroup.get('documentPassword');

        if (isRequired) {
          documentPasswordControl?.setValidators([
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(12),
          ]);
          documentPasswordControl?.updateValueAndValidity();
          this.changeDetection.detectChanges();
        } else {
          documentPasswordControl?.clearValidators();
          documentPasswordControl?.setValue(null);
          documentPasswordControl?.updateValueAndValidity();
          this.changeDetection.detectChanges();
        }
      });

    this.formGroup.get('isCancellationFee')?.valueChanges.subscribe((value) => {
      if (value) {
        this.formGroup.get('cancellationFee')?.setValidators(Validators.required);
        this.formGroup.get('cancellationFee')?.updateValueAndValidity();
      } else {
        this.formGroup.get('cancellationFee')?.setValidators(null);
        this.formGroup.get('cancellationFee')?.updateValueAndValidity();
      }
    });
  }

  changeCancellationType(cancellationFeeType: CancellationFeeTypeEnum): void {
    const cancellationFeeControl = this.formGroup.get('cancellationFee');

    if (cancellationFeeType === CancellationFeeTypeEnum.Percent) {
      cancellationFeeControl?.setValidators([
        Validators.required,
        Validators.min(0),
        Validators.max(100),
      ]);
      cancellationFeeControl?.updateValueAndValidity();
      this.changeDetection.detectChanges();
    } else {
      cancellationFeeControl?.clearValidators();
      cancellationFeeControl?.setValidators([Validators.required]);
      cancellationFeeControl?.setValue(null);
      cancellationFeeControl?.updateValueAndValidity();
      this.changeDetection.detectChanges();
    }
  }

  cancel(): void {
    this.router.navigate([
      RoutesConstants.DASHBOARD_INDEX,
      RoutesConstants.DASHBOARD_CLIENT,
    ]);
  }

  submitForm(): void {
    this.wasAttemptToSubmitForm = true;
    markAsDirtyForm(this.formGroup);

    if (this.formGroup.invalid) return;

    if (this.clientDetails) {
      this.updateClient();
    } else {
      this.createClient();
    }
  }

  private updateClient(): void {
    const model: RequestUpdateClientModel = {
      id: this.clientDetails!.id,
      fullName: this.formGroup.value.fullName,
      contactPersonName: this.formGroup.value.contactPersonName,
      contactPersonEmail: this.formGroup.value.contactPersonEmail,
      contactPersonPhone: this.formGroup.value.contactPersonPhone,
      invoiceType: this.formGroup.value.invoiceType,
      includeOnSageReport: this.formGroup.value.includeOnSageReport,
      purchaseOrderRequired: this.formGroup.value.purchaseOrderRequired,
      invoiceEmailAddress: this.formGroup.value.invoiceEmailAddress,
      phoneCode: this.formGroup.value.phoneCode,
      includePatientNameOnClinicalReports:
        this.formGroup.value.includePatientNameOnClinicalReports,
      documentPassword: this.formGroup.value.documentPassword,
      kpiRequired: this.formGroup.value.kpiRequired,
      statsRequired: this.formGroup.value.statsRequired,
      cancellationFee: this.formGroup.value.cancellationFee
        ? Number(this.formGroup.value.cancellationFee)
        : undefined,
      isActive: this.formGroup.value.isActive,
      cancellationFeeType: this.cancellationFeeType,
    };

    this.store$.dispatch(clientUpdateAction({ payload: model }));
  }

  private createClient(): void {
    const model: RequestCreateClientModel = {
      fullName: this.formGroup.value.fullName,
      contactPersonName: this.formGroup.value.contactPersonName,
      contactPersonEmail: this.formGroup.value.contactPersonEmail,
      contactPersonPhone: this.formGroup.value.contactPersonPhone,
      invoiceType: this.formGroup.value.invoiceType,
      includeOnSageReport: this.formGroup.value.includeOnSageReport,
      purchaseOrderRequired: this.formGroup.value.purchaseOrderRequired,
      invoiceEmailAddress: this.formGroup.value.invoiceEmailAddress,
      phoneCode: this.formGroup.value.phoneCode,
      includePatientNameOnClinicalReports:
        this.formGroup.value.includePatientNameOnClinicalReports,
      documentPassword: this.formGroup.value.documentPassword,
      kpiRequired: this.formGroup.value.kpiRequired,
      statsRequired: this.formGroup.value.statsRequired,
      cancellationFee: this.formGroup.value.cancellationFee
        ? Number(this.formGroup.value.cancellationFee)
        : undefined,
      isActive: this.formGroup.value.isActive,
      cancellationFeeType: this.cancellationFeeType,
    };

    this.store$.dispatch(clientCreateAction({ payload: model }));
  }
}
