import { BaseResponseModel } from 'src/app/shared/models';
import { HistoryLogEntityEnum, HistoryLogTypeEnum } from '../../../patients/enums';
import { AppointmentStatusEnum, BillingActionEnum } from '../../enums';

export interface ResponseGetAuditLogListModel extends BaseResponseModel {
  auditLogs: ResponseGetAuditLogListItemModel[];
  totalCount: number;
}

export interface ResponseGetAuditLogListItemModel {
  id: string;
  userName: string;
  type: HistoryLogTypeEnum;
  entity: HistoryLogEntityEnum;
  status: AppointmentStatusEnum;
  billingAction: BillingActionEnum;
  message?: string;
  date: string;
}
