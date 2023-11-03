import { PhoneCodeEnum, UserRoleEnum } from 'src/app/shared/enums';

export interface RequestCreateClientUserModel {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  phoneCode: PhoneCodeEnum;
  isSuperuser: boolean;
  canBookOnline: boolean;
  clientId: string;
  departmentIds?: string[];
  role: UserRoleEnum;
}
