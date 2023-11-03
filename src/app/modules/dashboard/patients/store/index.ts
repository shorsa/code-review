import { ResponseGetClientOptionsModelItem } from '../../client/models';
import { ResponseGetDepartmentOptionsModelIdem } from '../../departments/models';
import {
  RequestGetReferralListModel,
  ResponseGetReferralListModel,
} from '../../referral/models';
import { ResponseGetPatientDocumentListModel } from '../models/documents';
import { ResponseGetNoteListByPatientIdModel } from '../models/notes';
import {
  RequestGetPatientListModel,
  RequestGetPreDeleteListModel,
  ResponseGetAuditLogListModel,
  ResponseGetPatientListModel,
  ResponseGetPatientPreDeleteListModel,
  ResponsePatientDetails,
} from '../models/patients';

export interface PatientState {
  patientDetails?: ResponsePatientDetails;
  patientsSearchParams?: RequestGetPatientListModel;
  patientsListData?: ResponseGetPatientListModel;
  patientsMergeListData?: ResponseGetPatientListModel;
  departmentsListData?: { [key: string]: ResponseGetDepartmentOptionsModelIdem[] };
  clientOptions?: ResponseGetClientOptionsModelItem[];
  //Referral
  referralsSearchParams?: RequestGetReferralListModel;
  referralsListData?: ResponseGetReferralListModel;
  //Documents
  documentsList?: ResponseGetPatientDocumentListModel;
  //Notes
  noteListData?: ResponseGetNoteListByPatientIdModel;
  //Audit Logs
  auditLogListData?: ResponseGetAuditLogListModel;
  //Pre Delete
  patientsPreDeleteListData?: ResponseGetPatientPreDeleteListModel;
}
