import { ReferralTypeEnum } from '../../../referral/enums';

export interface RequestCreateProductModel {
  name: string;
  isHealthSurveillance: boolean;
  defaultPrice?: number;
  description?: string;
  templateHeading?: string;
  isAttendanceRequired: boolean;
  referralType: ReferralTypeEnum;
}
