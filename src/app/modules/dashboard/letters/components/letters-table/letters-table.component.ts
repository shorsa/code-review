import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { CommonConstants, RoutesConstants } from 'src/app/core/constants';
import { Observable, Subscription, filter } from 'rxjs';
import { Store } from '@ngrx/store';
import * as letterActions from '../../store/letters.actions';
import * as letterSelectors from '../../store/letters.selectors';
import { clone, isEqual } from 'lodash';
import { selectIsLoading } from 'src/app/app-store/app-state/app-state.selectors';
import {
  RequestGetAppointmentReportsListModel,
  ResponseGetAppointmentReportListItemModel,
} from '../../models';
import {
  AppointmentReportOrderByOptions,
  AppointmentReportStatusEnum,
} from '../../enums';
@Component({
  selector: 'app-letters-table',
  templateUrl: './letters-table.component.html',
  styleUrls: ['./letters-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LettersTableComponent implements OnInit, OnDestroy {
  readonly pageSizeOptions: number[] = CommonConstants.PAGE_SIZE_OPTIONS;
  lettersData: ResponseGetAppointmentReportListItemModel[] = [];
  totalCount: number = 0;
  isLoading$?: Observable<boolean>;
  private _searchParams!: RequestGetAppointmentReportsListModel;
  private subscriptions$: Subscription = new Subscription();

  constructor(
    private store$: Store,
    private router: Router,
    private changeDetection: ChangeDetectorRef
  ) {}

  set searchParams(value: RequestGetAppointmentReportsListModel) {
    this._searchParams = { ...clone(value) };
  }

  get searchParams(): RequestGetAppointmentReportsListModel {
    return this._searchParams;
  }

  ngOnInit(): void {
    this.initializingSelectors();
  }

  onQueryParamsChange(event: NzTableQueryParams): void {
    const sortColumn = event.sort.find((item) => item.value !== null);

    this.searchParams = {
      ...this.searchParams,
      pageSize: event.pageSize,
      pageIndex: event.pageIndex - 1,
    };

    type ColumnSort = keyof typeof AppointmentReportOrderByOptions;

    if (sortColumn) {
      const sortColumnName: AppointmentReportOrderByOptions =
        AppointmentReportOrderByOptions[sortColumn.key as ColumnSort];
      const orderByAsc: boolean = sortColumn.value === 'ascend';
      this.searchParams.isOrderByAsc = orderByAsc;
      this.searchParams.orderByOptions = sortColumnName;
    } else {
      this.searchParams.isOrderByAsc = undefined;
      this.searchParams.orderByOptions = undefined;
    }

    this.searchAppointments(this.searchParams);
  }

  getStatusClass(status: AppointmentReportStatusEnum): string {
    return AppointmentReportStatusEnum[status];
  }

  getStatusString(status: AppointmentReportStatusEnum): string {
    switch (status) {
      case AppointmentReportStatusEnum.Approved:
        return 'Approved';
      case AppointmentReportStatusEnum.AwaitingApproval:
        return 'Awaiting Approval';
      case AppointmentReportStatusEnum.SentBack:
        return 'Sent Back';
      default:
        return 'None';
    }
  }

  getIsAvailableDownload(status: AppointmentReportStatusEnum): boolean {
    return (
      status === AppointmentReportStatusEnum.Approved ||
      status === AppointmentReportStatusEnum.AwaitingApproval
    );
  }

  getIsAvailableEdit(status: AppointmentReportStatusEnum): boolean {
    return status === AppointmentReportStatusEnum.SentBack;
  }

  navigateToEditAppointment(appointmentId: string): void {
    this.router.navigate(
      [
        RoutesConstants.DASHBOARD_INDEX,
        RoutesConstants.DASHBOARD_APPOINTMENTS,
        RoutesConstants.DASHBOARD_APPOINTMENTS_START,
      ],
      {
        queryParams: {
          id: appointmentId,
        },
      }
    );
  }

  private initializingSelectors(): void {
    this.isLoading$ = this.store$.select(selectIsLoading);
    this.subscriptions$.add(
      this.store$
        .select(letterSelectors.selectLettersList)
        .pipe(filter((val) => val !== undefined))
        .subscribe((res) => {
          this.lettersData = res!.reports;
          this.totalCount = res!.totalCount;
          this.changeDetection.detectChanges();
        })
    );
    this.subscriptions$.add(
      this.store$
        .select(letterSelectors.selectLettersSearchParams)
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
      letterActions.setLettersSearchParamsAction({
        payload: searchData,
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }
}
