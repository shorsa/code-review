import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs';
import { CommonConstants, RoutesConstants } from 'src/app/core/constants';
import { IsActiveFilterEnum, PermissionClaimsEnum } from 'src/app/shared/enums';
import { SelectOptionModel } from 'src/app/shared/models';
import { RequestGetClientListModel } from '../../models';
import * as clientActions from '../../store/client.actions';
import * as clientSelectors from '../../store/client.selectors';
import { NgxPermissionsService } from 'ngx-permissions';
import { UserPermissionsProvider } from 'src/app/shared/providers/user-permissions.provider';
import { AuthenticationProvider } from 'src/app/shared/helpers';

@Component({
  templateUrl: './client-list-page.component.html',
  styleUrls: ['./client-list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientListPageComponent implements OnInit, OnDestroy {
  readonly activeFilterOptions: SelectOptionModel<IsActiveFilterEnum>[] =
    CommonConstants.activeFilterOptions;
  readonly permissionToCreate = PermissionClaimsEnum.ClientCreate;

  searchParams?: RequestGetClientListModel;

  constructor(
    private readonly userPermissionsProvider: UserPermissionsProvider,
    private readonly authProvider: AuthenticationProvider,
    private router: Router,
    private store$: Store
  ) {
    this.redirectToDetails();
  }

  get getIsCanDeactivateOrReactivate(): boolean {
    return this.userPermissionsProvider.isOHRDRoles;
  }

  ngOnInit(): void {
    this.initializingSelectors();
  }

  handleSearchByText(searchText?: string): void {
    if (!this.searchParams) return;
    this.searchParams = { ...this.searchParams, searchText, pageIndex: 0 };
    this.searchClients();
  }

  redirectToDetails(): void {
    const cannotViewClientsList = !this.userPermissionsProvider.isHasPermission(
      PermissionClaimsEnum.ClientViewAll
    );

    if (cannotViewClientsList) {
      const clientId = this.authProvider.getClientId;

      if (clientId) {
        this.router.navigate(
          [
            RoutesConstants.DASHBOARD_INDEX,
            RoutesConstants.DASHBOARD_CLIENT,
            RoutesConstants.DASHBOARD_CLIENT_EDIT,
          ],
          { queryParams: { id: clientId } }
        );
      }
    }
  }

  private initializingSelectors(): void {
    this.store$
      .select(clientSelectors.selectClientsSearchParams)
      .pipe(filter((val) => val !== undefined))
      .subscribe((searchParams) => {
        this.searchParams = searchParams;
      });
  }

  changeUsersStateFilter(selectedIndex: number) {
    if (!this.searchParams) return;

    const currentActiveFilter = this.activeFilterOptions[selectedIndex].value;
    this.searchParams = {
      ...this.searchParams,
      pageIndex: 0,
      isActiveFilter: currentActiveFilter,
    };

    this.searchClients();
  }

  private searchClients(): void {
    if (!this.searchParams) return;
    this.store$.dispatch(
      clientActions.setClientsSearchParamsAction({
        payload: this.searchParams,
      })
    );
  }

  navigateAddNewClient(): void {
    this.router.navigate([
      RoutesConstants.DASHBOARD_INDEX,
      RoutesConstants.DASHBOARD_CLIENT,
      RoutesConstants.DASHBOARD_CLIENT_ADD,
    ]);
  }

  ngOnDestroy(): void {
    this.store$.dispatch(clientActions.clearClientSearchParamsAction());
  }
}
