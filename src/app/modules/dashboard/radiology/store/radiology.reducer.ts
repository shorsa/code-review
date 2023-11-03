import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { IsActiveFilterEnum } from 'src/app/shared/enums';
import { RadiologyState } from '.';
import { MriRequestOrderByOptionsEnum } from '../enums';
import * as staffActions from './radiology.actions';
import { CommonConstants } from 'src/app/core/constants';

const initialState: RadiologyState = {
  radiologySearchParams: {
    pageSize: CommonConstants.PAGE_SIZE_OPTIONS[0],
    pageIndex: 0,
    searchText: undefined,
    isOrderByAsc: undefined,
  },
  radiologyListData: undefined,
};

export const radiologyReducer: ActionReducer<RadiologyState, Action> = createReducer(
  initialState,

  on(
    staffActions.setMriSearchParamsAction,
    (state: RadiologyState, { payload }): RadiologyState => {
      return {
        ...state,
        radiologySearchParams: payload,
      };
    }
  ),
  on(
    staffActions.mriSearchSuccessAction,
    (state: RadiologyState, { payload }): RadiologyState => {
      return {
        ...state,
        radiologyListData: payload,
      };
    }
  ),
  on(staffActions.clearMriSearchParamsAction, (state: RadiologyState): RadiologyState => {
    return {
      ...state,
      radiologySearchParams: initialState.radiologySearchParams,
    };
  })
);

export function RadiologyReducer(state: RadiologyState, action: Action) {
  return radiologyReducer(state, action);
}
