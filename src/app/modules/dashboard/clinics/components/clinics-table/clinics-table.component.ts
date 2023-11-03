import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { clone } from 'lodash';
import { NzTableFilterList, NzTableQueryParams } from 'ng-zorro-antd/table';
import { Observable, Subscription, filter } from 'rxjs';
import { selectIsLoading } from 'src/app/app-store/app-state/app-state.selectors';
import { CommonConstants, RoutesConstants } from 'src/app/core/constants';
import {
  ClinicTypeEnum,
  IsActiveFilterEnum,
  PermissionClaimsEnum,
} from 'src/app/shared/enums';
import { SearchHelper } from 'src/app/shared/helpers';
import { ClinicOrderByOptionsEnum } from '../../enums';
import {
  RequestGetAvailableAppointmentDatesByMonthModel,
  RequestGetAvailableAppointmentDatesModel,
  RequestGetClinicListModel,
  ResponseClinicListItem,
} from '../../models';
import * as clinicsActions from '../../store/clinics.actions';
import * as clinicsSelectors from '../../store/clinics.selectors';
import { ClinicsService } from 'src/app/core/services/clinics.service';
import { errorAction } from 'src/app/app-store/app-state/app-state.actions';
import { UserPermissionsProvider } from 'src/app/shared/providers/user-permissions.provider';

