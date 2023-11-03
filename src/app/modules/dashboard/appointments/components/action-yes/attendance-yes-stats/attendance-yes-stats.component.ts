import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NzSelectOptionInterface } from 'ng-zorro-antd/select';
import { Observable, Subscription, filter } from 'rxjs';
import { errorAction } from 'src/app/app-store/app-state/app-state.actions';
import { selectIsLoading } from 'src/app/app-store/app-state/app-state.selectors';
import { CommonConstants, RoutesConstants } from 'src/app/core/constants';
import { StatsService } from 'src/app/core/services/stats.service';
import { AppointmentStatTypeEnum } from 'src/app/modules/dashboard/stats/enums';
import { RequestGetAppointmentStatsListModel } from 'src/app/modules/dashboard/stats/models';
import { IsActiveFilterEnum } from 'src/app/shared/enums';
import { markAsDirtyForm } from 'src/app/shared/helpers';
import {
  RequestUpdateAppointmentSettingsModel,
  ResponseGetAppointmentByIdModel,
} from '../../../models';
import * as appointmentActions from '../../../store/appointments.actions';
import * as appointmentSelectors from '../../../store/appointments.selectors';

@Component({
  selector: 'app-attendance-yes-stats',
  templateUrl: './attendance-yes-stats.component.html',
  styleUrls: ['./attendance-yes-stats.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AttendanceYesStatsComponent implements OnInit {
  @Input() appointmentId!: string;

  @Output() handleNextTab = new EventEmitter();
  @Output() handlePrevTab = new EventEmitter();

  private subscriptions$: Subscription = new Subscription();
  private defaultSearchParams: Omit<
    RequestGetAppointmentStatsListModel,
    'appointmentSettingType'
  > = {
    pageSize: CommonConstants.PAGE_SIZE_OPTIONS[2],
    pageIndex: 0,
    isActiveFilter: IsActiveFilterEnum.Active,
  };

  readonly consentTypeListOptions = CommonConstants.consentTypeListOptions;

  isLoading$?: Observable<boolean>;
  wasAttemptToSubmitForm: boolean = false;
  formGroup!: FormGroup;
  appointmentDetails!: ResponseGetAppointmentByIdModel;
  statsRequired: boolean = true;

  primaryMedicalConditionListOptions: NzSelectOptionInterface[] = [];
  fitnessForWorkListOptions: NzSelectOptionInterface[] = [];
  returnToWorkListOptions: NzSelectOptionInterface[] = [];
  disabilityRelatedListOptions: NzSelectOptionInterface[] = [];
  workRelatedListOptions: NzSelectOptionInterface[] = [];

  constructor(
    private fromBuilder: FormBuilder,
    private store$: Store,
    private router: Router,
    private readonly settingsService: StatsService,
    private changeDetection: ChangeDetectorRef
  ) {
    this.buildForm();
  }

  ngOnInit() {
    this.initializationSelects();
    this.searchPrimaryMedicalCondition();
    this.searchFitnessForWork();
    this.searchReturnToWork();
    this.searchDisabilityRelated();
    this.searchWorkRelated();
  }

  private buildForm(): void {
    this.formGroup = this.fromBuilder.group({
      primaryMedicalCondition: [null, Validators.required],
      disabilityRelated: [null, Validators.required],
      fitnessForWork: [null, Validators.required],
      workRelated: [null, Validators.required],
      returnWork: [null, Validators.required],
    });
  }

  searchPrimaryMedicalCondition(searchText?: string): void {
    const model: RequestGetAppointmentStatsListModel = {
      ...this.defaultSearchParams,
      searchText,
      appointmentSettingType: AppointmentStatTypeEnum.PrimaryMedicalCondition,
    };
    this.settingsService.getAll(model).subscribe({
      next: (val) => {
        this.primaryMedicalConditionListOptions = val.appointmentSettings.map((item) => ({
          value: item.id,
          label: item.name,
        }));
        this.changeDetection.detectChanges();
      },
      error: (error) => {
        this.store$.dispatch(errorAction({ payload: { error, isApiError: true } }));
      },
    });
  }

  searchFitnessForWork(searchText?: string): void {
    const model: RequestGetAppointmentStatsListModel = {
      ...this.defaultSearchParams,
      searchText,
      appointmentSettingType: AppointmentStatTypeEnum.FitnessForWork,
    };
    this.settingsService.getAll(model).subscribe({
      next: (val) => {
        this.fitnessForWorkListOptions = val.appointmentSettings.map((item) => ({
          value: item.id,
          label: item.name,
        }));
        this.changeDetection.detectChanges();
      },
      error: (error) => {
        this.store$.dispatch(errorAction({ payload: { error, isApiError: true } }));
      },
    });
  }

  searchReturnToWork(searchText?: string): void {
    const model: RequestGetAppointmentStatsListModel = {
      ...this.defaultSearchParams,
      searchText,
      appointmentSettingType: AppointmentStatTypeEnum.ReturnToWork,
    };
    this.settingsService.getAll(model).subscribe({
      next: (val) => {
        this.returnToWorkListOptions = val.appointmentSettings.map((item) => ({
          value: item.id,
          label: item.name,
        }));
        this.changeDetection.detectChanges();
      },
      error: (error) => {
        this.store$.dispatch(errorAction({ payload: { error, isApiError: true } }));
      },
    });
  }

  searchDisabilityRelated(searchText?: string): void {
    const model: RequestGetAppointmentStatsListModel = {
      ...this.defaultSearchParams,
      searchText,
      appointmentSettingType: AppointmentStatTypeEnum.DisabilityRelated,
    };
    this.settingsService.getAll(model).subscribe({
      next: (val) => {
        this.disabilityRelatedListOptions = val.appointmentSettings.map((item) => ({
          value: item.id,
          label: item.name,
        }));
        this.changeDetection.detectChanges();
      },
      error: (error) => {
        this.store$.dispatch(errorAction({ payload: { error, isApiError: true } }));
      },
    });
  }

  searchWorkRelated(searchText?: string): void {
    const model: RequestGetAppointmentStatsListModel = {
      ...this.defaultSearchParams,
      searchText,
      appointmentSettingType: AppointmentStatTypeEnum.WorkRelated,
    };
    this.settingsService.getAll(model).subscribe({
      next: (val) => {
        this.workRelatedListOptions = val.appointmentSettings.map((item) => ({
          value: item.id,
          label: item.name,
        }));
        this.changeDetection.detectChanges();
      },
      error: (error) => {
        this.store$.dispatch(errorAction({ payload: { error, isApiError: true } }));
      },
    });
  }

  private initializationSelects(): void {
    this.isLoading$ = this.store$.select(selectIsLoading);

    this.subscriptions$.add(
      this.store$
        .select(appointmentSelectors.selectAppointmentDetails)
        .pipe(filter((val) => !!val))
        .subscribe((data) => {
          this.appointmentDetails = data!;
          this.setFormValue(data!);
        })
    );
  }

  private setFormValue(data: ResponseGetAppointmentByIdModel): void {
    const primaryMedicalCondition = data.appointmentSettingToAppointments.find(
      (item) =>
        item.appointmentSetting.appointmentSettingsType ===
        AppointmentStatTypeEnum.PrimaryMedicalCondition
    );
    const fitnessForWork = data.appointmentSettingToAppointments.find(
      (item) =>
        item.appointmentSetting.appointmentSettingsType ===
        AppointmentStatTypeEnum.FitnessForWork
    );
    const returnToWork = data.appointmentSettingToAppointments.find(
      (item) =>
        item.appointmentSetting.appointmentSettingsType ===
        AppointmentStatTypeEnum.ReturnToWork
    );
    const disabilityRelated = data.appointmentSettingToAppointments.find(
      (item) =>
        item.appointmentSetting.appointmentSettingsType ===
        AppointmentStatTypeEnum.DisabilityRelated
    );
    const workRelated = data.appointmentSettingToAppointments.find(
      (item) =>
        item.appointmentSetting.appointmentSettingsType ===
        AppointmentStatTypeEnum.WorkRelated
    );

    this.formGroup
      .get('primaryMedicalCondition')
      ?.setValue(primaryMedicalCondition?.appointmentSetting.id);
    this.formGroup
      .get('disabilityRelated')
      ?.setValue(disabilityRelated?.appointmentSetting.id);
    this.formGroup.get('fitnessForWork')?.setValue(fitnessForWork?.appointmentSetting.id);
    this.formGroup.get('workRelated')?.setValue(workRelated?.appointmentSetting.id);
    this.formGroup.get('returnWork')?.setValue(returnToWork?.appointmentSetting.id);

    if (!data.statsRequired) {
      this.statsRequired = false;
      this.formGroup.get('primaryMedicalCondition')?.setValidators(null);
      this.formGroup.get('disabilityRelated')?.setValidators(null);
      this.formGroup.get('fitnessForWork')?.setValidators(null);
      this.formGroup.get('workRelated')?.setValidators(null);
      this.formGroup.get('returnWork')?.setValidators(null);
      this.formGroup.updateValueAndValidity();
    }

    this.changeDetection.detectChanges();
  }

  private updateAppointmentSettings(): void {
    const appointmentSettings: string[] = Object.keys(this.formGroup.value).map(
      (key) => this.formGroup.value[key]
    );

    const model: RequestUpdateAppointmentSettingsModel = {
      appointmentId: this.appointmentId,
      appointmentSettings,
    };

    this.store$.dispatch(
      appointmentActions.appointmentUpdateStatsAction({ payload: model })
    );

    this.handleNextTab.emit();
  }

  handleSubmitForm(): void {
    this.wasAttemptToSubmitForm = true;
    markAsDirtyForm(this.formGroup);

    if (this.formGroup.invalid) return;

    this.updateAppointmentSettings();
  }

  handlePrev(): void {
    this.handlePrevTab.emit();
  }
}
