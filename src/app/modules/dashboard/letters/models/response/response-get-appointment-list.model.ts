import { ReferralStatusEnum } from 'src/app/shared/enums';
import { BaseResponseModel } from 'src/app/shared/models';
import { AppointmentReportStatusEnum } from '../../enums';

export interface ResponseGetAppointmentReportListModel extends BaseResponseModel {
  reports: ResponseGetAppointmentReportListItemModel[];
  totalCount: number;
}

export interface ResponseGetAppointmentReportListItemModel {
  appointmentId: string;
  customAppointmentId: string;
  patientName: string;
  clinicianName: string;
  appointmentTime: string;
  customReferralId: string;
  clientName: string;
  status: AppointmentReportStatusEnum;
}
