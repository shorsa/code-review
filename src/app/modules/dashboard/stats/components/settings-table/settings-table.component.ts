import {
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewContainerRef,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { clone } from 'lodash';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { Observable, Subscription, filter } from 'rxjs';
import { selectIsLoading } from 'src/app/app-store/app-state/app-state.selectors';
import { CommonConstants } from 'src/app/core/constants';
import { IsActiveFilterEnum } from 'src/app/shared/enums';
import { AppointmentSettingModel, SelectOptionModel } from 'src/app/shared/models';
import {
  AppointmentSettingOrderByOptionsEnum,
  AppointmentStatTypeEnum,
} from '../../enums';
import { RequestGetAppointmentStatsListModel } from '../../models';
import * as settingActions from '../../store/stats.actions';
import * as settingSelectors from '../../store/stats.selectors';
import { StatsManagementModalComponent } from '../stats-management-modal/stats-management-modal.component';

@Component({
  selector: 'app-settings-table',
  templateUrl: './settings-table.component.html',
  styleUrls: ['./settings-table.component.scss'],
})
export class PrimaryMedicalConditionComponent implements OnInit, OnDestroy {
  @Input() appointmentSettingType!: AppointmentStatTypeEnum;

  private _searchParams: RequestGetAppointmentStatsListModel = {
    pageSize: CommonConstants.PAGE_SIZE_OPTIONS[0],
    pageIndex: 0,
    isActiveFilter: IsActiveFilterEnum.Active,
    appointmentSettingType: this.appointmentSettingType,
  };
  private subscriptions$: Subscription = new Subscription();

  readonly pageSizeOptions: number[] = CommonConstants.PAGE_SIZE_OPTIONS;
  readonly activeFilterOptions: SelectOptionModel<IsActiveFilterEnum>[] =
    CommonConstants.activeFilterOptions;

  settingsData: AppointmentSettingModel[] = [];
  totalCount: number = 0;
  isLoading$?: Observable<boolean>;

  constructor(
    private store$: Store,
    private changeDetection: ChangeDetectorRef,
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef
  ) {}

  set searchParams(value: RequestGetAppointmentStatsListModel) {
    this._searchParams = {
      ...clone(value),
      appointmentSettingType: this.appointmentSettingType,
    };
  }

  get searchParams(): RequestGetAppointmentStatsListModel {
    return this._searchParams;
  }

  ngOnInit(): void {
    this.initializingSelectors();
  }

  onQueryParamsChange(event: NzTableQueryParams): void {
    const sortColumn = event.sort.find((item) => item.value !== null);

    this.searchParams = {
      ...this.searchParams,
      pageSize: event.pageSize,
      pageIndex: event.pageIndex - 1,
    };

    type ColumnSort = keyof typeof AppointmentSettingOrderByOptionsEnum;

    if (sortColumn) {
      const sortColumnName: AppointmentSettingOrderByOptionsEnum =
        AppointmentSettingOrderByOptionsEnum[sortColumn.key as ColumnSort];
      const orderByAsc: boolean = sortColumn.value === 'ascend';

      this.searchParams.isOrderByAsc = orderByAsc;
      this.searchParams.appointmentSettingOrderByOptions = sortColumnName;
    } else {
      this.searchParams.isOrderByAsc = undefined;
      this.searchParams.appointmentSettingOrderByOptions = undefined;
    }

    this.searchSetting(this.searchParams);
  }

  handleSearchByText(searchText?: string): void {
    this.searchParams = {
      ...this.searchParams,
      searchText: searchText,
      pageIndex: 0,
    };
    this.searchSetting(this.searchParams);
  }

  changeActiveFilter(selectedIndex: number): void {
    if (!this.searchParams) return;

    const currentActiveFilter = this.activeFilterOptions[selectedIndex].value;
    this.searchParams = {
      ...this.searchParams,
      pageIndex: 0,
      isActiveFilter: currentActiveFilter,
    };
    this.searchSetting(this.searchParams);
  }

  handleAddNew(): void {
    this.modal.create<StatsManagementModalComponent, any>({
      nzTitle: 'Please, enter setting name',
      nzWidth: '484px',
      nzMaskClosable: false,
      nzData: {
        searchParams: this.searchParams,
        action: settingActions.statsCreateAction,
        appointmentSettingsType: this.appointmentSettingType,
      },
      nzContent: StatsManagementModalComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzFooter: null,
    });
  }

  handleEdit(id: string): void {
    this.modal.create<StatsManagementModalComponent, any>({
      nzTitle: 'Edit setting',
      nzWidth: '484px',
      nzMaskClosable: false,
      nzData: {
        settingId: id,
        searchParams: this.searchParams,
        action: settingActions.statsUpdateAction,
        appointmentSettingsType: this.appointmentSettingType,
      },
      nzContent: StatsManagementModalComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzFooter: null,
    });
  }

  handleDeactivate(id: string): void {
    this.store$.dispatch(
      settingActions.statsDeactivateAction({
        payload: { id },
        searchParams: this.searchParams,
      })
    );
  }

  handleReactivate(id: string): void {
    this.store$.dispatch(
      settingActions.statsActivateAction({
        payload: { id },
        searchParams: this.searchParams,
      })
    );
  }

  private initializingSelectors(): void {
    this.isLoading$ = this.store$.select(selectIsLoading);

    this.subscriptions$.add(
      this.store$
        .select(settingSelectors.selectStatsListData)
        .pipe(filter((val) => val !== undefined))
        .subscribe((res) => {
          this.settingsData = res!.appointmentSettings;
          this.totalCount = res!.totalCount;
          this.changeDetection.detectChanges();
        })
    );
  }

  private searchSetting(searchData?: RequestGetAppointmentStatsListModel): void {
    if (!searchData) return;
    this.store$.dispatch(
      settingActions.statsSearchAction({
        payload: searchData,
      })
    );
  }

  ngOnDestroy(): void {
    this.store$.dispatch(settingActions.clearStatsListDataAction());
    this.subscriptions$.unsubscribe();
  }
}
