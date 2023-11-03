import { ReferralStatusEnum } from 'src/app/shared/enums';

export interface RequestUpdateReferralStatusModel {
  id: string;
  status: ReferralStatusEnum;
  reason?: string;
}
