import { ResponseReferralListItem } from 'src/app/modules/dashboard/referral/models';
import { GenderEnum } from 'src/app/shared/enums';
import {
  BaseResponseModel,
  PatientDocumentModel,
  PatientJobModel,
} from 'src/app/shared/models';
import { ResponseClientUserListItem } from '../../../../client/models';
import { ResponseNoteListItem } from '../../notes';

export interface ResponseGetPatientByIdModel extends BaseResponseModel {
  patient: ResponsePatientDetails;
}

export interface ResponsePatientDetails {
  id: string;
  identifier: string;
  customPatientId: string;
  dateOfBirth: string;
  homeAddress: string;
  gender: GenderEnum;
  pin?: string;
  purchaseOrderNumber?: number;
  confidentialInfo?: string;
  clientUserId: string;
  clientUser: ResponseClientUserListItem;
  leavingDate?: string;
  occupationalHistory?: string[];
  patientJobs?: PatientJobModel[];
  referrals: ResponseReferralListItem[];
  patientDocuments: PatientDocumentModel[];
  confidentialNotes: ResponseConfidentialNoteListItem[];
}

export interface ResponseConfidentialNoteListItem {
  id: string;
  patientId: string;
  description: string;
  createdByName: string;
  created: string;
}
