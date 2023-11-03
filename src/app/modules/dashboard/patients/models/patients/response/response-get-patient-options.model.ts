import { BaseResponseModel } from 'src/app/shared/models';

export interface ResponseGetPatientOptionsModel extends BaseResponseModel {
  patients: ResponseGetPatientOptionsModelItem[];
}

export interface ResponseGetPatientOptionsModelItem {
  id: string;
  name: string;
  customPatientId: string;
  dateOfBirth: string;
  email?: string;
  phoneNumber?: string;
}
