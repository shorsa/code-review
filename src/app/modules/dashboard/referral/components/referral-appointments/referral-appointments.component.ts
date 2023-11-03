import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { clone } from 'lodash';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { Observable, Subscription, filter } from 'rxjs';
import { selectIsLoading } from 'src/app/app-store/app-state/app-state.selectors';
import { CommonConstants, RoutesConstants } from 'src/app/core/constants';
import { UserPermissionsProvider } from 'src/app/shared/providers/user-permissions.provider';
import { AppointmentOrderByOptionsEnum } from '../../../appointments/enums';
import {
  RequestGetAppointmentListModel,
  ResponseAppointmentListItem,
} from '../../../appointments/models';
import * as referralAppointmentActions from '../../state/referral-appointments.actions';
import * as referralSelectors from '../../state/referral.selectors';

@Component({
  selector: 'app-referral-appointments',
  templateUrl: './referral-appointments.component.html',
  styleUrls: ['./referral-appointments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReferralAppointmentsComponent implements OnInit, OnDestroy {
  @Input() referralId!: string;

  private _searchParams!: RequestGetAppointmentListModel;
  private subscription$: Subscription = new Subscription();

  readonly pageSizeOptions: number[] = CommonConstants.PAGE_SIZE_OPTIONS;

  appointmentsData: ResponseAppointmentListItem[] = [];
  totalCount: number = 0;
  isLoading$?: Observable<boolean>;
  isVisibleStartModal: boolean = false;

  constructor(
    private store$: Store,
    private changeDetection: ChangeDetectorRef,
    private readonly userPermissionsProvider: UserPermissionsProvider,
    private router: Router
  ) {}

  get getIsClinicianRole(): boolean {
    return this.userPermissionsProvider.isClinician;
  }

  ngOnInit(): void {
    this.initializingSelectors();
  }

  set searchParams(value: RequestGetAppointmentListModel) {
    this._searchParams = { ...clone(value), referralId: this.referralId };
  }

  get searchParams(): RequestGetAppointmentListModel {
    return this._searchParams;
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

  handleSearchByText(searchText?: string): void {
    if (!this.searchParams) return;
    this.searchParams = { ...this.searchParams, searchText, pageIndex: 0 };
    this.searchAppointments(this.searchParams);
  }

  navigateToAddNewAppointment(): void {
    this.router.navigate([
      RoutesConstants.DASHBOARD_INDEX,
      RoutesConstants.DASHBOARD_APPOINTMENTS,
      RoutesConstants.DASHBOARD_APPOINTMENTS_ADD,
    ]);
  }

  navigateToEdit(id: string): void {
    this.router.navigate(
      [
        RoutesConstants.DASHBOARD_INDEX,
        RoutesConstants.DASHBOARD_APPOINTMENTS,
        RoutesConstants.DASHBOARD_APPOINTMENTS_START,
      ],
      { queryParams: { id } }
    );
  }

  handleDeactivate(id: string): void {
    this.store$.dispatch(
      referralAppointmentActions.appointmentDeactivateAction({
        payload: { id },
      })
    );
  }

  private initializingSelectors(): void {
    this.isLoading$ = this.store$.select(selectIsLoading);

    this.subscription$.add(
      this.store$
        .select(referralSelectors.selectAppointmentsList)
        .pipe(filter((val) => val !== undefined))
        .subscribe((res) => {
          this.appointmentsData = res!.appointments;
          this.totalCount = res!.totalCount;
          this.changeDetection.detectChanges();
        })
    );
  }

  private searchAppointments(searchData?: any): void {
    if (!searchData) return;
    this.store$.dispatch(
      referralAppointmentActions.setAppointmentsSearchParamsAction({
        payload: searchData,
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
