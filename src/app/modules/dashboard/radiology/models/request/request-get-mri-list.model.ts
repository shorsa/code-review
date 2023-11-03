import { IsActiveFilterEnum, UserRoleEnum } from 'src/app/shared/enums';
import { RequestBasePaginationModel } from 'src/app/shared/models';
import { MriRequestOrderByOptionsEnum } from '../../enums';

export interface RequestGetMriRequestListModel extends RequestBasePaginationModel {
  searchText?: string;
  orderByOptions?: MriRequestOrderByOptionsEnum;
  isOrderByAsc?: boolean;
}
