import { AppointmentSettingModel, BaseResponseModel } from 'src/app/shared/models';

export interface ResponseGetAppointmentStatListModel extends BaseResponseModel {
  appointmentSettings: AppointmentSettingModel[];
  totalCount: number;
}
