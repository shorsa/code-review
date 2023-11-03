import { createAction, props } from '@ngrx/store';
import { BaseResponseModel } from 'src/app/shared/models';
import {
  RequestActivateAppointmentModel,
  RequestCreateAppointmentModel,
  RequestDeactivateAppointmentModel,
  RequestGetAppointmentAuditLogsModel,
  RequestGetAppointmentByIdModel,
  RequestGetAppointmentListModel,
  RequestGetPatientDetailsByAppointmentIdModel,
  RequestUpdateAppointmentDetailsModel,
  RequestUpdateAppointmentModel,
  RequestUpdateAppointmentReportModel,
  RequestUpdateAppointmentSettingsModel,
  RequestUpdateAppointmentStatusModel,
  RequestUpdatePatientContactInformationModel,
  ResponseGetAppointmentByIdModel,
  ResponseGetAppointmentListModel,
  ResponseGetPatientDetailsByAppointmentIdModel,
} from '../models';
import { ResponseGetAuditLogListModel } from '../models/response/response-get-audit-log-list.model';

//CREATE APPOINTMENT
const APPOINTMENT_CREATE = '[APPOINTMENT] appointment create';
export const appointmentCreateAction = createAction(
  APPOINTMENT_CREATE,
  props<{ payload: RequestCreateAppointmentModel }>()
);

export const appointmentCreateSuccessAction = createAction(
  `${APPOINTMENT_CREATE} success`,
  props<{ payload: BaseResponseModel }>()
);

//UPDATE APPOINTMENT
const APPOINTMENT_UPDATE = '[APPOINTMENT] appointment update';
export const appointmentUpdateAction = createAction(
  APPOINTMENT_UPDATE,
  props<{ payload: RequestUpdateAppointmentModel }>()
);

export const appointmentUpdateSuccessAction = createAction(
  `${APPOINTMENT_UPDATE} success`,
  props<{ payload: BaseResponseModel }>()
);

//GET APPOINTMENT BY ID
const APPOINTMENT_GET_BY_ID = '[APPOINTMENT] appointment get by id';
export const appointmentGetByIdAction = createAction(
  APPOINTMENT_GET_BY_ID,
  props<{ payload: RequestGetAppointmentByIdModel }>()
);

export const appointmentGetByIdSuccessAction = createAction(
  `${APPOINTMENT_GET_BY_ID} success`,
  props<{ payload: ResponseGetAppointmentByIdModel }>()
);

//SEARCH APPOINTMENT
const APPOINTMENT_SEARCH = '[APPOINTMENT] search appointments';
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

//APPOINTMENT PATIENT DETAILS
const APPOINTMENT_GET_PATIENT_DETAILS =
  '[APPOINTMENT] get patient details by appointment id';
export const appointmentsGetPatientDetailsAction = createAction(
  APPOINTMENT_SEARCH,
  props<{ payload: RequestGetPatientDetailsByAppointmentIdModel }>()
);

export const appointmentsGetPatientDetailsSuccessAction = createAction(
  `${APPOINTMENT_GET_PATIENT_DETAILS} success`,
  props<{
    payload: ResponseGetPatientDetailsByAppointmentIdModel;
  }>()
);

//ACTIVATE APPOINTMENT
const APPOINTMENT_ACTIVATE = '[APPOINTMENT] activate appointment';
export const appointmentActivateAction = createAction(
  APPOINTMENT_ACTIVATE,
  props<{ payload: RequestActivateAppointmentModel }>()
);

export const appointmentActivateSuccessAction = createAction(
  `${APPOINTMENT_ACTIVATE} success`,
  props<{
    payload: BaseResponseModel;
  }>()
);

//DEACTIVATE APPOINTMENT
const APPOINTMENT_DEACTIVATE = '[APPOINTMENT] deactivate appointment';
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

//UNLOCK APPOINTMENT
const APPOINTMENT_CANCEL = '[APPOINTMENT] cancel appointment';
export const appointmentCancelAction = createAction(
  APPOINTMENT_CANCEL,
  props<{ payload: { id: string } }>()
);

