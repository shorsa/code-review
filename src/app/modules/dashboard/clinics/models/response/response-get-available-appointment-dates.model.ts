import { BaseResponseModel } from 'src/app/shared/models';

export interface ResponseGetAvailableAppointmentDatesModel extends BaseResponseModel {
  dates: string[];
}
