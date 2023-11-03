import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ReducerNodesEnum } from 'src/app/app-store';
import { StaffState } from '.';

const selectStaffFeature = createFeatureSelector<StaffState>(ReducerNodesEnum.staff);

export const selectStaffData = createSelector(
  selectStaffFeature,
  (state: StaffState) => state
);

export const selectStaffDetails = createSelector(
  selectStaffFeature,
  (state: StaffState) => state?.staffDetails
);

export const selectStaffList = createSelector(
  selectStaffFeature,
  (state: StaffState) => state?.staffListData
);

export const selectStaffSearchParams = createSelector(
  selectStaffFeature,
  (state: StaffState) => state?.staffSearchParams
);
