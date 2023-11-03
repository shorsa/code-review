import { BaseResponseModel } from 'src/app/shared/models';

export interface ResponseGetNearestAvailableClinicianDateResponseModel
  extends BaseResponseModel {
  dateTime?: string;
}
