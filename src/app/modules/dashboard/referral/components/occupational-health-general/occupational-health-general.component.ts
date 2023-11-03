import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription, filter } from 'rxjs';
import { selectIsLoading } from 'src/app/app-store/app-state/app-state.selectors';
import {
  CommonConstants,
  PatternsConstants,
  RoutesConstants,
} from 'src/app/core/constants';
import { ReferralService } from 'src/app/core/services/referral.service';
import { PhoneCodeEnum, ReferralStatusEnum } from 'src/app/shared/enums';
import { markAsDirtyForm } from 'src/app/shared/helpers';
import { DownloadDocumentsHelper } from 'src/app/shared/helpers/download-documents.helper';
import { SelectOptionModel } from 'src/app/shared/models';
import { UserPermissionsProvider } from 'src/app/shared/providers/user-permissions.provider';
import {
  OccupationalHealthGeneralReferral,
  RequestUpdateOccupationalHealthGeneralReferralModel,
} from '../../models';
import * as referralDetailsActions from '../../state/referral-details.actions';
import * as referralSelectors from '../../state/referral.selectors';

@Component({
  selector: 'app-occupational-health-general',
  templateUrl: './occupational-health-general.component.html',
  styleUrls: ['./occupational-health-general.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OccupationalHealthGeneralComponent implements OnInit, OnDestroy {
  @Input() productId!: string;
  @Input() referralId!: string;
  @Input() set referralStatus(value: ReferralStatusEnum) {
    this._referralStatus = value;
    this.checkDisableForm();
    this.changeDetector.detectChanges();
  }

  private referralDetailsId!: string;
  private subscriptions$: Subscription = new Subscription();
  private _referralStatus?: ReferralStatusEnum;
  readonly phoneCodes: SelectOptionModel<PhoneCodeEnum>[] = CommonConstants.phoneCodes;

  formGroup!: FormGroup;
  wasAttemptToSubmitForm: boolean = false;
  isLoading$?: Observable<boolean>;

  constructor(
    private formBuilder: FormBuilder,
    private store$: Store,
    private router: Router,
    private readonly referralService: ReferralService,
    private readonly downloadDocumentsHelper: DownloadDocumentsHelper,
    private readonly userPermissionsProvider: UserPermissionsProvider,
    private changeDetector: ChangeDetectorRef
  ) {
    this.buildForm();
  }

  get getIsShowPreviewBtn(): boolean {
    return (
      this._referralStatus !== ReferralStatusEnum.AwaitingSubmit &&
      this.userPermissionsProvider.isOHRDRoles
    );
  }

  get getIsClientRoles(): boolean {
    return this.userPermissionsProvider.isClientRoles;
  }

  get getIsClinicianRole(): boolean {
    return this.userPermissionsProvider.isClinician;
  }

  get canEditForm(): boolean {
    if (this.userPermissionsProvider.isOHRDRoles) return true;

    return (
      this._referralStatus === ReferralStatusEnum.AwaitingSubmit ||
      this._referralStatus === ReferralStatusEnum.ReportWaitingToBeSend ||
      this._referralStatus === ReferralStatusEnum.AwaitingClient
    );
  }

  ngOnInit() {
    this.store$.dispatch(
      referralDetailsActions.getOccupationalHealthAction({
        payload: { id: this.referralId },
      })
    );

    this.initializingSelectors();

    this.subscriptionsFormChanges();

    this.checkDisableForm();
  }

  handleDownloadPreview(): void {
    this.referralService.getReferralDocument(this.referralId).subscribe((res) => {
      this.downloadDocumentsHelper.downloadDocument(
        res,
        `${this.referralId}_preview.pdf`
      );
    });
  }

  handleCancel(): void {
    this.router.navigate([
      RoutesConstants.DASHBOARD_INDEX,
      RoutesConstants.DASHBOARD_REFERRAL,
    ]);
  }

  handleSubmitForm(isSubmit?: boolean): void {
    this.wasAttemptToSubmitForm = true;
    markAsDirtyForm(this.formGroup);

    if (this.formGroup.invalid) return;

    this.saveReferral(isSubmit);
  }

  saveReferral(isSubmit: boolean = false): void {
    const model: RequestUpdateOccupationalHealthGeneralReferralModel = {
      id: this.referralDetailsId,
      ...this.formGroup.value,
      isSubmit,
      productId: this.productId,
    };

    this.store$.dispatch(
      referralDetailsActions.updateReferralOccupationalDetailsAction({ payload: model })
    );
  }

  private initializingSelectors(): void {
    this.subscriptions$.add(
      this.store$
        .select(referralSelectors.selectOccupationalHealthDetails)
        .pipe(filter((val) => !!val))
        .subscribe((res) => {
          this.referralDetailsId = res!.id;
          this.setInitialValue(res!);
        })
    );

    this.isLoading$ = this.store$.select(selectIsLoading);
  }

  private setInitialValue(data: OccupationalHealthGeneralReferral): void {
    this.formGroup.patchValue(data);
    this.formGroup.get('employeePhoneCode')?.setValue(data.employeePhoneCode);

    this.changeDetector.detectChanges();
  }

  private buildForm(): void {
    this.formGroup = this.formBuilder.group({
      reference: [{ value: null, disabled: false }],
      date: [{ value: null, disabled: false }],
      jurisdiction: [{ value: null, disabled: false }],
      employer: [{ value: null, disabled: false }],
      employerPhoneCode: [
        { value: PhoneCodeEnum.England, disabled: false },
        [Validators.required],
      ],
      employerPhone: [
        { value: null, disabled: false },
        [
          Validators.required,
          Validators.min(100000000),
          Validators.max(9999999999),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
      managerFirstName: [{ value: null, disabled: false }],
      managerLastName: [{ value: null, disabled: false }],
      managerEmail: [
        { value: null, disabled: false },
        [Validators.pattern(PatternsConstants.PATTERN_EMAIL)],
      ],
      employeeFirstName: [{ value: null, disabled: true }, [Validators.required]],
      employeeLastName: [{ value: null, disabled: true }, [Validators.required]],
      dateOfBirth: [{ value: null, disabled: true }, [Validators.required]],
      staffId: [{ value: null, disabled: true }],
      address: [{ value: null, disabled: true }, [Validators.required]],
      employeePhoneCode: [
        { value: PhoneCodeEnum.England, disabled: false },
        [Validators.required],
      ],
      employeePhone: [
        { value: null, disabled: true },
        [
          Validators.required,
          Validators.min(100000000),
          Validators.max(9999999999),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
      employeeEmail: [
        { value: null, disabled: true },
        [Validators.pattern(PatternsConstants.PATTERN_EMAIL)],
      ],
      employmentStartDate: [{ value: null, disabled: false }],
      occupation: [{ value: null, disabled: true }, [Validators.required]],
      workLocation: [{ value: null, disabled: false }, [Validators.required]],
      insurer: [{ value: null, disabled: false }],
      jobDescription: [{ value: null, disabled: false }],
      previousReferrals: [{ value: null, disabled: false }],
      absenceStartDate: [{ value: null, disabled: false }],
      absenceEndDate: [{ value: null, disabled: false }],
      isRtwDate: [false],
      reviewType: [{ value: null, disabled: false }],
      absenceReason: [{ value: null, disabled: false }],
      assessmentReason: [{ value: null, disabled: false }],
      issues: [{ value: null, disabled: false }],
    });
  }

  private checkDisableForm(): void {
    if (!this.canEditForm && this.formGroup) {
      this.formGroup.disable({ emitEvent: false });
    }
  }

  private subscriptionsFormChanges(): void {
    this.subscriptions$.add(
      this.formGroup.get('managerEmail')?.valueChanges.subscribe((value: string) => {
        this.formGroup
          .get('managerEmail')
          ?.setValue(value?.toLocaleLowerCase(), { emitEvent: false });
      })
    );

    this.subscriptions$.add(
      this.formGroup.get('employeeEmail')?.valueChanges.subscribe((value: string) => {
        this.formGroup
          .get('employeeEmail')
          ?.setValue(value?.toLocaleLowerCase(), { emitEvent: false });
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }
}
