import { AppointmentStatTypeEnum } from '../../enums';

export interface RequestUpdateAppointmentStatModel {
  id: string;
  appointmentSettingsType: AppointmentStatTypeEnum;
  name: string;
}
