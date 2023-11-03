import { BaseResponseModel } from 'src/app/shared/models';
import { InvoiceStatusEnum } from '../../enums';

export interface ResponseGetInvoiceListModel extends BaseResponseModel {
  totalCount: number;
  invoices: ResponseInvoiceListItem[];
}

export interface ResponseInvoiceListItem {
  id: string;
  customId: string;
  productType: string;
  price?: number;
  clientId: string;
  clientName: string;
  date: string;
  status: InvoiceStatusEnum;
  isActive: boolean;
}
