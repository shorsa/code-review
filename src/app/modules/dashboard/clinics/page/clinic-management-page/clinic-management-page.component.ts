import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NzSelectOptionInterface } from 'ng-zorro-antd/select';
import { NgxPermissionsService } from 'ngx-permissions';
import { Observable, Subscription, filter } from 'rxjs';
import { selectIsLoading } from 'src/app/app-store/app-state/app-state.selectors';
import { CommonConstants, RoutesConstants } from 'src/app/core/constants';
import { ClinicianService } from 'src/app/core/services/clinician.service';
import { LocationService } from 'src/app/core/services/location.service';
import { RoomsService } from 'src/app/core/services/rooms.service';
import { SitesService } from 'src/app/core/services/sites.service';
import { fadeDownInput } from 'src/app/shared/animation/animated-ngif-fade-down-input';
import {
  DaysOfWeekEnum,
  IsActiveFilterEnum,
  PermissionClaimsEnum,
  RecurrenceTypeEnum,
} from 'src/app/shared/enums';
import { getDateTimeWithCurrentTimezone, markAsDirtyForm } from 'src/app/shared/helpers';
import { RequestGetClinicianListModel } from '../../../clinician/models';
import {
  RequestGetLocationListModel,
  RequestGetRoomListModel,
  RequestGetSiteListModel,
} from '../../../locations/models';
import {
  RequestCreateClinicModel,
  RequestUpdateClinicModel,
  ResponseClinicByIdItem,
} from '../../models';
import * as clinicActions from '../../store/clinics.actions';
import * as clinicSelectors from '../../store/clinics.selectors';

