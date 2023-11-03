import { PhoneCodeEnum, UserRoleEnum } from 'src/app/shared/enums';

export interface RequestCreateStuffUserModel {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  phoneCode: PhoneCodeEnum;
  canTriage: boolean;
  role: UserRoleEnum;
}
