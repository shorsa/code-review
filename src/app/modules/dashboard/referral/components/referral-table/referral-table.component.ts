import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewContainerRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { clone, isEqual } from 'lodash';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { NgxPermissionsService } from 'ngx-permissions';
import { Observable, Subscription, filter } from 'rxjs';
import { CommonConstants, RoutesConstants } from 'src/app/core/constants';
import {
  IsActiveFilterEnum,
  PermissionClaimsEnum,
  ReferralStatusEnum,
} from 'src/app/shared/enums';
import { SelectOptionModel } from 'src/app/shared/models';
import { UserPermissionsProvider } from 'src/app/shared/providers/user-permissions.provider';
import { ReferralOrderByOptionsEnum } from '../../enums';
import { RequestGetReferralListModel, ResponseReferralListItem } from '../../models';
import * as referralActions from '../../state/referral.actions';
import * as referralSelectors from '../../state/referral.selectors';
import {
  ReasonRejectModalComponent,
  ReasonRejectModalModel,
} from '../reason-reject-modal/reason-reject-modal.component';

@Component({
  selector: 'app-referral-table',
  templateUrl: './referral-table.component.html',
  styleUrls: ['./referral-table.component.scss'],
})
export class ReferralTableComponent implements OnInit, OnDestroy {
  readonly pageSizeOptions: number[] = CommonConstants.PAGE_SIZE_OPTIONS;
  readonly referralStatusFilterList = CommonConstants.referralStatusFilterList.map(
    ({ value, label }) => ({ text: label, value })
  );

  readonly referralViewDetailsPermission = PermissionClaimsEnum.ReferralViewDetails;
  readonly referralActivatePermission = PermissionClaimsEnum.ReferralActivate;
  readonly referralDeactivatePermission = PermissionClaimsEnum.ReferralDeactivate;
  readonly referralCreatePermission = PermissionClaimsEnum.ReferralCreate;
  readonly referralUpdatePermission = PermissionClaimsEnum.ReferralUpdate;
  readonly referralUpdateStatusPermission = PermissionClaimsEnum.ReferralUpdateStatus;
  readonly canTriagePermission = PermissionClaimsEnum.CanTriage;

  readonly activeFilterOptions: SelectOptionModel<IsActiveFilterEnum>[] =
    CommonConstants.activeFilterOptions;

  private _searchParams!: RequestGetReferralListModel;
  private subscriptions$: Subscription = new Subscription();

  isLoading$?: Observable<boolean>;
  referralData: ResponseReferralListItem[] = [];
  totalCount: number = 0;

  constructor(
    private store$: Store,
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef,
    private changeDetection: ChangeDetectorRef,
    private router: Router,
    private ngxPermissionsService: NgxPermissionsService,
    private readonly userPermissionsProvider: UserPermissionsProvider
  ) {}

  set searchParams(value: RequestGetReferralListModel) {
    this._searchParams = { ...clone(value) };
  }

  get searchParams(): RequestGetReferralListModel {
    return this._searchParams;
  }

  get getIsCanDeactivateOrReactivate(): boolean {
    return this.userPermissionsProvider.isOHRDRoles;
  }

  ngOnInit(): void {
    this.initializingSelectors();
  }

  isAvailableEdit(data: ResponseReferralListItem): boolean {
    return [
      ReferralStatusEnum.BookedForAppointment,
      ReferralStatusEnum.AwaitingTriage,
      ReferralStatusEnum.AwaitingClient,
      ReferralStatusEnum.BookedForScreening,
      ReferralStatusEnum.AwaitingSubmit,
      ReferralStatusEnum.WaitingForBooking,
    ].includes(data.status);
  }

  isAvailableAccept(data: ResponseReferralListItem): boolean {
    if (this.userPermissionsProvider.isClientRoles) return false;

    if (this.userPermissionsProvider.isOHRDAdministrator) {
      const hasCanTriage = !!this.ngxPermissionsService.getPermission(
        PermissionClaimsEnum.CanTriage
      );

      return (
        hasCanTriage &&
        (data.status === ReferralStatusEnum.AwaitingTriage ||
          data.status === ReferralStatusEnum.AwaitingClient)
      );
    }

    return (
      data.status === ReferralStatusEnum.AwaitingTriage ||
      data.status === ReferralStatusEnum.AwaitingClient
    );
  }

