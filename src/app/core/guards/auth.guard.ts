import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { RoutesConstants } from 'src/app/core/constants';
import { AuthenticationProvider } from 'src/app/shared/helpers';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authProvider: AuthenticationProvider,
    private router: Router
  ) {}
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const isAuthenticated: boolean = await this.authProvider.isAuthenticated();

    if (isAuthenticated) {
      return true;
    }

    this.router.navigate([RoutesConstants.AUTH_INDEX, RoutesConstants.AUTH_SIGN_IN]);
    return false;
  }
}
