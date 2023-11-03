import { IsActiveFilterEnum } from 'src/app/shared/enums';
import { RequestBasePaginationModel } from 'src/app/shared/models';
import { InvoiceOrderByOptionsEnum, InvoiceStatusEnum } from '../../enums';

export interface RequestGetInvoiceListModel extends RequestBasePaginationModel {
  searchText?: string;
  clientId?: string;
  isActiveFilter?: IsActiveFilterEnum;
  orderByOptions?: InvoiceOrderByOptionsEnum;
  statusFilter?: InvoiceStatusEnum;
  isOrderByAsc?: boolean;
}
