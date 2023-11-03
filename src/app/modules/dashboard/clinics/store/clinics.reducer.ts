import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { ClinicsState } from '.';
import * as clinicActions from './clinics.actions';
import * as clinicAppointmentsActions from './clinic-appointments.actions';
import { IsActiveFilterEnum } from 'src/app/shared/enums';
import { ClinicOrderByOptionsEnum } from '../enums';
import { CommonConstants } from 'src/app/core/constants';

const initialState: ClinicsState = {
  clinicDetails: undefined,
  clinicsSearchParams: {
    pageSize: 15,
    pageIndex: 0,
    searchText: undefined,
    clinicTypes: undefined,
    clinicOrderByOptions: ClinicOrderByOptionsEnum.None,
    isOrderByAsc: undefined,
    isActiveFilter: IsActiveFilterEnum.Active,
  },
  clinicsListData: undefined,
  clinicAppointmentsListData: undefined,
};

export const clinicReducer: ActionReducer<ClinicsState, Action> = createReducer(
  initialState,
  on(
    clinicActions.clinicGetByIdSuccessAction,
    (state: ClinicsState, { payload }): ClinicsState => {
      const { clinic } = payload;
      return {
        ...state,
        clinicDetails: clinic,
      };
    }
  ),
  on(
    clinicActions.setClinicsSearchParamsAction,
    (state: ClinicsState, { payload }): ClinicsState => {
      return {
        ...state,
        clinicsSearchParams: payload,
      };
    }
  ),
  on(
    clinicActions.clinicsSearchSuccessAction,
    (state: ClinicsState, { payload }): ClinicsState => {
      return {
        ...state,
        clinicsListData: payload,
      };
    }
  ),
  on(clinicActions.clearClinicDetailsDataAction, (state: ClinicsState): ClinicsState => {
    return {
      ...state,
      clinicDetails: initialState.clinicDetails,
    };
  }),
  on(clinicActions.clearClinicSearchParamsAction, (state: ClinicsState): ClinicsState => {
    return {
      ...state,
      clinicsSearchParams: initialState.clinicsSearchParams,
    };
  }),
  //Appointments
  on(
    clinicAppointmentsActions.clinicAppointmentSearchSuccessAction,
    (state: ClinicsState, { payload }): ClinicsState => {
      return {
        ...state,
        clinicAppointmentsListData: payload,
      };
    }
  )
);

export function ClinicReducer(state: ClinicsState, action: Action) {
  return clinicReducer(state, action);
}
