import { ReferralStatusEnum } from 'src/app/shared/enums';
import { RequestBasePaginationModel } from 'src/app/shared/models';

export interface RequestGetReferralOptionsModel extends RequestBasePaginationModel {
  searchText?: string;
  patientId?: string;
  includeProducts?: boolean;
  status?: ReferralStatusEnum;
  isForAppointment?: boolean;
}
