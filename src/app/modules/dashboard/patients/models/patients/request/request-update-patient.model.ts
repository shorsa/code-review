import { GenderEnum, PhoneCodeEnum } from 'src/app/shared/enums';
import { ClientUserDepartmentModel, PatientJobModel } from 'src/app/shared/models';

export interface RequestUpdatePatientModal {
  id: string;
  dateOfBirth: string;
  homeAddress: string;
  gender: GenderEnum;
  pin?: string;
  patientJobs?: UpsertPatientJobModel[];
  clientUserId: string;
  clientId: string;
  firstName: string;
  lastName: string;
  phoneCode: PhoneCodeEnum;
  phoneNumber: string;
  email?: string;
  confidentialInfo?: string;
  departmentIds?: string[];
  occupationalHistory?: string[];
  purchaseOrderNumber?: number;
}

export interface UpsertPatientJobModel {
  id?: string;
  patientId?: string;
  description?: string;
  notAvailable: boolean;
  title: string;
  startDate?: string;
  patientJobDocuments: UpsertPatientJobDocumentModel[];
}

export interface UpsertPatientJobDocumentModel {
  id?: string;
  patientJobId?: string;
  name?: string;
  file: File;
}
