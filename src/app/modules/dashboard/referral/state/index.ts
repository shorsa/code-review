import { ResponseGetAppointmentListModel } from '../../appointments/models';
import { ResponseGetClientOptionsModelItem } from '../../client/models';
import { ResponseGetDepartmentOptionsModelIdem } from '../../departments/models';
import {
  ResponseGetAuditLogListModel,
  ResponseGetPatientOptionsModelItem,
  ResponsePatientListItem,
} from '../../patients/models/patients';
import { ResponseGetProductOptionsModelItem } from '../../products/models';
import {
  ManagementReferralModel,
  OccupationalHealthGeneralReferral,
  ReferralDetailsModel,
  RequestGetReferralListModel,
  ResponseGetReferralDocumentListModel,
  ResponseGetReferralListModel,
} from '../../referral/models';

export interface ReferralState {
  referralDetails?: ReferralDetailsModel;
  referralList?: ResponseGetReferralListModel;
  clientOptions?: ResponseGetClientOptionsModelItem[];
  departmentOptions?: { [key: string]: ResponseGetDepartmentOptionsModelIdem[] };
  referralSearchParams?: RequestGetReferralListModel;
  patientsListData?: ResponseGetPatientOptionsModelItem[];
  productOptions?: ResponseGetProductOptionsModelItem[];
  occupationalHealthDetails?: OccupationalHealthGeneralReferral;
  referralManagementFormDetails?: ManagementReferralModel;
  documentsList?: ResponseGetReferralDocumentListModel;
  appointmentList?: ResponseGetAppointmentListModel;
  auditLogList?: ResponseGetAuditLogListModel;
}
