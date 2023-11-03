import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import * as errorActions from 'src/app/app-store/app-state/app-state.actions';
import { CommonMessagesConstants } from 'src/app/core/constants';

import { NzModalService } from 'ng-zorro-antd/modal';
import { BaseResponseModel } from 'src/app/shared/models';

import { StatsService } from 'src/app/core/services/stats.service';
import {
  RequestActivateAppointmentStatModel,
  RequestCreateAppointmentStatModel,
  RequestDeactivateAppointmentStatModel,
  RequestGetAppointmentStatByIdModel,
  RequestGetAppointmentStatsListModel,
  RequestUpdateAppointmentStatModel,
  ResponseGetAppointmentStatByIdModel,
  ResponseGetAppointmentStatListModel,
} from '../models';
import * as statsActions from './stats.actions';

@Injectable()
export class StatsEffects {
  constructor(
    private actions$: Actions,
    private readonly settingsService: StatsService,
    private notification: NzNotificationService,
    private modalService: NzModalService
  ) {}

  create$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(statsActions.statsCreateAction),
      switchMap(
        (action: {
          payload: RequestCreateAppointmentStatModel;
          searchParams: RequestGetAppointmentStatsListModel;
        }) => {
          return this.settingsService.create(action.payload).pipe(
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
                CommonMessagesConstants.NOTIFICATION_SETTINGS_CREATED
              );

              this.modalService.closeAll();

              return statsActions.statsCreateSuccessAction({
                payload: data,
                searchParams: action.searchParams,
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
        }
      )
    );
  });

  getById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(statsActions.statsGetByIdAction),
      switchMap((action: { payload: RequestGetAppointmentStatByIdModel }) => {
        return this.settingsService.getById(action.payload).pipe(
          map((data: ResponseGetAppointmentStatByIdModel) => {
            if (!data.success) {
              return errorActions.errorAction({
                payload: {
                  error: data.message,
                  isApiError: true,
                },
              });
            }

            return statsActions.statsGetByIdSuccessAction({ payload: data });
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

  searchSettings$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(statsActions.statsSearchAction),
      switchMap((action: { payload: RequestGetAppointmentStatsListModel }) => {
        return this.settingsService.getAll(action.payload).pipe(
          map((data: ResponseGetAppointmentStatListModel) => {
            if (!data.success) {
              return errorActions.errorAction({
                payload: {
                  error: data.message,
                  isApiError: true,
                },
              });
            }

            return statsActions.statsSearchSuccessAction({
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
      ofType(statsActions.statsUpdateAction),
      switchMap(
        (action: {
          payload: RequestUpdateAppointmentStatModel;
          searchParams: RequestGetAppointmentStatsListModel;
        }) => {
          return this.settingsService.update(action.payload).pipe(
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
                CommonMessagesConstants.NOTIFICATION_SETTINGS_UPDATED
              );

              this.modalService.closeAll();

              return statsActions.statsUpdateSuccessAction({
                payload: data,
                searchParams: action.searchParams,
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
        }
      )
    );
  });

  deactivate$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(statsActions.statsDeactivateAction),
      switchMap(
        (action: {
          payload: RequestDeactivateAppointmentStatModel;
          searchParams: RequestGetAppointmentStatsListModel;
        }) => {
          return this.settingsService.deactivate(action.payload).pipe(
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
                CommonMessagesConstants.NOTIFICATION_SETTINGS_DEACTIVATED
              );

              this.modalService.closeAll();

              return statsActions.statsDeactivateSuccessAction({
                payload: data,
                searchParams: action.searchParams,
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
        }
      )
    );
  });

  reactivate$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(statsActions.statsActivateAction),
      switchMap(
        (action: {
          payload: RequestActivateAppointmentStatModel;
          searchParams: RequestGetAppointmentStatsListModel;
        }) => {
          return this.settingsService.activate(action.payload).pipe(
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
                CommonMessagesConstants.NOTIFICATION_SETTINGS_REACTIVATED
              );

              return statsActions.statsActivateSuccessAction({
                payload: data,
                searchParams: action.searchParams,
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
        }
      )
    );
  });

  searchAfterActions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        statsActions.statsUpdateSuccessAction,
        statsActions.statsCreateSuccessAction,
        statsActions.statsDeactivateSuccessAction,
        statsActions.statsActivateSuccessAction
      ),
      mergeMap(({ searchParams }) => {
        if (!searchParams) return of();

        return of(statsActions.statsSearchAction({ payload: searchParams }));
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
