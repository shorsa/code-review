import { IsActiveFilterEnum, UserRoleEnum } from 'src/app/shared/enums';
import { RequestBasePaginationModel } from 'src/app/shared/models';
import { StaffUserOrderByOptionsEnum } from '../../enums';

export interface RequestGetStaffUserListModel extends RequestBasePaginationModel {
  searchText?: string;
  isActiveFilter: IsActiveFilterEnum;
  roleFilters?: UserRoleEnum[];
  oHRDUserOrderByOptions?: StaffUserOrderByOptionsEnum;
  isOrderByAsc?: boolean;
}
