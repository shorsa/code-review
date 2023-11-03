import { RequestBasePaginationModel } from 'src/app/shared/models';
import { ReferralOrderByOptionsEnum } from '../../enums';
import { IsActiveFilterEnum, ReferralStatusEnum } from 'src/app/shared/enums';

export interface RequestGetReferralListModel extends RequestBasePaginationModel {
  patientId?: string;
  referralOrderByOptions?: ReferralOrderByOptionsEnum;
  isOrderByAsc?: boolean;
  statusFilter?: ReferralStatusEnum;
  searchText?: string;
  isActiveFilter: IsActiveFilterEnum;
}
