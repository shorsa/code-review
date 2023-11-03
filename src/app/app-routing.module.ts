import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { RoutesConstants } from './core/constants';
import { AuthGuard } from './core/guards/auth.guard';
import { TermsAndConditionGuard } from './core/guards/terms-and-condition.guard';

const routes: Routes = [
  {
    path: RoutesConstants.INDEX,
    children: [
      {
        path: RoutesConstants.AUTH_INDEX,
        loadChildren: () =>
          import('src/app/modules/auth/auth.module').then((m) => m.AuthModule),
      },
      {
        path: RoutesConstants.DASHBOARD_INDEX,
        canActivate: [AuthGuard, TermsAndConditionGuard],
        loadChildren: () =>
          import('src/app/modules/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: RoutesConstants.USER_TERMS_AND_CONDITION,
        loadChildren: () =>
          import(
            'src/app/modules/dashboard/user-terms-and-conditions/user-terms-and-conditions.module'
          ).then((m) => m.UserTermsAndConditionsModule),
      },
      {
        path: RoutesConstants.INDEX,
        redirectTo: RoutesConstants.DASHBOARD_INDEX,
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
