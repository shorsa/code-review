import { BaseResponseModel, OHRDUserModel } from 'src/app/shared/models';

export interface ResponseGetStaffUserListModel extends BaseResponseModel {
  ohrdUsers: OHRDUserModel[];
  totalCount: number;
}
