import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ReducerNodesEnum } from 'src/app/app-store';
import { LocationsState } from '.';

const selectLocationFeature = createFeatureSelector<LocationsState>(
  ReducerNodesEnum.location
);

export const selectLocationState = createSelector(
  selectLocationFeature,
  (state: LocationsState) => state
);

export const selectLocationDetails = createSelector(
  selectLocationFeature,
  (state: LocationsState) => state?.locationDetails
);

export const selectLocationsList = createSelector(
  selectLocationFeature,
  (state: LocationsState) => state?.locationListData
);
