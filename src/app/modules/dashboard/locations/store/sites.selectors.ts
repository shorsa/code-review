import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ReducerNodesEnum } from 'src/app/app-store';
import { LocationsState } from '.';

const selectSiteFeature = createFeatureSelector<LocationsState>(
  ReducerNodesEnum.location
);

export const selectSiteState = createSelector(
  selectSiteFeature,
  (state: LocationsState) => state
);

export const selectSiteDetails = createSelector(
  selectSiteFeature,
  (state: LocationsState) => state?.siteDetails
);

export const selectSiteList = createSelector(
  selectSiteFeature,
  (state: LocationsState) => state?.sitesListData
);
