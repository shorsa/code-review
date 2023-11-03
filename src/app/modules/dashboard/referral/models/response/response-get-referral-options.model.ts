import { BaseResponseModel } from 'src/app/shared/models';

export interface ResponseGetReferralOptionsModel extends BaseResponseModel {
  referrals: ResponseGetReferralOptionsModelItem[];
}

export interface ResponseGetReferralOptionsModelItem {
  id: string;
  customId: string;
  productName?:string;
}
