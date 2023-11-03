import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { AuthState } from '.';
import * as authActions from './auth.actions';

const initialState: AuthState = {
  email: undefined,
  requiresTwoFactor: undefined,
  isCodeSended: undefined,
  status: undefined,
  remainingAttempts: undefined,
};

export const authReducer: ActionReducer<AuthState, Action> = createReducer(
  initialState,
  on(authActions.loginSuccessAction, (state: AuthState, { payload }): AuthState => {
    const { requiresTwoFactor, email } = payload;
    return {
      ...state,
      email,
      requiresTwoFactor,
    };
  }),
  on(authActions.setTwoFactorAction, (state: AuthState, { payload }): AuthState => {
    const { email, isCodeSended } = payload;
    return {
      ...state,
      email,
      isCodeSended,
    };
  }),
  on(
    authActions.sendVerificationCodeSuccessAction,
    (state: AuthState, { payload }): AuthState => {
      const { requiresTwoFactor } = payload;
      return {
        ...state,
        requiresTwoFactor,
      };
    }
  ),
  on(
    authActions.forgotPasswordSuccessAction,
    (state: AuthState, { payload }): AuthState => {
      const { email } = payload;
      return {
        ...state,
        email,
        isCodeSended: true,
      };
    }
  ),
  on(authActions.loginAttemptErrorAction, (state: AuthState, { payload }): AuthState => {
    const { remainingAttempts, status } = payload;
    return {
      ...state,
      remainingAttempts,
      status,
    };
  }),
  on(authActions.loginAttemptErrorClearAction, (state: AuthState): AuthState => {
    return {
      ...state,
      remainingAttempts: initialState.remainingAttempts,
      status: initialState.status,
    };
  }),
  on(
    authActions.resetPasswordCodeSuccessAction,
    (state: AuthState, { payload }): AuthState => {
      const { email, code } = payload;
      return {
        ...state,
        email,
        code,
      };
    }
  ),
  on(authActions.resetPasswordSuccessAction, (state: AuthState): AuthState => {
    return {
      ...state,
      email: initialState.email,
      code: initialState.code,
    };
  })
);

export function AuthReducer(state: AuthState, action: Action): AuthState {
  return authReducer(state, action);
}
