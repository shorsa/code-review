import { BaseResponseModel, DepartmentModel } from 'src/app/shared/models';
import { ResponseClientListItem } from '../../../client/models';

export interface ResponseGetDepartmentListModel extends BaseResponseModel {
  departments: ResponseDepartmentListItem[];
  totalCount: number;
}

export interface ResponseDepartmentListItem {
  id: string;
  customDepartmentId: string;
  name: string;
  clientId: string;
  isActive: boolean;
  alertsEmail: string;
  client: ResponseClientListItem;
}
