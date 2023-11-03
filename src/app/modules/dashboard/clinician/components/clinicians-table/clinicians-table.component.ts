import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { clone, isEqual } from 'lodash';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { Observable, Subscription, filter } from 'rxjs';
import { selectIsLoading } from 'src/app/app-store/app-state/app-state.selectors';
import { CommonConstants, RoutesConstants } from 'src/app/core/constants';
import { SearchHelper } from 'src/app/shared/helpers';
import { ClinicianOrderByOptionsEnum } from '../../enums/clinician-order-by-options.enum';
import { RequestGetClinicianListModel, ResponseClinicianListItem } from '../../models';
import * as clinicianActions from '../../store/clinician.actions';
import * as clinicianSelectors from '../../store/clinician.selectors';

@Component({
  selector: 'app-clinicians-table',
  templateUrl: './clinicians-table.component.html',
  styleUrls: ['./clinicians-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CliniciansTableComponent implements OnInit, OnDestroy {

  readonly pageSizeOptions: number[] = CommonConstants.PAGE_SIZE_OPTIONS;
  clinicianUsersData: ResponseClinicianListItem[] = [];
  totalCount: number = 0;
  isLoading$?: Observable<boolean>;
  departmentListOptions?: { text: string; value: string }[];
  private _searchParams!: RequestGetClinicianListModel;
  private subscription: Subscription = new Subscription();

  constructor(
    private store$: Store,
    private changeDetection: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializingSelectors();
  }

  set searchParams(value: RequestGetClinicianListModel) {
    this._searchParams = { ...clone(value) };
  }

  get searchParams(): RequestGetClinicianListModel {
    return this._searchParams;
  }

  onQueryParamsChange(event: NzTableQueryParams): void {
    const sortColumn = event.sort.find((item) => item.value !== null);

    this.searchParams = {
      ...this.searchParams,
      pageSize: event.pageSize,
      pageIndex: event.pageIndex - 1,
    };

    type ColumnSort = keyof typeof ClinicianOrderByOptionsEnum;

    if (sortColumn) {
      const sortColumnName: ClinicianOrderByOptionsEnum =
        ClinicianOrderByOptionsEnum[sortColumn.key as ColumnSort];
      const orderByAsc: boolean = sortColumn.value === 'ascend';
      this.searchParams.isOrderByAsc = orderByAsc;
      this.searchParams.clinicianOrderByOptions = sortColumnName;
    } else {
      this.searchParams.isOrderByAsc = undefined;
      this.searchParams.clinicianOrderByOptions = undefined;
    }

    this.searchPatients(this.searchParams);
  }

  private initializingSelectors(): void {
    this.isLoading$ = this.store$.select(selectIsLoading);

    this.store$
      .select(clinicianSelectors.selectCliniciansList)
      .pipe(filter((val) => val !== undefined))
      .subscribe((res) => {
        this.clinicianUsersData = res!.clinicians;
        this.totalCount = res!.totalCount;
        this.changeDetection.detectChanges();
      });

    this.store$
      .select(clinicianSelectors.selectCliniciansSearchParams)
      .pipe(filter((val) => val !== undefined))
      .subscribe((res) => {
        if (!res) return;
        if (isEqual(this.searchParams, res)) return;
        this.searchParams = clone(res);
        this.searchPatients(this.searchParams);
      });
  }

  private searchPatients(searchData?: any): void {
    if (!searchData) return;
    this.store$.dispatch(
      clinicianActions.setCliniciansSearchParamsAction({
        payload: searchData,
      })
    );
  }

  edit(id: string): void {
    this.router.navigate(
      [
        RoutesConstants.DASHBOARD_INDEX,
        RoutesConstants.DASHBOARD_CLINICIAN,
        RoutesConstants.DASHBOARD_CLINICIAN_EDIT,
      ],
      { queryParams: { id } }
    );
  }

  deactivate(id: string): void {
    this.store$.dispatch(
      clinicianActions.clinicianDeactivateAction({
        payload: { id },
      })
    );
  }

  reactivate(id: string): void {
    this.store$.dispatch(
      clinicianActions.clinicianActivateAction({
        payload: { id },
      })
    );
  }

  unlock(applicationUserId: string): void {
    this.store$.dispatch(
      clinicianActions.clinicianUnlockAction({
        payload: { id: applicationUserId },
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
