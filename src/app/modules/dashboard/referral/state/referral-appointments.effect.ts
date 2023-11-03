import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import * as errorActions from 'src/app/app-store/app-state/app-state.actions';
import { CommonMessagesConstants } from 'src/app/core/constants';
import { AppointmentsService } from 'src/app/core/services/appointments.service';

import { NzModalService } from 'ng-zorro-antd/modal';
import { BaseResponseModel } from 'src/app/shared/models';
import {
  RequestGetAppointmentListModel,
  ResponseGetAppointmentListModel,
} from '../../appointments/models';
import * as referralAppointmentActions from './referral-appointments.actions';

@Injectable()
export class ReferralAppointmentEffects {
  constructor(
    private actions$: Actions,
    private readonly appointmentService: AppointmentsService,
    private notification: NzNotificationService,
    private modalService: NzModalService
  ) {}

  searchAppointments$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(referralAppointmentActions.setAppointmentsSearchParamsAction),
      switchMap((action: { payload: RequestGetAppointmentListModel }) => {
        return this.appointmentService.getAll(action.payload).pipe(
          switchMap((data: ResponseGetAppointmentListModel) => {
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
              referralAppointmentActions.appointmentsSearchSuccessAction({
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

  deactivate$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(referralAppointmentActions.appointmentDeactivateAction),
      switchMap((action: { payload: any }) => {
        return this.appointmentService.deactivate(action.payload).pipe(
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
              CommonMessagesConstants.NOTIFICATION_APPOINTMENT_DEACTIVATED
            );

            this.modalService.closeAll();

            return referralAppointmentActions.appointmentDeactivateSuccessAction({
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

  reactivate$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(referralAppointmentActions.appointmentActivateAction),
      switchMap((action: { payload: any }) => {
        return this.appointmentService.activate(action.payload).pipe(
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
              CommonMessagesConstants.NOTIFICATION_APPOINTMENT_REACTIVATED
            );

            return referralAppointmentActions.appointmentActivateSuccessAction();
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
        referralAppointmentActions.appointmentActivateSuccessAction,
        referralAppointmentActions.appointmentDeactivateSuccessAction
      ),
      // concatLatestFrom(() => this.store$.select(selectAppointmentsSearchParams)),
      mergeMap((searchParams) => {
        if (!searchParams) return of();

        return of(
          referralAppointmentActions.setAppointmentsSearchParamsAction({
            payload: searchParams,
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
  });
}
