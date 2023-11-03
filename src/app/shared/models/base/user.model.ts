import { PhoneCodeEnum, UserRoleEnum } from '../../enums';

export interface UserModel {
  id: string;
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
  emailConfirmed: boolean;
  phoneNumber: string;
  phoneCode: PhoneCodeEnum;
  phoneNumberConfirmed: boolean;
  twoFactorEnabled: boolean;
  lockoutEnd: string | null;
  accessFailedCount: number;
  refreshToken: string;
  role: UserRoleEnum;
  isActive: boolean;
}
