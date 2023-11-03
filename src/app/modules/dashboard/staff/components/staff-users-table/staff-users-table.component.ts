import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Router } from '@angular/router';
import { clone } from 'lodash';
import { NzTableFilterList, NzTableQueryParams } from 'ng-zorro-antd/table';
import { Observable, Subscription, filter } from 'rxjs';
import { selectIsLoading } from 'src/app/app-store/app-state/app-state.selectors';
import { CommonConstants, RoutesConstants } from 'src/app/core/constants';
import { IsActiveFilterEnum, UserRoleEnum } from 'src/app/shared/enums';
import { SearchHelper } from 'src/app/shared/helpers';
import { OHRDUserModel, UserModel } from 'src/app/shared/models';
import { StaffUserOrderByOptionsEnum, StaffUserRoleEnum } from '../../enums';
import { RequestGetStaffUserListModel } from '../../models';
import * as staffActions from '../../store/staff.actions';
import * as staffSelectors from '../../store/staff.selectors';

type SearchTextOptionsType = 'userNameSearch' | 'userPhoneSearch' | 'userEmailSearch';

@Component({
  selector: 'app-staff-users-table',
  templateUrl: './staff-users-table.component.html',
  styleUrls: ['./staff-users-table.component.scss'],
})
export class StaffUsersTableComponent implements OnInit, OnDestroy {
  readonly pageSizeOptions: number[] = CommonConstants.PAGE_SIZE_OPTIONS;
  readonly activeFilterOptions: NzTableFilterList =
    CommonConstants.activeFilterOptions.map((item) => ({
      value: item.value,
      text: item.label,
    }));

  readonly roleFilterOptions: NzTableFilterList = [
    {
      text: 'OHRD Superuser',
      value: StaffUserRoleEnum.OHRDSuperuser,
    },
    {
      text: 'OHRD Administrator',
      value: StaffUserRoleEnum.OHRDAdministrator,
    },
  ];

  private _searchParams!: RequestGetStaffUserListModel;
  private subscription: Subscription = new Subscription();

  isLoading$?: Observable<boolean>;
  totalCount?: number;
  editStaffUserId?: string;
  updateModalState: boolean = false;
  addNewModalState: boolean = false;
  staffUsersData: OHRDUserModel[] = [];

  constructor(
    private store$: Store,
    private router: Router,
    private changeDetection: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.initializingSelectors();
  }

  set searchParams(value: RequestGetStaffUserListModel) {
    this._searchParams = { ...clone(value) };
  }

  get searchParams(): RequestGetStaffUserListModel {
    return this._searchParams;
  }

  private initializingSelectors(): void {
    this.isLoading$ = this.store$.select(selectIsLoading);

    this.store$
      .select(staffSelectors.selectStaffList)
      .pipe(filter((val) => val !== undefined))
      .subscribe((res) => {
        if (!res) return;
        this.staffUsersData = res.ohrdUsers;
        this.totalCount = res.totalCount;
        this.changeDetection.detectChanges();
      });

    this.subscription.add(
      this.store$
        .select(staffSelectors.selectStaffSearchParams)
        .pipe(filter((val) => !!val))
        .subscribe((res) => {
          if (!res) return;
          this.searchParams = clone(res);
        })
    );
  }

  getUserRole(role?: UserRoleEnum): string {
    return this.roleFilterOptions.find((item) => item.value === role)?.text ?? '';
  }

  getPhoneNumber(data: UserModel): string {
    return `+${data.phoneCode} ${data.phoneNumber}`;
  }

  onQueryParamsChange(event: NzTableQueryParams): void {
    const sortColumn = event.sort.find((item) => item.value !== null);
    const roleFilter = event.filter.find((item) => item.key === 'Role');

    this.searchParams = {
      ...this.searchParams,
      roleFilters: roleFilter?.value,
      pageSize: event.pageSize,
      pageIndex: event.pageIndex - 1,
    };

    type ColumnSort = keyof typeof StaffUserOrderByOptionsEnum;

    if (sortColumn) {
      const sortColumnName: StaffUserOrderByOptionsEnum =
        StaffUserOrderByOptionsEnum[sortColumn.key as ColumnSort];
      const orderByAsc: boolean = sortColumn.value === 'ascend';

      this.searchParams.isOrderByAsc = orderByAsc;
      this.searchParams.oHRDUserOrderByOptions = sortColumnName;
    } else {
      this.searchParams.isOrderByAsc = undefined;
      this.searchParams.oHRDUserOrderByOptions = undefined;
    }

    this.store$.dispatch(
      staffActions.setStaffSearchParamsAction({
        payload: this.searchParams,
      })
    );
  }

  edit(id: string): void {
    this.router.navigate(
      [
        RoutesConstants.DASHBOARD_INDEX,
        RoutesConstants.DASHBOARD_STAFF,
        RoutesConstants.DASHBOARD_STAFF_EDIT,
      ],
      { queryParams: { id } }
    );
  }

  deactivate(id: string): void {
    this.store$.dispatch(
      staffActions.staffDeactivateAction({
        payload: { id },
      })
    );
  }

  reactivate(id: string): void {
    this.store$.dispatch(
      staffActions.staffActivateAction({
        payload: { id },
      })
    );
  }

  unlock(applicationUserId: string): void {
    this.store$.dispatch(
      staffActions.staffUnlockAction({
        payload: { id: applicationUserId },
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
