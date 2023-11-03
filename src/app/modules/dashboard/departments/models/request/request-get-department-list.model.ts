import { RequestBasePaginationModel } from 'src/app/shared/models';
import { DepartmentOrderByOptionsEnum } from '../../enums';
import { CanBookOnlineFilterEnum, IsActiveFilterEnum } from 'src/app/shared/enums';

export interface RequestGetDepartmentListModel extends RequestBasePaginationModel {
  searchText?: string;
  departmentOrderByOptions?: DepartmentOrderByOptionsEnum;
  isOrderByAsc?: boolean;
  clientId?: string;
  canBookOnlineFilter?: CanBookOnlineFilterEnum;
  isActiveFilterEnum: IsActiveFilterEnum;
}
