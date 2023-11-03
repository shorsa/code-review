import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NzSelectOptionInterface } from 'ng-zorro-antd/select';
import { Observable, Subscription } from 'rxjs';
import { errorAction } from 'src/app/app-store/app-state/app-state.actions';
import { CommonConstants, RoutesConstants } from 'src/app/core/constants';
import { ClinicianService } from 'src/app/core/services/clinician.service';
import { ClinicsService } from 'src/app/core/services/clinics.service';
import { LocationService } from 'src/app/core/services/location.service';
import { PatientService } from 'src/app/core/services/patient.service';
import { ProductService } from 'src/app/core/services/product.service';
import { ReferralService } from 'src/app/core/services/referral.service';
import { RoomsService } from 'src/app/core/services/rooms.service';
import { SitesService } from 'src/app/core/services/sites.service';
import { IsActiveFilterEnum, ReferralStatusEnum } from 'src/app/shared/enums';
import { getDateTimeWithCurrentTimezone, markAsDirtyForm } from 'src/app/shared/helpers';
import {
  RequestGetClinicianOptionsModel,
  ResponseGetClinicianOptionsModelItem,
  ResponseGetNearestAvailableClinicianDateResponseModel,
} from '../../../clinician/models';
import {
  RequestGetAvailableAppointmentDatesByMonthModel,
  ResponseAppointmentDateTimeItemModel,
  ResponseGetAvailableAppointmentTimesOnDateModel,
} from '../../../clinics/models';
import {
  RequestGetLocationListModel,
  RequestGetRoomListModel,
  RequestGetSiteListModel,
} from '../../../locations/models';
import {
  RequestGetPatientOptionsModel,
  ResponseGetPatientOptionsModelItem,
} from '../../../patients/models/patients';
import {
  RequestGetProductOptionsModel,
  ResponseGetProductOptionsModelItem,
} from '../../../products/models';
import {
  RequestGetReferralOptionsModel,
  ResponseGetReferralOptionsModelItem,
} from '../../../referral/models';
import { RequestCreateAppointmentModel } from '../../models';
import * as appointmentActions from '../../store/appointments.actions';

