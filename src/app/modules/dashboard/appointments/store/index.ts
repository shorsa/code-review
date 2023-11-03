import {
  RequestGetAppointmentListModel,
  ResponseGetAppointmentByIdModel,
  ResponseGetAppointmentDocumentListModel,
  ResponseGetAppointmentListModel,
  ResponseGetAuditLogListModel,
  ResponseGetPatientDetailsByAppointmentIdModel,
} from '../models';

export interface AppointmentsState {
  appointmentDetails?: ResponseGetAppointmentByIdModel;
  appointmentsSearchParams?: RequestGetAppointmentListModel;
  appointmentsListData?: ResponseGetAppointmentListModel;
  patientDetails?: ResponseGetPatientDetailsByAppointmentIdModel;
  documentsList?: ResponseGetAppointmentDocumentListModel;
  historyLogList?: ResponseGetAuditLogListModel;
}
