import { createAction, props } from '@ngrx/store';
import { RequestGetAuditLogsByPatientIdModel } from '../models/patients';
import { ResponseGetAuditLogListModel } from '../models/patients/response/response-get-audit-log-list.model';

//SEARCH AUDIT LOG
const PATIENT_AUDIT_LOG_SEARCH = '[PATIENT] search audit logs';
export const patientsAuditLogListSearchAction = createAction(
  PATIENT_AUDIT_LOG_SEARCH,
  props<{ payload: RequestGetAuditLogsByPatientIdModel }>()
);

export const patientsAuditLogListSearchSuccessAction = createAction(
  `${PATIENT_AUDIT_LOG_SEARCH} success`,
  props<{
    payload: ResponseGetAuditLogListModel;
  }>()
);
