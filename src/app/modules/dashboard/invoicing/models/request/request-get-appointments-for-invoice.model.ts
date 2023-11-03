import { IsActiveFilterEnum } from 'src/app/shared/enums';
import { RequestBasePaginationModel } from 'src/app/shared/models';
import { AppointmentsForInvoiceOrderByOptionsEnum } from '../../enums';

export interface RequestGetAppointmentsForInvoiceModel
  extends RequestBasePaginationModel {
  searchText?: string;
  appointmentIdsToExclude: string[];
  orderByOptionsEnum?: AppointmentsForInvoiceOrderByOptionsEnum;
  isActiveFilter?: IsActiveFilterEnum;
}