@Component({
  selector: 'app-create-new-appointments',
  templateUrl: './create-new-appointments.component.html',
  styleUrls: ['./create-new-appointments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateNewAppointmentsComponent implements OnInit, OnDestroy {
  @ViewChild('datePicker') datePicker?: any;

  private subscriptions$: Subscription = new Subscription();

  isLoading$?: Observable<boolean>;
  wasAttemptToSubmitForm: boolean = false;
  formGroup!: FormGroup;
  readonly appointmentTypesListOptions: NzSelectOptionInterface[] =
    CommonConstants.appointmentTypesListOptions;
  patientListOptions?: ResponseGetPatientOptionsModelItem[];
  productListOptions?: ResponseGetProductOptionsModelItem[];
  clinicianListOptions?: ResponseGetClinicianOptionsModelItem[];
  referralListOptions?: ResponseGetReferralOptionsModelItem[];
  locationListOptions: NzSelectOptionInterface[] = [];
  siteListOptions: NzSelectOptionInterface[] = [];
  roomListOptions: NzSelectOptionInterface[] = [];
  timesListOptions: ResponseAppointmentDateTimeItemModel[] = [];
  nearestAvailableClinicianDate?: string;

  currentDateFilterMonth: number = new Date().getMonth() + 1;
  currentDateFilterYear: number = new Date().getFullYear();
  availableDates?: Date[];

  constructor(
    private router: Router,
    private store$: Store,
    private formBuilder: FormBuilder,
    private readonly productService: ProductService,
    private readonly patientService: PatientService,
    private readonly clinicianService: ClinicianService,
    private readonly referralService: ReferralService,
    private readonly locationService: LocationService,
    private readonly roomsService: RoomsService,
    private readonly sitesService: SitesService,
    private readonly clinicsService: ClinicsService,
    private changeDetector: ChangeDetectorRef,
    private renderer: Renderer2
  ) {
    this.buildForm();
  }

  get getDateControl(): FormControl {
    return this.formGroup.get('date') as FormControl;
  }

  ngOnInit() {
    this.subscriptionsOnChangesForm();
  }

  handleDateOpenChange(isOpen: boolean): void {
    if (isOpen) {
      setTimeout(() => {
        const overlay = document.querySelector('.ant-picker-panel'); // Получите панель дейтпикера, которая открылась
        if (overlay) {
          const addRemoveEventStyle = (className: string) => {
            const btn = overlay.getElementsByClassName(className);
            btn?.item(0)?.classList.add('remove-event');
          };
          addRemoveEventStyle('ant-picker-header-month-btn');
          addRemoveEventStyle('ant-picker-header-year-btn ');

          // const monthBtn = overlay.getElementsByClassName('ant-picker-header-month-btn');
          // monthBtn?.item(0)?.classList.add('remove-event');

          const yearBtn = overlay.getElementsByClassName('ant-picker-header-year-btn ');
          yearBtn?.item(0)?.classList.add('remove-event');

          this.renderer.listen(overlay, 'click', (event) => {
            // addRemoveEventStyle('ant-picker-header-month-btn');
            addRemoveEventStyle('ant-picker-header-year-btn ');

            // const isMonthNextBtn =
            //   event.target.classList.contains('ant-picker-header-next-btn') ||
            //   event.target.parentElement.classList.contains('ant-picker-header-next-btn');

            // const isMonthPrevBtn =
            //   event.target.classList.contains('ant-picker-header-prev-btn') ||
            //   event.target.parentElement.classList.contains('ant-picker-header-prev-btn');

            // if (event.target && (isMonthNextBtn || isMonthPrevBtn)) {
            //   const currentMonth = (
            //     this.datePicker.datePickerService.activeDate.nativeDate as Date
            //   ).getMonth();
            //   this.currentDateFilterMonth = currentMonth + 1;
            //   this.handleGetAvailableDates();
            // }

            const isYearNextBtn =
              event.target.classList.contains('ant-picker-header-super-next-btn') ||
              event.target.parentElement.classList.contains(
                'ant-picker-header-super-next-btn'
              );

            const isYearPrevBtn =
              event.target.classList.contains('ant-picker-header-super-prev-btn') ||
              event.target.parentElement.classList.contains(
                'ant-picker-header-super-prev-btn'
              );

            if (event.target && (isYearNextBtn || isYearPrevBtn)) {
              const currentYear = (
                this.datePicker.datePickerService.activeDate.nativeDate as Date
              ).getFullYear();
              this.currentDateFilterYear = currentYear;
              this.handleGetAvailableDates();
            }
          });
        }
      }, 500);
    }
  }

  navigateToAppointmentsTable(): void {
    this.router.navigate([
      RoutesConstants.DASHBOARD_INDEX,
      RoutesConstants.DASHBOARD_APPOINTMENTS,
    ]);
  }

  handleSearchProduct(value: string): void {
    const model: RequestGetProductOptionsModel = {
      pageIndex: 0,
      pageSize: CommonConstants.PAGE_SIZE_OPTIONS[1],
      searchText: value,
    };
    this.productService.getProductOptions(model).subscribe((res) => {
      this.productListOptions = res.products;
    });
  }

  handleSearchPatient(value: string): void {
    const model: RequestGetPatientOptionsModel = {
      pageIndex: 0,
      pageSize: CommonConstants.PAGE_SIZE_OPTIONS[1],
      searchText: value,
    };
    this.patientService.getPatientOptions(model).subscribe((res) => {
      this.patientListOptions = res.patients;
      this.changeDetector.detectChanges();
    });
  }

  handleSearchClinician(value: string): void {
    const referralId = this.formGroup.get('referralId')?.value;

    const model: RequestGetClinicianOptionsModel = {
      pageIndex: 0,
      pageSize: CommonConstants.PAGE_SIZE_OPTIONS[1],
      searchText: value,
      referralId,
    };

    this.clinicianService.getClinicianOptions(model).subscribe((res) => {
      this.clinicianListOptions = res.clinicians;
      this.changeDetector.detectChanges();
    });
  }

  handleSearchReferral(value?: string): void {
    const model: RequestGetReferralOptionsModel = {
      patientId: this.formGroup.get('patientId')?.value,
      pageIndex: 0,
      pageSize: CommonConstants.PAGE_SIZE_OPTIONS[1],
      searchText: value,
      includeProducts: true,
      status: ReferralStatusEnum.WaitingForBooking,
      isForAppointment: true,
    };

    this.referralService.getReferralOptions(model).subscribe((res) => {
      this.referralListOptions = res.referrals;
      this.changeDetector.detectChanges();
    });
  }

  handleSearchLocationOptions(searchText?: string): void {
    const clinicianId = this.formGroup.get('clinicianId')?.value;

    const model: RequestGetLocationListModel = {
      clinicianId,
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
      this.changeDetector.detectChanges();
    });
    this.roomListOptions = [];
  }

  handleSearchSiteOptions(searchText?: string): void {
    const locationId = this.formGroup.get('locationId')?.value;
    const clinicianId = this.formGroup.get('clinicianId')?.value;

    if (!locationId) return;

    const model: RequestGetSiteListModel = {
      clinicianId,
      pageSize: 30,
      pageIndex: 0,
      searchText: searchText,
      locationId,
      isActiveFilter: IsActiveFilterEnum.Active,
    };
    this.sitesService.getAll(model).subscribe((res) => {
      if (!res) return;
      this.siteListOptions = res.sites.map((item) => ({
        label: item.name,
        value: item.id,
      }));

      this.changeDetector.detectChanges();
    });

    this.setFormControlValueAndStatus({
      name: 'roomId',
      value: null,
      disabled: true,
    });
    this.roomListOptions = [];
  }

  handleSearchRoomOptions(searchText?: string): void {
    const siteId = this.formGroup.get('siteId')?.value;
    const clinicianId = this.formGroup.get('clinicianId')?.value;

    if (!siteId) return;

    const model: RequestGetRoomListModel = {
      clinicianId,
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
      this.changeDetector.detectChanges();
    });
  }

  handleGetAvailableDates(
    month: number = new Date().getMonth() + 1,
    year: number = new Date().getFullYear()
  ): void {
    const roomId = this.formGroup.get('roomId')?.value;
    const clinicianId = this.formGroup.get('clinicianId')?.value;

    // if (!siteId) return;

    const model: RequestGetAvailableAppointmentDatesByMonthModel = {
      clinicianId,
      roomId,
      month,
      year,
    };

    this.clinicsService.getAvailableAppointmentDatesByMonth(model).subscribe((res) => {
      if (!res) return;
      this.availableDates = res.dates.map((item) => new Date(item));
      this.formGroup.get('date')?.enable();
      this.changeDetector.detectChanges();
    });
  }

  getDisabledDate(current: Date): boolean {
    const currentDateIsAvailable = this.availableDates?.find((item) => {
      item.setHours(0, 0, 0, 0);
      current.setHours(0, 0, 0, 0);
      return current.getTime() === item.getTime();
    });
    return !currentDateIsAvailable;
  }

  submitForm(): void {
    this.wasAttemptToSubmitForm = true;
    markAsDirtyForm(this.formGroup);
    if (this.formGroup.invalid) return;

    this.createAppointment();
  }

  createAppointment(): void {
    const model: RequestCreateAppointmentModel = {
      clinicId: this.formGroup.get('clinicId')?.value,
      referralId: this.formGroup.get('referralId')?.value,
      date: this.formGroup.get('date')?.value,
      startTime: this.formGroup.get('startTime')?.value,
      type: this.formGroup.get('type')?.value,
      notes: this.formGroup.get('notes')?.value,
    };
    this.store$.dispatch(appointmentActions.appointmentCreateAction({ payload: model }));
  }

  private buildForm(): void {
    this.formGroup = this.formBuilder.group({
      patientId: [{ value: null, disabled: false }, [Validators.required]],
      referralId: [{ value: null, disabled: true }],

      clinicId: [{ value: null, disabled: false }, [Validators.required]],
      clinicianId: [{ value: null, disabled: true }, [Validators.required]],
      locationId: [{ value: null, disabled: true }, [Validators.required]],
      siteId: [{ value: null, disabled: true }, [Validators.required]],
      roomId: [{ value: null, disabled: true }, [Validators.required]],

      date: [{ value: null, disabled: true }, [Validators.required]],
      startTime: [{ value: null, disabled: true }, [Validators.required]],
      type: [{ value: null }, [Validators.required]],
      notes: [{ value: null, disabled: false }],

      productName: [{ value: null, disabled: true }, [Validators.required]],
    });
  }

  private subscriptionsOnChangesForm(): void {
    this.subscriptions$.add(
      this.formGroup.get('locationId')?.valueChanges.subscribe((value) => {
        if (!value) {
          this.setFormControlValueAndStatus({
            name: 'siteId',
            value: null,
            disabled: true,
          });

          this.setFormControlValueAndStatus({
            name: 'roomId',
            value: null,
            disabled: true,
          });
        } else {
          this.setFormControlValueAndStatus({
            name: 'siteId',
            value: null,
            disabled: false,
          });

          this.setFormControlValueAndStatus({
            name: 'roomId',
            value: null,
            disabled: false,
          });

          this.handleSearchSiteOptions();
        }
        this.siteListOptions = [];
        this.roomListOptions = [];
      })
    );

    this.subscriptions$.add(
      this.formGroup.get('siteId')?.valueChanges.subscribe((value) => {
        if (!value) {
          this.setFormControlValueAndStatus({
            name: 'roomId',
            value: null,
            disabled: true,
          });
        } else {
          this.setFormControlValueAndStatus({
            name: 'roomId',
            value: null,
            disabled: false,
          });

          this.handleSearchRoomOptions();
        }
        this.roomListOptions = [];
      })
    );
    this.subscriptions$.add(
      this.formGroup.get('roomId')?.valueChanges.subscribe((roomId) => {
        this.setFormControlValueAndStatus({
          name: 'startTime',
          value: null,
          disabled: true,
        });
        if (roomId) {
          this.handleGetAvailableDates();
        } else {
          this.setFormControlValueAndStatus({
            name: 'date',
            value: null,
            disabled: true,
          });
        }
        this.timesListOptions = [];
        this.setFormControlValueAndStatus({ name: 'date', value: null });
      })
    );

    this.subscriptions$.add(
      this.formGroup.get('patientId')?.valueChanges.subscribe((value) => {
        if (!value) {
          this.setFormControlValueAndStatus({
            name: 'referralId',
            value: null,
            disabled: true,
            validators: null,
          });
        }
        if (value) {
          this.handleSearchReferral();
          this.setFormControlValueAndStatus({
            name: 'referralId',
            value: null,
            disabled: false,
            validators: Validators.required,
          });
        }
      })
    );

    this.subscriptions$.add(
      this.formGroup.get('startTime')?.valueChanges.subscribe((value) => {
        if (!value) {
          this.setFormControlValueAndStatus({
            name: 'clinicId',
            value: null,
          });
        }
        if (value) {
          const clinicId = this.timesListOptions.find(
            (item) => item.startTime === value
          )?.clinicId;

          this.handleSearchReferral();
          this.setFormControlValueAndStatus({
            name: 'clinicId',
            value: clinicId,
          });
        }
      })
    );

    this.subscriptions$.add(
      this.formGroup.get('clinicianId')?.valueChanges.subscribe((clinicianId) => {
        this.setFormControlValueAndStatus({
          name: 'startTime',
          value: null,
          disabled: true,
        });
        if (clinicianId) {
          this.setFormControlValueAndStatus({
            name: 'locationId',
            value: null,
            disabled: false,
          });
          this.getNearestAvailableClinicianDate(clinicianId);
          this.handleSearchLocationOptions();
        } else {
          this.setFormControlValueAndStatus({
            name: 'locationId',
            value: null,
            disabled: true,
          });

          this.nearestAvailableClinicianDate = undefined;
        }
        this.changeDetector.detectChanges();
      })
    );

    this.subscriptions$.add(
      this.formGroup.get('referralId')?.valueChanges.subscribe((referralId) => {
        if (referralId) {
          const productName = this.referralListOptions?.find(
            (item) => item.id === referralId
          )?.productName;
          this.formGroup.get('productName')?.setValue(productName);
          this.setFormControlValueAndStatus({
            name: 'clinicianId',
            value: null,
            disabled: false,
          });
        } else {
          this.setFormControlValueAndStatus({
            name: 'clinicianId',
            value: null,
            disabled: true,
          });
          this.nearestAvailableClinicianDate = undefined;
        }
        this.changeDetector.detectChanges();
      })
    );

    this.subscriptions$.add(
      this.formGroup.get('date')?.valueChanges.subscribe((date) => {
        this.setFormControlValueAndStatus({
          name: 'startTime',
          value: null,
          disabled: true,
        });
        if (date) {
          this.getAvailableAppointmentTimesOnDate();
        } else {
          this.timesListOptions = [];
        }
        this.changeDetector.detectChanges();
      })
    );
  }

  private setFormControlValueAndStatus(params: {
    name: string;
    value: any;
    disabled?: boolean;
    validators?: ValidatorFn | ValidatorFn[] | null;
  }): void {
    const { name, value, disabled, validators } = params;

    this.formGroup.get(name)?.setValue(value);

    if (validators !== undefined) {
      this.formGroup.get(name)?.setValidators(validators);
    }
    if (disabled) {
      this.formGroup.get(name)?.disable();
    }

    if (disabled !== undefined && !disabled) {
      this.formGroup.get(name)?.enable();
    }
  }

  private getAvailableAppointmentTimesOnDate(): void {
    const clinicianId = this.formGroup.get('clinicianId')?.value;
    const date = getDateTimeWithCurrentTimezone(
      this.formGroup.get('date')?.value
    ) as string;
    const roomId = this.formGroup.get('roomId')?.value;
    if (clinicianId && date && roomId) {
      this.setFormControlValueAndStatus({
        name: 'startTime',
        value: null,
        disabled: false,
      });

      this.clinicsService
        .getAvailableAppointmentTimesOnDate({ roomId, clinicianId, dateTime: date })
        .subscribe({
          next: (res: ResponseGetAvailableAppointmentTimesOnDateModel) => {
            this.timesListOptions = res.times;
          },
          error: (error) => {
            this.store$.dispatch(errorAction({ payload: { error, isApiError: true } }));
          },
        });
    }
  }

  private getNearestAvailableClinicianDate(clinicianId: string): void {
    this.clinicianService
      .getNearestAvailableClinicianDate({ id: clinicianId })
      .subscribe({
        next: (value: ResponseGetNearestAvailableClinicianDateResponseModel) => {
          this.nearestAvailableClinicianDate = value.dateTime;
          this.changeDetector.detectChanges();
        },
        error: (error) => {
          this.store$.dispatch(errorAction({ payload: { error, isApiError: true } }));
        },
      });
  }

  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }
}
