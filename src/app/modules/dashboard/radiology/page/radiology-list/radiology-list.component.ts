import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs';
import { CommonConstants, RoutesConstants } from 'src/app/core/constants';
import { IsActiveFilterEnum } from 'src/app/shared/enums';
import { SelectOptionModel } from 'src/app/shared/models';
import * as staffActions from '../../store/radiology.actions';
import * as staffSelectors from '../../store/radiology.selectors';
import { RequestGetMriRequestListModel } from '../../models';

@Component({
  templateUrl: './radiology-list.component.html',
  styleUrls: ['./radiology-list.component.scss'],
})
export class RadiologyListComponent implements OnInit, OnDestroy {
  readonly activeFilterOptions: SelectOptionModel<IsActiveFilterEnum>[] =
    CommonConstants.activeFilterOptions;

  searchParams?: RequestGetMriRequestListModel;

  constructor(private router: Router, private store$: Store) {}

  ngOnInit() {
    this.initializingSelectors();
  }

  private initializingSelectors(): void {
    this.store$
      .select(staffSelectors.selectRadiologySearchParams)
      .pipe(filter((val) => val !== undefined))
      .subscribe((searchParams) => {
        this.searchParams = searchParams!;
      });
  }

  searchText(searchText?: string): void {
    if (!this.searchParams) return;
    this.searchParams = { ...this.searchParams, searchText, pageIndex: 0 };
    this.store$.dispatch(
      staffActions.setMriSearchParamsAction({
        payload: this.searchParams,
      })
    );
  }

  ngOnDestroy(): void {
    this.store$.dispatch(staffActions.clearMriSearchParamsAction());
  }
}
