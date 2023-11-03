import { BaseResponseModel } from 'src/app/shared/models';

export interface ResponseGetAvailableAppointmentDatesByMonthModel
  extends BaseResponseModel {
  dates: string[];
}
