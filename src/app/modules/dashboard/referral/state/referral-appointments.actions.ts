import { createAction, props } from '@ngrx/store';
import { BaseResponseModel } from 'src/app/shared/models';
import {
  RequestActivateAppointmentModel,
  RequestDeactivateAppointmentModel,
  RequestGetAppointmentListModel,
  ResponseGetAppointmentListModel,
} from '../../appointments/models';

//SEARCH REFERRAL APPOINTMENT
const APPOINTMENT_SEARCH = '[REFERRAL APPOINTMENT] search appointments';
export const appointmentsSearchAction = createAction(
  APPOINTMENT_SEARCH,
  props<{ payload: RequestGetAppointmentListModel }>()
);

export const appointmentsSearchSuccessAction = createAction(
  `${APPOINTMENT_SEARCH} success`,
  props<{
    payload: ResponseGetAppointmentListModel;
  }>()
);

//ACTIVATE REFERRAL APPOINTMENT
const APPOINTMENT_ACTIVATE = '[REFERRAL APPOINTMENT] activate appointment';
export const appointmentActivateAction = createAction(
  APPOINTMENT_ACTIVATE,
  props<{ payload: RequestActivateAppointmentModel }>()
);

export const appointmentActivateSuccessAction = createAction(
  `${APPOINTMENT_ACTIVATE} success`
);

//DEACTIVATE REFERRAL APPOINTMENT
const APPOINTMENT_DEACTIVATE = '[REFERRAL APPOINTMENT] deactivate appointment';
export const appointmentDeactivateAction = createAction(
  APPOINTMENT_DEACTIVATE,
  props<{ payload: RequestDeactivateAppointmentModel }>()
);

export const appointmentDeactivateSuccessAction = createAction(
  `${APPOINTMENT_DEACTIVATE} success`,
  props<{
    payload: BaseResponseModel;
  }>()
);

//LOCAL
const SET_SEARCH_PARAMS = '[REFERRAL APPOINTMENT] set appointments search params';
export const setAppointmentsSearchParamsAction = createAction(
  SET_SEARCH_PARAMS,
  props<{ payload: any }>()
);

const APPOINTMENT_CLEAR_DETAILS = '[REFERRAL APPOINTMENT] clear appointment details';
export const clearAppointmentDetailsDataAction = createAction(APPOINTMENT_CLEAR_DETAILS);

const APPOINTMENT_CLEAR_SEARCH_PARAMS =
  '[REFERRAL APPOINTMENT] clear appointment details';
export const clearAppointmentSearchParamsAction = createAction(
  APPOINTMENT_CLEAR_SEARCH_PARAMS
);
