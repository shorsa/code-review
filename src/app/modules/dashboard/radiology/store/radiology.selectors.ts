import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ReducerNodesEnum } from 'src/app/app-store';
import { RadiologyState } from '.';

const selectRadiologyFeature = createFeatureSelector<RadiologyState>(
  ReducerNodesEnum.radiology
);

export const selectRadiologyData = createSelector(
  selectRadiologyFeature,
  (state: RadiologyState) => state
);

export const selectRadiologyList = createSelector(
  selectRadiologyFeature,
  (state: RadiologyState) => state?.radiologyListData
);

export const selectRadiologySearchParams = createSelector(
  selectRadiologyFeature,
  (state: RadiologyState) => state?.radiologySearchParams
);
