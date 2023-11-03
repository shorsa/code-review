import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { clone, isEqual } from 'lodash';
import { NzTableFilterValue, NzTableQueryParams } from 'ng-zorro-antd/table';
import { NgxPermissionsService } from 'ngx-permissions';
import { Observable, Subscription, filter } from 'rxjs';
import { selectIsLoading } from 'src/app/app-store/app-state/app-state.selectors';
import { CommonConstants } from 'src/app/core/constants';
import {
  CanBookOnlineFilterEnum,
  IsActiveFilterEnum,
  PermissionClaimsEnum,
} from 'src/app/shared/enums';
import { SearchHelper } from 'src/app/shared/helpers';
import { SelectOptionModel } from 'src/app/shared/models';
import { UserPermissionsProvider } from 'src/app/shared/providers/user-permissions.provider';
import { DepartmentOrderByOptionsEnum } from '../../enums';
import { RequestGetDepartmentListModel, ResponseDepartmentListItem } from '../../models';
import * as departmentActions from '../../store/department.actions';
import * as departmentSelectors from '../../store/department.selectors';

type SortType = 'Name' | 'Email' | 'CanBookOnline';

@Component({
  selector: 'app-client-department-table',
  templateUrl: './client-department-table.component.html',
  styleUrls: ['./client-department-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientDepartmentComponent implements OnInit, OnDestroy {
  @Input() clientId?: string;
  readonly pageSizeOptions: number[] = CommonConstants.PAGE_SIZE_OPTIONS;
  readonly departmentCreatePermission = PermissionClaimsEnum.DepartmentCreate;
  readonly departmentUpdatePermission = PermissionClaimsEnum.DepartmentUpdate;
  readonly departmentActivatePermission = PermissionClaimsEnum.DepartmentActivate;
  readonly departmentDeactivatePermission = PermissionClaimsEnum.DepartmentDeactivate;
  readonly departmentViewPermission = PermissionClaimsEnum.DepartmentViewDetails;
  readonly clientViewDetailsPermission = PermissionClaimsEnum.ClientViewDetails;

  readonly activeFilterOptions: SelectOptionModel<IsActiveFilterEnum>[] =
    CommonConstants.activeFilterOptions;
  private _searchParams: RequestGetDepartmentListModel = {
    pageIndex: 0,
    pageSize: this.pageSizeOptions[0],
    isActiveFilterEnum: IsActiveFilterEnum.Active,
  };
  private subscriptions$: Subscription = new Subscription();

  updateModalState: boolean = false;
  addNewModalState: boolean = false;
  isLoading$?: Observable<boolean>;
  departmentData: ResponseDepartmentListItem[] = [];
  totalCount?: number;
  pageSize: number = 12;
  editDepartmentId?: string;

  constructor(
    private store$: Store,
    private readonly userPermissionsProvider: UserPermissionsProvider,
    private changeDetection: ChangeDetectorRef,
    private ngxPermissionService: NgxPermissionsService
  ) {}

  ngOnInit(): void {
    this.initializingSelectors();
  }

  set searchParams(value: RequestGetDepartmentListModel) {
    this._searchParams = { ...clone(value), clientId: this.clientId };
  }

  get searchParams(): RequestGetDepartmentListModel {
    return this._searchParams;
  }

  get getIsViewOnly(): boolean {
    const getViewDepartmentPermission = this.ngxPermissionService.getPermission(
      PermissionClaimsEnum.DepartmentViewDetails
    )?.name;
    const getUpdateDepartmentPermission = this.ngxPermissionService.getPermission(
      PermissionClaimsEnum.DepartmentUpdate
    )?.name;
    const isView =
      getViewDepartmentPermission === PermissionClaimsEnum.DepartmentViewDetails;
    const isUpdate =
      getUpdateDepartmentPermission === PermissionClaimsEnum.DepartmentUpdate;

    return isView && !isUpdate;
  }

  get getIsClientRole(): boolean {
    return (
      this.userPermissionsProvider.isClientSuperuser ||
      this.userPermissionsProvider.isClientAdministrator
    );
  }

  private initializingSelectors(): void {
    this.isLoading$ = this.store$.select(selectIsLoading);
    this.subscriptions$.add(
      this.store$
        .select(departmentSelectors.selectDepartmentsList)
        .pipe(filter((val) => val !== undefined))
        .subscribe((res) => {
          if (!res) return;

          this.departmentData = res.departments;
          this.totalCount = res.totalCount;
          this.changeDetection.detectChanges();
        })
    );

    this.subscriptions$.add(
      this.store$
        .select(departmentSelectors.selectDepartmentsSearchParams)
        .pipe(filter((val) => val !== undefined))
        .subscribe((res) => {
          if (!res) return;
          if (isEqual(this.searchParams, res)) return;
          this.searchDepartments(this.searchParams);
        })
    );
  }

  private searchDepartments(searchData?: RequestGetDepartmentListModel): void {
    if (!searchData) return;
    this.store$.dispatch(
      departmentActions.setDepartmentSearchParamsAction({ payload: searchData })
    );
  }

  canBookFilter(event: any): void {}

  getFilterBookValue(canBookFilter?: {
    key: string;
    value: NzTableFilterValue[];
  }): CanBookOnlineFilterEnum {
    if (!canBookFilter?.value.length || canBookFilter?.value.length === 2)
      return CanBookOnlineFilterEnum.None;

    if (canBookFilter?.value.includes(CanBookOnlineFilterEnum.CanBookOnline)) {
      return CanBookOnlineFilterEnum.CanBookOnline;
    }
    if (canBookFilter?.value.includes(CanBookOnlineFilterEnum.CannotBookOnline)) {
      return CanBookOnlineFilterEnum.CannotBookOnline;
    }

    return CanBookOnlineFilterEnum.None;
  }

  onQueryParamsChange(event: NzTableQueryParams): void {
    const sortColumn = event.sort.find((item) => item.value !== null);
    this.pageSize = event.pageSize;

    const canBookFilter = event.filter.find((item) => item.key === 'CanBookOnline');
    const canBookOnlineValue = this.getFilterBookValue(canBookFilter);

    this.searchParams = {
      ...this.searchParams,
      canBookOnlineFilter: canBookOnlineValue,
      pageSize: event.pageSize,
      pageIndex: event.pageIndex - 1,
    };

    if (sortColumn) {
      const sortColumnName: DepartmentOrderByOptionsEnum =
        DepartmentOrderByOptionsEnum[sortColumn.key as SortType];
      const orderByAsc: boolean = sortColumn.value === 'ascend';

      this.searchParams.isOrderByAsc = orderByAsc;
      this.searchParams.departmentOrderByOptions = sortColumnName;
    } else {
      this.searchParams.isOrderByAsc = undefined;
      this.searchParams.departmentOrderByOptions = undefined;
    }

    this.searchDepartments(this.searchParams);
  }

  changeDepartmentStateFilter(selectedIndex: number): void {
    if (!this.searchParams) return;
    const currentActiveFilter = this.activeFilterOptions[selectedIndex].value;

    this.searchParams = {
      ...this.searchParams,

      isActiveFilterEnum: currentActiveFilter,
    };
    this.searchDepartments(this.searchParams);
  }

  handleCloseEditModal(): void {
    this.updateModalState = false;
    this.editDepartmentId = undefined;
  }

  handleSearchByText(searchText?: string): void {
    this.searchParams = { ...this.searchParams, searchText, pageIndex: 0 };
    this.searchDepartments(this.searchParams);
  }

  editDepartment(id: string): void {
    this.editDepartmentId = id;
    this.updateModalState = true;
  }

  viewDepartment(id: string): void {
    this.editDepartmentId = id;
    this.updateModalState = true;
  }

  deactivate(id: string): void {
    this.store$.dispatch(
      departmentActions.departmentDeactivateAction({
        payload: { id },
      })
    );
  }

  reactivate(id: string): void {
    this.store$.dispatch(
      departmentActions.departmentActivateAction({
        payload: { id },
      })
    );
  }

  handleAddNew(): void {
    this.addNewModalState = true;
  }

  ngOnDestroy(): void {
    this.store$.dispatch(departmentActions.clearDepartmentSearchParamsAction());
    this.subscriptions$.unsubscribe();
  }
}
