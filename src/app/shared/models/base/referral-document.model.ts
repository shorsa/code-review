import { ReferralModel } from './referral.model';

export interface ReferralDocumentModel {
  id: string;
  name: string;
  referralId: string;
  referral: ReferralModel;
  storagePath: string;
}
