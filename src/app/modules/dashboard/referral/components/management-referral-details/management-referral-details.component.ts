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
import { CommonConstants, RoutesConstants } from 'src/app/core/constants';
import { ReferralService } from 'src/app/core/services/referral.service';
import { PhoneCodeEnum, ReferralStatusEnum } from 'src/app/shared/enums';
import { markAsDirtyForm } from 'src/app/shared/helpers';
import { DownloadDocumentsHelper } from 'src/app/shared/helpers/download-documents.helper';
import { SelectOptionModel } from 'src/app/shared/models';
import { UserPermissionsProvider } from 'src/app/shared/providers/user-permissions.provider';
import { ManagementReferralReasonEnum } from '../../enums';
import { ManagementReferralModel } from '../../models';
import { RequestUpdateManagementReferralModel } from '../../models/request/request-update-management-referral.model';
import * as referralDetailsActions from '../../state/referral-details.actions';
import * as referralSelectors from '../../state/referral.selectors';

@Component({
  selector: 'app-management-referral-details',
  templateUrl: './management-referral-details.component.html',
  styleUrls: ['./management-referral-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManagementReferralDetailsComponent implements OnInit, OnDestroy {
  @Input() productId!: string;
  @Input() referralId!: string;
  @Input() set referralStatus(value: ReferralStatusEnum) {
    this._referralStatus = value;
    this.checkDisableForm();
    this.changeDetector.detectChanges();
  }

  private _referralStatus!: ReferralStatusEnum;
  private referralDetailsId!: string;
  private subscriptions$: Subscription = new Subscription();

  readonly phoneCodes: SelectOptionModel<PhoneCodeEnum>[] = CommonConstants.phoneCodes;
  readonly reasonReferral = {
    longTermAbsence: ManagementReferralReasonEnum.LongTermAbsence,
    suitableForWork: ManagementReferralReasonEnum.SuitableForWork,
    poorAttendanceRecord: ManagementReferralReasonEnum.PoorAttendanceRecord,
    counselling: ManagementReferralReasonEnum.Counselling,
    performanceConcern: ManagementReferralReasonEnum.PerformanceConcern,
    physiotherapy: ManagementReferralReasonEnum.Physiotherapy,
    resumptions: ManagementReferralReasonEnum.Resumptions,
    accident: ManagementReferralReasonEnum.Accident,
    periodicHealthCheck: ManagementReferralReasonEnum.PeriodicHealthCheck,
    illHealthRetirement: ManagementReferralReasonEnum.IllHealthRetirement,
  };

  formGroup!: FormGroup;
  wasAttemptToSubmitForm: boolean = false;
  isLoading$?: Observable<boolean>;

  constructor(
    private formBuilder: FormBuilder,
    private store$: Store,
    private router: Router,
    private changeDetector: ChangeDetectorRef,
    private readonly downloadDocumentsHelper: DownloadDocumentsHelper,
    private readonly referralService: ReferralService,
    private readonly userPermissionsProvider: UserPermissionsProvider
  ) {
    this.buildForm();
  }

  get getIsShowPreviewBtn(): boolean {
    return (
      this._referralStatus !== ReferralStatusEnum.AwaitingSubmit &&
      this.userPermissionsProvider.isOHRDRoles
    );
  }

  get getIsShowSaveBtn(): boolean {
    return (
      this._referralStatus === ReferralStatusEnum.AwaitingSubmit ||
      this._referralStatus === ReferralStatusEnum.AwaitingClient
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
      referralDetailsActions.getReferralManagementDetailsAction({
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

    this.save(isSubmit);
  }

  save(isSubmit: boolean = false): void {
    const model: RequestUpdateManagementReferralModel = {
      id: this.referralDetailsId,
      ...this.formGroup.value,
      isSubmit,
      productId: this.productId,
    };

    this.store$.dispatch(
      referralDetailsActions.updateReferralManagementDetailsAction({ payload: model })
    );
  }

  private checkDisableForm(): void {
    if (!this.canEditForm && this.formGroup) {
      this.formGroup.disable({ emitEvent: false });
    }
  }

  private initializingSelectors(): void {
    this.subscriptions$.add(
      this.store$
        .select(referralSelectors.selectManagementReferralForm)
        .pipe(filter((val) => !!val))
        .subscribe((res) => {
          this.referralDetailsId = res!.id;
          this.setInitialValue(res!);
        })
    );

    this.isLoading$ = this.store$.select(selectIsLoading);
  }

  private setInitialValue(data: ManagementReferralModel): void {
    this.formGroup.patchValue(data);
    this.formGroup.get('date')?.setValue(data.created);

    if (!this.formGroup.get('jobTitle')?.value) {
      this.formGroup.get('jobTitle')?.setValue('N/A');
    }

    if (data.absenceStartDate || data.absenceReason) {
      this.formGroup.get('isCurrentlyAbsent')?.setValue(true);
    }
    if (data.referringManagerName) {
      this.formGroup.get('isReferralReasonWasDiscussed')?.setValue(true);
    }
  }

  private buildForm(): void {
    this.formGroup = this.formBuilder.group({
      employeeName: [{ value: null, disabled: true }, [Validators.required]],
      dateOfBirth: [{ value: null, disabled: true }, [Validators.required]],
      department: [{ value: null, disabled: true }],
      employeeNumber: [{ value: null, disabled: true }],
      jobTitle: [{ value: null, disabled: true }, [Validators.required]],
      workLocation: [{ value: null, disabled: false }, [Validators.required]],
      serviceLength: [{ value: null, disabled: false }, [Validators.required]],
      contactEmail: [{ value: null, disabled: true }, [Validators.required]],
      homeAddress: [{ value: null, disabled: true }, [Validators.required]],
      contactTelephoneNumber: [
        { value: null, disabled: true },
        [
          Validators.required,
          Validators.min(100000000),
          Validators.max(9999999999),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
      contactTelephoneNumberCode: [
        { value: PhoneCodeEnum.England, disabled: true },
        [Validators.required],
      ],

      reason: [{ value: null, disabled: false }, [Validators.required]],

      isCurrentlyAbsent: [{ value: false, disabled: false }, [Validators.required]],
      absenceStartDate: [{ value: null, disabled: false }],
      absenceReason: [{ value: null, disabled: false }],

      isCurrentlyFitForWork: [{ value: false, disabled: false }, [Validators.required]],
      areThereAttendaceRecordReasons: [
        { value: false, disabled: false },
        [Validators.required],
      ],
      areTherePerformanceConsernsReasons: [
        { value: false, disabled: false },
        [Validators.required],
      ],
      haveWorkTasksContributed: [
        { value: false, disabled: false },
        [Validators.required],
      ],
      whatAreRecoveryTimescales: [
        { value: false, disabled: false },
        [Validators.required],
      ],
      areWorkRestrictionsRequired: [
        { value: false, disabled: false },
        [Validators.required],
      ],
      willRestrictionsBeTemporary: [
        { value: false, disabled: false },
        [Validators.required],
      ],
      isIndividualTakingSteps: [{ value: false, disabled: false }, [Validators.required]],
      doesIndividualMeetCriteria: [
        { value: false, disabled: false },
        [Validators.required],
      ],
      isMedConditionWillBeCovered: [
        { value: false, disabled: false },
        [Validators.required],
      ],
      whatFactorsMightDelay: [{ value: false, disabled: false }, [Validators.required]],
      whatIsLongtermOutlook: [{ value: false, disabled: false }, [Validators.required]],
      extraPoints: [{ value: null, disabled: false }],

      //???
      haveDomesticIssuesContributed: [
        { value: null, disabled: false },
        [Validators.required],
      ],

      usingDisplayScreen: [{ value: false, disabled: false }, [Validators.required]],
      safetyCriticalJob: [{ value: false, disabled: false }, [Validators.required]],
      officeBased: [{ value: false, disabled: false }, [Validators.required]],
      workingAtHeights: [{ value: false, disabled: false }, [Validators.required]],
      regularPublicContact: [{ value: false, disabled: false }, [Validators.required]],
      confinedSpaces: [{ value: false, disabled: false }, [Validators.required]],
      nightWorker: [{ value: false, disabled: false }, [Validators.required]],
      loneWorker: [{ value: false, disabled: false }, [Validators.required]],
      vibrationTools: [{ value: false, disabled: false }, [Validators.required]],
      driving: [{ value: false, disabled: false }, [Validators.required]],
      noisyEnvironments: [{ value: false, disabled: false }, [Validators.required]],
      operatingMachinery: [{ value: false, disabled: false }, [Validators.required]],
      dustChems: [{ value: false, disabled: false }, [Validators.required]],
      manualHandling: [{ value: false, disabled: false }, [Validators.required]],

      workDuties: [{ value: null, disabled: false }, [Validators.required]],
      documentsWithReferral: [{ value: null, disabled: false }, [Validators.required]],

      isReferralReasonWasDiscussed: [
        { value: false, disabled: false },
        [Validators.required],
      ],
      referringManagerName: [{ value: null, disabled: false }],
      contactTelephone: [
        { value: null, disabled: false },
        [
          Validators.required,
          Validators.min(100000000),
          Validators.max(9999999999),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
      contactTelephoneCode: [
        { value: PhoneCodeEnum.England, disabled: false },
        [Validators.required],
      ],
      date: [{ value: null, disabled: false }],
    });
  }

  private subscriptionsFormChanges(): void {
    this.subscriptions$.add(
      this.formGroup.get('email')?.valueChanges.subscribe((value: string) => {
        this.formGroup
          .get('email')
          ?.setValue(value?.toLocaleLowerCase(), { emitEvent: false });
      })
    );
    this.subscriptions$.add(
      this.formGroup
        .get('isCurrentlyAbsent')
        ?.valueChanges.subscribe((value: boolean) => {
          if (value) {
            this.formGroup.get('absenceReason')?.setValidators([Validators.required]);
            this.formGroup.get('absenceReason')?.updateValueAndValidity();
          } else {
            this.formGroup.get('absenceStartDate')?.setValue(null);
            this.formGroup.get('absenceStartDate')?.setValidators(null);
            this.formGroup.get('absenceStartDate')?.updateValueAndValidity();
            this.formGroup.get('absenceReason')?.setValue(null);
            this.formGroup.get('absenceReason')?.setValidators(null);
            this.formGroup.get('absenceReason')?.updateValueAndValidity();
          }
        })
    );

    this.subscriptions$.add(
      this.formGroup
        .get('isReferralReasonWasDiscussed')
        ?.valueChanges.subscribe((value: boolean) => {
          if (value) {
            this.formGroup
              .get('referringManagerName')
              ?.setValidators([Validators.required]);
            this.formGroup.get('referringManagerName')?.updateValueAndValidity();
          } else {
            this.formGroup.get('referringManagerName')?.setValidators(null);
            this.formGroup.get('referringManagerName')?.setValue(null);
            this.formGroup.get('referringManagerName')?.updateValueAndValidity();

            this.formGroup.get('contactTelephone')?.setValue(null);
            this.formGroup.get('contactTelephone')?.setValidators(null);
            this.formGroup.get('contactTelephone')?.updateValueAndValidity();
            this.formGroup.get('date')?.setValidators(null);
            this.formGroup.get('date')?.setValue(null);
            this.formGroup.get('date')?.updateValueAndValidity();
          }
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }
}
