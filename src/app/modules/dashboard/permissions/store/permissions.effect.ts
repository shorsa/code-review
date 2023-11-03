import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as errorActions from 'src/app/app-store/app-state/app-state.actions';
import { PermissionsService } from 'src/app/core/services/permissions.service';
import {
  RequestGetRoleByEnumModel,
  RequestUpdateRoleClaimsModel,
  ResponseGetPermissionsListModel,
  ResponseGetRoleByEnumModel,
} from '../models';
import * as permissionsActions from './permissions.actions';
import { BaseResponseModel } from 'src/app/shared/models';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CommonMessagesConstants } from 'src/app/core/constants';

@Injectable()
export class PermissionsEffects {
  constructor(
    private actions$: Actions,
    private notification: NzNotificationService,
    private readonly permissionsService: PermissionsService
  ) {}

  getByEnum$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(permissionsActions.getPermissionsByEnumAction),
      switchMap((action: { payload: RequestGetRoleByEnumModel }) => {
        return this.permissionsService.getByEnum(action.payload).pipe(
          map((data: ResponseGetRoleByEnumModel) => {
            if (!data.success) {
              return errorActions.errorAction({
                payload: {
                  error: data.message,
                  isApiError: true,
                },
              });
            }

            return permissionsActions.getPermissionsByEnumSuccessAction({
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

  update$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(permissionsActions.updatePermissionAction),
      switchMap((action: { payload: RequestUpdateRoleClaimsModel }) => {
        return this.permissionsService.updateClaims(action.payload).pipe(
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
              CommonMessagesConstants.NOTIFICATION_PERMISSIONS_UPDATED
            );

            return permissionsActions.updatePermissionSuccessAction({
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

  getList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(permissionsActions.getListAction),
      switchMap(() => {
        return this.permissionsService.getPermissions().pipe(
          map((data: ResponseGetPermissionsListModel) => {
            if (!data.success) {
              return errorActions.errorAction({
                payload: {
                  error: data.message,
                  isApiError: true,
                },
              });
            }

            return permissionsActions.getListSuccessAction({
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
}
