import { BaseResponseModel, LocationModel } from 'src/app/shared/models';

export interface ResponseGetLocationModel extends BaseResponseModel {
  location: LocationModel;
}
