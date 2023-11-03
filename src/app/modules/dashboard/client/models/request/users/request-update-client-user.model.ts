import { PhoneCodeEnum } from 'src/app/shared/enums';

export interface RequestUpdateClientUserModel {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  phoneCode: PhoneCodeEnum;
  isSuperuser: boolean;
  canBookOnline: boolean;
  clientId: string;
  applicationUserId: string;
  departmentIds?: string;
}
