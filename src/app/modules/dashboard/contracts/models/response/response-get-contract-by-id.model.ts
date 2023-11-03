import { BaseResponseModel } from 'src/app/shared/models';
import { ResponseClientListItem } from '../../../client/models';
import { InvoiceTypeEnum } from 'src/app/shared/enums';

export interface ResponseGetContractByIdModel extends BaseResponseModel {
  id?: string;
  customId: string;
  clientId: string;
  client: ResponseClientListItem;
  clientAddress: string;
  paymentTimeFrame: string;
  invoiceType: InvoiceTypeEnum;
  groupInvoiceByClinic: boolean;
  isActive?: boolean;
  contractProducts?: string[];
  contractClinicians?: string[];
}
