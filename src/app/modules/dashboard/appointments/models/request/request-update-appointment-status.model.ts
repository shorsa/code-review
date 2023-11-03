import { AppointmentStatusEnum } from '../../enums';

export interface RequestUpdateAppointmentStatusModel {
  id: string;
  status: AppointmentStatusEnum;
  statusReason?: string;
}
