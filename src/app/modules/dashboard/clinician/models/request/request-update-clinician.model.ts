import { PhoneCodeEnum } from 'src/app/shared/enums';

export interface RequestUpdateClinicianModel {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  phoneCode: PhoneCodeEnum;
  jobTitle: string;
  homeAddress: string;
  applicationUserId: string;
  gmcNumber: string;
}
