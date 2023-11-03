import { BaseResponseModel } from 'src/app/shared/models';
import { HistoryLogTypeEnum, HistoryLogEntityEnum } from '../../../enums';

export interface ResponseGetAuditLogListModel extends BaseResponseModel {
  auditLogs: ResponseGetAuditLogListItemModel[];
  totalCount: number;
}

export interface ResponseGetAuditLogListItemModel {
  id: string;
  userName: string;
  type: HistoryLogTypeEnum;
  entity: HistoryLogEntityEnum;
  message: string;
  date: string;
}
