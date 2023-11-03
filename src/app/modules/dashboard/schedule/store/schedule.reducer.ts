import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { ScheduleState } from '.';
import * as settingActions from './schedule.actions';

const initialState: ScheduleState = {
  scheduleList: undefined,
};

export const scheduleReducer: ActionReducer<ScheduleState, Action> = createReducer(
  initialState,
  on(
    settingActions.getScheduleSuccessAction,
    (state: ScheduleState, { payload }): ScheduleState => {
      return {
        ...state,
        scheduleList: payload,
      };
    }
  )
);

export function ScheduleReducer(state: ScheduleState, action: Action) {
  return scheduleReducer(state, action);
}
