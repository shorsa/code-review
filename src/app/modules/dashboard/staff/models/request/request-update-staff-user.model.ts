import { PhoneCodeEnum, UserRoleEnum } from 'src/app/shared/enums';

export interface RequestUpdateStaffUserModel {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  phoneCode: PhoneCodeEnum;
  canTriage: boolean;
  applicationUserId: string;
  role: UserRoleEnum;
}
