import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { CommonConstants, RoutesConstants } from 'src/app/core/constants';
import {
  RequestGetAppointmentListModel,
  ResponseAppointmentListItem,
} from '../../models';
import { Observable, Subscription, filter } from 'rxjs';
import { Store } from '@ngrx/store';
import * as appointmentActions from '../../store/appointments.actions';
import * as appointmentSelectors from '../../store/appointments.selectors';
import { AppointmentOrderByOptionsEnum, AppointmentStatusEnum } from '../../enums';
import { clone, isEqual } from 'lodash';
import { selectIsLoading } from 'src/app/app-store/app-state/app-state.selectors';
import { UserPermissionsProvider } from 'src/app/shared/providers/user-permissions.provider';
import { PermissionClaimsEnum } from 'src/app/shared/enums';
@Component({
  selector: 'app-appointments-table',
  templateUrl: './appointments-table.component.html',
  styleUrls: ['./appointments-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppointmentsTableComponent implements OnInit, OnDestroy {
  @Input() clinicId?: string;
  @Input() date?: string;

  readonly continueStatus: AppointmentStatusEnum = AppointmentStatusEnum.Attended;
  readonly startStatus = AppointmentStatusEnum.Booked;

  readonly appointmentViewDetailsPermission = PermissionClaimsEnum.AppointmentViewDetails;
  readonly appointmentCreatePermission = PermissionClaimsEnum.AppointmentCreate;
  readonly appointmentCancelPermission = PermissionClaimsEnum.AppointmentCancel;

  readonly pageSizeOptions: number[] = CommonConstants.PAGE_SIZE_OPTIONS;
  appointmentsData: ResponseAppointmentListItem[] = [];
  totalCount: number = 0;
  isLoading$?: Observable<boolean>;
  private _searchParams!: RequestGetAppointmentListModel;
  private subscriptions$: Subscription = new Subscription();

  isVisibleStartModal: boolean = false;

  constructor(
    private store$: Store,
    private changeDetection: ChangeDetectorRef,
    private router: Router,
    private readonly userPermissionsProvider: UserPermissionsProvider
  ) {}

  ngOnInit(): void {
    this.initializingSelectors();
  }

  set searchParams(value: RequestGetAppointmentListModel) {
    this._searchParams = { ...clone(value), clinicId: this.clinicId, date: this.date };
  }

  get searchParams(): RequestGetAppointmentListModel {
    return this._searchParams;
  }

  get getIsClinicianRole(): boolean {
    return this.userPermissionsProvider.isClinician;
  }

  get getIsOHRDRole(): boolean {
    return this.userPermissionsProvider.isOHRDRoles;
  }

  onQueryParamsChange(event: NzTableQueryParams): void {
    const sortColumn = event.sort.find((item) => item.value !== null);

    this.searchParams = {
      ...this.searchParams,
      pageSize: event.pageSize,
      pageIndex: event.pageIndex - 1,
    };

    type ColumnSort = keyof typeof AppointmentOrderByOptionsEnum;

    if (sortColumn) {
      const sortColumnName: AppointmentOrderByOptionsEnum =
        AppointmentOrderByOptionsEnum[sortColumn.key as ColumnSort];
      const orderByAsc: boolean = sortColumn.value === 'ascend';
      this.searchParams.isOrderByAsc = orderByAsc;
      this.searchParams.appointmentOrderByOptions = sortColumnName;
    } else {
      this.searchParams.isOrderByAsc = undefined;
      this.searchParams.appointmentOrderByOptions = undefined;
    }

    this.searchAppointments(this.searchParams);
  }

  getIsShowStartAndContinue(status: AppointmentStatusEnum): boolean {
    return [
      AppointmentStatusEnum.Booked,
      AppointmentStatusEnum.Canceled,
      AppointmentStatusEnum.Completed,
    ].includes(status);
  }

  handleNextStepAppointment(item: ResponseAppointmentListItem): void {
    this.router.navigate(
      [
        RoutesConstants.DASHBOARD_INDEX,
        RoutesConstants.DASHBOARD_APPOINTMENTS,
        item.status === AppointmentStatusEnum.Attended
          ? RoutesConstants.DASHBOARD_APPOINTMENTS_ACTION_YES
          : RoutesConstants.DASHBOARD_APPOINTMENTS_START,
      ],
      { queryParams: { id: item.id } }
    );
  }

  viewDetails(id: string): void {
    this.router.navigate(
      [
        RoutesConstants.DASHBOARD_INDEX,
        RoutesConstants.DASHBOARD_APPOINTMENTS,
        RoutesConstants.DASHBOARD_APPOINTMENTS_VIEW,
      ],
      { queryParams: { id } }
    );
  }

  deactivate(id: string): void {
    this.store$.dispatch(
      appointmentActions.appointmentDeactivateAction({
        payload: { id },
      })
    );
  }

  reactivate(id: string): void {
    this.store$.dispatch(
      appointmentActions.appointmentActivateAction({
        payload: { id },
      })
    );
  }

  cancel(id: string): void {
    this.store$.dispatch(
      appointmentActions.appointmentCancelAction({
        payload: { id },
      })
    );
  }

  private initializingSelectors(): void {
    this.isLoading$ = this.store$.select(selectIsLoading);
    this.subscriptions$.add(
      this.store$
        .select(appointmentSelectors.selectAppointmentsList)
        .pipe(filter((val) => val !== undefined))
        .subscribe((res) => {
          this.appointmentsData = res!.appointments;
          this.totalCount = res!.totalCount;
          this.changeDetection.detectChanges();
        })
    );
    this.subscriptions$.add(
      this.store$
        .select(appointmentSelectors.selectAppointmentsSearchParams)
        .pipe(filter((val) => val !== undefined))
        .subscribe((res) => {
          if (!res) return;
          if (isEqual(this.searchParams, res)) return;
          this.searchParams = clone(res);
          if (isEqual(this.searchParams, res)) return;

          this.searchAppointments(this.searchParams);
        })
    );
  }

  private searchAppointments(searchData?: any): void {
    if (!searchData) return;
    this.store$.dispatch(
      appointmentActions.setAppointmentsSearchParamsAction({
        payload: searchData,
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }
}
