import { ReferralStatusEnum } from 'src/app/shared/enums';
import { ReferralTypeEnum } from '../../enums';

export interface RequestCreateReferralModel {
  date?: Date;
  patientId: string;
  productId?: string;
}
