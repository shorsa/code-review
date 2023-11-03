import { ReferralStatusEnum } from 'src/app/shared/enums';
import { BaseResponseModel, ProductModel } from 'src/app/shared/models';
import { ReferralTypeEnum } from '../../enums';

export interface ResponseGetReferralListModel extends BaseResponseModel {
  referrals: ResponseReferralListItem[];
  totalCount: number;
}

export interface ResponseReferralListItem {
  id: string;
  customReferralId: string;
  patientName: string;
  dateOfBirth: string;
  location?: string;
  contractId: string;
  createdBy: string;
  created: string;
  client: string;
  status: ReferralStatusEnum;
  clientKpi?: number;
  isActive: boolean;
  productName: string;
  type: ReferralTypeEnum;
}