  isAvailableReject(data: ResponseReferralListItem): boolean {
    if (this.userPermissionsProvider.isClientRoles) return false;
    // const a = this.userPermissionsProvider.isOHRDAdministrator;
    // const b = !!this.ngxPermissionsService.getPermission(PermissionClaimsEnum.CanTriage);
    // const c = b && data.status === ReferralStatusEnum.AwaitingTriage;

    if (this.userPermissionsProvider.isOHRDAdministrator) {
      const hasCanTriage = !!this.ngxPermissionsService.getPermission(
        PermissionClaimsEnum.CanTriage
      );

      return hasCanTriage && data.status === ReferralStatusEnum.AwaitingTriage;
    }

    return data.status === ReferralStatusEnum.AwaitingTriage;
  }

  isAvailableSendBack(data: ResponseReferralListItem): boolean {
    if (this.userPermissionsProvider.isClientRoles) return false;

    if (this.userPermissionsProvider.isOHRDAdministrator) {
      const hasCanTriage = !!this.ngxPermissionsService.getPermission(
        PermissionClaimsEnum.CanTriage
      );
      return data.status === ReferralStatusEnum.AwaitingTriage && hasCanTriage;
    }

    return data.status === ReferralStatusEnum.AwaitingTriage;
  }

  isAvailableDeactivate(data: ResponseReferralListItem): boolean {
    if (this.userPermissionsProvider.isClientRoles) return false;

    return (
      data.status === ReferralStatusEnum.Completed ||
      data.status === ReferralStatusEnum.Rejected ||
      data.status === ReferralStatusEnum.Cancelled
    );
  }

  isAvailableReactivate(data: ResponseReferralListItem): boolean {
    if (this.userPermissionsProvider.isClientRoles) return false;
    const currentStatuses = !(
      data.status === ReferralStatusEnum.Completed ||
      data.status === ReferralStatusEnum.Rejected ||
      data.status === ReferralStatusEnum.Cancelled
    );
    if (this.userPermissionsProvider.isOHRDAdministrator) {
      const hasCanTriage = !!this.ngxPermissionsService.getPermission(
        PermissionClaimsEnum.CanTriage
      );
      return currentStatuses && hasCanTriage;
    }

    return currentStatuses;
  }

  isAvailableCancel(data: ResponseReferralListItem): boolean {
    if (this.userPermissionsProvider.isClientRoles) return false;
    const currentStatuses =
      ![
        ReferralStatusEnum.Cancelled,
        ReferralStatusEnum.Rejected,
        ReferralStatusEnum.Completed,
      ].includes(data.status) || data.status === ReferralStatusEnum.AwaitingTriage;

    if (this.userPermissionsProvider.isOHRDAdministrator) {
      const hasCanTriage = !!this.ngxPermissionsService.getPermission(
        PermissionClaimsEnum.CanTriage
      );
      return currentStatuses && hasCanTriage;
    }

    return currentStatuses;
  }

  backToClient(data: ResponseReferralListItem): boolean {
    return data.status === ReferralStatusEnum.AwaitingTriage;
  }

  onQueryParamsChange(event: NzTableQueryParams): void {
    const sortColumn = event.sort.find((item) => item.value !== null);

    const statusFilter = event.filter.find((item) => item.key === 'Status');

    const statusValue = this.getStatusFilterValue(statusFilter);

    this.searchParams = {
      ...this.searchParams,
      statusFilter: statusValue,
      pageSize: event.pageSize,
      pageIndex: event.pageIndex - 1,
    };

    type ColumnSort = keyof typeof ReferralOrderByOptionsEnum;

    if (sortColumn) {
      const sortColumnName: ReferralOrderByOptionsEnum =
        ReferralOrderByOptionsEnum[sortColumn.key as ColumnSort];
      const orderByAsc: boolean = sortColumn.value === 'ascend';

      this.searchParams.isOrderByAsc = orderByAsc;
      this.searchParams.referralOrderByOptions = sortColumnName;
    } else {
      this.searchParams.isOrderByAsc = undefined;
      this.searchParams.referralOrderByOptions = undefined;
    }

    this.searchReferrals(this.searchParams);
  }

