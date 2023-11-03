import { IsActiveFilterEnum } from 'src/app/shared/enums';
import { RequestBasePaginationModel } from 'src/app/shared/models';

export interface RequestGetRoomListModel extends RequestBasePaginationModel {
  clinicianId?: string;
  searchText?: string;
  siteId?: string;
  isOrderByAsc?: boolean;
  isActiveFilter: IsActiveFilterEnum;
}
