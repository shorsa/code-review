import { IsActiveFilterEnum } from 'src/app/shared/enums';
import { RequestBasePaginationModel } from 'src/app/shared/models';
import {
  AppointmentSettingOrderByOptionsEnum,
  AppointmentStatTypeEnum,
} from '../../enums';

export interface RequestGetAppointmentStatsListModel extends RequestBasePaginationModel {
  searchText?: string;
  appointmentSettingType: AppointmentStatTypeEnum;
  appointmentSettingOrderByOptions?: AppointmentSettingOrderByOptionsEnum;
  isOrderByAsc?: boolean;
  isActiveFilter: IsActiveFilterEnum;
}
