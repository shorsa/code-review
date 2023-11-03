import { AppointmentStatTypeEnum } from 'src/app/modules/dashboard/stats/enums';

export interface AppointmentSettingModel {
  id: string;
  appointmentSettingsType: AppointmentStatTypeEnum;
  name: string;
  isActive: boolean;
}
