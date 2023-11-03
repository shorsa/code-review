import { AuthFailedStatus } from 'src/app/shared/enums';
import { BaseResponseModel } from 'src/app/shared/models';

export interface ResponseSignInModel extends BaseResponseModel {
  accessToken?: string;
  refreshToken?: string;
  requiresTwoFactor?: boolean;
  remainingAttempts?: number;
  status?: AuthFailedStatus;
}
