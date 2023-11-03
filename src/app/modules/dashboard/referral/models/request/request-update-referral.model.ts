import { ReferralStatusEnum } from 'src/app/shared/enums';

export interface RequestUpdateReferralModel {
  id: string;
  date: string;
  patientId: string;
  contractId: string;
  status: ReferralStatusEnum;
}
