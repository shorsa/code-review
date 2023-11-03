import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import * as errorActions from 'src/app/app-store/app-state/app-state.actions';
import { CommonMessagesConstants, RoutesConstants } from 'src/app/core/constants';
import { ClientUserService } from 'src/app/core/services/client-users.service';
import {
  RequestActionsClientModel,
  RequestCreateClientUserModel,
  RequestGetClientUsersListModel,
  RequestUpdateClientUserModel,
  ResponseActionsClientModel,
  ResponseCreateClientModel,
  ResponseGetClientUserByIdModel,
  ResponseGetClientUserListModel,
  ResponseUpdateClientModel,
} from '../models';
import * as clientUsersActions from './client-users.actions';
import { NzModalService } from 'ng-zorro-antd/modal';
import { UserService } from 'src/app/core/services/user.service';
import { selectClientUsersSearchParams } from './client.selectors';
import { BaseResponseModel } from 'src/app/shared/models';

@Injectable()
export class ClientUsersEffects {
  constructor(
    private actions$: Actions,
    private store$: Store,
    private readonly clientUserService: ClientUserService,
    private readonly userService: UserService,
    private modalService: NzModalService,
    private router: Router,
    private notification: NzNotificationService
  ) {}

  createUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(clientUsersActions.clientUsersCreateAction),
      switchMap((action: { payload: RequestCreateClientUserModel }) => {
        return this.clientUserService.create(action.payload).pipe(
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
              CommonMessagesConstants.NOTIFICATION_USER_CREATED
            );

            this.notification.info(
              CommonMessagesConstants.NOTIFICATION_CONFIRM_EMAIL,
              CommonMessagesConstants.NOTIFICATION_LINK_WAS_SENDED_EMAIL,
              {
                nzPlacement: 'bottomRight',
              }
            );

            this.modalService.closeAll();
            return clientUsersActions.clientUserCreateSuccessAction({ payload: data });
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

  getUserById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(clientUsersActions.clientUserGetByIdAction),
      switchMap((action: { payload: RequestActionsClientModel }) => {
        return this.clientUserService.getById(action.payload).pipe(
          map((data: ResponseGetClientUserByIdModel) => {
            if (!data.success) {
              return errorActions.errorAction({
                payload: {
                  error: data.message,
                  isApiError: true,
                },
              });
            }

            return clientUsersActions.clientUserGetByIdSuccessAction({ payload: data });
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

  searchClientUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(clientUsersActions.setClientUsersSearchParamsAction),
      switchMap((action: { payload: RequestGetClientUsersListModel }) => {
        return this.clientUserService.getAll(action.payload).pipe(
          switchMap((data: ResponseGetClientUserListModel) => {
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
              clientUsersActions.clientUsersSearchSuccessAction({
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

  updateUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(clientUsersActions.clientUserUpdateAction),
      switchMap((action: { payload: RequestUpdateClientUserModel }) => {
        return this.clientUserService.update(action.payload).pipe(
          map((data: ResponseActionsClientModel) => {
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
              CommonMessagesConstants.NOTIFICATION_USER_UPDATED
            );
            this.modalService.closeAll();

            return clientUsersActions.clientUserUpdateSuccessAction({ payload: data });
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

  deactivateUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(clientUsersActions.clientUserDeactivateAction),
      switchMap((action: { payload: RequestActionsClientModel }) => {
        return this.clientUserService.deactivate(action.payload).pipe(
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
              CommonMessagesConstants.NOTIFICATION_USER_DEACTIVATED
            );

            return clientUsersActions.clientUserDeactivateSuccessAction({
              payload: data,
            });
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

  reactivateUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(clientUsersActions.clientUsersActivateAction),
      switchMap((action: { payload: RequestActionsClientModel }) => {
        return this.clientUserService.activate(action.payload).pipe(
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
              CommonMessagesConstants.NOTIFICATION_USER_REACTIVATED
            );

            return clientUsersActions.clientUserActivateSuccessAction({ payload: data });
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

  unlockUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(clientUsersActions.clientUserUnlockAction),
      switchMap((action: { payload: RequestActionsClientModel }) => {
        return this.userService.unlock(action.payload).pipe(
          map((data: BaseResponseModel) => {
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
              CommonMessagesConstants.NOTIFICATION_USER_UNLOCKED
            );

            return clientUsersActions.clientUserUnlockSuccessAction({ payload: data });
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

  searchUsersAfterActions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        clientUsersActions.clientUserUpdateSuccessAction,
        clientUsersActions.clientUserActivateSuccessAction,
        clientUsersActions.clientUserUnlockSuccessAction,
        clientUsersActions.clientUserDeactivateSuccessAction,
        clientUsersActions.clientUserCreateSuccessAction
      ),
      concatLatestFrom(() => this.store$.select(selectClientUsersSearchParams)),
      mergeMap(([action, searchParams]) => {
        if (!searchParams) return of();

        return of(
          clientUsersActions.setClientUsersSearchParamsAction({ payload: searchParams })
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
  });
}
