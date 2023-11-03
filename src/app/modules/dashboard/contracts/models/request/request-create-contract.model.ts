import { InvoiceTypeEnum } from 'src/app/shared/enums';

export interface RequestCreateContractModel {
  clientId: string;
  clientAddress: string;
  paymentTimeFrame: string;
  invoiceType: InvoiceTypeEnum;
  products?: RequestUpdateContractProductModel[];
  clinicianIds?: string[];
}

export interface RequestUpdateContractProductModel {
  productId: string;
  price?: number;
}
