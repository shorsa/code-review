import { RequestBasePaginationModel } from 'src/app/shared/models';
import { ReferralAuditLogOrderByOptions } from '../../enums';

export interface RequestGetReferralAuditLogsModel extends RequestBasePaginationModel {
  referralId: string;
  referralAuditLogOrderByOptions?: ReferralAuditLogOrderByOptions;
  searchText?: string;
  isOrderByAsc?: boolean;
}
