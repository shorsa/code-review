import { AuthFailedStatus } from 'src/app/shared/enums';

export interface AuthState {
  email?: string;
  requiresTwoFactor?: boolean;
  isCodeSended?: boolean;
  status?: AuthFailedStatus;
  remainingAttempts?: number;
  code?: string;
}
