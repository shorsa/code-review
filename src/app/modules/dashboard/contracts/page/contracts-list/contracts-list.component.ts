import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription, Observable, filter } from 'rxjs';
import { CommonConstants, RoutesConstants } from 'src/app/core/constants';
import { InvoiceTypeEnum, IsActiveFilterEnum } from 'src/app/shared/enums';
import { SelectOptionModel } from 'src/app/shared/models';
import { clone } from 'lodash';
import { NzTableFilterList, NzTableQueryParams } from 'ng-zorro-antd/table';
import { selectIsLoading } from 'src/app/app-store/app-state/app-state.selectors';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import * as contractsActions from '../../store/contracts.actions';
import * as contractsSelectors from '../../store/contracts.selectors';
import { RequestGetContractListModel, ResponseContractListItem } from '../../models';
import { ContractOrderByOptionsEnum, ContractStatusFilterEnum } from '../../enums';
import { UserPermissionsProvider } from 'src/app/shared/providers/user-permissions.provider';

@Component({
  templateUrl: './contracts-list.component.html',
  styleUrls: ['./contracts-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContractsListComponent implements OnInit, OnDestroy {
  readonly pageSizeOptions: number[] = CommonConstants.PAGE_SIZE_OPTIONS;
  private _searchParams: RequestGetContractListModel = {
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

  readonly statusFilterList: NzTableFilterList = [
    {
      text: 'Active',
      value: ContractStatusFilterEnum.Active,
    },
    {
      text: 'Close',
      value: ContractStatusFilterEnum.Closed,
    },
  ];

  contractsData: ResponseContractListItem[] = [];
  totalCount: number = 0;
  isLoading$?: Observable<boolean>;

  checked: boolean = false;
  indeterminateCheckbox: boolean = false;
  selectedContractsIds: { id: string; customId: string }[] = [];

  constructor(
    private store$: Store,
    private changeDetection: ChangeDetectorRef,
    private router: Router,
    private userPermissionsProvider: UserPermissionsProvider
  ) {}

  get getIsCanDeactivateOrReactivate(): boolean {
    return this.userPermissionsProvider.isOHRDRoles;
  }

  set searchParams(value: RequestGetContractListModel) {
    this._searchParams = { ...clone(value) };
  }

  get searchParams(): RequestGetContractListModel {
    return this._searchParams;
  }

  ngOnInit(): void {
    this.initializingSelectors();
  }

  navigateToContractsList(): void {
    this.router.navigate([
      RoutesConstants.DASHBOARD_INDEX,
      RoutesConstants.DASHBOARD_CONTRACTS,
    ]);
  }

  navigateToEditContract(contractId: string): void {
    this.router.navigate(
      [
        RoutesConstants.DASHBOARD_INDEX,
        RoutesConstants.DASHBOARD_CONTRACTS,
        RoutesConstants.DASHBOARD_CONTRACTS_EDIT,
      ],
      {
        queryParams: {
          id: contractId,
        },
      }
    );
  }

  navigateToAddContract(): void {
    this.router.navigate([
      RoutesConstants.DASHBOARD_INDEX,
      RoutesConstants.DASHBOARD_CONTRACTS,
      RoutesConstants.DASHBOARD_CONTRACTS_ADD,
    ]);
  }

  onMarkAsClosed(contractId: string): void {
    this.store$.dispatch(
      contractsActions.markAsClosedContractAction({ payload: { id: contractId } })
    );
  }

  onMarkAsOpen(contractId: string): void {
    this.store$.dispatch(
      contractsActions.markAsOpenContractAction({ payload: { id: contractId } })
    );
  }

  onDeactivate(contractId: string): void {
    this.store$.dispatch(
      contractsActions.deactivateContractAction({ payload: { id: contractId } })
    );
  }

  onReactivate(contractId: string): void {
    this.store$.dispatch(
      contractsActions.reactivateContractAction({ payload: { id: contractId } })
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
    this.searchContracts(this.searchParams);
  }

  handleSearchByText(searchText?: string): void {
    if (!this.searchParams) return;
    this.searchParams = { ...this.searchParams, searchText, pageIndex: 0 };
    this.searchContracts(this.searchParams);
  }

  getInvoiceTypeFilterValue(filter?: { key: string; value: any }): any {
    if (!filter || filter.value.length >= 2) return InvoiceTypeEnum.None;

    return filter.value[0];
  }

  getStatusFilterValue(filter?: { key: string; value: any }): any {
    if (!filter || filter.value.length >= 2) return ContractStatusFilterEnum.None;

    return filter.value[0];
  }

  handleDownloadAll(): void {
    if (!this.selectedContractsIds.length) return;

    const contractIds = [...this.selectedContractsIds];

    this.store$.dispatch(
      contractsActions.downloadSelectedContractAction({
        payload: {
          contractIds: contractIds.map((item) => item.id),
          customIds: contractIds.map((item) => item.customId),
        },
      })
    );
  }

  downloadContract(item: ResponseContractListItem): void {
    const { id, customId } = item;

    this.store$.dispatch(
      contractsActions.downloadContractAction({
        payload: {
          contractId: id,
          customId,
        },
      })
    );
  }
  onAllChecked(checked: boolean): void {
    this.contractsData.forEach((invoice) => this.updateCheckedSet(invoice, checked));
    this.refreshCheckedStatus();
  }

  updateCheckedSet(item: ResponseContractListItem, checked: boolean): void {
    const hasItem = this.hasInvoice(item);

    if (!hasItem && checked) {
      this.selectedContractsIds.push(item);
    }

    if (hasItem && !checked) {
      const currentItemIndex = this.selectedContractsIds.findIndex(
        (invoice) => invoice.id === item.id
      );

      this.selectedContractsIds.splice(currentItemIndex, 1);
    }
  }

  hasInvoice(appointment: ResponseContractListItem): boolean {
    return !!this.selectedContractsIds.find((item) => item.id === appointment.id);
  }

  refreshCheckedStatus(): void {
    this.checked = this.contractsData.every((item) => this.hasInvoice(item));
    this.indeterminateCheckbox =
      this.contractsData.some((clinician) => this.hasInvoice(clinician)) && !this.checked;
  }

  onItemCheckedChange(item: ResponseContractListItem, checked: boolean): void {
    this.updateCheckedSet(item, checked);
    this.refreshCheckedStatus();
  }

  onQueryParamsChange(event: NzTableQueryParams): void {
    const sortColumn = event.sort.find((item) => item.value !== null);

    const invoiceTypeFilter = event.filter.find((item) => item.key === 'InvoiceType');

    const statusFilter = event.filter.find((item) => item.key === 'Status');

    const invoiceTypeFilterValue = this.getInvoiceTypeFilterValue(invoiceTypeFilter);
    const statusFilterValue = this.getStatusFilterValue(statusFilter);

    this.searchParams = {
      ...this.searchParams,
      pageSize: event.pageSize,
      pageIndex: event.pageIndex - 1,
      invoiceTypeFilter: invoiceTypeFilterValue,
      statusFilter: statusFilterValue,
    };

    type ColumnSort = keyof typeof ContractOrderByOptionsEnum;

    if (sortColumn) {
      const sortColumnName: ContractOrderByOptionsEnum =
        ContractOrderByOptionsEnum[sortColumn.key as ColumnSort];
      const orderByAsc: boolean = sortColumn.value === 'ascend';
      this.searchParams.isOrderByAsc = orderByAsc;
      this.searchParams.contractOrderByOptions = sortColumnName;
    } else {
      this.searchParams.isOrderByAsc = undefined;
      this.searchParams.contractOrderByOptions = undefined;
    }

    this.searchContracts(this.searchParams);
  }

  private initializingSelectors(): void {
    this.isLoading$ = this.store$.select(selectIsLoading);
    this.subscriptions$.add(
      this.store$
        .select(contractsSelectors.selectContractsList)
        .pipe(filter((val) => val !== undefined))
        .subscribe((res) => {
          this.contractsData = res!.contracts;
          this.totalCount = res!.totalCount;
          this.changeDetection.detectChanges();
        })
    );
  }

  private searchContracts(searchData?: RequestGetContractListModel): void {
    if (!searchData) return;
    this.store$.dispatch(
      contractsActions.setContractsSearchParamsAction({
        payload: searchData,
      })
    );
  }

  ngOnDestroy(): void {
    this.store$.dispatch(contractsActions.clearContractsSearchParamsAction());
  }
}
