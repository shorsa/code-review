import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { RoutesConstants } from 'src/app/core/constants';
import { AuthenticationProvider } from 'src/app/shared/helpers';
import { UserPermissionsProvider } from 'src/app/shared/providers/user-permissions.provider';

@Injectable({
  providedIn: 'root',
})
export class TermsAndConditionGuard implements CanActivate {
  constructor(private userPermissionsHelper: UserPermissionsProvider, private router: Router) {}
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const needApproveTerms: boolean = this.userPermissionsHelper.needAcceptTermsAndConditions();

    if (needApproveTerms) {
      return this.router.navigate([RoutesConstants.USER_TERMS_AND_CONDITION]);
    }

    return true;
  }
}
