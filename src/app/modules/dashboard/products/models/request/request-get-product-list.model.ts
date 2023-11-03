import { IsActiveFilterEnum } from 'src/app/shared/enums';
import { RequestBasePaginationModel } from 'src/app/shared/models';
import { ProductOrderByOptionsEnum } from '../../enums';

export interface RequestGetProductListModel extends RequestBasePaginationModel {
  searchText?: string;
  isActiveFilter: IsActiveFilterEnum;
  productOrderByOptions?: ProductOrderByOptionsEnum;
  isOrderByAsc?: boolean;
}
