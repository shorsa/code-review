import { RequestBasePaginationModel } from 'src/app/shared/models';
import { AppointmentAuditLogOrderByOptionsEnum } from '../../enums';

export interface RequestGetAppointmentAuditLogsModel extends RequestBasePaginationModel {
  appointmentId: string;
  appointmentAuditLogOrderByOptions?: AppointmentAuditLogOrderByOptionsEnum;
  searchText?: string;
  isOrderByAsc?: boolean;
}
