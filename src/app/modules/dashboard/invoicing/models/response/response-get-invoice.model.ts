import { BaseResponseModel } from 'src/app/shared/models';
import { ResponseAppointmentListItem } from '../../../appointments/models';
import { ResponseContractListItem } from '../../../contracts/models';
import { InvoiceStatusEnum } from '../../enums';
import { ResponseInvoiceAppointmentListItemModel } from './response-get-invoice-appointments.model';

export interface ResponseGetInvoiceByIdModel extends BaseResponseModel {
  id: string;
  customId: string;
  contractId: string;
  contract: ResponseContractListItem;
  status: InvoiceStatusEnum;
  isActive: boolean;
  clientId: string;
  appointments: ResponseInvoiceAppointmentListItemModel[];
}
