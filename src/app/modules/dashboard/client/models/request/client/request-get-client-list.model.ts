import { RequestBasePaginationModel } from 'src/app/shared/models';
import { IsActiveFilterEnum } from 'src/app/shared/enums';
import { ClientOrderByOptionsEnum } from '../../../enums';

export interface RequestGetClientListModel extends RequestBasePaginationModel {
  searchText?: string;
  clientOrderByOptions?: ClientOrderByOptionsEnum;
  isOrderByAsc?: boolean;
  isActiveFilter: IsActiveFilterEnum;
}
