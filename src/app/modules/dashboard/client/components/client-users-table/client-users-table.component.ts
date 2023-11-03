import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewContainerRef,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { clone, isEqual } from 'lodash';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzTableFilterList, NzTableQueryParams } from 'ng-zorro-antd/table';
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
import { getDepartmentOptionsAction } from '../../../departments/store/department.actions';
import { ClientUserOrderByOptions } from '../../enums';
import { RequestGetClientUsersListModel, ResponseClientUserListItem } from '../../models';
import * as clientUsersActions from '../../store/client-users.actions';
import * as clientSelectors from '../../store/client.selectors';
import { AddNewClientUserModalComponent } from '../add-new-client-user-modal/add-new-client-user-modal.component';
import { UserPermissionsProvider } from 'src/app/shared/providers/user-permissions.provider';

@Component({
  selector: 'app-client-users-table',
  templateUrl: './client-users-table.component.html',
  styleUrls: ['./client-users-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientUsersTableComponent implements OnInit, OnDestroy {
  @Input() clientId?: string;
  readonly pageSizeOptions: number[] = CommonConstants.PAGE_SIZE_OPTIONS;
  readonly createUserPermission = PermissionClaimsEnum.ClientUserCreate;
  readonly updateUserPermission = PermissionClaimsEnum.ClientUserUpdate;
  readonly activateUserPermission = PermissionClaimsEnum.ClientUserActivate;
  readonly deactivateUserPermission = PermissionClaimsEnum.ClientUserDeactivate;
  readonly unlockUserPermission = PermissionClaimsEnum.ClientUserUnlock;
  readonly clientViewDetailsPermission = PermissionClaimsEnum.ClientViewDetails;

  readonly activeFilterOptions: SelectOptionModel<IsActiveFilterEnum>[] =
    CommonConstants.activeFilterOptions;
  readonly canBookFilterList: NzTableFilterList = [
    {
      text: 'Can book',
      value: CanBookOnlineFilterEnum.CanBookOnline,
    },
    {
      text: "Can't book",
      value: CanBookOnlineFilterEnum.CannotBookOnline,
    },
  ];
  private _searchParams!: RequestGetClientUsersListModel;
  private subscription: Subscription = new Subscription();

  clientUsersData: ResponseClientUserListItem[] = [];
  isLoading$?: Observable<boolean>;
  totalCount?: number;
  // editClientUserId?: string;
  // updateModalState: boolean = false;
  // addNewModalState: boolean = false;
  departmentListOptions?: { text: string; value: string }[];

  constructor(
    private store$: Store,
    private ngxPermissionsService: NgxPermissionsService,
    private modal: NzModalService,
    private changeDetection: ChangeDetectorRef,
    private viewContainerRef: ViewContainerRef,
    private userPermissionsProvider: UserPermissionsProvider
  ) {}

  ngOnInit(): void {
    this.store$.dispatch(
      getDepartmentOptionsAction({
        payload: {
          pageIndex: 0,
          pageSize: CommonConstants.PAGE_SIZE_OPTIONS[1],
          clientIds: [this.clientId!],
        },
      })
    );

    this.initializingSelectors();
  }

  get getIsCanDeactivateOrReactivate(): boolean {
    return this.userPermissionsProvider.isOHRDRoles;
  }

  set searchParams(value: RequestGetClientUsersListModel) {
    this._searchParams = { ...clone(value), clientId: this.clientId };
  }

  get searchParams(): RequestGetClientUsersListModel {
    return this._searchParams;
  }

  private initializingSelectors(): void {
    this.isLoading$ = this.store$.select(selectIsLoading);

    this.store$
      .select(clientSelectors.selectClientUsersList)
      .pipe(filter((val) => val !== undefined))
      .subscribe((res) => {
        if (!res) return;
        this.clientUsersData = res.clientUsers;
        this.totalCount = res.totalCount;
        this.changeDetection.detectChanges();
      });

    this.subscription.add(
      this.store$
        .select(clientSelectors.selectClientUsersSearchParams)
        .pipe(filter((val) => !!val))
        .subscribe((res) => {
          if (!res) return;
          if (isEqual(this.searchParams, res)) return;
          this.searchParams = clone(res);

          this.searchClients();
        })
    );
  }

  showNameOfDepartments(item: ResponseClientUserListItem): string {
    const departmentsNames = item.clientUserDepartments?.map(
      (item) => item.departmentName
    );
    return departmentsNames?.join(', ') ?? '';
  }

  changeUsersStateFilter(selectedIndex: number): void {
    if (!this.searchParams) return;

    const currentActiveFilter = this.activeFilterOptions[selectedIndex].value;
    this.searchParams = {
      ...this.searchParams,
      pageIndex: 0,
      isActiveFilter: currentActiveFilter,
    };
    this.searchClients(this.searchParams);
  }

  private searchClients(searchData?: RequestGetClientUsersListModel): void {
    if (!searchData) return;
    this.store$.dispatch(
      clientUsersActions.setClientUsersSearchParamsAction({
        payload: searchData,
      })
    );
  }

  getPhoneNumber(data: ResponseClientUserListItem): string {
    return `+${data.applicationUser.phoneCode} ${data.applicationUser.phoneNumber}`;
  }

  getBookingFilterValue(filter?: { key: string; value: any }): any {
    if (!filter || filter.value.length >= 2) return CanBookOnlineFilterEnum.None;

    return filter.value[0];
  }

  onQueryParamsChange(event: NzTableQueryParams): void {
    const sortColumn = event.sort.find((item) => item.value !== null);
    const departmentsFilter = event.filter.find((item) => item.key === 'Department');

    const bookingFilter = event.filter.find((item) => item.key === 'CanBookOnline');

    const bookingOnlineValue = this.getBookingFilterValue(bookingFilter);

    this.searchParams = {
      ...this.searchParams,
      canBookOnlineFilter: bookingOnlineValue,
      departmentIds: departmentsFilter?.value,
      pageSize: event.pageSize,
      pageIndex: event.pageIndex - 1,
    };

    type ColumnSort = keyof typeof ClientUserOrderByOptions;

    if (sortColumn) {
      const sortColumnName: ClientUserOrderByOptions =
        ClientUserOrderByOptions[sortColumn.key as ColumnSort];
      const orderByAsc: boolean = sortColumn.value === 'ascend';

      this.searchParams.isOrderByAsc = orderByAsc;
      this.searchParams.clientUserOrderByOptions = sortColumnName;
    } else {
      this.searchParams.isOrderByAsc = undefined;
      this.searchParams.clientUserOrderByOptions = undefined;
    }

    this.searchClients(this.searchParams);
  }

  handleSearchByText(searchText?: string): void {
    this.searchParams = { ...this.searchParams, searchText, pageIndex: 0 };
    this.searchClients(this.searchParams);
  }

  handleAddNew(): void {
    this.modal.create<AddNewClientUserModalComponent, any>({
      nzTitle: 'Add Client User',
      nzWidth: '484px',
      nzMaskClosable: false,
      nzContent: AddNewClientUserModalComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzData: {
        editClientUserId: undefined,
      },
      nzFooter: null,
    });
  }

  edit(id: string): void {
    this.ngxPermissionsService.permissions$.subscribe((permissions) => {
      const updatePermission = Object.keys(permissions).find(
        (item) => item === PermissionClaimsEnum.ClientUpdate
      );

      if (!updatePermission) {
        this.modal.create<AddNewClientUserModalComponent, any>({
          nzTitle: 'Client User',
          nzWidth: '484px',
          nzMaskClosable: false,
          nzContent: AddNewClientUserModalComponent,
          nzViewContainerRef: this.viewContainerRef,
          nzData: {
            editClientUserId: id,
            viewOnly: true,
          },
          nzFooter: null,
        });
      } else {
        this.modal.create<AddNewClientUserModalComponent, any>({
          nzTitle: 'Edit Client User',
          nzWidth: '484px',
          nzMaskClosable: false,
          nzContent: AddNewClientUserModalComponent,
          nzViewContainerRef: this.viewContainerRef,
          nzData: {
            editClientUserId: id,
          },
          nzFooter: null,
        });
      }
    });
  }

  deactivate(id: string): void {
    this.store$.dispatch(
      clientUsersActions.clientUserDeactivateAction({
        payload: { id },
      })
    );
  }

  reactivate(id: string): void {
    this.store$.dispatch(
      clientUsersActions.clientUsersActivateAction({
        payload: { id },
      })
    );
  }

  unlock(applicationUserId: string): void {
    this.store$.dispatch(
      clientUsersActions.clientUserUnlockAction({
        payload: { id: applicationUserId },
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.store$.dispatch(clientUsersActions.clearClientUserSearchParamsAction());
  }
}
