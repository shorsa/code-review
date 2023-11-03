import { AppointmentSettingModel } from 'src/app/shared/models';
import { ResponseGetAppointmentStatListModel } from '../models';

export interface StatsState {
  statsDetails?: AppointmentSettingModel;
  statsList?: ResponseGetAppointmentStatListModel;
}
