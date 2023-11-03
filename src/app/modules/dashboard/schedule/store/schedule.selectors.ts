import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ReducerNodesEnum } from 'src/app/app-store';
import { ScheduleState } from '.';

const selectScheduleFeature = createFeatureSelector<ScheduleState>(
  ReducerNodesEnum.schedule
);

export const selectScheduleState = createSelector(
  selectScheduleFeature,
  (state: ScheduleState) => state
);

export const selectScheduleDatesList = createSelector(
  selectScheduleFeature,
  (state: ScheduleState) => state?.scheduleList
);
