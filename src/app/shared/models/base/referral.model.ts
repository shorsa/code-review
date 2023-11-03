import { ReferralStatusEnum } from '../../enums';
import { AppointmentModel } from './appointment.model';
import { ContractModel } from './contract.model';
import { PatientModel } from './patient.model';
import { ReferralDocumentModel } from './referral-document.model';

export interface ReferralModel {
  id: string;
  customReferralId: string;
  date: string;
  patientId: string;
  patient: PatientModel;
  contractId: string;
  contract: ContractModel;
  status: ReferralStatusEnum;
  referralDocuments: ReferralDocumentModel[];
  appointments: AppointmentModel[];
}
