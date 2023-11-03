import { UserRoleEnum } from '../../enums';
import { UserModel } from './user.model';

export interface OHRDUserModel {
  id: string;
  applicationUserId: string;
  applicationUser: UserModel;
  canTriage: boolean;
  role: UserRoleEnum;
}
