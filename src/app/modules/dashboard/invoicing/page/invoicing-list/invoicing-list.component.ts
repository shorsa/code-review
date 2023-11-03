import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { InvoiceOrderByOptionsEnum, InvoiceStatusEnum } from '../../enums';
import { RequestGetInvoiceListModel, ResponseInvoiceListItem } from '../../models';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { clone } from 'lodash';
import { NzTableFilterList, NzTableQueryParams } from 'ng-zorro-antd/table';
import { Subscription, Observable, filter } from 'rxjs';
import { selectIsLoading } from 'src/app/app-store/app-state/app-state.selectors';
import { CommonConstants, RoutesConstants } from 'src/app/core/constants';
import { IsActiveFilterEnum, InvoiceTypeEnum } from 'src/app/shared/enums';
import { SelectOptionModel } from 'src/app/shared/models';
import { UserPermissionsProvider } from 'src/app/shared/providers/user-permissions.provider';
import * as invoicingActions from '../../store/invoicing.actions';
import * as invoicingSelectors from '../../store/invoicing.selectors';

@Component({
  templateUrl: './invoicing-list.component.html',
  styleUrls: ['./invoicing-list.component.scss'],
})
export class InvoicingListComponent implements OnInit, OnDestroy {
  readonly pageSizeOptions: number[] = CommonConstants.PAGE_SIZE_OPTIONS;
  private _searchParams: RequestGetInvoiceListModel = {
    pageSize: this.pageSizeOptions[0],
    pageIndex: 0,
    isActiveFilter: IsActiveFilterEnum.Active,
  };
  private subscriptions$: Subscription = new Subscription();
  readonly activeFilterOptions: SelectOptionModel<IsActiveFilterEnum>[] =
    CommonConstants.activeFilterOptions;

  readonly invoiceListOptions: NzTableFilterList = CommonConstants.invoiceTypes.map(
    ({ label, value }) => ({ text: label, value })
  );

  readonly invoiceStatusCanceled = InvoiceStatusEnum.Canceled;
  readonly invoiceStatusPaid = InvoiceStatusEnum.Paid;
  readonly invoiceStatusPending = InvoiceStatusEnum.Pending;

  readonly statusFilterList: NzTableFilterList = [
    {
      text: 'Canceled',
      value: this.invoiceStatusCanceled,
    },
    {
      text: 'Paid',
      value: this.invoiceStatusPaid,
    },
    {
      text: 'Pending',
      value: this.invoiceStatusPending,
    },
  ];

  invoicingData: ResponseInvoiceListItem[] = [];
  totalCount: number = 0;
  isLoading$?: Observable<boolean>;

  checked: boolean = false;
  indeterminateCheckbox: boolean = false;
  selectedInvoicesIds: { id: string; customId: string }[] = [];

  constructor(
    private store$: Store,
    private changeDetection: ChangeDetectorRef,
    private router: Router,
    private userPermissionsProvider: UserPermissionsProvider
  ) {}

  get getIsCanDeactivateOrReactivate(): boolean {
    return this.userPermissionsProvider.isOHRDRoles;
  }

  set searchParams(value: RequestGetInvoiceListModel) {
    this._searchParams = { ...clone(value) };
  }

  get searchParams(): RequestGetInvoiceListModel {
    return this._searchParams;
  }

  ngOnInit(): void {
    this.initializingSelectors();
  }

  navigateToEditInvoice(contractId: string): void {
    this.router.navigate(
      [
        RoutesConstants.DASHBOARD_INDEX,
        RoutesConstants.DASHBOARD_INVOICING,
        RoutesConstants.DASHBOARD_INVOICING_EDIT,
      ],
      {
        queryParams: {
          id: contractId,
        },
      }
    );
  }

  navigateToAddInvoice(): void {
    this.router.navigate([
      RoutesConstants.DASHBOARD_INDEX,
      RoutesConstants.DASHBOARD_INVOICING,
      RoutesConstants.DASHBOARD_INVOICING_ADD,
    ]);
  }

  onDeactivate(contractId: string): void {
    this.store$.dispatch(
      invoicingActions.invoicingDeactivateAction({ payload: { id: contractId } })
    );
  }

  onReactivate(contractId: string): void {
    this.store$.dispatch(
      invoicingActions.invoicingActivateAction({ payload: { id: contractId } })
    );
  }

