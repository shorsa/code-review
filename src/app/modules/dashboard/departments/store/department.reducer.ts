import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { CanBookOnlineFilterEnum, IsActiveFilterEnum } from 'src/app/shared/enums';
import { DepartmentState } from '.';
import * as departmentActions from './department.actions';
import { CommonConstants } from 'src/app/core/constants';

const initialState: DepartmentState = {
  departmentDetails: undefined,
  departmentsSearchParams: {
    pageSize: CommonConstants.PAGE_SIZE_OPTIONS[0],
    pageIndex: 0,
    searchText: undefined,
    canBookOnlineFilter: CanBookOnlineFilterEnum.None,
    isActiveFilterEnum: IsActiveFilterEnum.Active,
  },
  departmentsListData: undefined,
  patientsListData: undefined,
  departmentsOptions: undefined,
};

export const departmentReducer: ActionReducer<DepartmentState, Action> = createReducer(
  initialState,
  on(
    departmentActions.departmentGetByIdSuccessAction,
    (state: DepartmentState, { payload }): DepartmentState => {
      const { department } = payload;
      return {
        ...state,
        departmentDetails: department,
      };
    }
  ),
  on(
    departmentActions.setDepartmentSearchParamsAction,
    (state: DepartmentState, { payload }): DepartmentState => {
      return {
        ...state,
        departmentsSearchParams: payload,
      };
    }
  ),
  on(
    departmentActions.departmentsSearchSuccessAction,
    (state: DepartmentState, { payload }): DepartmentState => {
      return {
        ...state,
        departmentsListData: payload,
      };
    }
  ),
  on(
    departmentActions.getDepartmentOptionsSuccessAction,
    (state: DepartmentState, { payload }): DepartmentState => {
      return {
        ...state,
        departmentsOptions: payload.departmentsByClient,
      };
    }
  ),
  on(
    departmentActions.getPatientsByDepartmentIdSuccessAction,
    (state: DepartmentState, { payload }): DepartmentState => {
      return {
        ...state,
        patientsListData: payload,
      };
    }
  ),
  on(
    departmentActions.clearDepartmentDetailsDataAction,
    (state: DepartmentState): DepartmentState => {
      return {
        ...state,
        departmentDetails: initialState.departmentDetails,
      };
    }
  ),
  on(
    departmentActions.clearDepartmentSearchParamsAction,
    (state: DepartmentState): DepartmentState => {
      return {
        ...state,
        departmentsSearchParams: initialState.departmentsSearchParams,
      };
    }
  )
);

export function DepartmentReducer(state: DepartmentState, action: Action) {
  return departmentReducer(state, action);
}
