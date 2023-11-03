import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutesConstants } from 'src/app/core/constants';
import { AuthLayoutComponent } from 'src/app/shared/layouts/auth-layout/auth-layout.component';

export const routes: Routes = [
  {
    path: RoutesConstants.INDEX,
    component: AuthLayoutComponent,
    children: [
      {
        path: RoutesConstants.AUTH_SIGN_IN,
        loadChildren: () =>
          import('./pages/sign-in/sign-in.module').then((m) => m.SignInModule),
      },
      {
        path: RoutesConstants.AUTH_FORGOT_PASSWORD,
        loadChildren: () =>
          import('./pages/forgot-password/forgot-password.module').then(
            (m) => m.ForgotPasswordModule
          ),
      },
      {
        path: RoutesConstants.AUTH_RESET_PASSWORD,
        loadChildren: () =>
          import('./pages/new-password/new-password.module').then(
            (m) => m.NewPasswordModule
          ),
      },
      {
        path: RoutesConstants.AUTH_ADD_PASSWORD,
        data: { isAddPassword: true },
        loadChildren: () =>
          import('./pages/new-password/new-password.module').then(
            (m) => m.NewPasswordModule
          ),
      },
      {
        path: RoutesConstants.AUTH_VERIFICATION_CODE,
        loadChildren: () =>
          import('./pages/verification-code/verification-code.module').then(
            (m) => m.VerificationCodeModule
          ),
      },
      {
        path: RoutesConstants.AUTH_RESET_PASSWORD_CODE,
        loadChildren: () =>
          import('./pages/reset-password-code/reset-password-code.module').then(
            (m) => m.ResetPasswordCodeCodeModule
          ),
      },
      {
        path: RoutesConstants.AUTH_CONFIRM_CHANGE_EMAIL,
        loadChildren: () =>
          import('./pages/confirm-change-email/confirm-change-email.module').then(
            (m) => m.ConfirmChangeEmailModule
          ),
      },
      {
        path: RoutesConstants.INDEX,
        redirectTo: RoutesConstants.AUTH_SIGN_IN,
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
