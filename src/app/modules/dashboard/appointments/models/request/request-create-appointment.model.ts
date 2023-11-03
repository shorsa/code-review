import { AppointmentTypeEnum } from '../../enums';

export interface RequestCreateAppointmentModel {
  clinicId: string;
  referralId: string;
  date: string;
  startTime: string;
  type: AppointmentTypeEnum;
  notes: string;
}
