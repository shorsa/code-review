import { BaseResponseModel, OHRDUserModel } from 'src/app/shared/models';

export interface ResponseGetStaffUserByIdModel extends BaseResponseModel {
  ohrdUser: OHRDUserModel;
}
