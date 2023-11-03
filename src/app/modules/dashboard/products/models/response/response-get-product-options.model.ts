import { BaseResponseModel } from 'src/app/shared/models';
import { ReferralTypeEnum } from '../../../referral/enums';

export interface ResponseGetProductOptionsModel extends BaseResponseModel {
  products: ResponseGetProductOptionsModelItem[];
}

export interface ResponseGetProductOptionsModelItem {
  id: string;
  name: string;
  referralType: ReferralTypeEnum;
}
