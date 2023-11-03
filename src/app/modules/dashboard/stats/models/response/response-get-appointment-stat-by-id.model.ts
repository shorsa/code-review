import { AppointmentSettingModel, BaseResponseModel } from 'src/app/shared/models';

export interface ResponseGetAppointmentStatByIdModel extends BaseResponseModel {
  appointmentSetting: AppointmentSettingModel;
}
