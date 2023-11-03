import {
  BaseResponseModel,
  ClientUserModel,
  ResponseUserItem,
} from 'src/app/shared/models';
import { ResponseClientListItem } from '../..';

export interface ResponseGetClientUserListModel extends BaseResponseModel {
  clientUsers: ResponseClientUserListItem[];
  totalCount: number;
}

export interface ResponseClientUserListItem {
  id: string;
  customClientUserId: string;
  applicationUserId: string;
  applicationUser: ResponseUserItem;
  canBookOnline: boolean;
  clientId: string;
  client: ResponseClientListItem;
  isSuperuser: boolean;
  clientUserDepartments?: ResponseClientUserDepartmentListItem[];
}

export interface ResponseClientUserDepartmentListItem {
  id: string;
  clientUserId: string;
  departmentId: string;
  departmentName: string;
}
