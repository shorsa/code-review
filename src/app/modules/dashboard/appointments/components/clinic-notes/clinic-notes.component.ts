import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Observable, Subscription, filter } from 'rxjs';
import { selectIsLoading } from 'src/app/app-store/app-state/app-state.selectors';
import { RoutesConstants } from 'src/app/core/constants';
import { fadeDownInput } from 'src/app/shared/animation/animated-ngif-fade-down-input';
import { markAsDirtyForm } from 'src/app/shared/helpers';
import { AppointmentModel, AppointmentNoteModel } from 'src/app/shared/models';
import { AddictionTimeEnum, AppointmentStatusEnum } from '../../enums';
import {
  RequestUpdateAppointmentModel,
  ResponseGetAppointmentByIdModel,
  ResponseGetPatientDetailsByAppointmentIdModel,
} from '../../models';
import * as appointmentActions from '../../store/appointments.actions';
import * as appointmentsSelectors from '../../store/appointments.selectors';
import { ConfirmAttendanceModalComponent } from '../confirm-attendance-modal/confirm-attendance-modal.component';
import { clone } from 'lodash';
import { UserPermissionsProvider } from 'src/app/shared/providers/user-permissions.provider';

@Component({
  selector: 'app-clinic-notes',
  templateUrl: './clinic-notes.component.html',
  styleUrls: ['./clinic-notes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeDownInput],
})
export class ClinicNotesComponent implements OnInit, OnDestroy {
  @ViewChild('addNote') addNoteEl!: ElementRef<HTMLTextAreaElement>;

  @Input() appointmentId!: string;
  @Input() isViewMode?: boolean;

  private subscriptions$: Subscription = new Subscription();

  readonly addictionTimeNone = AddictionTimeEnum.None;
  readonly addictionTimeDay = AddictionTimeEnum.Day;
  readonly addictionTimeNight = AddictionTimeEnum.Night;
  readonly addictionTimeBoth = AddictionTimeEnum.Both;

  isLoading$?: Observable<boolean>;
  formGroup!: FormGroup;
  patientDetails?: ResponseGetPatientDetailsByAppointmentIdModel;
  appointmentDetails?: ResponseGetAppointmentByIdModel;
  wasAttemptToSubmitForm: boolean = false;
  patientYearsOld?: string;
  previousNotes: AppointmentNoteModel[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private changeDetection: ChangeDetectorRef,
    private store$: Store,
    private router: Router,
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef,
    private readonly userPermissionsProvider: UserPermissionsProvider
  ) {
    this.buildForm();
  }

  get isClinicianRole(): boolean {
    return this.userPermissionsProvider.isClinician;
  }

  get getIsShowAttendanceModel(): boolean {
    if (!this.appointmentDetails) return true;

    return [AppointmentStatusEnum.Booked].includes(this.appointmentDetails.status);
  }

  ngOnInit(): void {
    this.initializationSelects();

    this.store$.dispatch(
      appointmentActions.appointmentGetByIdAction({
        payload: { id: this.appointmentId },
      })
    );
  }

  handleAddNewNote(): void {
    if (!this.addNoteEl.nativeElement.value) {
      return;
    }

    this.previousNotes.push({
      details: this.addNoteEl.nativeElement.value,
      id: undefined,
      appointmentId: this.appointmentId ?? null,
    });

    this.addNoteEl.nativeElement.value = '';
  }

  navigateToAppointmentsTable(): void {
    this.router.navigate([
      RoutesConstants.DASHBOARD_INDEX,
      RoutesConstants.DASHBOARD_APPOINTMENTS,
    ]);
  }

  handleSubmitForm(): void {
    this.wasAttemptToSubmitForm = true;
    markAsDirtyForm(this.formGroup);

    if (this.formGroup.invalid) return;

    if (this.appointmentDetails) {
      this.updateClinicNote();
    }

    if (this.isClinicianRole && this.getIsShowAttendanceModel) {
      this.showConfirmAttendanceModal();
    }
  }

  private showConfirmAttendanceModal(): void {
    this.modal.create<ConfirmAttendanceModalComponent, any>({
      nzTitle: 'Appointment',
      nzWidth: '382px',
      nzMaskClosable: false,
      nzContent: ConfirmAttendanceModalComponent,
      nzData: {
        appointmentId: this.appointmentId,
      },
      nzViewContainerRef: this.viewContainerRef,
      nzFooter: null,
    });
  }

  private updateClinicNote(): void {
    const model: RequestUpdateAppointmentModel = {
      id: this.appointmentDetails!.id,
      timeInPost: this.formGroup.value.timeInPost,
      timeWithEmployer: this.formGroup.value.timeWithEmployer,
      hoursPerWeek: this.formGroup.value.hoursPerWeek,
      shifts: this.formGroup.value.shifts,
      isAtWork: this.formGroup.value.isAtWork,
      dateAbsenceCommenced: this.formGroup.value.dateAbsenceCommenced,
      relevantMedicalHistory: this.formGroup.value.relevantMedicalHistory,
      pastMedicalHealth: this.formGroup.value.pastMedicalHealth,
      medication: this.formGroup.value.medication,
      socialWelfare: this.formGroup.value.socialWelfare,
      smoker: this.formGroup.value.smoker,
      alcohol: this.formGroup.value.alcohol,
      drugs: this.formGroup.value.drugs,
      notes: this.previousNotes,
    };

    this.store$.dispatch(appointmentActions.appointmentUpdateAction({ payload: model }));
  }

  private buildForm(): void {
    this.formGroup = this.formBuilder.group({
      timeInPost: [{ value: null, disabled: false }, [Validators.required]],
      timeWithEmployer: [{ value: null, disabled: false }, [Validators.required]],
      hoursPerWeek: [{ value: null, disabled: false }, [Validators.required]],
      shifts: [{ value: AddictionTimeEnum.None, disabled: false }, [Validators.required]],
      isAtWork: [{ value: true, disabled: false }, [Validators.required]],
      dateAbsenceCommenced: [{ value: null, disabled: false }],
      relevantMedicalHistory: [{ value: null, disabled: false }, [Validators.required]],
      pastMedicalHealth: [{ value: null, disabled: false }, [Validators.required]],
      medication: [{ value: null, disabled: false }, [Validators.required]],
      socialWelfare: [{ value: null, disabled: false }, [Validators.required]],
      smoker: [AddictionTimeEnum.None],
      alcohol: [AddictionTimeEnum.None],
      drugs: [AddictionTimeEnum.None],
    });

    this.subscriptionsOnChangesForm();
  }

  private subscriptionsOnChangesForm(): void {
    this.subscriptions$.add(
      this.formGroup.get('isAtWork')?.valueChanges.subscribe((isAtWork) => {
        if (!isAtWork) {
          this.formGroup
            .get('dateAbsenceCommenced')
            ?.setValidators([Validators.required]);
        } else {
          this.formGroup.get('dateAbsenceCommenced')?.setValue(null);
          this.formGroup.get('dateAbsenceCommenced')?.setValidators(null);
        }
      })
    );
  }

  private initializationSelects(): void {
    this.isLoading$ = this.store$.select(selectIsLoading);

    this.subscriptions$.add(
      this.store$
        .select(appointmentsSelectors.selectPatientDetails)
        .pipe(filter((val) => !!val))
        .subscribe((data) => {
          this.patientDetails = data;
          this.calculatePatientYearsOld();
          this.changeDetection.detectChanges();
        })
    );

    this.subscriptions$.add(
      this.store$
        .select(appointmentsSelectors.selectAppointmentDetails)
        .pipe(filter((val) => !!val))
        .subscribe((data) => {
          this.appointmentDetails = data;

          this.setFormGroupValue(data!);

          this.changeDetection.detectChanges();
        })
    );
  }

  private setFormGroupValue(data: ResponseGetAppointmentByIdModel): void {
    this.formGroup.patchValue(data);
    this.previousNotes = clone(data.notes) ?? [];

    if (this.isViewMode) {
      this.formGroup.disable();
    }

    this.changeDetection.detectChanges();
  }

  private calculatePatientYearsOld(): void {
    if (!this.patientDetails?.dateOfBirth) return;
    const today = new Date();
    const birthDate = new Date(this.patientDetails?.dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    this.patientYearsOld = `${age}yrs`;
  }

  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }
}
