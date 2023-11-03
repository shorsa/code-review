import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs';
import { CommonConstants, RoutesConstants } from 'src/app/core/constants';
import { IsActiveFilterEnum } from 'src/app/shared/enums';
import { SelectOptionModel } from 'src/app/shared/models';
import * as staffActions from '../../store/staff.actions';
import * as staffSelectors from '../../store/staff.selectors';
import { RequestGetStaffUserListModel } from '../../models';

@Component({
  templateUrl: './staff-user-list.component.html',
  styleUrls: ['./staff-user-list.component.scss'],
})
export class StaffUserListComponent implements OnInit, OnDestroy {
  readonly activeFilterOptions: SelectOptionModel<IsActiveFilterEnum>[] =
    CommonConstants.activeFilterOptions;

  searchParams?: RequestGetStaffUserListModel;

  constructor(private router: Router, private store$: Store) {}

  ngOnInit() {
    this.initializingSelectors();
  }

  private initializingSelectors(): void {
    this.store$
      .select(staffSelectors.selectStaffSearchParams)
      .pipe(filter((val) => val !== undefined))
      .subscribe((searchParams) => {
        this.searchParams = searchParams!;
      });
  }

  searchText(searchText?: string): void {
    if (!this.searchParams) return;
    this.searchParams = { ...this.searchParams, searchText, pageIndex: 0 };
    this.store$.dispatch(
      staffActions.setStaffSearchParamsAction({
        payload: this.searchParams,
      })
    );
  }

  changeUsersStateFilter(selectedIndex: number) {
    if (!this.searchParams) return;

    const currentActiveFilter = this.activeFilterOptions[selectedIndex].value;

    this.searchParams = {
      ...this.searchParams,
      pageIndex: 0,
      isActiveFilter: currentActiveFilter,
    };

    this.store$.dispatch(
      staffActions.setStaffSearchParamsAction({
        payload: this.searchParams,
      })
    );
  }

  navigateAddNewStaff(): void {
    this.router.navigate([
      RoutesConstants.DASHBOARD_INDEX,
      RoutesConstants.DASHBOARD_STAFF,
      RoutesConstants.DASHBOARD_STAFF_ADD,
    ]);
  }

  ngOnDestroy(): void {
    this.store$.dispatch(staffActions.clearStaffSearchParamsAction());
  }
}
