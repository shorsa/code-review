import { ReferralTypeEnum } from 'src/app/modules/dashboard/referral/enums';

export interface ProductModel {
  id: string;
  customProductId?: string;
  isActive?: boolean;
  name: string;
  isHealthSurveillance?: boolean;
  defaultPrice?: number;
  description?: string;
  templateHeading?: string;
  isAttendanceRequired?: boolean;
  isDefaultProduct?: boolean;
  referralType?: ReferralTypeEnum;
}
