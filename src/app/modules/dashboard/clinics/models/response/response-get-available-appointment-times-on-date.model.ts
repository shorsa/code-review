import { BaseResponseModel } from 'src/app/shared/models';

export interface ResponseGetAvailableAppointmentTimesOnDateModel
  extends BaseResponseModel {
  times: ResponseAppointmentDateTimeItemModel[];
}

export interface ResponseAppointmentDateTimeItemModel {
  clinicId: string;
  startTime: string;
  endTime: string;
}
