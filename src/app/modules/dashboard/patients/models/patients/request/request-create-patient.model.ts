import { GenderEnum, PhoneCodeEnum } from 'src/app/shared/enums';
import { UpsertPatientJobModel } from './request-update-patient.model';

export interface RequestCreatePatientModel {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  homeAddress: string;
  email: string;
  pin?: string;
  phoneNumber: string;
  phoneCode: PhoneCodeEnum;
  gender: GenderEnum;
  confidentialInfo?: string;
  clientId: string;
  patientJobs?: UpsertPatientJobModel[];
  departmentIds?: string[];
  occupationalHistory?: string[];
  purchaseOrderNumber?: number;
}
