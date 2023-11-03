import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ReducerNodesEnum } from 'src/app/app-store';
import { StatsState } from '.';

const selectSettingsFeature = createFeatureSelector<StatsState>(
  ReducerNodesEnum.stats
);

export const selectStatsState = createSelector(
  selectSettingsFeature,
  (state: StatsState) => state
);

export const selectStatsListData = createSelector(
  selectSettingsFeature,
  (state: StatsState) => state?.statsList
);

export const selectStatsDetails = createSelector(
  selectSettingsFeature,
  (state: StatsState) => state?.statsDetails
);
