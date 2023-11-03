import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { CommonMessagesConstants, RoutesConstants } from 'src/app/core/constants';
import { AuthService } from 'src/app/core/services/auth.service';
import { AuthFailedStatus } from 'src/app/shared/enums';
import { AuthenticationProvider } from 'src/app/shared/helpers';
import { BaseResponseModel, JwtModel } from 'src/app/shared/models';
import { UserPermissionsProvider } from 'src/app/shared/providers/user-permissions.provider';
import * as errorActions from '../../../app-store/app-state/app-state.actions';
import {
  RequestForgotPasswordCodeModel,
  RequestForgotPasswordModel,
  RequestResendTwoFactorCodeModel,
  RequestResetPasswordModel,
  RequestSignInModel,
  RequestTwoStepSignInModel,
  ResponseSignInModel,
} from '../models';
import * as authActions from './auth.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private readonly authService: AuthService,
    private readonly authProvider: AuthenticationProvider,
    private router: Router,
    private notification: NzNotificationService,
    private readonly userPermissionsProvider: UserPermissionsProvider
  ) {}

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authActions.loginAction),
      switchMap((action: { payload: RequestSignInModel }) => {
        const { email, password } = action.payload;

        return this.authService.signIn({ email, password }).pipe(
          map((data: ResponseSignInModel) => {
            const {
              success,
              status,
              message,
              remainingAttempts,
              accessToken,
              refreshToken,
              requiresTwoFactor,
            } = data;

            if (!success) {
              if (
                status === AuthFailedStatus.FailedLoginAttempt ||
                status === AuthFailedStatus.UserIsLockedOut
              ) {
                return authActions.loginAttemptErrorAction({
                  payload: {
                    status: status,
                    remainingAttempts,
                  },
                });
              }

              return errorActions.errorAction({
                payload: {
                  error: message,
                  isApiError: true,
                },
              });
            }

            if (success && accessToken && refreshToken) {
              const model: JwtModel = {
                accessToken: accessToken,
                refreshToken: refreshToken,
              };
              this.authProvider.setTokens(model);
              this.userPermissionsProvider.updatePermissions();
              this.router.navigate([RoutesConstants.DASHBOARD_INDEX]);

              return authActions.loginSuccessAction({
                payload: {
                  ...data,
                  email: action.payload.email,
                },
              });
            }

            if (requiresTwoFactor) {
              this.router.navigate([
                RoutesConstants.AUTH_INDEX,
                RoutesConstants.AUTH_VERIFICATION_CODE,
              ]);
              // TODO temporary
              console.log(`%c [CODE]: ${data.message}`, 'color: #FFA600');

              return authActions.setTwoFactorAction({
                payload: {
                  email,
                  isCodeSended: true,
                },
              });
            }

            // this.loginSuccess(data, action.email);

            return authActions.loginSuccessAction({
              payload: { ...data, email },
            });
          }),

          catchError((error) => {
            return of(
              errorActions.errorAction({
                payload: {
                  error: JSON.stringify(error),
                  isApiError: true,
                },
              })
            );
          })
        );
      })
    );
  });

  sendCode$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authActions.sendVerificationCodeAction),
      switchMap((action: { payload: RequestTwoStepSignInModel }) => {
        return this.authService.sendVerificationCode(action.payload).pipe(
          map((data: ResponseSignInModel) => {
            const { success, accessToken, refreshToken, message } = data;

            if (success && accessToken && refreshToken) {
              const model: JwtModel = {
                accessToken: accessToken,
                refreshToken: refreshToken,
              };
              this.authProvider.setTokens(model);

              this.router.navigate([RoutesConstants.DASHBOARD_INDEX]);

              errorActions.clearErrorAction();

              return authActions.loginSuccessAction({
                payload: {
                  ...data,
                  email: action.payload.email,
                },
              });
            }

            return errorActions.errorAction({
              payload: {
                error: message,
                isControlError: true,
              },
            });
          }),
          catchError((error) => {
            return of(
              errorActions.errorAction({
                payload: {
                  error: JSON.stringify(error),
                  isApiError: true,
                },
              })
            );
          })
        );
      })
    );
  });

  resendCode$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authActions.resendVerificationCodeAction),
      switchMap((action: { payload: RequestResendTwoFactorCodeModel }) => {
        return this.authService.resendTwoFactorCode(action.payload).pipe(
          map((data: BaseResponseModel) => {
            if (!data.success) {
              return errorActions.errorAction({
                payload: {
                  error: data.message,
                },
              });
            }

            this.notification.success(
              CommonMessagesConstants.SENDED_CODE,
              CommonMessagesConstants.RESENTED_CODE_MESSAGE
            );

            return authActions.resendVerificationCodeSuccessAction();
          }),
          catchError((error) => {
            return of(
              errorActions.errorAction({
                payload: {
                  error: JSON.stringify(error),
                  isApiError: true,
                },
              })
            );
          })
        );
      })
    );
  });

  forgotPasswordEmail$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authActions.forgotPasswordAction),
      switchMap((action: { payload: RequestForgotPasswordModel }) => {
        return this.authService.forgotPassword(action.payload).pipe(
          map((data: ResponseSignInModel) => {
            if (data.success) {
              this.router.navigate([
                RoutesConstants.AUTH_INDEX,
                RoutesConstants.AUTH_RESET_PASSWORD_CODE,
              ]);
              // TODO temporary
              console.log(`%c [CODE]: ${data.message}`, 'color: #FFA600');

              this.notification.success(
                CommonMessagesConstants.SENDED_CODE,
                CommonMessagesConstants.SENDED_CODE_MESSAGE
              );

              errorActions.clearErrorAction();

              return authActions.forgotPasswordSuccessAction({
                payload: { email: action.payload.email },
              });
            }

            this.notification.warning('Error', data.message!);

            return errorActions.errorAction({
              payload: {
                error: data.message,
                isControlError: true,
              },
            });
          }),
          catchError((error) => {
            return of(
              errorActions.errorAction({
                payload: {
                  error: JSON.stringify(error),
                  isApiError: true,
                },
              })
            );
          })
        );
      })
    );
  });

  forgotPasswordCode$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authActions.resetPasswordCodeAction),
      switchMap((action: { payload: RequestForgotPasswordCodeModel }) => {
        return this.authService.resetPasswordCode(action.payload).pipe(
          map((data: BaseResponseModel) => {
            if (data.success) {
              this.router.navigate([
                RoutesConstants.AUTH_INDEX,
                RoutesConstants.AUTH_RESET_PASSWORD,
              ]);
              errorActions.clearErrorAction();

              return authActions.resetPasswordCodeSuccessAction({
                payload: { email: action.payload.email, code: action.payload.code },
              });
            }

            this.notification.warning('Error', data.message!);

            return errorActions.errorAction({
              payload: {
                error: data.message,
                isControlError: true,
              },
            });
          }),
          catchError((error) => {
            return of(
              errorActions.errorAction({
                payload: {
                  error: JSON.stringify(error),
                  isApiError: true,
                },
              })
            );
          })
        );
      })
    );
  });

  resetPassword$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authActions.resetPasswordAction),
      switchMap((action: { payload: RequestResetPasswordModel }) => {
        return this.authService.resetPassword(action.payload).pipe(
          map((data: ResponseSignInModel) => {
            if (data.success) {
              this.notification.success(
                CommonMessagesConstants.NOTIFICATION_SUCCESS,
                CommonMessagesConstants.NOTIFICATION_PASSWORD_UPDATED
              );

              this.router.navigate([
                RoutesConstants.AUTH_INDEX,
                RoutesConstants.AUTH_SIGN_IN,
              ]);

              return authActions.resetPasswordSuccessAction({ payload: data });
            }

            return errorActions.errorAction({
              payload: {
                error: data.message,
                isApiError: true,
              },
            });
          }),
          catchError((error) => {
            return of(
              errorActions.errorAction({
                payload: {
                  error: JSON.stringify(error),
                  isApiError: true,
                },
              })
            );
          })
        );
      })
    );
  });

  addNewPassword$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authActions.addNewPasswordAction),
      switchMap((action: { payload: RequestResetPasswordModel }) => {
        return this.authService.addPassword(action.payload).pipe(
          map((data: ResponseSignInModel) => {
            if (data.success) {
              this.notification.success(
                CommonMessagesConstants.NOTIFICATION_SUCCESS,
                CommonMessagesConstants.NOTIFICATION_PASSWORD_CREATED
              );

              this.router.navigate([
                RoutesConstants.AUTH_INDEX,
                RoutesConstants.AUTH_SIGN_IN,
              ]);

              return authActions.addNewPasswordSuccessAction();
            }

            return errorActions.errorAction({
              payload: {
                error: data.message,
                isApiError: true,
              },
            });
          }),
          catchError((error) => {
            return of(
              errorActions.errorAction({
                payload: {
                  error: JSON.stringify(error),
                  isApiError: true,
                },
              })
            );
          })
        );
      })
    );
  });
}
