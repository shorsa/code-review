import { RequestBasePaginationModel } from 'src/app/shared/models';
import { ContractOrderByOptionsEnum, ContractStatusFilterEnum } from '../../enums';
import { InvoiceTypeEnum, IsActiveFilterEnum } from 'src/app/shared/enums';

export interface RequestGetContractListModel extends RequestBasePaginationModel {
  searchText?: string;
  isOrderByAsc?: boolean;
  contractOrderByOptions?: ContractOrderByOptionsEnum;
  isActiveFilter?: IsActiveFilterEnum;
  statusFilter?: ContractStatusFilterEnum;
  invoiceTypeFilter?: InvoiceTypeEnum;
}
