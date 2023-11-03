import { createAction, props } from '@ngrx/store';
import {
  RequestGetAppointmentListModel,
  ResponseGetAppointmentListModel,
} from '../../appointments/models';

//SEARCH CLINIC
const CLINIC_SEARCH = '[CLINIC] search  clinic appointment';
export const clinicAppointmentSearchAction = createAction(
  CLINIC_SEARCH,
  props<{ payload: RequestGetAppointmentListModel }>()
);

const CLINIC_SEARCH_SUCCESS = '[CLINIC] search  clinic appointment success';
export const clinicAppointmentSearchSuccessAction = createAction(
  CLINIC_SEARCH_SUCCESS,
  props<{
    payload: ResponseGetAppointmentListModel;
  }>()
);
