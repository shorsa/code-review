import { BaseResponseModel } from 'src/app/shared/models';

export interface ResponseGetPatientDetailsByAppointmentIdModel extends BaseResponseModel {
  id: string;
  name: string;
  dateOfBirth: string;
  phoneNumber: string;
  email: string;
  address: string;
  employer: string;
  jobTitle: string;
  clinicianName: string;
}
