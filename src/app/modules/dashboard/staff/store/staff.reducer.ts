import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { IsActiveFilterEnum } from 'src/app/shared/enums';
import { StaffState } from '.';
import { StaffUserOrderByOptionsEnum } from '../enums';
import * as staffActions from './staff.actions';
import { CommonConstants } from 'src/app/core/constants';

const initialState: StaffState = {
  staffDetails: undefined,
  staffSearchParams: {
    pageSize: CommonConstants.PAGE_SIZE_OPTIONS[0],
    pageIndex: 0,
    searchText: undefined,
    isActiveFilter: IsActiveFilterEnum.Active,
    roleFilters: undefined,
    oHRDUserOrderByOptions: StaffUserOrderByOptionsEnum.None,
    isOrderByAsc: undefined,
  },
  staffListData: undefined,
};

export const staffReducer: ActionReducer<StaffState, Action> = createReducer(
  initialState,
  on(
    staffActions.staffGetByIdSuccessAction,
    (state: StaffState, { payload }): StaffState => {
      const { ohrdUser } = payload;
      return {
        ...state,
        staffDetails: ohrdUser,
      };
    }
  ),
  on(
    staffActions.setStaffSearchParamsAction,
    (state: StaffState, { payload }): StaffState => {
      return {
        ...state,
        staffSearchParams: payload,
      };
    }
  ),
  on(
    staffActions.staffsSearchSuccessAction,
    (state: StaffState, { payload }): StaffState => {
      return {
        ...state,
        staffListData: payload,
      };
    }
  ),
  on(staffActions.clearStaffDetailsDataAction, (state: StaffState): StaffState => {
    return {
      ...state,
      staffDetails: initialState.staffDetails,
    };
  }),
  on(staffActions.clearStaffSearchParamsAction, (state: StaffState): StaffState => {
    return {
      ...state,
      staffSearchParams: initialState.staffSearchParams,
    };
  })
);

export function StaffReducer(state: StaffState, action: Action) {
  return staffReducer(state, action);
}
