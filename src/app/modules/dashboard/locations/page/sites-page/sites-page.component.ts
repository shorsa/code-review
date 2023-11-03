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
import { CommonConstants, RoutesConstants } from 'src/app/core/constants';
import { LocationService } from 'src/app/core/services/location.service';
import { IsActiveFilterEnum } from 'src/app/shared/enums';
import { SearchHelper } from 'src/app/shared/helpers';
import { SelectOptionModel } from 'src/app/shared/models';
import { SiteManagementModalComponent } from '../../components/site-management-modal/site-management-modal.component';
import { WarningsAppointmentsModalComponent } from '../../components/warnings-appointments-modal/warnings-appointments-modal.component';
import {
  RequestGetSiteListModel,
  ResponseCheckLocationEntityForDeactivationAppointmentModel,
  ResponseSiteListItem,
} from '../../models';
import * as siteActions from '../../store/sites.actions';
import * as siteSelectors from '../../store/sites.selectors';

@Component({
  selector: 'app-sites-page',
  templateUrl: './sites-page.component.html',
  styleUrls: ['./sites-page.component.scss'],
})
export class SitesPageComponent implements OnInit, OnDestroy {
  readonly pageSizeOptions: number[] = CommonConstants.PAGE_SIZE_OPTIONS;
  private _searchParams: RequestGetSiteListModel = {
    pageSize: this.pageSizeOptions[0],
    pageIndex: 0,
    isActiveFilter: IsActiveFilterEnum.Active,
  };
  private subscription: Subscription = new Subscription();
  readonly activeFilterOptions: SelectOptionModel<IsActiveFilterEnum>[] =
    CommonConstants.activeFilterOptions;
  private locationId!: string;
  sitesData: ResponseSiteListItem[] = [];
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
      this.locationId = params[CommonConstants.QUERY_LOCATION_ID];
    });
  }

  set searchParams(value: RequestGetSiteListModel) {
    this._searchParams = { ...clone(value), locationId: this.locationId };
  }

  get searchParams(): RequestGetSiteListModel {
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

    this.searchSites(this.searchParams);
  }

  private initializingSelectors(): void {
    this.isLoading$ = this.store$.select(selectIsLoading);

    this.store$
      .select(siteSelectors.selectSiteList)
      .pipe(filter((val) => val !== undefined))
      .subscribe((res) => {
        this.sitesData = res!.sites;
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
          this.searchSites(this.searchParams);
        })
    );
  }

  navigateToRoom(data: ResponseSiteListItem): void {
    this.router.navigate(
      [
        RoutesConstants.DASHBOARD_INDEX,
        RoutesConstants.DASHBOARD_LOCATIONS,
        RoutesConstants.DASHBOARD_ROOMS,
      ],
      { queryParams: { [CommonConstants.QUERY_SITE_ID]: data.id } }
    );
  }

  backToLocations(): void {
    this.location.back();
  }

  handleSearchByText(searchText?: string): void {
    this.searchParams = { ...this.searchParams, searchText, pageIndex: 0 };
    this.searchSites(this.searchParams);
  }

  changeActiveFilter(selectedIndex: number): void {
    if (!this.searchParams) return;

    const currentActiveFilter = this.activeFilterOptions[selectedIndex].value;
    this.searchParams = {
      ...this.searchParams,
      pageIndex: 0,
      isActiveFilter: currentActiveFilter,
    };
    this.searchSites(this.searchParams);
  }

  private searchSites(searchData?: RequestGetSiteListModel): void {
    if (!searchData) return;
    this.store$.dispatch(
      siteActions.sitesSearchAction({
        payload: searchData,
      })
    );
  }

  handleAddNew(): void {
    this.modal.create<SiteManagementModalComponent, any>({
      nzTitle: 'Site',
      nzWidth: '484px',
      nzMaskClosable: false,
      nzData: {
        locationId: this.locationId,
        searchParams: this.searchParams,
      },
      nzContent: SiteManagementModalComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzFooter: null,
    });
  }

  edit(id: string): void {
    this.modal.create<SiteManagementModalComponent, any>({
      nzTitle: 'Site',
      nzWidth: '484px',
      nzMaskClosable: false,
      nzData: {
        siteId: id,
        locationId: this.locationId,
        searchParams: this.searchParams,
      },
      nzContent: SiteManagementModalComponent,
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
            siteActions.siteDeactivateAction({
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
      nzTitle: 'You cannot delete site with active appointments',
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
      siteActions.siteActivateAction({ payload: { id }, searchParams: this.searchParams })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
