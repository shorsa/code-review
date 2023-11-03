import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { RoutesConstants } from 'src/app/core/constants';
import { JwtModel } from '../models';
import { LocalStorageHelper } from '../helpers/local-storage.helper';
import { UserRoleEnum } from '../enums';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationProvider {
  private tokenData?: JwtModel;
  private loginSuccesses$: BehaviorSubject<boolean>;

  constructor(private localStorageHelper: LocalStorageHelper, private router: Router) {
    this.tokenData = {
      accessToken: this.localStorageHelper.getAccessToken ?? undefined,
      refreshToken: this.localStorageHelper.getRefreshToken ?? undefined,
    };
    this.loginSuccesses$ = new BehaviorSubject<boolean>(false);
  }

  get loginSuccesses() {
    return this.loginSuccesses$.asObservable();
  }

  isAuthenticated(): Promise<boolean> {
    return new Promise((resolve) => {
      if (!this.tokenData) {
        const data = this.localStorageHelper.getAccessToken;
        resolve(!!data);
      } else {
        resolve(!!this.tokenData.accessToken);
      }
    });
  }

  signIn(data: JwtModel): void {
    this.tokenData = data;
    this.localStorageHelper.setAccessToken = this.tokenData?.accessToken;
    this.localStorageHelper.setRefreshToken = this.tokenData?.refreshToken;
    this.loginSuccesses$.next(true);
  }

  setTokens(data: JwtModel): void {
    this.tokenData = data;
    this.localStorageHelper.setAccessToken = data.accessToken;
    this.localStorageHelper.setRefreshToken = data.refreshToken;
  }

  signOut(): void {
    this.tokenData = undefined;
    this.localStorageHelper.logoutLocalStorage();
    this.loginSuccesses$.next(false);
    this.router.navigate([RoutesConstants.AUTH_INDEX, RoutesConstants.AUTH_SIGN_IN]);
  }

  getAccessToken(): string | undefined {
    if (this.tokenData) {
      return this.tokenData.accessToken;
    }
    return undefined;
  }

  getRefreshToken(): string | undefined {
    if (this.tokenData) {
      return this.tokenData?.refreshToken;
    }
    return undefined;
  }

  getUserId(): string | null {
    const userId = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier';
    const token: string | undefined = this.getAccessToken();
    if (!token) return null;

    try {
      const tokenData: any = jwt_decode(token);
      return tokenData[userId];
    } catch (error) {
      return null;
    }
  }

  get getClientId(): string | null {
    const userId = 'ClientId';
    const token: string | undefined = this.getAccessToken();
    if (!token) return null;

    try {
      const tokenData: any = jwt_decode(token);
      return tokenData[userId];
    } catch (error) {
      return null;
    }
  }

  getUserEmail(): string | null {
    const userEmail =
      'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress';
    const token: string | undefined = this.getAccessToken();
    if (!token) return null;
    try {
      const tokenData: any = jwt_decode(token);

      return tokenData[userEmail];
    } catch (error) {
      return null;
    }
  }

  getUserName(): string | undefined {
    const userName = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name';
    const token: string | undefined = this.getAccessToken();
    if (!token) return;
    try {
      const tokenData: any = jwt_decode(token);
      return tokenData[userName];
    } catch (error) {
      return;
    }
  }

  getUserTermsIsApproved(): boolean | undefined {
    const terms = 'AreTermsAndConditionsApproved';
    const token: string | undefined = this.getAccessToken();
    if (!token) return;

    try {
      const tokenData: any = jwt_decode(token);
      return tokenData[terms] !== 'False';
    } catch (error) {
      return;
    }
  }

  getUserAvatar(): string | null {
    const avatar = 'Avatar';
    const token: string | undefined = this.getAccessToken();
    if (!token) return null;

    try {
      const tokenData: any = jwt_decode(token);
      return tokenData[avatar];
    } catch (error) {
      return null;
    }
  }

  getUserRole(): keyof typeof UserRoleEnum | undefined {
    const roleClaim = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';
    const token: string | undefined = this.getAccessToken();
    if (!token) return;

    try {
      const tokenData: any = jwt_decode(token);
      const role: keyof typeof UserRoleEnum = tokenData[roleClaim];

      return role;
    } catch (error) {
      return;
    }
  }
}
