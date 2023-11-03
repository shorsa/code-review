import { InvoiceTypeEnum } from 'src/app/shared/enums';
import { BaseResponseModel } from 'src/app/shared/models';

export interface ResponseGetClientOptionsModel extends BaseResponseModel {
  clients: ResponseGetClientOptionsModelItem[];
}

export interface ResponseGetClientOptionsModelItem {
  id: string;
  name: string;
  code?: number;
  invoiceType?: InvoiceTypeEnum
}
