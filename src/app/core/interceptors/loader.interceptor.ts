import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import * as appActions from '../../app-store/app-state/app-state.actions';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(private store$: Store) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.store$.dispatch(appActions.showLoaderAction());

    return next
      .handle(request)
      .pipe(finalize(() => this.store$.dispatch(appActions.hideLoaderAction())));
  }
}
