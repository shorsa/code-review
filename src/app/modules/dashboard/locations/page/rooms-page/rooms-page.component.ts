import { Location } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewContainerRef,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { clone } from 'lodash';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { Observable, Subscription, filter } from 'rxjs';
import { selectIsLoading } from 'src/app/app-store/app-state/app-state.selectors';
import { CommonConstants } from 'src/app/core/constants';
import { LocationService } from 'src/app/core/services/location.service';
import { IsActiveFilterEnum } from 'src/app/shared/enums';
import { SearchHelper } from 'src/app/shared/helpers';
import { SelectOptionModel } from 'src/app/shared/models';
import { RoomManagementModalComponent } from '../../components/room-management-modal/room-management-modal.component';
import { WarningsAppointmentsModalComponent } from '../../components/warnings-appointments-modal/warnings-appointments-modal.component';
import {
  RequestGetRoomListModel,
  ResponseCheckLocationEntityForDeactivationAppointmentModel,
  ResponseRoomListItem,
} from '../../models';
import * as roomActions from '../../store/rooms.actions';
import * as roomSelectors from '../../store/rooms.selectors';

@Component({
  selector: 'app-rooms-page',
  templateUrl: './rooms-page.component.html',
  styleUrls: ['./rooms-page.component.scss'],
})
export class RoomsPageComponent implements OnInit, OnDestroy {
  readonly pageSizeOptions: number[] = CommonConstants.PAGE_SIZE_OPTIONS;
  private _searchParams: RequestGetRoomListModel = {
    pageSize: this.pageSizeOptions[0],
    pageIndex: 0,
    isActiveFilter: IsActiveFilterEnum.Active,
  };
  private subscription: Subscription = new Subscription();
  readonly activeFilterOptions: SelectOptionModel<IsActiveFilterEnum>[] =
    CommonConstants.activeFilterOptions;
  private siteId!: string;
  roomsData: ResponseRoomListItem[] = [];
  totalCount: number = 0;
  isLoading$?: Observable<boolean>;

  constructor(
    private store$: Store,
    private changeDetection: ChangeDetectorRef,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private locationService: LocationService,

    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef,
    private readonly searchHelper: SearchHelper
  ) {}

  ngOnInit(): void {
    this.initializingSelectors();

    this.activatedRoute.queryParams.pipe(filter((val) => !!val)).subscribe((params) => {
      this.siteId = params[CommonConstants.QUERY_SITE_ID];
    });
  }

  set searchParams(value: RequestGetRoomListModel) {
    this._searchParams = { ...clone(value), siteId: this.siteId };
  }

  get searchParams(): RequestGetRoomListModel {
    return this._searchParams;
  }

  onQueryParamsChange(event: NzTableQueryParams): void {
    const sortColumn = event.sort.find((item) => item.value !== null);

    this.searchParams = {
      ...this.searchParams,
      pageSize: event.pageSize,
      pageIndex: event.pageIndex - 1,
    };

    if (sortColumn) {
      const orderByAsc: boolean = sortColumn.value === 'ascend';
      this.searchParams.isOrderByAsc = orderByAsc;
    } else {
      this.searchParams.isOrderByAsc = undefined;
    }

    this.searchRooms(this.searchParams);
  }

  private initializingSelectors(): void {
    this.isLoading$ = this.store$.select(selectIsLoading);

    this.store$
      .select(roomSelectors.selectRoomList)
      .pipe(filter((val) => val !== undefined))
      .subscribe((res) => {
        this.roomsData = res!.rooms;
        this.totalCount = res!.totalCount;
        this.changeDetection.detectChanges();
      });

    this.subscription.add(
      this.searchHelper
        .setSearchSubscription()
        .pipe(filter((val) => !!val))
        .subscribe((searchText) => {
          this.searchParams = {
            ...this.searchParams,
            searchText: searchText,
            pageIndex: 0,
          };
          this.searchRooms(this.searchParams);
        })
    );
  }

  navigateToSites(): void {
    this.location.back();
  }

  handleSearchByText(searchText?: string): void {
    this.searchParams = { ...this.searchParams, searchText, pageIndex: 0 };
    this.searchRooms(this.searchParams);
  }

  changeActiveFilter(selectedIndex: number): void {
    if (!this.searchParams) return;

    const currentActiveFilter = this.activeFilterOptions[selectedIndex].value;
    this.searchParams = {
      ...this.searchParams,
      pageIndex: 0,
      isActiveFilter: currentActiveFilter,
    };
    this.searchRooms(this.searchParams);
  }

  private searchRooms(searchData?: RequestGetRoomListModel): void {
    if (!searchData) return;
    this.store$.dispatch(
      roomActions.roomsSearchAction({
        payload: searchData,
      })
    );
  }

  handleAddNew(): void {
    this.modal.create<RoomManagementModalComponent, any>({
      nzTitle: 'Create room',
      nzWidth: '484px',
      nzMaskClosable: false,
      nzData: {
        siteId: this.siteId,
        searchParams: this.searchParams,
      },
      nzContent: RoomManagementModalComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzFooter: null,
    });
  }

  edit(id: string): void {
    this.modal.create<RoomManagementModalComponent, any>({
      nzTitle: 'Edit room',
      nzWidth: '484px',
      nzMaskClosable: false,
      nzData: {
        roomId: id,
        siteId: this.siteId,
        searchParams: this.searchParams,
      },
      nzContent: RoomManagementModalComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzFooter: null,
    });
  }

  deactivate(id: string): void {
    this.locationService
      .checkLocationEntityForDeactivation({ locationId: id })
      .subscribe((res) => {
        if (res.appointments.length) {
          this.createWarningAppointmentsModal(res.appointments);
        } else {
          this.store$.dispatch(
            roomActions.roomDeactivateAction({
              payload: { id },
              searchParams: this.searchParams,
            })
          );
        }
      });
  }

  createWarningAppointmentsModal(
    data: ResponseCheckLocationEntityForDeactivationAppointmentModel[]
  ): void {
    this.modal.create<
      WarningsAppointmentsModalComponent,
      { list: ResponseCheckLocationEntityForDeactivationAppointmentModel[] }
    >({
      nzTitle: 'You cannot delete room with active appointments',
      nzWidth: '884px',
      nzMaskClosable: false,
      nzData: {
        list: data,
      },
      nzContent: WarningsAppointmentsModalComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzFooter: null,
    });
  }

  reactivate(id: string): void {
    this.store$.dispatch(
      roomActions.roomActivateAction({ payload: { id }, searchParams: this.searchParams })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