@Component({
  selector: 'app-clinic-management-page',
  templateUrl: './clinic-management-page.component.html',
  styleUrls: ['./clinic-management-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeDownInput],
})
export class ClinicManagementPageComponent implements OnInit, OnDestroy {
  readonly recurrenceTypeDaily = RecurrenceTypeEnum.Daily;
  readonly recurrenceTypeWeekly = RecurrenceTypeEnum.Weekly;
  readonly recurrenceTypeCustom = RecurrenceTypeEnum.Custom;
  private subscriptions$: Subscription = new Subscription();

  isLoading$?: Observable<boolean>;
  formGroup!: FormGroup;
  wasAttemptToSubmitForm: boolean = false;
  clinicDetails?: ResponseClinicByIdItem;
  clinicId?: string;
  viewMode: boolean = false;

  departmentListOptions: NzSelectOptionInterface[] = [];
  clinicianListOptions: NzSelectOptionInterface[] = [];
  clinicTypeListOptions: NzSelectOptionInterface[] =
    CommonConstants.clinicTypeListOptions;
  locationListOptions: NzSelectOptionInterface[] = [];
  siteListOptions: NzSelectOptionInterface[] = [];
  roomListOptions: NzSelectOptionInterface[] = [];
  defaultAppointmentLengthListOptions: NzSelectOptionInterface[] =
    CommonConstants.defaultAppointmentLengthListOptions;
  recurrenceListOptions: NzSelectOptionInterface[] =
    CommonConstants.recurrenceListOptions;

  disabledStartTimeMinutes?: number[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private readonly locationService: LocationService,
    private readonly siteService: SitesService,
    private readonly roomsService: RoomsService,
    private readonly clinicianService: ClinicianService,
    private changeDetection: ChangeDetectorRef,
    private store$: Store,
    private router: Router,
    private ngxPermissionsService: NgxPermissionsService
  ) {
    this.buildForm();
  }

  get getRecurrenceType(): RecurrenceTypeEnum {
    return this.formGroup.get('recurenceType')?.value ?? RecurrenceTypeEnum.None;
  }

  ngOnInit() {
    this.initializationSelects();

    this.activatedRoute.queryParams.pipe(filter((val) => !!val)).subscribe((params) => {
      this.clinicId = params[CommonConstants.QUERY_ID];
      if (this.clinicId) {
        this.getClinicById();
      }
    });
  }

  changeEnds(
    value: Pick<RequestCreateClinicModel, 'endsAfterCount' | 'endsOnDate'>
  ): void {
    (Object.keys(value) as ['endsAfterCount' | 'endsOnDate']).forEach((key) => {
      this.formGroup.get(key)?.setValue(value[key]);
    });
  }

  changeRepeatDays(value: DaysOfWeekEnum[]): void {
    this.formGroup.get('customDaysOfWeek')?.setValue(value);
  }

  changeCustomDays(value: Date[]): void {
    this.formGroup.get('customDates')?.setValue(value);
  }

  getDisabledHours(): number[] {
    const startTime = this.formGroup.get('startTime')?.value;
    const appointmentLength = this.formGroup.get('appointmentLengthInMinutes')?.value;

    if (!startTime) return [];
    const currentHour = startTime.getHours();
    const currentMinutes = startTime.getMinutes();

    if (currentMinutes + appointmentLength < 60) {
      return Array.from({ length: 24 })
        .map((_, index) => index)
        .filter((hour) => hour <= currentHour - 1);
    }

    return Array.from({ length: 24 })
      .map((_, index) => index)
      .filter((hour) => hour <= currentHour);
  }

  getAvailableMinutesForHour(
    startHour: number,
    startMinute: number,
    duration: number,
    currentHour: number
  ): number[] {
    const result: number[] = [];
    let availableMinute = startMinute + duration;

    while (availableMinute < 60) {
      if (currentHour > startHour || availableMinute > startMinute) {
        result.push(availableMinute);
      }
      availableMinute += duration;
    }

    return result;
  }

  onCalculateDisabledMinutes(hour: number): number[] {
    if (!hour) return Array.from({ length: 60 }, (_, index) => index);
    const startTime = this.formGroup.get('startTime')?.value;
    const appointmentLength = this.formGroup.get('appointmentLengthInMinutes')?.value;

    const startTotalMinutes = startTime.getHours() * 60 + startTime.getMinutes();
    const allMinutes = Array.from({ length: 60 }, (_, index) => index);

    return allMinutes.filter((minute) => {
      const currentTotalMinutes = hour * 60 + minute;
      const difference = currentTotalMinutes - startTotalMinutes;
      return difference % appointmentLength !== 0;
    });
  }

  disabledDate(current: Date): boolean {
    return current.getTime() < new Date().setHours(0, 0, 0, 0);
  }

  searchLocationOptions(searchText?: string): void {
    const model: RequestGetLocationListModel = {
      pageSize: 30,
      pageIndex: 0,
      searchText: searchText,
      isActiveFilter: IsActiveFilterEnum.Active,
    };

    this.locationService.getAll(model).subscribe((res) => {
      if (!res) return;
      this.locationListOptions = res.locations.map((item) => ({
        label: item.name,
        value: item.id,
      }));

      this.changeDetection.detectChanges();
    });
  }

  searchSiteOptions(searchText?: string): void {
    const locationId = this.formGroup.get('locationId')?.value;

    if (!locationId) return;

    const model: RequestGetSiteListModel = {
      pageSize: 30,
      pageIndex: 0,
      searchText: searchText,
      locationId,
      isActiveFilter: IsActiveFilterEnum.Active,
    };

    this.siteService.getAll(model).subscribe((res) => {
      if (!res) return;
      this.siteListOptions = res.sites.map((item) => ({
        label: item.name,
        value: item.id,
      }));
      this.changeDetection.detectChanges();
    });
  }

  searchRoomOptions(searchText?: string): void {
    const siteId = this.formGroup.get('siteId')?.value;
    if (!siteId) return;

    const model: RequestGetRoomListModel = {
      pageSize: 30,
      pageIndex: 0,
      searchText: searchText,
      siteId,
      isActiveFilter: IsActiveFilterEnum.Active,
    };

    this.roomsService.getAll(model).subscribe((res) => {
      if (!res) return;
      this.roomListOptions = res.rooms.map((item) => ({
        label: item.name,
        value: item.id,
      }));
      this.changeDetection.detectChanges();
    });
  }

  searchClinicianOptions(searchText?: string): void {
    const model: RequestGetClinicianListModel = {
      pageSize: 30,
      pageIndex: 0,
      searchText,
      isActiveFilter: IsActiveFilterEnum.Active,
    };

    this.clinicianService.getAll(model).subscribe((res) => {
      if (!res) return;
      this.clinicianListOptions = res.clinicians.map((item) => ({
        label: `${item.applicationUser.firstName} ${item.applicationUser.lastName}`,
        value: item.id,
      }));
      this.changeDetection.detectChanges();
    });
  }

  cancel(): void {
    this.router.navigate([
      RoutesConstants.DASHBOARD_INDEX,
      RoutesConstants.DASHBOARD_CLINICS,
    ]);
  }

  submitForm(): void {
    this.wasAttemptToSubmitForm = true;
    markAsDirtyForm(this.formGroup);

    if (this.formGroup.invalid) return;

    if (this.clinicDetails) {
      this.updateClinician();
    } else {
      this.createClinician();
    }
  }

  private buildForm(): void {
    this.formGroup = this.formBuilder.group({
      startDate: [{ value: null, disabled: false }],
      startTime: [{ value: null, disabled: true }, [Validators.required]],
      endTime: [{ value: null, disabled: true }, [Validators.required]],
      roomId: [{ value: null, disabled: true }, [Validators.required]],
      siteId: [{ value: null, disabled: true }, [Validators.required]],
      locationId: [{ value: null, disabled: false }, [Validators.required]],
      clinicianId: [{ value: null, disabled: false }, [Validators.required]],
      clinicType: [{ value: null, disabled: false }, [Validators.required]],
      appointmentLengthInMinutes: [null],
      recurenceType: [RecurrenceTypeEnum.Custom],
      customDaysOfWeek: [null],
      endsAfterCount: [null],
      endsOnDate: [null],
      customDates: [null],
    });

    this.subscriptionsOnChangesForm();
  }

  private checkPermissionForEdit(): void {
    const isDisableForm = !this.ngxPermissionsService.getPermission(
      PermissionClaimsEnum.ClinicUpdate
    );
    if (isDisableForm) {
      this.formGroup.disable({ emitEvent: false });
      this.viewMode = true;
    }
    this.changeDetection.detectChanges();
  }

  private subscriptionsOnChangesForm(): void {
    this.subscriptions$.add(
      this.formGroup.get('locationId')?.valueChanges.subscribe((value) => {
        if (!value) {
          this.formGroup.get('siteId')?.setValue(null);
          this.formGroup.get('siteId')?.disable();

          this.formGroup.get('roomId')?.setValue(null);
          this.formGroup.get('roomId')?.disable();
        } else {
          this.formGroup.get('siteId')?.setValue(null);
          this.formGroup.get('siteId')?.enable();
          this.formGroup.get('roomId')?.setValue(null);
          this.searchSiteOptions();
        }
        this.siteListOptions = [];
        this.roomListOptions = [];
      })
    );

    this.subscriptions$.add(
      this.formGroup
        .get('appointmentLengthInMinutes')
        ?.valueChanges.subscribe((value) => {
          if (!value) {
            this.formGroup.get('startTime')?.disable();
          } else {
            this.formGroup.get('startTime')?.enable();
          }
          this.formGroup.get('startTime')?.setValue(null);
          this.formGroup.get('startTime')?.updateValueAndValidity();
        })
    );

    this.subscriptions$.add(
      this.formGroup.get('startTime')?.valueChanges.subscribe((value) => {
        if (!value) {
          this.formGroup.get('endTime')?.disable();
        } else {
          this.formGroup.get('endTime')?.enable();
        }
        this.formGroup.get('endTime')?.setValue(null);
        this.formGroup.get('endTime')?.updateValueAndValidity();
      })
    );

    this.subscriptions$.add(
      this.formGroup.get('siteId')?.valueChanges.subscribe((value) => {
        if (!value) {
          this.formGroup.get('roomId')?.setValue(null);
          this.formGroup.get('roomId')?.disable();
        } else {
          this.formGroup.get('roomId')?.setValue(null);
          this.formGroup.get('roomId')?.enable();

          this.searchRoomOptions();
        }
        this.roomListOptions = [];
      })
    );

    this.subscriptions$.add(
      this.formGroup.get('recurenceType')?.valueChanges.subscribe((value) => {
        if (value === RecurrenceTypeEnum.Daily) {
          this.formGroup.get('customDaysOfWeek')?.setValue(null);
          this.formGroup.get('endsAfterCount')?.setValue(null);
          this.formGroup.get('customDates')?.setValue([]);
          this.formGroup.get('startDate')?.setValue(null);
          this.formGroup.get('startDate')?.setValidators(null);
        }
        if (value === RecurrenceTypeEnum.Weekly) {
          this.formGroup.get('customDates')?.setValue([]);
          this.formGroup.get('endsOnDate')?.setValue(null);
          this.formGroup.get('startDate')?.setValidators(Validators.required);
        }
        if (value === RecurrenceTypeEnum.Custom) {
          this.formGroup.get('customDaysOfWeek')?.setValue(null);
          this.formGroup.get('endsAfterCount')?.setValue(null);
          this.formGroup.get('endsOnDate')?.setValue(null);
          this.formGroup.get('startDate')?.setValue(null);
          this.formGroup.get('startDate')?.setValidators(null);
        }
      })
    );
  }

  private initializationSelects(): void {
    this.isLoading$ = this.store$.select(selectIsLoading);

    this.subscriptions$.add(
      this.store$
        .select(clinicSelectors.selectClinicDetails)
        .pipe(filter((val) => val !== undefined))
        .subscribe((data) => {
          if (!data) return;
          this.clinicDetails = data;

          this.setPathValue(data);
        })
    );
  }

  private isRecurrence(recurenceType: RecurrenceTypeEnum): boolean {
    return [
      RecurrenceTypeEnum.Daily,
      RecurrenceTypeEnum.Weekly,
      RecurrenceTypeEnum.Custom,
    ].includes(recurenceType);
  }

  private setPathValue(data: ResponseClinicByIdItem): void {
    this.formGroup.get('startDate')?.setValue(data.startDate);

    this.formGroup.get('clinicianId')?.setValue(data.clinician.id);

    this.formGroup
      .get('locationId')
      ?.setValue(data.room.site.locationId, { emitEvent: false });
    this.formGroup.get('locationId')?.enable({ emitEvent: false });

    this.formGroup.get('siteId')?.setValue(data.room.siteId, { emitEvent: false });
    this.formGroup.get('siteId')?.enable({ emitEvent: false });

    this.formGroup.get('roomId')?.setValue(data.room.id, { emitEvent: false });
    this.formGroup.get('roomId')?.enable({ emitEvent: false });

    this.formGroup.get('clinicType')?.setValue(data.clinicType);
    this.formGroup.get('isRecurrence')?.setValue(this.isRecurrence(data.recurenceType));
    this.formGroup
      .get('appointmentLengthInMinutes')
      ?.setValue(data.appointmentLengthInMinutes);
    this.formGroup.get('recurenceType')?.setValue(data.recurenceType);
    this.formGroup;
    this.formGroup.get('customDaysOfWeek')?.setValue(data.customDaysOfWeek);
    this.formGroup.get('endsAfterCount')?.setValue(data.endsAfterCount);
    this.formGroup.get('endsOnDate')?.setValue(data.endsOnDate);
    this.formGroup.get('customDates')?.setValue(data.customDates);

    const startTime = new Date();
    startTime.setHours(data.startTimeHour);
    startTime.setMinutes(data.startTimeMinute);
    this.formGroup.get('startTime')?.setValue(startTime);

    const endTime = new Date();
    endTime.setHours(data.endTimeHour);
    endTime.setMinutes(data.endTimeMinute);
    this.formGroup.get('endTime')?.setValue(endTime, { emitEvent: false });

    this.searchClinicianOptions(data.clinician?.applicationUser?.lastName);
    this.searchLocationOptions(data.room.site.location.name);
    this.searchSiteOptions(data.room.site.name);
    this.searchRoomOptions(data.room.name);

    this.checkPermissionForEdit();
  }

  private getClinicById(): void {
    this.store$.dispatch(
      clinicActions.clinicGetByIdAction({ payload: { id: this.clinicId! } })
    );
  }

  private updateClinician(): void {
    const model: RequestUpdateClinicModel = {
      id: this.clinicDetails!.id,
      startDate: getDateTimeWithCurrentTimezone(
        this.formGroup.value?.startDate
      ) as string,
      startTimeHour: (
        getDateTimeWithCurrentTimezone(this.formGroup.value.startTime, true)! as Date
      ).getUTCHours(),
      startTimeMinute: (
        getDateTimeWithCurrentTimezone(this.formGroup.value.startTime, true)! as Date
      ).getMinutes(),
      endTimeHour: (
        getDateTimeWithCurrentTimezone(this.formGroup.value.endTime, true)! as Date
      ).getUTCHours(),
      endTimeMinute: (
        getDateTimeWithCurrentTimezone(this.formGroup.value.endTime, true)! as Date
      ).getMinutes(),
      roomId: this.formGroup.value.roomId,
      clinicianId: this.formGroup.value.clinicianId,
      clinicType: this.formGroup.value.clinicType,
      appointmentLengthInMinutes: this.formGroup.value.appointmentLengthInMinutes,
      recurenceType: this.formGroup.value.recurenceType ?? RecurrenceTypeEnum.None,
      customDaysOfWeek: this.formGroup.value.customDaysOfWeek?.length
        ? this.formGroup.value.customDaysOfWeek
        : null,
      endsAfterCount: this.formGroup.value.endsAfterCount,
      endsOnDate: this.formGroup.value.endsOnDate,
      customDates: this.formGroup.value.customDates,
    };
    this.store$.dispatch(clinicActions.clinicUpdateAction({ payload: model }));
  }

  private createClinician(): void {
    const model: RequestCreateClinicModel = {
      startDate: getDateTimeWithCurrentTimezone(
        this.formGroup.value?.startDate
      ) as string,
      startTimeHour: (
        getDateTimeWithCurrentTimezone(this.formGroup.value.startTime, true)! as Date
      ).getUTCHours(),
      startTimeMinute: (
        getDateTimeWithCurrentTimezone(this.formGroup.value.startTime, true)! as Date
      ).getMinutes(),
      endTimeHour: (
        getDateTimeWithCurrentTimezone(this.formGroup.value.endTime, true)! as Date
      ).getUTCHours(),
      endTimeMinute: (
        getDateTimeWithCurrentTimezone(this.formGroup.value.endTime, true)! as Date
      ).getMinutes(),
      roomId: this.formGroup.value.roomId,
      clinicianId: this.formGroup.value.clinicianId,
      clinicType: this.formGroup.value.clinicType,
      appointmentLengthInMinutes: this.formGroup.value.appointmentLengthInMinutes,
      recurenceType: this.formGroup.value.recurenceType ?? RecurrenceTypeEnum.None,
      customDaysOfWeek: this.formGroup.value.customDaysOfWeek?.length
        ? this.formGroup.value.customDaysOfWeek
        : null,
      endsAfterCount: this.formGroup.value.endsAfterCount,
      endsOnDate: this.formGroup.value.endsOnDate,
      customDates: this.formGroup.value.customDates,
    };

    this.store$.dispatch(clinicActions.clinicCreateAction({ payload: model }));
  }

  ngOnDestroy(): void {
    this.store$.dispatch(clinicActions.clearClinicDetailsDataAction());
    this.subscriptions$.unsubscribe();
  }
}
