import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { Observable, Subscription, filter } from 'rxjs';
import { CommonConstants } from 'src/app/core/constants';
import { SearchHelper } from 'src/app/shared/helpers';
import { AppointmentAuditLogOrderByOptionsEnum } from '../../enums';
import {
  RequestGetAppointmentAuditLogsModel,
  ResponseGetAuditLogListItemModel,
} from '../../models';
import * as appointmentActions from '../../store/appointments.actions';
import * as appointmentSelectors from '../../store/appointments.selectors';
import { HistoryLogTypeEnum, HistoryLogEntityEnum } from '../../../patients/enums';

@Component({
  selector: 'app-appointments-history-table',
  templateUrl: './appointments-history-table.component.html',
  styleUrls: ['./appointments-history-table.component.scss'],
})
export class AppointmentAuditLogsComponent implements OnInit, OnDestroy {
  @Input() set appointmentId(value: string) {
    this.searchParams.appointmentId = value;
  }

  private subscriptions$: Subscription = new Subscription();
  private readonly pageSizeOptions: number[] = CommonConstants.PAGE_SIZE_OPTIONS;

  searchParams: RequestGetAppointmentAuditLogsModel = {
    pageIndex: 0,
    pageSize: this.pageSizeOptions[0],
    appointmentId: this.appointmentId,
  };

  isLoading$?: Observable<boolean>;
  auditLogsData: ResponseGetAuditLogListItemModel[] = [];
  totalCount: number = 0;

  constructor(
    private store$: Store,
    private changeDetector: ChangeDetectorRef,
    private readonly searchHelper: SearchHelper<RequestGetAppointmentAuditLogsModel>
  ) {}

  ngOnInit() {
    this.initializingSelectors();
  }

  handleSearchByText(searchText?: string): void {
    this.searchParams = { ...this.searchParams, searchText, pageIndex: 0 };
    this.searchNotes(this.searchParams);
  }

  onQueryParamsChange(event: NzTableQueryParams): void {
    const sortColumn = event.sort.find((item) => item.value !== null);

    this.searchParams = {
      ...this.searchParams,
      pageSize: event.pageSize,
      pageIndex: event.pageIndex - 1,
    };

    type ColumnSort = keyof typeof AppointmentAuditLogOrderByOptionsEnum;

    if (sortColumn) {
      const sortColumnName: AppointmentAuditLogOrderByOptionsEnum =
        AppointmentAuditLogOrderByOptionsEnum[sortColumn.key as ColumnSort];
      const orderByAsc: boolean = sortColumn.value === 'ascend';

      this.searchParams.isOrderByAsc = orderByAsc;
      this.searchParams.appointmentAuditLogOrderByOptions = sortColumnName;
    } else {
      this.searchParams.isOrderByAsc = undefined;
      this.searchParams.appointmentAuditLogOrderByOptions = undefined;
    }

    this.searchNotes(this.searchParams);
  }

  private initializingSelectors(): void {
    this.subscriptions$.add(
      this.store$
        .select(appointmentSelectors.selectAppointmentAuditLogListData)
        .pipe(filter((val) => val !== undefined))
        .subscribe((res) => {
          if (!res) return;
          this.auditLogsData = res.auditLogs;
          this.totalCount = res.totalCount;
          this.changeDetector.detectChanges();
        })
    );

    this.subscriptions$.add(
      this.searchHelper
        .setSearchSubscription()
        .pipe(filter((val) => !!val))
        .subscribe((searchValue) => {
          this.searchParams = searchValue;
          this.searchNotes(this.searchParams);
        })
    );
  }

  private searchNotes(searchData?: any): void {
    if (!searchData) return;
    this.store$.dispatch(
      appointmentActions.appointmentAuditLogListSearchAction({
        payload: searchData,
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }
}
