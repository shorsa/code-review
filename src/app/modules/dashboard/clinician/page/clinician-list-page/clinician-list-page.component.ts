import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs';
import { CommonConstants, RoutesConstants } from 'src/app/core/constants';
import { IsActiveFilterEnum } from 'src/app/shared/enums';
import { SelectOptionModel } from 'src/app/shared/models';
import { RequestGetPatientListModel } from '../../../patients/models/patients';
import * as clinicianActions from '../../store/clinician.actions';
import * as clinicianSelectors from '../../store/clinician.selectors';
import { UserPermissionsProvider } from 'src/app/shared/providers/user-permissions.provider';

@Component({
  templateUrl: './clinician-list-page.component.html',
  styleUrls: ['./clinician-list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClinicianListPageComponent implements OnInit, OnDestroy {
  readonly activeFilterOptions: SelectOptionModel<IsActiveFilterEnum>[] =
    CommonConstants.activeFilterOptions;

  searchParams?: RequestGetPatientListModel;
  constructor(
    private router: Router,
    private store$: Store,
    private userPermissionsProvider: UserPermissionsProvider
  ) {}

  get getIsCanDeactivateOrReactivate(): boolean {
    return this.userPermissionsProvider.isOHRDRoles;
  }

  ngOnInit(): void {
    this.initializingSelectors();
  }

  private initializingSelectors(): void {
    this.store$
      .select(clinicianSelectors.selectCliniciansSearchParams)
      .pipe(filter((val) => val !== undefined))
      .subscribe((searchParams) => {
        this.searchParams = searchParams;
      });
  }

  navigateAddNewClinician(): void {
    this.router.navigate([
      RoutesConstants.DASHBOARD_INDEX,
      RoutesConstants.DASHBOARD_CLINICIAN,
      RoutesConstants.DASHBOARD_CLINICIAN_ADD,
    ]);
  }

  handleSearchByText(searchText?: string): void {
    if (!this.searchParams) return;
    this.searchParams = { ...this.searchParams, searchText, pageIndex: 0 };
    this.searchClinician(this.searchParams);
  }

  changeClinicianStateFilter(selectedIndex: number): void {
    if (!this.searchParams) return;

    const currentActiveFilter = this.activeFilterOptions[selectedIndex].value;
    this.searchParams = {
      ...this.searchParams,
      pageIndex: 0,
      isActiveFilter: currentActiveFilter,
    };

    this.searchClinician(this.searchParams);
  }

  private searchClinician(searchParams: RequestGetPatientListModel): void {
    this.store$.dispatch(
      clinicianActions.setCliniciansSearchParamsAction({
        payload: searchParams,
      })
    );
  }

  ngOnDestroy(): void {
    // this.store$.dispatch(clinicianActions.clearClinicianSearchParamsAction());
  }
}
