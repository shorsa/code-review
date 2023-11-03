import { RequestBasePaginationModel } from 'src/app/shared/models';
import {
  AppointmentReportOrderByOptions,
  AppointmentReportStatusEnum,
} from '../../enums';

export interface RequestGetAppointmentReportsListModel
  extends RequestBasePaginationModel {
  searchText?: string;
  status?: AppointmentReportStatusEnum;
  orderByOptions?: AppointmentReportOrderByOptions;
  isOrderByAsc?: boolean;
}
