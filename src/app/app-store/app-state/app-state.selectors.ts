import { AppStoreState } from './index';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ReducerNodesEnum } from '..';

const selectAppFeature = createFeatureSelector<AppStoreState>(ReducerNodesEnum.appState);

export const selectAppState = createSelector(
  selectAppFeature,
  (state: AppStoreState) => state
);

export const selectIsLoading = createSelector(
  selectAppFeature,
  (state: AppStoreState) => state.isLoading
);

export const selectIsTokenRefreshing = createSelector(
  selectAppFeature,
  (state: AppStoreState) => state.isRefreshingToken
);
