import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { Observable, Subscription, filter } from 'rxjs';
import { CommonConstants } from 'src/app/core/constants';
import { HistoryLogEntityEnum, HistoryLogTypeEnum } from '../../../patients/enums';
import { ResponseGetAuditLogListItemModel } from '../../../patients/models/patients';
import { ReferralAuditLogOrderByOptions } from '../../enums';
import { RequestGetReferralAuditLogsModel } from '../../models';
import * as referralActions from '../../state/referral.actions';
import * as referralSelectors from '../../state/referral.selectors';
import { selectIsLoading } from 'src/app/app-store/app-state/app-state.selectors';

@Component({
  selector: 'app-referral-audit-logs',
  templateUrl: './referral-audit-logs.component.html',
  styleUrls: ['./referral-audit-logs.component.scss'],
})
export class ReferralAuditLogsComponent implements OnInit, OnDestroy {
  @Input() set referralId(value: string) {
    this.searchParams.referralId = value;
  }

  private subscriptions$: Subscription = new Subscription();
  private readonly pageSizeOptions: number[] = CommonConstants.PAGE_SIZE_OPTIONS;

  searchParams: RequestGetReferralAuditLogsModel = {
    pageIndex: 0,
    pageSize: this.pageSizeOptions[0],
    referralId: this.referralId,
  };

  isLoading$?: Observable<boolean>;
  auditLogsData: ResponseGetAuditLogListItemModel[] = [];
  totalCount: number = 0;

  constructor(private store$: Store, private changeDetector: ChangeDetectorRef) {}

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

    type ColumnSort = keyof typeof ReferralAuditLogOrderByOptions;

    if (sortColumn) {
      const sortColumnName: ReferralAuditLogOrderByOptions =
        ReferralAuditLogOrderByOptions[sortColumn.key as ColumnSort];
      const orderByAsc: boolean = sortColumn.value === 'ascend';

      this.searchParams.isOrderByAsc = orderByAsc;
      this.searchParams.referralAuditLogOrderByOptions = sortColumnName;
    } else {
      this.searchParams.isOrderByAsc = undefined;
      this.searchParams.referralAuditLogOrderByOptions = undefined;
    }

    this.searchNotes(this.searchParams);
  }

  private initializingSelectors(): void {
    this.isLoading$ = this.store$.select(selectIsLoading);

    this.subscriptions$.add(
      this.store$
        .select(referralSelectors.selectAuditLogList)
        .pipe(filter((val) => val !== undefined))
        .subscribe((res) => {
          if (!res) return;
          this.auditLogsData = res.auditLogs;
          this.totalCount = res.totalCount;
          this.changeDetector.detectChanges();
        })
    );
  }

  private searchNotes(searchData?: any): void {
    if (!searchData) return;
    this.store$.dispatch(
      referralActions.referralsSearchAuditLogsAction({
        payload: searchData,
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }
}
