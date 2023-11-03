import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ReducerNodesEnum } from 'src/app/app-store';
import { LocationsState } from '.';

const selectRoomFeature = createFeatureSelector<LocationsState>(
  ReducerNodesEnum.location
);

export const selectRoomState = createSelector(
  selectRoomFeature,
  (state: LocationsState) => state
);

export const selectRoomDetails = createSelector(
  selectRoomFeature,
  (state: LocationsState) => state?.roomDetails
);

export const selectRoomList = createSelector(
  selectRoomFeature,
  (state: LocationsState) => state?.roomsListData
);
