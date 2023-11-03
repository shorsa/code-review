import { IsActiveFilterEnum } from 'src/app/shared/enums';
import { RequestBasePaginationModel } from 'src/app/shared/models';

export interface RequestGetLocationListModel extends RequestBasePaginationModel {
  clinicianId?: string;
  orderByName?: boolean;
  isOrderByAsc?: boolean;
  searchText?: string;
  isActiveFilter: IsActiveFilterEnum;
}