export const appointmentCancelSuccessAction = createAction(
  `${APPOINTMENT_CANCEL} success`,
  props<{
    payload: BaseResponseModel;
  }>()
);

//SEARCH AUDIT LOG
const APPOINTMENT_AUDIT_LOG_SEARCH = '[APPOINTMENT] search audit logs';
export const appointmentAuditLogListSearchAction = createAction(
  APPOINTMENT_AUDIT_LOG_SEARCH,
  props<{ payload: RequestGetAppointmentAuditLogsModel }>()
);

export const patientsAuditLogListSearchSuccessAction = createAction(
  `${APPOINTMENT_AUDIT_LOG_SEARCH} success`,
  props<{
    payload: ResponseGetAuditLogListModel;
  }>()
);

//UPDATE APPOINTMENT ATTENDANCE YES DETAILS
const APPOINTMENT_CLINIC_NOTE_UPDATE = '[APPOINTMENT] update appointment details';
export const appointmentUpdateDetailsAction = createAction(
  APPOINTMENT_CLINIC_NOTE_UPDATE,
  props<{ payload: RequestUpdateAppointmentDetailsModel }>()
);

export const appointmentUpdateDetailsSuccessAction = createAction(
  `${APPOINTMENT_CLINIC_NOTE_UPDATE} success`
);

//UPDATE APPOINTMENT ATTENDANCE YES STATS
const APPOINTMENT_UPDATE_START = '[APPOINTMENT] update appointment stats';
export const appointmentUpdateStatsAction = createAction(
  APPOINTMENT_UPDATE_START,
  props<{ payload: RequestUpdateAppointmentSettingsModel }>()
);

export const appointmentUpdateStatsSuccessAction = createAction(
  `${APPOINTMENT_UPDATE_START} success`
);

//APPOINTMENT CHANGE STATUS
const APPOINTMENT_CHANGE_STATUS = '[APPOINTMENT] appointment change status';
export const appointmentChangeStatusAction = createAction(
  APPOINTMENT_CHANGE_STATUS,
  props<{ payload: RequestUpdateAppointmentStatusModel }>()
);

export const appointmentChangeStatusSuccessAction = createAction(
  `${APPOINTMENT_CHANGE_STATUS} success`
);

//APPOINTMENT UPDATE REPORT
const APPOINTMENT_UPDATE_REPORT = '[APPOINTMENT] appointment update report';
export const appointmentUpdateReportAction = createAction(
  APPOINTMENT_UPDATE_REPORT,
  props<{ payload: RequestUpdateAppointmentReportModel }>()
);

export const appointmentUpdateReportSuccessAction = createAction(
  `${APPOINTMENT_UPDATE_REPORT} success`
);

//APPOINTMENT UPDATE PATIENT INFO
const APPOINTMENT_UPDATE_PATIENT_INFORM =
  '[APPOINTMENT] appointment update patient inform';
export const appointmentUpdatePatientInformAction = createAction(
  APPOINTMENT_UPDATE_PATIENT_INFORM,
  props<{ payload: RequestUpdatePatientContactInformationModel }>()
);

export const appointmentUpdatePatientInformSuccessAction = createAction(
  `${APPOINTMENT_UPDATE_PATIENT_INFORM} success`
);

//LOCAL
const SET_SEARCH_PARAMS = '[APPOINTMENT] set appointments search params';
export const setAppointmentsSearchParamsAction = createAction(
  SET_SEARCH_PARAMS,
  props<{ payload: RequestGetAppointmentListModel }>()
);

const APPOINTMENT_CLEAR_PATIENT_DETAILS =
  '[APPOINTMENT] clear appointment patient details';
export const clearAppointmentPatientDetails = createAction(
  APPOINTMENT_CLEAR_PATIENT_DETAILS
);

const APPOINTMENT_CLEAR_DETAILS = '[APPOINTMENT] clear appointment details';
export const clearAppointmentDetailsDataAction = createAction(APPOINTMENT_CLEAR_DETAILS);

const APPOINTMENT_CLEAR_SEARCH_PARAMS = '[APPOINTMENT] clear appointment details';
export const clearAppointmentSearchParamsAction = createAction(
  APPOINTMENT_CLEAR_SEARCH_PARAMS
);
