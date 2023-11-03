import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription, combineLatest, filter, forkJoin } from 'rxjs';
import { selectIsLoading } from 'src/app/app-store/app-state/app-state.selectors';
import {
  CommonConstants,
  PatternsConstants,
  RoutesConstants,
} from 'src/app/core/constants';
import { PhoneCodeEnum } from 'src/app/shared/enums';
import { markAsDirtyForm } from 'src/app/shared/helpers';
import { SelectOptionModel } from 'src/app/shared/models';
import * as appointmentSelectors from '../../../store/appointments.selectors';
import * as appointmentActions from '../../../store/appointments.actions';
import { ConsentTypeEnum, ReportNotificationTypeEnum } from '../../../enums';
import {
  RequestUpdateAppointmentDetailsModel,
  RequestUpdatePatientContactInformationModel,
  ResponseGetAppointmentByIdModel,
  ResponseGetPatientDetailsByAppointmentIdModel,
} from '../../../models';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AppointmentsService } from 'src/app/core/services/appointments.service';

@Component({
  selector: 'app-attendance-yes-details',
  templateUrl: './attendance-yes-details.component.html',
  styleUrls: ['./attendance-yes-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AttendanceYesDetailsComponent implements OnInit, OnDestroy {
  @Output() handleNextTab = new EventEmitter();

  private subscriptions$: Subscription = new Subscription();

  readonly notificationTypeListOptions = CommonConstants.notificationTypeListOptions;
  readonly consentTypeListOptions = CommonConstants.consentTypeListOptions;
  readonly phoneCodes: SelectOptionModel<PhoneCodeEnum>[] = CommonConstants.phoneCodes;

  isLoading$?: Observable<boolean>;
  wasAttemptToSubmitForm: boolean = false;
  formGroup!: FormGroup;
  appointmentDetails?: ResponseGetAppointmentByIdModel;
  patientDetails?: ResponseGetPatientDetailsByAppointmentIdModel;

  constructor(
    private formBuilder: FormBuilder,
    private store$: Store,
    private router: Router,
    private changeDetection: ChangeDetectorRef,
    private modal: NzModalService,
    private readonly appointmentsService: AppointmentsService
  ) {
    this.buildForm();
  }

  get getIsShowPhoneNumberField(): boolean {
    return (
      this.formGroup.get('reportNotificationType')?.value ===
      ReportNotificationTypeEnum.Phone
    );
  }

  get getIsShowPhoneEmailField(): boolean {
    return (
      this.formGroup.get('reportNotificationType')?.value ===
      ReportNotificationTypeEnum.Email
    );
  }

  ngOnInit(): void {
    this.initializationSelects();
  }

  handleSubmitForm(): void {
    this.wasAttemptToSubmitForm = true;
    markAsDirtyForm(this.formGroup);

    if (this.formGroup.invalid) return;

    this.checkActualPatientData();
  }

  navigateToAppointmentsTable(): void {
    this.router.navigate([
      RoutesConstants.DASHBOARD_INDEX,
      RoutesConstants.DASHBOARD_APPOINTMENTS,
    ]);
  }

  private buildForm(): void {
    this.formGroup = this.formBuilder.group({
      consentType: [null, Validators.required],
      reportNotificationType: [ReportNotificationTypeEnum.Email],
      patientEmail: [null],
      phoneCode: [PhoneCodeEnum.England, Validators.required],
      patientPhoneNumber: [
        null,
        [
          Validators.required,
          Validators.min(100000000),
          Validators.max(9999999999),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
    });
    this.subscriptionsOnChangesForm();
  }

  private initializationSelects(): void {
    this.isLoading$ = this.store$.select(selectIsLoading);

    const selectAppointmentDetails$ = this.store$.select(
      appointmentSelectors.selectAppointmentDetails
    );
    const selectPatientDetails$ = this.store$.select(
      appointmentSelectors.selectPatientDetails
    );

    combineLatest([selectAppointmentDetails$, selectPatientDetails$]).subscribe(
      ([appointmentDetails, patientDetails]) => {
        if (!appointmentDetails || !patientDetails) return;

        this.appointmentDetails = appointmentDetails;
        this.patientDetails = patientDetails;
        const model = {
          consentType: appointmentDetails?.consentType
            ? appointmentDetails?.consentType
            : undefined,
          reportNotificationType: appointmentDetails?.reportNotificationType,
          patientEmail: appointmentDetails?.patientEmail,
          patientPhoneCode: appointmentDetails?.patientPhoneCode,
          patientPhoneNumber: appointmentDetails?.patientPhoneNumber,
        };

        if (!appointmentDetails?.patientEmail && patientDetails?.email) {
          model.patientEmail = patientDetails?.email;
          model.reportNotificationType =
            model.reportNotificationType ?? ReportNotificationTypeEnum.Email;
        }

        if (!appointmentDetails?.patientPhoneNumber && patientDetails?.phoneNumber) {
          const { phoneCode, phoneNumber } = this.getPhoneCodeAndNumber(
            patientDetails!.phoneNumber
          );
          model.patientPhoneCode = phoneCode;
          model.patientPhoneNumber = phoneNumber;
          model.reportNotificationType =
            model.reportNotificationType ?? ReportNotificationTypeEnum.Phone;
        }
        this.setFormGroupValue(model);
      }
    );
  }

  private getPhoneCodeAndNumber(value?: string): {
    phoneCode?: number;
    phoneNumber?: string;
  } {
    if (value) {
      const valueArray = value.split(' ');
      if (valueArray.length === 2) {
        const phoneNumber = value.split(' ')[1];
        const phoneCode = +value.split(' ')[0].replace('+', '');
        return { phoneCode, phoneNumber };
      }
    }
    return { phoneCode: undefined, phoneNumber: undefined };
  }

  private setFormGroupValue(
    data: Partial<
      Pick<
        ResponseGetAppointmentByIdModel,
        | 'consentType'
        | 'reportNotificationType'
        | 'patientEmail'
        | 'patientPhoneCode'
        | 'patientPhoneNumber'
      >
    >
  ): void {
    this.formGroup.patchValue(data);
  }

  private confirmChangeUserPhoneNumberOrEmail({ isEmail }: { isEmail: boolean }): void {
    const typeChangeString = !isEmail ? 'phone number' : 'email address';

    const message = `New ${typeChangeString}  does not correlate with old one. Do you want to change it on patient details?`;

    this.modal.info({
      nzTitle: `Update patient ${typeChangeString}`,
      nzContent: `<p>${message}</p>`,
      nzOnOk: () => this.updatePatientDetails(),
      nzOkText: 'Yes',
      nzCancelText: 'No',
    });
  }

  private updatePatientDetails(): void {
    const reportNotificationType = this.formGroup.get('reportNotificationType')!.value;
    const patientPhoneNumber = this.formGroup.get('patientPhoneNumber')!.value;
    const phoneCode = this.formGroup.get('phoneCode')!.value;
    const patientEmail = this.formGroup.get('patientEmail')!.value;
    const model: RequestUpdatePatientContactInformationModel = {
      id: this.patientDetails!.id,
      phoneCode:
        reportNotificationType === ReportNotificationTypeEnum.Phone ? phoneCode : null,
      phoneNumber:
        reportNotificationType === ReportNotificationTypeEnum.Phone
          ? patientPhoneNumber
          : null,
      email:
        reportNotificationType === ReportNotificationTypeEnum.Email ? patientEmail : null,
    };

    this.appointmentsService.updatePatientContactInformation(model).subscribe((res) => {
      if (res?.success) {
        // eslint-disable-next-line ngrx/avoid-dispatching-multiple-actions-sequentially
        this.store$.dispatch(
          appointmentActions.appointmentGetByIdAction({
            payload: { id: this.appointmentDetails!.id },
          })
        );
        // eslint-disable-next-line ngrx/avoid-dispatching-multiple-actions-sequentially
        this.store$.dispatch(
          appointmentActions.appointmentsGetPatientDetailsAction({
            payload: { appointmentId: this.appointmentDetails!.id },
          })
        );
        this.handleNextTab.emit();
      }
    });
  }

  private checkActualPatientData(): void {
    const patientPhoneNumber = this.formGroup.get('patientPhoneNumber')!.value;
    const phoneCode = this.formGroup.get('phoneCode')!.value;
    const patientEmail = this.formGroup.get('patientEmail')!.value;

    const { phoneCode: oldPhoneCode, phoneNumber: oldPatientPhoneNumber } =
      this.getPhoneCodeAndNumber(this.patientDetails?.phoneNumber);

    const oldPatientEmail = this.patientDetails?.email;

    if (oldPatientEmail !== patientEmail && patientEmail) {
      this.confirmChangeUserPhoneNumberOrEmail({ isEmail: true });
      return;
    }

    if (
      (patientPhoneNumber !== oldPatientPhoneNumber || phoneCode !== oldPhoneCode) &&
      patientPhoneNumber
    ) {
      this.confirmChangeUserPhoneNumberOrEmail({ isEmail: false });
      return;
    }

    this.updateAppointmentDetails({ isUpdatePatientData: false });
  }

  private updateAppointmentDetails({}: { isUpdatePatientData: boolean }): void {
    const patientPhoneNumber = this.formGroup.get('patientPhoneNumber')!.value;
    const phoneCode = this.formGroup.get('phoneCode')!.value;
    const patientEmail = this.formGroup.get('patientEmail')!.value;

    const model: RequestUpdateAppointmentDetailsModel = {
      appointmentId: this.appointmentDetails!.id,
      consentType: this.formGroup.get('consentType')!.value,
      reportNotificationType: this.formGroup.get('reportNotificationType')!.value,
      patientPhoneNumber: patientPhoneNumber,
      phoneCode: phoneCode,
      patientEmail: patientEmail,
    };
    this.handleNextTab.emit();

    this.store$.dispatch(
      appointmentActions.appointmentUpdateDetailsAction({ payload: model })
    );
  }

  private subscriptionsOnChangesForm(): void {
    this.subscriptions$.add(
      this.formGroup.get('patientEmail')?.valueChanges.subscribe((value: string) => {
        this.formGroup
          .get('patientEmail')
          ?.setValue(value?.toLocaleLowerCase(), { emitEvent: false });
      })
    );

    this.subscriptions$.add(
      this.subscriptions$.add(
        this.formGroup
          .get('reportNotificationType')
          ?.valueChanges.subscribe(
            (reportNotificationType: ReportNotificationTypeEnum) => {
              if (reportNotificationType === ReportNotificationTypeEnum.Phone) {
                if (this.patientDetails?.phoneNumber) {
                  const { phoneCode: oldPhoneCode, phoneNumber: oldPatientPhoneNumber } =
                    this.getPhoneCodeAndNumber(this.patientDetails?.phoneNumber);
                  this.formGroup
                    .get('patientPhoneNumber')
                    ?.setValue(oldPatientPhoneNumber);
                  this.formGroup.get('phoneCode')?.setValue(oldPhoneCode);
                }
                this.formGroup
                  .get('patientPhoneNumber')
                  ?.setValidators([
                    Validators.required,
                    Validators.min(100000000),
                    Validators.max(9999999999),
                    Validators.pattern('^[0-9]*$'),
                  ]);
                this.formGroup.get('patientEmail')?.setValidators(null);
              }

              if (reportNotificationType === ReportNotificationTypeEnum.Email) {
                if (this.patientDetails?.email) {
                  this.formGroup.get('patientEmail')?.setValue(this.patientDetails.email);
                }

                this.formGroup
                  .get('patientEmail')
                  ?.setValidators([
                    Validators.required,
                    Validators.pattern(PatternsConstants.PATTERN_EMAIL),
                  ]);
                this.formGroup.get('patientPhoneNumber')?.setValidators(null);
              }

              this.changeDetection.detectChanges();
            }
          )
      )
    );
  }

  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }
}
