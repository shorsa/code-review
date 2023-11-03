import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { StatsState } from '.';
import * as settingActions from './stats.actions';

const initialState: StatsState = {
  statsDetails: undefined,
  statsList: undefined,
};

export const statsReducer: ActionReducer<StatsState, Action> = createReducer(
  initialState,
  on(
    settingActions.statsGetByIdSuccessAction,
    (state: StatsState, { payload }): StatsState => {
      const { appointmentSetting } = payload;
      return {
        ...state,
        statsDetails: appointmentSetting,
      };
    }
  ),
  on(
    settingActions.statsSearchSuccessAction,

    (state: StatsState, { payload }): StatsState => {
      return {
        ...state,
        statsList: payload,
      };
    }
  ),
  on(settingActions.clearStatsDetailsDataAction, (state: StatsState): StatsState => {
    return {
      ...state,
      statsDetails: initialState.statsDetails,
    };
  }),
  on(settingActions.clearStatsListDataAction, (state: StatsState): StatsState => {
    return {
      ...state,
      statsList: initialState.statsList,
    };
  })
);

export function StatsReducer(state: StatsState, action: Action) {
  return statsReducer(state, action);
}
