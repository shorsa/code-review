import { RequestBasePaginationModel } from 'src/app/shared/models';

export interface RequestGetReferralDocumentListByReferralIdModel
  extends RequestBasePaginationModel {
  searchText?: string;
  referralId?: string;
}
