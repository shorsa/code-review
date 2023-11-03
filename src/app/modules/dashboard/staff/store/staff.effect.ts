import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import * as errorActions from 'src/app/app-store/app-state/app-state.actions';
import { CommonMessagesConstants, RoutesConstants } from 'src/app/core/constants';
import * as staffActions from './staff.actions';
import { StaffService } from 'src/app/core/services/staff.service';
import { selectStaffSearchParams } from './staff.selectors';
import {
  RequestCreateStuffUserModel,
  ResponseCreateStaffUserModel,
  RequestGetStaffUserByIdModel,
  ResponseGetStaffUserByIdModel,
  RequestGetStaffUserListModel,
  ResponseGetStaffUserListModel,
  RequestUpdateStaffUserModel,
  ResponseUpdateStaffUserModel,
  RequestDeactivateStaffUserModel,
  RequestActivateStaffUserModel,
} from '../models';
import { BaseResponseModel } from 'src/app/shared/models';
import { UserService } from 'src/app/core/services/user.service';

@Injectable()
export class StaffEffects {
  constructor(
    private actions$: Actions,
    private readonly staffService: StaffService,
    private readonly userService: UserService,
    private router: Router,
    private store$: Store,
    private notification: NzNotificationService
  ) {}

  create$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(staffActions.staffCreateAction),
      switchMap((action: { payload: RequestCreateStuffUserModel }) => {
        return this.staffService.create(action.payload).pipe(
          map((data: ResponseCreateStaffUserModel) => {
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

            this.router.navigate([
              RoutesConstants.DASHBOARD_INDEX,
              RoutesConstants.DASHBOARD_STAFF,
            ]);
            return staffActions.staffCreateSuccessAction({ payload: data });
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
      ofType(staffActions.staffGetByIdAction),
      switchMap((action: { payload: RequestGetStaffUserByIdModel }) => {
        return this.staffService.getById(action.payload).pipe(
          map((data: ResponseGetStaffUserByIdModel) => {
            if (!data.success) {
              return errorActions.errorAction({
                payload: {
                  error: data.message,
                  isApiError: true,
                },
              });
            }

            return staffActions.staffGetByIdSuccessAction({ payload: data });
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

  searchStaffList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(staffActions.setStaffSearchParamsAction),
      switchMap((action: { payload: RequestGetStaffUserListModel }) => {
        return this.staffService.getAll(action.payload).pipe(
          switchMap((data: ResponseGetStaffUserListModel) => {
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

            return of(staffActions.staffsSearchSuccessAction({ payload: data }));
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
      ofType(staffActions.staffUpdateAction),
      switchMap((action: { payload: RequestUpdateStaffUserModel }) => {
        return this.staffService.update(action.payload).pipe(
          map((data: ResponseUpdateStaffUserModel) => {
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

            this.router.navigate([
              RoutesConstants.DASHBOARD_INDEX,
              RoutesConstants.DASHBOARD_STAFF,
            ]);

            staffActions.clearStaffDetailsDataAction();

            return staffActions.staffUpdateSuccessAction({ payload: data });
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
      ofType(staffActions.staffDeactivateAction),
      switchMap((action: { payload: RequestDeactivateStaffUserModel }) => {
        return this.staffService.deactivate(action.payload).pipe(
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
              CommonMessagesConstants.NOTIFICATION_USER_DEACTIVATED
            );
            return staffActions.staffActivateSuccessAction({ payload: data });
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
      ofType(staffActions.staffActivateAction),
      switchMap((action: { payload: RequestActivateStaffUserModel }) => {
        return this.staffService.activate(action.payload).pipe(
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
              CommonMessagesConstants.NOTIFICATION_USER_REACTIVATED
            );
            return staffActions.staffActivateSuccessAction({ payload: data });
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

  unlock$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(staffActions.staffUnlockAction),
      switchMap((action: { payload: { id: string } }) => {
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
            return staffActions.staffUnlockSuccessAction({ payload: data });
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
        staffActions.staffCreateSuccessAction,
        staffActions.staffUpdateSuccessAction,
        staffActions.staffActivateSuccessAction,
        staffActions.staffDeactivateSuccessAction,
        staffActions.staffUnlockSuccessAction
      ),
      concatLatestFrom(() => this.store$.select(selectStaffSearchParams)),
      mergeMap(([action, searchParams]) => {
        if (!searchParams) return of();

        return of(staffActions.setStaffSearchParamsAction({ payload: searchParams }));
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
