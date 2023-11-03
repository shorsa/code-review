import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { Observable, Subscription, filter } from 'rxjs';
import { CommonConstants } from 'src/app/core/constants';
import { SearchHelper } from 'src/app/shared/helpers';
import {
  HistoryLogEntityEnum,
  HistoryLogTypeEnum,
  PatientAuditLogOrderByOptions,
} from '../../enums';
import {
  RequestGetAuditLogsByPatientIdModel,
  ResponseGetAuditLogListItemModel,
} from '../../models/patients';
import * as patientAuditLogActions from '../../store/patient-audit-logs.actions';
import * as patientSelectors from '../../store/patient.selectors';

@Component({
  selector: 'app-patient-audit-logs',
  templateUrl: './patient-audit-logs.component.html',
  styleUrls: ['./patient-audit-logs.component.scss'],
})
export class PatientAuditLogsComponent implements OnInit, OnDestroy {
  @Input() set patientId(value: string) {
    this.searchParams.patientId = value;
  }

  private subscriptions$: Subscription = new Subscription();
  private readonly pageSizeOptions: number[] = CommonConstants.PAGE_SIZE_OPTIONS;

  searchParams: RequestGetAuditLogsByPatientIdModel = {
    pageIndex: 0,
    pageSize: this.pageSizeOptions[0],
    patientId: this.patientId,
  };

  isLoading$?: Observable<boolean>;
  auditLogsData: ResponseGetAuditLogListItemModel[] = [];
  totalCount: number = 0;

  constructor(
    private store$: Store,
    private changeDetector: ChangeDetectorRef,
    private readonly searchHelper: SearchHelper<RequestGetAuditLogsByPatientIdModel>
  ) {}

  ngOnInit() {
    this.initializingSelectors();

    this.searchNotes(this.searchParams);
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

    type ColumnSort = keyof typeof PatientAuditLogOrderByOptions;

    if (sortColumn) {
      const sortColumnName: PatientAuditLogOrderByOptions =
        PatientAuditLogOrderByOptions[sortColumn.key as ColumnSort];
      const orderByAsc: boolean = sortColumn.value === 'ascend';

      this.searchParams.isOrderByAsc = orderByAsc;
      this.searchParams.patientAuditLogOrderByOptions = sortColumnName;
    } else {
      this.searchParams.isOrderByAsc = undefined;
      this.searchParams.patientAuditLogOrderByOptions = undefined;
    }

    this.searchNotes(this.searchParams);
  }

  private initializingSelectors(): void {
    this.subscriptions$.add(
      this.store$
        .select(patientSelectors.selectPatientAuditLogListData)
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
      patientAuditLogActions.patientsAuditLogListSearchAction({
        payload: searchData,
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }
}
