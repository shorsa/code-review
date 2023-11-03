import { UserRoleEnum } from 'src/app/shared/enums';

export interface RequestUpdateRoleClaimsModel {
  role: UserRoleEnum;
  claims: string[];
}