@Component({
  selector: 'app-clinics-table',
  templateUrl: './clinics-table.component.html',
  styleUrls: ['./clinics-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClinicsTableComponent implements OnInit, OnDestroy {
  readonly permissionToUpdate = PermissionClaimsEnum.ClinicUpdate;
  readonly permissionViewDetails = PermissionClaimsEnum.ClinicViewDetails;
  readonly permissionCanBookOnline = PermissionClaimsEnum.CanBookOnline;

  readonly pageSizeOptions: number[] = [15, 30, CommonConstants.PAGE_SIZE_OPTIONS[2]];
  readonly clinicTypesFilterList: NzTableFilterList = [
    {
      text: 'Client Only',
      value: ClinicTypeEnum.ClientOnly,
    },
    {
      text: 'General',
      value: ClinicTypeEnum.General,
    },
  ];

  private subscription: Subscription = new Subscription();
  private _searchParams: RequestGetClinicListModel = {
    pageSize: 15,
    pageIndex: 0,
    isActiveFilter: IsActiveFilterEnum.Active,
  };

  rangeDateValue?: (Date | null)[];
  clinicsData: ResponseClinicListItem[] = [];
  totalCount?: number;
  isLoading$?: Observable<boolean>;
  availableAppointmentDates?: Date[] = [];

  constructor(
    private store$: Store,
    private readonly clinicsService: ClinicsService,
    private changeDetection: ChangeDetectorRef,
    private router: Router,
    private readonly searchHelper: SearchHelper,
    private userPermissionsProvider: UserPermissionsProvider
  ) {}

  ngOnInit(): void {
    this.initializingSelectors();
  }

  set searchParams(value: RequestGetClinicListModel) {
    this._searchParams = clone({ ...value, pageSize: value?.pageSize ?? 15 });
  }

  get searchParams(): RequestGetClinicListModel {
    return this._searchParams;
  }

  get getIsCanDeactivateOrReactivate(): boolean {
    return this.userPermissionsProvider.isOHRDRoles;
  }

  private initializingSelectors(): void {
    this.isLoading$ = this.store$.select(selectIsLoading);

    this.store$
      .select(clinicsSelectors.selectClinicsList)
      .pipe(filter((val) => val !== undefined))
      .subscribe((res) => {
        this.clinicsData = res!.clinics;
        this.totalCount = res!.totalCount;
        this.changeDetection.detectChanges();
      });

    this.subscription.add(
      this.store$
        .select(clinicsSelectors.selectClinicsSearchParams)
        .pipe(filter((val) => val !== undefined))
        .subscribe((res) => {
          if (!res) return;
          this.searchParams = clone(res);

          this.searchClinics();
        })
    );

    this.subscription.add(
      this.searchHelper
        .setSearchSubscription()
        .pipe(filter((val) => !!val))
        .subscribe((searchText) => {
          this.searchParams = { ...this.searchParams, searchText, pageIndex: 0 };
          this.searchClinics(this.searchParams);
        })
    );
  }

  private searchClinics(searchData?: RequestGetClinicListModel): void {
    if (!searchData) return;

    this.store$.dispatch(
      clinicsActions.setClinicsSearchParamsAction({
        payload: searchData,
      })
    );
  }

  searchAvailableAppointmentByClinicId(
    clinicId: string,
    month: number,
    year: number
  ): void {
    const model: RequestGetAvailableAppointmentDatesByMonthModel = {
      clinicId,
      month,
      year,
    };

    this.clinicsService.getAvailableAppointmentDatesByMonth(model).subscribe({
      next: (val) => {
        this.availableAppointmentDates = val.dates.map((item) => new Date(item));

        this.changeDetection.detectChanges();
      },
      error: (error) => {
        this.store$.dispatch(errorAction({ payload: { error, isApiError: true } }));
      },
    });
  }

  onQueryParamsChange(event: NzTableQueryParams): void {
    const clinicTypeFilter: ClinicTypeEnum[] = event.filter.find(
      (item) => item.key === 'clinicTypes'
    )?.value;

    const sortColumn = event.sort.find((item) => item.value !== null);

    this.searchParams = {
      ...this.searchParams,
      pageSize: event.pageSize,
      clinicTypes: clinicTypeFilter.length ? clinicTypeFilter : undefined,
      pageIndex: event.pageIndex - 1,
      isActiveFilter:
        this.searchParams?.isActiveFilter === undefined
          ? IsActiveFilterEnum.Active
          : this.searchParams.isActiveFilter,
    };

    type ColumnSort = keyof typeof ClinicOrderByOptionsEnum;

    if (sortColumn) {
      const sortColumnName: ClinicOrderByOptionsEnum =
        ClinicOrderByOptionsEnum[sortColumn.key as ColumnSort];
      const orderByAsc: boolean = sortColumn.value === 'ascend';

      this.searchParams.isOrderByAsc = orderByAsc;
      this.searchParams.clinicOrderByOptions = sortColumnName;
    } else {
      this.searchParams.isOrderByAsc = undefined;
      this.searchParams.clinicOrderByOptions = undefined;
    }

    this.searchClinics(this.searchParams);
  }

  changeRangeDateFilter(event: (Date | null)[]): void {
    if (event.length < 2) return;
    this.searchParams = {
      ...this.searchParams,
      startDate: event[0]?.toISOString(),
      endDate: event[1]?.toISOString(),
    };

    this.searchClinics(this.searchParams);
  }

  handleSearchByText(event: KeyboardEvent): void {
    const targetEl: HTMLInputElement = event.target as HTMLInputElement;
    this.searchHelper.searchNext(targetEl.value);
  }

  goToAppointmentsByClinic(item: ResponseClinicListItem, date: Date): void {
    this.router.navigate(
      [
        RoutesConstants.DASHBOARD_INDEX,
        RoutesConstants.DASHBOARD_CLINICS,
        RoutesConstants.DASHBOARD_CLINICS_APPOINTMENTS,
      ],
      { queryParams: { id: item.id, date } }
    );
  }

  edit(id: string): void {
    this.router.navigate(
      [
        RoutesConstants.DASHBOARD_INDEX,
        RoutesConstants.DASHBOARD_CLINICS,
        RoutesConstants.DASHBOARD_CLINICS_EDIT,
      ],
      { queryParams: { id } }
    );
  }

  deactivate(id: string): void {
    this.store$.dispatch(
      clinicsActions.clinicDeactivateAction({
        payload: { id },
      })
    );
  }

  reactivate(id: string): void {
    this.store$.dispatch(
      clinicsActions.clinicActivateAction({
        payload: { id },
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
