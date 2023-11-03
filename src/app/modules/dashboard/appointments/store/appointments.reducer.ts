import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { IsActiveFilterEnum } from 'src/app/shared/enums';
import { AppointmentsState } from '.';
import { AppointmentOrderByOptionsEnum } from '../enums/appointment-order-by-options.enum';
import * as appointmentActions from './appointments.actions';
import * as appointmentDocumentsActions from './appointment-documents.actions';
import { CommonConstants } from 'src/app/core/constants';

const initialState: AppointmentsState = {
  appointmentDetails: undefined,
  appointmentsSearchParams: {
    pageSize: CommonConstants.PAGE_SIZE_OPTIONS[0],
    pageIndex: 0,
    searchText: undefined,
    appointmentOrderByOptions: AppointmentOrderByOptionsEnum.None,
    isActiveFilter: IsActiveFilterEnum.Active,
  },
  appointmentsListData: undefined,
  documentsList: undefined,
  historyLogList: undefined,
};

export const appointmentReducer: ActionReducer<AppointmentsState, Action> = createReducer(
  initialState,
  on(
    appointmentActions.appointmentGetByIdSuccessAction,
    (state: AppointmentsState, { payload }): AppointmentsState => {
      return {
        ...state,
        appointmentDetails: payload,
      };
    }
  ),
  on(
    appointmentActions.setAppointmentsSearchParamsAction,

    (state: AppointmentsState, { payload }): AppointmentsState => {
      return {
        ...state,
        appointmentsSearchParams: payload,
      };
    }
  ),

  on(
    appointmentActions.appointmentsSearchSuccessAction,
    (state: AppointmentsState, { payload }): AppointmentsState => {
      return {
        ...state,
        appointmentsListData: payload,
      };
    }
  ),
  on(
    appointmentActions.clearAppointmentDetailsDataAction,
    (state: AppointmentsState): AppointmentsState => {
      return {
        ...state,
        appointmentDetails: initialState.appointmentDetails,
      };
    }
  ),
  on(
    appointmentActions.clearAppointmentSearchParamsAction,
    (state: AppointmentsState): AppointmentsState => {
      return {
        ...state,
        appointmentsSearchParams: initialState.appointmentsSearchParams,
      };
    }
  ),
  //PATIENT DETAILS
  on(
    appointmentActions.appointmentsGetPatientDetailsSuccessAction,
    (state: AppointmentsState, { payload }): AppointmentsState => {
      return {
        ...state,
        patientDetails: payload,
      };
    }
  ),
  //PATIENT DOCUMENTS
  on(
    appointmentDocumentsActions.appointmentDocumentsSearchSuccessAction,
    (state: AppointmentsState, { payload }): AppointmentsState => {
      return {
        ...state,
        documentsList: payload,
      };
    }
  ),
  on(
    appointmentActions.clearAppointmentDetailsDataAction,
    (state: AppointmentsState): AppointmentsState => {
      return {
        ...state,
        appointmentDetails: initialState.appointmentDetails,
      };
    }
  ),
  //AUDIT LOGS
  on(
    appointmentActions.patientsAuditLogListSearchSuccessAction,
    (state: AppointmentsState, { payload }): AppointmentsState => {
      return {
        ...state,
        historyLogList: payload,
      };
    }
  )
);

export function AppointmentReducer(state: AppointmentsState, action: Action) {
  return appointmentReducer(state, action);
}
