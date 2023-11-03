import { PhoneCodeEnum, UserRoleEnum } from '../../enums';

export interface ResponseUserItem {
  id: string;
  userName: string;
  email?: string;
  firstName: string;
  lastName: string;
  phoneCode: PhoneCodeEnum;
  phoneNumber: string;
  lockoutEnd?: string;
  role: UserRoleEnum;
  isActive: boolean;
}
