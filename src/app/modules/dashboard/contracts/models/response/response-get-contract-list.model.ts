import { InvoiceTypeEnum } from 'src/app/shared/enums';
import { BaseResponseModel } from 'src/app/shared/models';

export interface ResponseGetContractListModel extends BaseResponseModel {
  contracts: ResponseContractListItem[];
  totalCount: number;
}
export interface ResponseContractListItem {
  id: string;
  customId: string;
  contractDate: string;
  clientId: string;
  clientCode: string;
  clientName: string;
  invoiceType: InvoiceTypeEnum;
  isActive: boolean;
  isClosed: boolean;
}
