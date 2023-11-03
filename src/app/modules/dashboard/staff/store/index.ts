import { OHRDUserModel } from 'src/app/shared/models';
import { RequestGetStaffUserListModel, ResponseGetStaffUserListModel } from '../models';

export interface StaffState {
  staffDetails?: OHRDUserModel;
  staffSearchParams?: RequestGetStaffUserListModel;
  staffListData?: ResponseGetStaffUserListModel;
}
