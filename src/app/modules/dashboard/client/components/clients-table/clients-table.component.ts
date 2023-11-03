import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { clone, isEqual } from 'lodash';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { Observable, Subscription, filter } from 'rxjs';
import { selectIsLoading } from 'src/app/app-store/app-state/app-state.selectors';
import { CommonConstants, RoutesConstants } from 'src/app/core/constants';
import { SearchHelper } from 'src/app/shared/helpers';
import { ClientModel } from 'src/app/shared/models';
import { ClientOrderByOptionsEnum } from '../../enums';
import { RequestGetClientListModel, ResponseClientListItem } from '../../models';
import * as clientActions from '../../store/client.actions';
import * as clientSelectors from '../../store/client.selectors';
import { PermissionClaimsEnum } from 'src/app/shared/enums';
import { UserPermissionsProvider } from 'src/app/shared/providers/user-permissions.provider';

type SortType = 'CustomClientId' | 'ClientCode' | 'ClientLegalName' | 'ContactPerson';

@Component({
  selector: 'app-clients-table',
  templateUrl: './clients-table.component.html',
  styleUrls: ['./clients-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientsTableComponent implements OnInit, OnDestroy {
  readonly pageSizeOptions: number[] = CommonConstants.PAGE_SIZE_OPTIONS;
  readonly permissionViewDetails = PermissionClaimsEnum.ClientViewDetails;
  readonly permissionToUpdate = PermissionClaimsEnum.ClientUpdate;
  readonly permissionToActivate = PermissionClaimsEnum.ClientActivate;
  readonly permissionToDeactivate = PermissionClaimsEnum.ClientDeactivate;

  private subscription: Subscription = new Subscription();
  private _searchParams!: RequestGetClientListModel;

  clientsData: ResponseClientListItem[] = [];
  totalCount?: number;
  isLoading$?: Observable<boolean>;

  constructor(
    private store$: Store,
    private changeDetection: ChangeDetectorRef,
    private readonly userPermissionsProvider: UserPermissionsProvider,
    private router: Router,
    private readonly searchHelper: SearchHelper
  ) {}

  ngOnInit(): void {
    this.initializingSelectors();
  }

  set searchParams(value: RequestGetClientListModel) {
    this._searchParams = clone(value);
  }

  get searchParams(): RequestGetClientListModel {
    return this._searchParams;
  }

  private initializingSelectors(): void {
    this.isLoading$ = this.store$.select(selectIsLoading);

    this.store$
      .select(clientSelectors.selectClientsList)
      .pipe(filter((val) => val !== undefined))
      .subscribe((res) => {
        this.clientsData = res!.clients;
        this.totalCount = res!.totalCount;
        this.changeDetection.detectChanges();
      });

    this.subscription.add(
      this.store$
        .select(clientSelectors.selectClientsSearchParams)
        .pipe(filter((val) => val !== undefined))
        .subscribe((res) => {
          if (!res) return;
          if (isEqual(this.searchParams, res)) return;
          this.searchParams = clone(res);
          this.searchClients();
        })
    );

    this.subscription.add(
      this.searchHelper
        .setSearchSubscription()
        .pipe(filter((val) => !!val))
        .subscribe((searchText) => {
          this.searchParams = { ...this.searchParams, searchText, pageIndex: 0 };

          this.searchClients(this.searchParams);
        })
    );
  }

  private searchClients(searchData?: RequestGetClientListModel): void {
    if (!searchData) return;
    this.store$.dispatch(
      clientActions.setClientsSearchParamsAction({
        payload: searchData,
      })
    );
  }

  getIsCanViewDetails(clientId: string): boolean {
    if (this.userPermissionsProvider.isClientAdministrator) return false;

    if (this.userPermissionsProvider.isClientSuperuser) {
      return this.userPermissionsProvider.getIsCurrentClient(clientId);
    }

    return true;
  }

  onQueryParamsChange(event: NzTableQueryParams): void {
    const sortColumn = event.sort.find((item) => item.value !== null);

    this.searchParams = {
      ...this.searchParams,
      pageSize: event.pageSize,
      pageIndex: event.pageIndex - 1,
    };

    if (sortColumn) {
      const sortColumnName: ClientOrderByOptionsEnum =
        ClientOrderByOptionsEnum[sortColumn.key as SortType];
      const orderByAsc: boolean = sortColumn.value === 'ascend';

      this.searchParams.isOrderByAsc = orderByAsc;
      this.searchParams.clientOrderByOptions = sortColumnName;
    } else {
      this.searchParams.isOrderByAsc = undefined;
      this.searchParams.clientOrderByOptions = undefined;
    }
    this.searchClients(this.searchParams);
  }

  handleSearchByText(event: KeyboardEvent): void {
    const targetEl: HTMLInputElement = event.target as HTMLInputElement;
    this.searchHelper.searchNext(targetEl.value);
  }

  edit(id: string): void {
    this.router.navigate(
      [
        RoutesConstants.DASHBOARD_INDEX,
        RoutesConstants.DASHBOARD_CLIENT,
        RoutesConstants.DASHBOARD_CLIENT_EDIT,
      ],
      { queryParams: { id } }
    );
  }

  deactivate(id: string): void {
    this.store$.dispatch(
      clientActions.clientDeactivateAction({
        payload: { id },
      })
    );
  }

  reactivate(id: string): void {
    this.store$.dispatch(
      clientActions.clientActivateAction({
        payload: { id },
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