  handleSearchByText(searchText?: string): void {
    this.searchParams = { ...this.searchParams, searchText, pageIndex: 0 };
    this.searchReferrals(this.searchParams);
  }

  addNewReferral(): void {
    this.router.navigate([
      RoutesConstants.DASHBOARD_INDEX,
      RoutesConstants.DASHBOARD_REFERRAL,
      RoutesConstants.DASHBOARD_REFERRAL_ADD,
    ]);
  }

  changeUsersStateFilter(selectedIndex: number): void {
    if (!this.searchParams) return;

    const currentActiveFilter = this.activeFilterOptions[selectedIndex].value;
    this.searchParams = {
      ...this.searchParams,
      pageIndex: 0,
      isActiveFilter: currentActiveFilter,
    };
    this.searchReferrals(this.searchParams);
  }

  navigateToEdit(id: string): void {
    this.router.navigate(
      [
        RoutesConstants.DASHBOARD_INDEX,
        RoutesConstants.DASHBOARD_REFERRAL,
        RoutesConstants.DASHBOARD_REFERRAL_EDIT,
      ],
      { queryParams: { id } }
    );
  }

  handleDeactivate(id: string): void {
    this.store$.dispatch(
      referralActions.referralDeactivateAction({
        payload: { id },
      })
    );
  }

  handleReactivate(id: string): void {
    this.store$.dispatch(
      referralActions.referralActivateAction({
        payload: { id },
      })
    );
  }

  handleAccept(id: string): void {
    this.changeStatus(id, ReferralStatusEnum.WaitingForBooking);
  }

  handleReject(id: string): void {
    this.modal.create<ReasonRejectModalComponent, ReasonRejectModalModel>({
      nzTitle: 'Reason for Rejection',
      nzWidth: '484px',
      nzMaskClosable: false,
      nzContent: ReasonRejectModalComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzData: {
        id,
        status: ReferralStatusEnum.Rejected,
      },
      nzFooter: null,
    });
  }

  handleCancel(id: string): void {
    this.modal.create<ReasonRejectModalComponent, ReasonRejectModalModel>({
      nzTitle: 'Reason for Cancelation',
      nzWidth: '484px',
      nzMaskClosable: false,
      nzContent: ReasonRejectModalComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzData: {
        id,
        status: ReferralStatusEnum.Cancelled,
      },
      nzFooter: null,
    });
  }

  handleSendBack(id: string): void {
    this.modal.create<ReasonRejectModalComponent, ReasonRejectModalModel>({
      nzTitle: 'Reason for Sending Back',
      nzWidth: '484px',
      nzMaskClosable: false,
      nzContent: ReasonRejectModalComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzData: {
        id,
        status: ReferralStatusEnum.AwaitingClient,
      },
      nzFooter: null,
    });
  }

  private initializingSelectors(): void {
    this.subscriptions$.add(
      this.store$
        .select(referralSelectors.selectReferralsList)
        .pipe(filter((val) => val !== undefined))
        .subscribe((res) => {
          if (!res) return;
          this.referralData = res.referrals;
          this.totalCount = res.totalCount;
          this.changeDetection.detectChanges();
        })
    );

    this.subscriptions$.add(
      this.subscriptions$.add(
        this.store$
          .select(referralSelectors.selectReferralsSearchParams)
          .pipe(filter((val) => !!val))
          .subscribe((res) => {
            if (!res) return;
            if (isEqual(this.searchParams, res)) return;
            this.searchParams = clone(res);
          })
      )
    );
  }

  private searchReferrals(searchData?: RequestGetReferralListModel): void {
    if (!searchData) return;
    this.store$.dispatch(
      referralActions.setReferralSearchParamsAction({
        payload: searchData,
      })
    );
  }

  private changeStatus(id: string, status: ReferralStatusEnum): void {
    this.store$.dispatch(
      referralActions.referralChangeStatusAction({
        payload: { id, status },
      })
    );
  }

  private getStatusFilterValue(filter?: { key: string; value: any }): any {
    if (!filter || filter.value.length >= 2) return undefined;

    return filter.value[0];
  }

  ngOnDestroy(): void {
    this.store$.dispatch(referralActions.clearReferralSearchParamsAction());
    this.subscriptions$.unsubscribe();
  }
}
