import { PhoneCodeEnum } from 'src/app/shared/enums';

export interface RequestUpdatePatientContactInformationModel {
  id: string;
  phoneNumber?: string;
  phoneCode: PhoneCodeEnum;
  email?: string;
}
