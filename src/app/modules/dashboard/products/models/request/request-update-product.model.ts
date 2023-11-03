import { ReferralTypeEnum } from '../../../referral/enums';

export interface RequestUpdateProductModel {
  id: string;
  name: string;
  isHealthSurveillance: boolean;
  defaultPrice?: number;
  description?: string;
  templateHeading?: string;
  isAttendanceRequired: boolean;
  referralType: ReferralTypeEnum;
}
