import { BaseResponseModel } from 'src/app/shared/models';
import { AppointmentStatusEnum } from '../../enums';

export interface ResponseGetAppointmentListModel extends BaseResponseModel {
  appointments: ResponseAppointmentListItem[];
  totalCount: number;
}

export interface ResponseAppointmentListItem {
  id: string;
  customAppointmentId: string;
  clinicianName: string;
  startTime: string;
  referralCustomId: string;
  status: AppointmentStatusEnum;
  report: string;
  isActive: boolean;
  patientName: string;
  patientDOB: string;
  clientName: string;
  productType: string;
}
