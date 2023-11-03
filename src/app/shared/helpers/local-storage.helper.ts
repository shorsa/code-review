import { Injectable } from '@angular/core';
import { STORE_KEY } from 'src/app/app-store/app-save-store';

const REFRESH_TOKEN_DATA_KEY = 'REFRESH_TOKEN';
const ACCESS_TOKEN_DATA_KEY = 'ACCESS_TOKEN';
const REMEMBER_EMAIL = 'REMEMBER_EMAIL';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageHelper {
  constructor() {}

  set rememberEmail(email: string) {
    localStorage.setItem(REMEMBER_EMAIL, email);
  }

  get rememberedEmail(): string {
    return localStorage.getItem(REMEMBER_EMAIL) ?? '';
  }

  set setRefreshToken(refreshToken: string | undefined) {
    localStorage.setItem(REFRESH_TOKEN_DATA_KEY, JSON.stringify(refreshToken));
  }

  get getRefreshToken(): string | undefined {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_DATA_KEY);
    if (!refreshToken) return;
    return JSON.parse(refreshToken);
  }

  set setAccessToken(accessToken: string | undefined) {
    localStorage.setItem(ACCESS_TOKEN_DATA_KEY, JSON.stringify(accessToken));
  }

  get getAccessToken(): string | undefined {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_DATA_KEY);
    if (!accessToken) return;
    return JSON.parse(accessToken);
  }

  removeLocalStorageTokens(): void {
    localStorage.removeItem(ACCESS_TOKEN_DATA_KEY);
    localStorage.removeItem(REFRESH_TOKEN_DATA_KEY);
  }

  logoutLocalStorage(): void {
    this.removeLocalStorageTokens();
    localStorage.removeItem(STORE_KEY);
  }

  removeLocalStorage(): void {
    localStorage.clear();
  }
}
