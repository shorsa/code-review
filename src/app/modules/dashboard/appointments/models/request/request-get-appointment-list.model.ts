import { RequestBasePaginationModel } from 'src/app/shared/models';
import { AppointmentOrderByOptionsEnum } from '../../enums';
import { IsActiveFilterEnum } from 'src/app/shared/enums';

export interface RequestGetAppointmentListModel extends RequestBasePaginationModel {
  clinicId?: string;
  referralId?: string;
  searchText?: string;
  appointmentOrderByOptions?: AppointmentOrderByOptionsEnum;
  isOrderByAsc?: boolean;
  isActiveFilter?: IsActiveFilterEnum;
  date?: string;
}
