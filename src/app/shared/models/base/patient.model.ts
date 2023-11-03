import { GenderEnum } from '../../enums';
import { ClientUserModel } from './client-user.model';
import { PatientDocumentModel } from './patient-document.model';
import { PatientJobModel } from './patient-job.model';
import { ReferralModel } from './referral.model';

export interface PatientModel {
  id: string;
  identifier: string;
  customPatientId: string;
  dateOfBirth: string;
  homeAddress: string;
  gender: GenderEnum;
  pin: string;
  confidentialInfo: string;
  clientUserId: string;
  clientUser: ClientUserModel;
  leavingDate?: string;
  patientJobs?: PatientJobModel[];
  referrals: ReferralModel[];
  patientDocuments: PatientDocumentModel[];
}
