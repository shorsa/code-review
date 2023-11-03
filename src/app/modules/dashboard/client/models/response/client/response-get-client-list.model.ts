import { BaseResponseModel } from 'src/app/shared/models';

export interface ResponseGetClientListModel extends BaseResponseModel {
  clients: ResponseClientListItem[];
  totalCount: number;
}
export interface ResponseClientListItem {
  id: string;
  customClientId: string;
  code: number;
  fullName: string;
  contactPersonName: string;
  isActive: boolean;
}
