import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs';
import { CommonConstants, RoutesConstants } from 'src/app/core/constants';
import { IsActiveFilterEnum, PermissionClaimsEnum } from 'src/app/shared/enums';
import { SelectOptionModel } from 'src/app/shared/models';
import { RequestGetAppointmentListModel } from '../../models';
import * as appointmentActions from '../../store/appointments.actions';
import * as appointmentSelectors from '../../store/appointments.selectors';
import { UserPermissionsProvider } from 'src/app/shared/providers/user-permissions.provider';

@Component({
  templateUrl: './appointment-list-page.component.html',
  styleUrls: ['./appointment-list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppointmentsPageComponent implements OnInit, OnDestroy {
  readonly permissionAppointmentCreate = PermissionClaimsEnum.AppointmentCreate;
  readonly permissionAppointmentUpdate = PermissionClaimsEnum.AppointmentUpdate;
  readonly permissionAppointmentViewDetails = PermissionClaimsEnum.AppointmentViewDetails;
  readonly permissionAppointmentCancel = PermissionClaimsEnum.AppointmentCancel;

  readonly activeFilterOptions: SelectOptionModel<IsActiveFilterEnum>[] =
    CommonConstants.activeFilterOptions;

  searchParams?: RequestGetAppointmentListModel;
  constructor(
    private router: Router,
    private store$: Store,
    private userPermissionsProvider: UserPermissionsProvider
  ) {}

  get getIsCanDeactivateOrReactivate(): boolean {
    return this.userPermissionsProvider.isOHRDRoles;
  }

  ngOnInit(): void {
    this.initializingSelectors();
  }

  private initializingSelectors(): void {
    this.store$
      .select(appointmentSelectors.selectAppointmentsSearchParams)
      .pipe(filter((val) => val !== undefined))
      .subscribe((searchParams) => {
        this.searchParams = searchParams;
      });
  }

  navigateAddNewAppointment(): void {
    this.router.navigate([
      RoutesConstants.DASHBOARD_INDEX,
      RoutesConstants.DASHBOARD_APPOINTMENTS,
      RoutesConstants.DASHBOARD_APPOINTMENTS_ADD,
    ]);
  }

  handleSearchByText(searchText?: string): void {
    if (!this.searchParams) return;
    this.searchParams = { ...this.searchParams, searchText, pageIndex: 0 };
    this.search(this.searchParams);
  }

  changeAppointmentStateFilter(selectedIndex: number): void {
    if (!this.searchParams) return;

    const currentActiveFilter = this.activeFilterOptions[selectedIndex].value;
    this.searchParams = {
      ...this.searchParams,
      pageIndex: 0,
      isActiveFilter: currentActiveFilter,
    };

    this.search(this.searchParams);
  }

  private search(searchParams: RequestGetAppointmentListModel): void {
    this.store$.dispatch(
      appointmentActions.setAppointmentsSearchParamsAction({
        payload: searchParams,
      })
    );
  }

  ngOnDestroy(): void {
    this.store$.dispatch(appointmentActions.clearAppointmentSearchParamsAction());
  }
}
