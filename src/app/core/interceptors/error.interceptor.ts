import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationProvider } from 'src/app/shared/helpers';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private authProvider: AuthenticationProvider,
    private notification: NzNotificationService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: any) => {
        console.error(error);

        if (error instanceof HttpErrorResponse && error.status === 401) {
          this.authProvider.signOut();
          return throwError(error);
        }

        if (error instanceof HttpErrorResponse && error.status === 403) {
          this.authProvider.signOut();
          return throwError(error);
        } else {
          this.notification.error('API ERROR', error.error);
          return throwError(error);
        }
      })
    );
  }
}
