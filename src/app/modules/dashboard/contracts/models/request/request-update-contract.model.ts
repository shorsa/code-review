import { InvoiceTypeEnum } from 'src/app/shared/enums';
import { RequestUpdateContractProductModel } from './request-create-contract.model';

export interface RequestUpdateContractModel {
  id?: string;
  clientId: string;
  clientAddress: string;
  paymentTimeFrame: string;
  invoiceType: InvoiceTypeEnum;
  products?: RequestUpdateContractProductModel[];
  clinicianIds?: string[];
}
