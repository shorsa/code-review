import { PhoneCodeEnum } from 'src/app/shared/enums';

export interface RequestCreateClinicianModel {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gmcNumber: string;
  phoneCode: PhoneCodeEnum;
  jobTitle: string;
  homeAddress: string;
}
