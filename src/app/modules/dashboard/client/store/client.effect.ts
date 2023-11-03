import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import * as errorActions from 'src/app/app-store/app-state/app-state.actions';
import { CommonMessagesConstants, RoutesConstants } from 'src/app/core/constants';
import { ClientService } from 'src/app/core/services/client.service';
import {
  RequestActionsClientModel,
  RequestCreateClientModel,
  RequestGetClientByIdModel,
  RequestGetClientListModel,
  RequestUpdateClientModel,
  ResponseCreateClientModel,
  ResponseGetClientByIdModel,
  ResponseGetClientListModel,
  ResponseUpdateClientModel,
} from '../models';
import * as clientActions from './client.actions';
import { selectClientsSearchParams } from './client.selectors';

@Injectable()
export class ClientEffects {
  constructor(
    private actions$: Actions,
    private store$: Store,
    private readonly clientService: ClientService,
    private router: Router,
    private notification: NzNotificationService
  ) {}

  create$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(clientActions.clientCreateAction),
      switchMap((action: { payload: RequestCreateClientModel }) => {
        return this.clientService.create(action.payload).pipe(
          map((data: ResponseCreateClientModel) => {
            if (!data.success) {
              return errorActions.errorAction({
                payload: {
                  error: data.message,
                  isApiError: true,
                },
              });
            }
            this.notification.success(
              CommonMessagesConstants.NOTIFICATION_SUCCESS,
              CommonMessagesConstants.NOTIFICATION_CLIENT_CREATED
            );

            this.router.navigate(
              [
                RoutesConstants.DASHBOARD_INDEX,
                RoutesConstants.DASHBOARD_CLIENT,
                RoutesConstants.DASHBOARD_CLIENT_EDIT,
              ],
              {
                queryParams: {
                  id: data.id,
                },
              }
            );

            return clientActions.clientCreateSuccessAction({ payload: data });
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

  getById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(clientActions.clientGetByIdAction),
      switchMap((action: { payload: RequestGetClientByIdModel }) => {
        return this.clientService.getById(action.payload).pipe(
          map((data: ResponseGetClientByIdModel) => {
            if (!data.success) {
              return errorActions.errorAction({
                payload: {
                  error: data.message,
                  isApiError: true,
                },
              });
            }

            return clientActions.clientGetByIdSuccessAction({ payload: data });
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

  searchClients$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(clientActions.setClientsSearchParamsAction),
      switchMap((action: { payload: RequestGetClientListModel }) => {
        return this.clientService.getAll(action.payload).pipe(
          switchMap((data: ResponseGetClientListModel) => {
            if (!data.success) {
              return of(
                errorActions.errorAction({
                  payload: {
                    error: data.message,
                    isApiError: true,
                  },
                })
              );
            }
            return of(
              clientActions.clientsSearchSuccessAction({
                payload: data,
              })
            );
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

  update$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(clientActions.clientUpdateAction),
      switchMap((action: { payload: RequestUpdateClientModel }) => {
        return this.clientService.update(action.payload).pipe(
          map((data: ResponseUpdateClientModel) => {
            if (!data.success) {
              return errorActions.errorAction({
                payload: {
                  error: data.message,
                  isApiError: true,
                },
              });
            }

            this.notification.success(
              CommonMessagesConstants.NOTIFICATION_SUCCESS,
              CommonMessagesConstants.NOTIFICATION_CLIENT_UPDATED
            );

            this.router.navigate([
              RoutesConstants.DASHBOARD_INDEX,
              RoutesConstants.DASHBOARD_CLIENT,
            ]);

            return clientActions.clientUpdateSuccessAction({ payload: data });
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

  deactivate$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(clientActions.clientDeactivateAction),
      switchMap((action: { payload: RequestActionsClientModel }) => {
        return this.clientService.deactivate(action.payload).pipe(
          map((data: ResponseUpdateClientModel) => {
            if (!data.success) {
              return errorActions.errorAction({
                payload: {
                  error: data.message,
                  isApiError: true,
                },
              });
            }

            this.notification.success(
              CommonMessagesConstants.NOTIFICATION_SUCCESS,
              CommonMessagesConstants.NOTIFICATION_CLIENT_DEACTIVATED
            );

            return clientActions.clientDeactivateSuccessAction({ payload: data });
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

  reactivate$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(clientActions.clientActivateAction),
      switchMap((action: { payload: RequestActionsClientModel }) => {
        return this.clientService.activate(action.payload).pipe(
          map((data: ResponseUpdateClientModel) => {
            if (!data.success) {
              return errorActions.errorAction({
                payload: {
                  error: data.message,
                  isApiError: true,
                },
              });
            }

            this.notification.success(
              CommonMessagesConstants.NOTIFICATION_SUCCESS,
              CommonMessagesConstants.NOTIFICATION_CLIENT_REACTIVATED
            );

            // this.router.navigate(
            //   [RoutesConstants.DASHBOARD_INDEX, RoutesConstants.DASHBOARD_CLIENT],
            //   {
            //     queryParams: {
            //       id: data.id,
            //     },
            //   }
            // );

            return clientActions.clientActivateSuccessAction({ payload: data });
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

  searchAfterActions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        clientActions.clientUpdateSuccessAction,
        clientActions.clientActivateSuccessAction,
        clientActions.clientDeactivateSuccessAction
      ),
      concatLatestFrom(() => this.store$.select(selectClientsSearchParams)),
      mergeMap(([action, searchParams]) => {
        if (!searchParams) return of();

        return of(clientActions.setClientsSearchParamsAction({ payload: searchParams }));
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
  });
}
