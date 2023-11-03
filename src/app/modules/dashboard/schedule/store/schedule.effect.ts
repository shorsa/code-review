import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as errorActions from 'src/app/app-store/app-state/app-state.actions';
import { CommonMessagesConstants } from 'src/app/core/constants';

import { NzModalService } from 'ng-zorro-antd/modal';
import { BaseResponseModel } from 'src/app/shared/models';

import { ScheduleService } from 'src/app/core/services/schedule.service';
import {
  RequestCreateNonWorkingDayModel,
  RequestDeleteNonWorkingDayModel,
  RequestGetNonWorkingDaysListModel,
  ResponseGetNonWorkingDaysListModel,
} from '../models';
import * as scheduleActions from './schedule.actions';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable()
export class ScheduleEffects {
  constructor(
    private actions$: Actions,
    private readonly scheduleService: ScheduleService,
    private message: NzMessageService
  ) {}

  get$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(scheduleActions.getScheduleAction),
      switchMap((action: { payload: RequestGetNonWorkingDaysListModel }) => {
        return this.scheduleService.getSchedule(action.payload).pipe(
          map((data: ResponseGetNonWorkingDaysListModel) => {
            if (!data.success) {
              return errorActions.errorAction({
                payload: {
                  error: data.message,
                  isApiError: true,
                },
              });
            }

            return scheduleActions.getScheduleSuccessAction({ payload: data });
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

  addDate$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(scheduleActions.scheduleAddDateAction),
      switchMap(
        (action: {
          payload: RequestCreateNonWorkingDayModel;
          searchParams: RequestGetNonWorkingDaysListModel;
        }) => {
          return this.scheduleService.addDate(action.payload).pipe(
            switchMap((data: BaseResponseModel) => {
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

              this.message.success(CommonMessagesConstants.NOTIFICATION_HOLIDAY_DATE_ADD);

              return of(
                scheduleActions.scheduleAddDateSuccessAction(),
                scheduleActions.getScheduleAction({ payload: action.searchParams })
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
        }
      )
    );
  });

  deleteDate$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(scheduleActions.scheduleDeleteDateAction),
      switchMap(
        (action: {
          payload: RequestDeleteNonWorkingDayModel;
          searchParams: RequestGetNonWorkingDaysListModel;
        }) => {
          return this.scheduleService.deleteDate(action.payload).pipe(
            switchMap((data: BaseResponseModel) => {
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

              this.message.info(CommonMessagesConstants.NOTIFICATION_HOLIDAY_DATE_DELETE);

              return of(
                scheduleActions.scheduleDeleteDateSuccessAction(),
                scheduleActions.getScheduleAction({ payload: action.searchParams })
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
        }
      )
    );
  });
}
