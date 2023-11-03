import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { clone } from 'lodash';
import { CommonConstants, RoutesConstants } from 'src/app/core/constants';
import { IsActiveFilterEnum, PermissionClaimsEnum } from 'src/app/shared/enums';
import { SelectOptionModel } from 'src/app/shared/models';
import { selectClinicsSearchParams } from '../../store/clinics.selectors';
import { filter } from 'rxjs';
import { setClinicsSearchParamsAction } from '../../store/clinics.actions';
import { RequestGetClinicListModel } from '../../models';
import { UserPermissionsProvider } from 'src/app/shared/providers/user-permissions.provider';

@Component({
  templateUrl: './clinics-list-page.component.html',
  styleUrls: ['./clinics-list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClinicsListPageComponent implements OnInit {
  readonly clinicCreatePermission = PermissionClaimsEnum.ClinicCreate
  
  readonly activeFilterOptions: SelectOptionModel<IsActiveFilterEnum>[] =
    CommonConstants.activeFilterOptions;
  private _searchParams!: RequestGetClinicListModel;



  constructor(private router: Router, private store$: Store, private userPermissionsProvider: UserPermissionsProvider) {}

  ngOnInit() {
    this.initializingSelectors();
  }

  private initializingSelectors(): void {
    this.store$
      .select(selectClinicsSearchParams)
      .pipe(filter((val) => val !== undefined))
      .subscribe((searchParams) => {
        this.searchParams = searchParams!;
      });
  }

  get getIsCanDeactivateOrReactivate(): boolean {
    return this.userPermissionsProvider.isOHRDRoles;
  }
  
  set searchParams(value: RequestGetClinicListModel) {
    this._searchParams = { ...clone(value) };
  }

  get searchParams(): RequestGetClinicListModel {
    return this._searchParams;
  }

  get isOHRDUser() : boolean {
    return this.userPermissionsProvider.isOHRDRoles;
  }

  handleSearchByText(searchText?: string): void {
    this.searchParams = { ...this.searchParams, searchText, pageIndex: 0 };
    this.search(this.searchParams);
  }

  changeClinicsStateFilter(selectedIndex: number) {
    if (!this.searchParams) return;
    const currentActiveFilter = this.activeFilterOptions[selectedIndex].value;

    this.searchParams = {
      ...this.searchParams,
      pageIndex: 0,
      isActiveFilter: currentActiveFilter,
    };
    this.search(this.searchParams);
  }

  private search(searchParams?: RequestGetClinicListModel): void {
    if (!searchParams) return;
    this.store$.dispatch(
      setClinicsSearchParamsAction({
        payload: searchParams,
      })
    );
  }

  navigateAddNewClinic(): void {
    this.router.navigate([
      RoutesConstants.DASHBOARD_INDEX,
      RoutesConstants.DASHBOARD_CLINICS,
      RoutesConstants.DASHBOARD_CLINICS_ADD,
    ]);
  }
}
