import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiEndpointsConstants } from 'src/app/core/constants';
import {
  RequestConfirmEmailModel,
  RequestForgotPasswordCodeModel,
  RequestResendTwoFactorCodeModel,
  RequestResetPasswordModel,
  RequestSignInModel,
  RequestTwoStepSignInModel,
  ResponseSignInModel,
} from 'src/app/modules/auth/models';
import { RequestRefreshAccessTokenModel } from 'src/app/modules/auth/models/request/request-refresh-access-token.model';
import { ApiEndpointHelper } from 'src/app/shared/helpers';
import { BaseResponseModel } from 'src/app/shared/models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  signIn(model: RequestSignInModel): Observable<ResponseSignInModel> {
    return this.httpClient.post<ResponseSignInModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.AUTH_SIGN_IN),
      model
    );
  }

  sendVerificationCode(
    model: RequestTwoStepSignInModel
  ): Observable<ResponseSignInModel> {
    return this.httpClient.post<ResponseSignInModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.AUTH_VERIFICATION_CODE),
      model
    );
  }

  resendTwoFactorCode(
    model: RequestResendTwoFactorCodeModel
  ): Observable<BaseResponseModel> {
    return this.httpClient.post<BaseResponseModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.AUTH_RESEND_VERIFICATION_CODE),
      model
    );
  }

  refreshToken(model: RequestRefreshAccessTokenModel): Observable<ResponseSignInModel> {
    return this.httpClient.post<ResponseSignInModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.AUTH_REFRESH_TOKEN),
      model
    );
  }

  forgotPassword(model: RequestResendTwoFactorCodeModel): Observable<BaseResponseModel> {
    return this.httpClient.post<BaseResponseModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.AUTH_FORGOT_PASSWORD),
      model
    );
  }

  resetPasswordCode(
    model: RequestForgotPasswordCodeModel
  ): Observable<BaseResponseModel> {
    return this.httpClient.post<BaseResponseModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.AUTH_RESET_PASSWORD_CODE),
      model
    );
  }

  resetPassword(model: RequestResetPasswordModel): Observable<BaseResponseModel> {
    return this.httpClient.post<BaseResponseModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.AUTH_RESET_PASSWORD),
      model
    );
  }

  addPassword(model: RequestResetPasswordModel): Observable<BaseResponseModel> {
    return this.httpClient.post<BaseResponseModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.AUTH_ADD_PASSWORD),
      model
    );
  }

  confirmEmail(model: RequestConfirmEmailModel): Observable<BaseResponseModel> {
    return this.httpClient.post<BaseResponseModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.AUTH_CONFIRM_EMAIL),
      model
    );
  }
}
