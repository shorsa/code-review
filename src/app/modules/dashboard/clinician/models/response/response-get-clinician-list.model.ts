import { BaseResponseModel, ResponseUserItem } from 'src/app/shared/models';

export interface ResponseGetClinicianListModel extends BaseResponseModel {
  clinicians: ResponseClinicianListItem[];
  totalCount: number;
}

export interface ResponseClinicianListItem {
  id: string;
  customClinicianId: string;
  applicationUserId: string;
  applicationUser: ResponseUserItem;
  gmcNumber: string;
}
