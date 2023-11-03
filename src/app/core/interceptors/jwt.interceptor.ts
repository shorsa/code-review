import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { ResponseSignInModel } from 'src/app/modules/auth/models';
import { RequestRefreshAccessTokenModel } from 'src/app/modules/auth/models/request/request-refresh-access-token.model';
import { AuthenticationProvider } from 'src/app/shared/helpers';
import { AuthService } from '../services/auth.service';
import { UserPermissionsProvider } from 'src/app/shared/providers/user-permissions.provider';
import { Store } from '@ngrx/store';
import {
  tokenRefreshedAction,
  tokenRefreshingAction,
} from 'src/app/app-store/app-state/app-state.actions';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private readonly authProvider: AuthenticationProvider,
    private readonly userPermissionsHelper: UserPermissionsProvider,
    private readonly authService: AuthService,
    private store$: Store
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const accessToken: string | undefined = this.authProvider.getAccessToken();

    if (accessToken) {
      request = this.addToken(request, accessToken);
    }

    return next.handle(request).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handleUnauthorizedError(request, next, error);
        } else {
          return throwError(error);
        }
      })
    );
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  private handleUnauthorizedError(
    request: HttpRequest<any>,
    next: HttpHandler,
    error: any
  ) {
    this.store$.dispatch(tokenRefreshingAction());

    const model: RequestRefreshAccessTokenModel = {
      userId: this.authProvider.getUserId()!,
      refreshToken: this.authProvider.getRefreshToken(),
    };

    return this.authService.refreshToken(model).pipe(
      switchMap((responseModel: ResponseSignInModel) => {
        if (!responseModel?.refreshToken && !responseModel.accessToken) {
          this.store$.dispatch(tokenRefreshedAction());

          this.authProvider.signOut();
          return of();
        }

        this.authProvider.setTokens({
          accessToken: responseModel.accessToken!,
          refreshToken: responseModel.refreshToken!,
        });
        this.refreshTokenSubject.next(responseModel.accessToken);
        this.userPermissionsHelper.updatePermissions();
        this.store$.dispatch(tokenRefreshedAction());
        return next.handle(this.addToken(request, responseModel.accessToken!));
      }),
      catchError((response: any) => {
        this.store$.dispatch(tokenRefreshedAction());
        this.authProvider.signOut();
        return throwError(response);
      })
    );
  }
}
