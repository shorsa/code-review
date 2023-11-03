import { AppointmentStatTypeEnum } from '../../enums';

export interface RequestCreateAppointmentStatModel {
  appointmentSettingsType: AppointmentStatTypeEnum;
  name: string;
}
