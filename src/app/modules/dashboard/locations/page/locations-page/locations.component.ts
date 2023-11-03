import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewContainerRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { clone } from 'lodash';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { Observable, Subscription, filter } from 'rxjs';
import { selectIsLoading } from 'src/app/app-store/app-state/app-state.selectors';
import { CommonConstants, RoutesConstants } from 'src/app/core/constants';
import { IsActiveFilterEnum } from 'src/app/shared/enums';
import { SearchHelper } from 'src/app/shared/helpers';
import { SelectOptionModel } from 'src/app/shared/models';
import { LocationsManagementModalComponent } from '../../components/locations-management-modal/locations-management-modal.component';
import {
  RequestGetLocationListModel,
  ResponseCheckLocationEntityForDeactivationAppointmentModel,
  ResponseLocationListItem,
} from '../../models';
import * as locationActions from '../../store/locations.actions';
import * as locationSelectors from '../../store/locations.selectors';
import { LocationService } from 'src/app/core/services/location.service';
import { WarningsAppointmentsModalComponent } from '../../components/warnings-appointments-modal/warnings-appointments-modal.component';

@Component({
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationsComponent implements OnInit, OnDestroy {
  readonly pageSizeOptions: number[] = CommonConstants.PAGE_SIZE_OPTIONS;
  private _searchParams: RequestGetLocationListModel = {
    pageSize: this.pageSizeOptions[0],
    pageIndex: 0,
    isActiveFilter: IsActiveFilterEnum.Active,
  };
  private subscriptions$: Subscription = new Subscription();
  readonly activeFilterOptions: SelectOptionModel<IsActiveFilterEnum>[] =
    CommonConstants.activeFilterOptions;

  locationsData: ResponseLocationListItem[] = [];
  totalCount: number = 0;
  isLoading$?: Observable<boolean>;

  constructor(
    private store$: Store,
    private changeDetection: ChangeDetectorRef,
    private router: Router,
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef,
    private readonly locationService: LocationService,
    private readonly searchHelper: SearchHelper
  ) {}

  ngOnInit(): void {
    this.initializingSelectors();
  }

  set searchParams(value: RequestGetLocationListModel) {
    this._searchParams = { ...clone(value) };
  }

  get searchParams(): RequestGetLocationListModel {
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

    this.searchLocations(this.searchParams);
  }

  private initializingSelectors(): void {
    this.isLoading$ = this.store$.select(selectIsLoading);
    this.subscriptions$.add(
      this.store$
        .select(locationSelectors.selectLocationsList)
        .pipe(filter((val) => val !== undefined))
        .subscribe((res) => {
          this.locationsData = res!.locations;
          this.totalCount = res!.totalCount;
          this.changeDetection.detectChanges();
        })
    );

    this.subscriptions$.add(
      this.searchHelper
        .setSearchSubscription()
        .pipe(filter((val) => !!val))
        .subscribe((searchText) => {
          this.searchParams = {
            ...this.searchParams,
            searchText: searchText,
            pageIndex: 0,
          };
          this.searchLocations(this.searchParams);
        })
    );
  }

  handleSearchByText(searchText?: string): void {
    this.searchParams = {
      ...this.searchParams,
      searchText: searchText,
      pageIndex: 0,
    };
    this.searchLocations(this.searchParams);
  }

  changeActiveFilter(selectedIndex: number): void {
    if (!this.searchParams) return;

    const currentActiveFilter = this.activeFilterOptions[selectedIndex].value;
    this.searchParams = {
      ...this.searchParams,
      pageIndex: 0,
      isActiveFilter: currentActiveFilter,
    };
    this.searchLocations(this.searchParams);
  }

  private searchLocations(searchData?: RequestGetLocationListModel): void {
    if (!searchData) return;
    this.store$.dispatch(
      locationActions.locationsSearchAction({
        payload: searchData,
      })
    );
  }

  handleAddNew(): void {
    this.modal.create<LocationsManagementModalComponent, any>({
      nzTitle: 'Please, enter location name',
      nzWidth: '484px',
      nzMaskClosable: false,
      nzData: {
        searchParams: this.searchParams,
      },
      nzContent: LocationsManagementModalComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzFooter: null,
    });
  }

  edit(id: string): void {
    this.modal.create<LocationsManagementModalComponent, any>({
      nzTitle: 'Edit location',
      nzWidth: '484px',
      nzMaskClosable: false,
      nzData: {
        locationId: id,
        searchParams: this.searchParams,
      },
      nzContent: LocationsManagementModalComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzFooter: null,
    });
  }

  navigateToSite(data: ResponseLocationListItem): void {
    this.router.navigate(
      [
        RoutesConstants.DASHBOARD_INDEX,
        RoutesConstants.DASHBOARD_LOCATIONS,
        RoutesConstants.DASHBOARD_SITES,
      ],
      { queryParams: { locationId: data.id } }
    );
  }

  deactivate(id: string): void {
    this.locationService
      .checkLocationEntityForDeactivation({ locationId: id })
      .subscribe((res) => {
        if (res.appointments.length) {
          this.createWarningAppointmentsModal(res.appointments);
        } else {
          this.store$.dispatch(
            locationActions.locationDeactivateAction({
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
      {
        list: ResponseCheckLocationEntityForDeactivationAppointmentModel[];
      }
    >({
      nzTitle: 'You cannot delete location with active appointments',
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
      locationActions.locationActivateAction({
        payload: { id },
        searchParams: this.searchParams,
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }
}
