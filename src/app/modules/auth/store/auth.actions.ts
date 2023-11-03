import { createAction, props } from '@ngrx/store';
import { BaseResponseModel } from 'src/app/shared/models';
import {
  RequestForgotPasswordCodeModel,
  RequestForgotPasswordModel,
  RequestResendTwoFactorCodeModel,
  RequestResetPasswordModel,
  RequestSignInModel,
  RequestTwoStepSignInModel,
  ResponseSignInModel,
} from '../models';

//USER LOGIN
const USER_LOGIN = '[AUTH] user login';
export const loginAction = createAction(
  USER_LOGIN,
  props<{ payload: RequestSignInModel }>()
);

export const loginSuccessAction = createAction(
  `${USER_LOGIN} success`,
  props<{ payload: ResponseSignInModel & { email: string } }>()
);

//SEND VERIFICATION CODE
const SEND_VERIFICATION_CODE = '[AUTH] send verification code';
export const sendVerificationCodeAction = createAction(
  SEND_VERIFICATION_CODE,
  props<{ payload: RequestTwoStepSignInModel }>()
);

export const sendVerificationCodeSuccessAction = createAction(
  `${SEND_VERIFICATION_CODE} success`,
  props<{ payload: ResponseSignInModel }>()
);

//RESEND VERIFICATION CODE
const RESEND_VERIFICATION_CODE = '[AUTH] resend verification code';
export const resendVerificationCodeAction = createAction(
  RESEND_VERIFICATION_CODE,
  props<{ payload: RequestResendTwoFactorCodeModel }>()
);

export const resendVerificationCodeSuccessAction = createAction(
  `${RESEND_VERIFICATION_CODE} success`
);

//FORGOT PASSWORD
const FORGOT_PASSWORD_EMAIL = '[AUTH] forgot password';
export const forgotPasswordAction = createAction(
  FORGOT_PASSWORD_EMAIL,
  props<{ payload: RequestForgotPasswordModel }>()
);

export const forgotPasswordSuccessAction = createAction(
  `${FORGOT_PASSWORD_EMAIL} success`,
  props<{ payload: { email: string } }>()
);

//RESET PASSWORD
const RESET_PASSWORD = '[AUTH] set new password';
export const resetPasswordAction = createAction(
  RESET_PASSWORD,
  props<{ payload: RequestResetPasswordModel }>()
);

export const resetPasswordSuccessAction = createAction(
  `${RESET_PASSWORD} success`,
  props<{ payload: ResponseSignInModel }>()
);

//ADD NEW PASSWORD
const ADD_NEW_PASSWORD = '[AUTH] add new password';
export const addNewPasswordAction = createAction(
  ADD_NEW_PASSWORD,
  props<{ payload: RequestResetPasswordModel }>()
);

export const addNewPasswordSuccessAction = createAction(`${ADD_NEW_PASSWORD} success`);

//RESET PASSWORD CODE
const RESET_PASSWORD_CODE = '[AUTH] reset password code';
export const resetPasswordCodeAction = createAction(
  RESET_PASSWORD_CODE,
  props<{ payload: RequestForgotPasswordCodeModel }>()
);

export const resetPasswordCodeSuccessAction = createAction(
  `${RESET_PASSWORD_CODE} success`,
  props<{ payload: { code: string; email: string } }>()
);

//LOCAL ACTIONS

const USER_LOGIN_ATTEMPT_ERROR = '[AUTH] user login attempt error';
export const loginAttemptErrorAction = createAction(
  USER_LOGIN_ATTEMPT_ERROR,
  props<{ payload: Pick<ResponseSignInModel, 'status' | 'remainingAttempts'> }>()
);

const USER_LOGIN_ATTEMPT_CLEAR = '[AUTH] [AUTH] user login attempt error clear';
export const loginAttemptErrorClearAction = createAction(USER_LOGIN_ATTEMPT_CLEAR);

const SET_TO_FACTOR_AUTH = '[AUTH] two factor required';
export const setTwoFactorAction = createAction(
  SET_TO_FACTOR_AUTH,
  props<{ payload: { email: string; isCodeSended: boolean } }>()
);