  changeActiveFilter(selectedIndex: number): void {
    if (!this.searchParams) return;

    const currentActiveFilter = this.activeFilterOptions[selectedIndex].value;
    this.searchParams = {
      ...this.searchParams,
      pageIndex: 0,
      isActiveFilter: currentActiveFilter,
    };
    this.searchInvoices(this.searchParams);
  }

  handleSearchByText(searchText?: string): void {
    if (!this.searchParams) return;
    this.searchParams = { ...this.searchParams, searchText, pageIndex: 0 };
    this.searchInvoices(this.searchParams);
  }

  getStatusFilterValue(filter?: { key: string; value: any }): any {
    if (!filter || filter.value.length >= 2) return InvoiceStatusEnum.None;

    return filter.value[0];
  }

  onQueryParamsChange(event: NzTableQueryParams): void {
    const sortColumn = event.sort.find((item) => item.value !== null);
    const statusFilter = event.filter.find((item) => item.key === 'Status');
    const statusFilterValue = this.getStatusFilterValue(statusFilter);

    this.searchParams = {
      ...this.searchParams,
      pageSize: event.pageSize,
      pageIndex: event.pageIndex - 1,
      statusFilter: statusFilterValue,
    };

    type ColumnSort = keyof typeof InvoiceOrderByOptionsEnum;

    if (sortColumn) {
      const sortColumnName: InvoiceOrderByOptionsEnum =
        InvoiceOrderByOptionsEnum[sortColumn.key as ColumnSort];
      const orderByAsc: boolean = sortColumn.value === 'ascend';
      this.searchParams.isOrderByAsc = orderByAsc;
      this.searchParams.orderByOptions = sortColumnName;
    } else {
      this.searchParams.isOrderByAsc = undefined;
      this.searchParams.orderByOptions = undefined;
    }

    this.searchInvoices(this.searchParams);
  }

  onAllChecked(checked: boolean): void {
    this.invoicingData.forEach((invoice) => this.updateCheckedSet(invoice, checked));
    this.refreshCheckedStatus();
  }

  private initializingSelectors(): void {
    this.isLoading$ = this.store$.select(selectIsLoading);
    this.subscriptions$.add(
      this.store$
        .select(invoicingSelectors.selectInvoicingList)
        .pipe(filter((val) => val !== undefined))
        .subscribe((res) => {
          this.invoicingData = res!.invoices;
          this.totalCount = res!.totalCount;
          this.changeDetection.detectChanges();
        })
    );
  }

  updateCheckedSet(item: ResponseInvoiceListItem, checked: boolean): void {
    const hasItem = this.hasInvoice(item);

    if (!hasItem && checked) {
      this.selectedInvoicesIds.push(item);
    }

    if (hasItem && !checked) {
      const currentItemIndex = this.selectedInvoicesIds.findIndex(
        (invoice) => invoice.id === item.id
      );

      this.selectedInvoicesIds.splice(currentItemIndex, 1);
    }
  }

  handleDownloadAll(): void {
    if (!this.selectedInvoicesIds.length) return;

    const invoiceIds = [...this.selectedInvoicesIds];

    this.store$.dispatch(
      invoicingActions.downloadSelectedInvoicesAction({
        payload: {
          invoiceIds: invoiceIds.map((item) => item.id),
          customIds: invoiceIds.map((item) => item.customId),
        },
      })
    );
  }

  hasInvoice(appointment: ResponseInvoiceListItem): boolean {
    return !!this.selectedInvoicesIds.find((item) => item.id === appointment.id);
  }

  downloadInvoice(item: ResponseInvoiceListItem): void {
    const { id, customId } = item;

    this.store$.dispatch(
      invoicingActions.downloadInvoiceAction({
        payload: {
          invoiceId: id,
          customId,
        },
      })
    );
  }

  refreshCheckedStatus(): void {
    this.checked = this.invoicingData.every((item) => this.hasInvoice(item));
    this.indeterminateCheckbox =
      this.invoicingData.some((clinician) => this.hasInvoice(clinician)) && !this.checked;
  }

  onItemCheckedChange(item: ResponseInvoiceListItem, checked: boolean): void {
    this.updateCheckedSet(item, checked);
    this.refreshCheckedStatus();
  }

  private searchInvoices(searchData?: RequestGetInvoiceListModel): void {
    if (!searchData) return;
    this.store$.dispatch(
      invoicingActions.setInvoicingSearchParamsAction({
        payload: searchData,
      })
    );
  }

  ngOnDestroy(): void {
    this.store$.dispatch(invoicingActions.clearInvoicingSearchParamsAction());
  }
}
