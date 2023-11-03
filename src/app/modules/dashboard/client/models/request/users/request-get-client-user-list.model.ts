import { CanBookOnlineFilterEnum, IsActiveFilterEnum } from 'src/app/shared/enums';
import { RequestBasePaginationModel } from 'src/app/shared/models';
import { ClientUserOrderByOptions } from '../../../enums';

export interface RequestGetClientUsersListModel extends RequestBasePaginationModel {
  searchText?: string;
  clientId?: string;
  isActiveFilter?: IsActiveFilterEnum;
  clientUserOrderByOptions?: ClientUserOrderByOptions;
  canBookOnlineFilter?: CanBookOnlineFilterEnum;
  isOrderByAsc?: boolean;
  departmentIds?: string[];
}
