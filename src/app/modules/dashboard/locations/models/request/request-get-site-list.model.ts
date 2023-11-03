import { IsActiveFilterEnum } from 'src/app/shared/enums';
import { RequestBasePaginationModel } from 'src/app/shared/models';

export interface RequestGetSiteListModel extends RequestBasePaginationModel {
  clinicianId?: string;
  searchText?: string;
  locationId?: string;
  isOrderByAsc?: boolean;
  isActiveFilter: IsActiveFilterEnum;
}
