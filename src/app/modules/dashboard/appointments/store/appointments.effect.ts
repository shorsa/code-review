import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import * as errorActions from 'src/app/app-store/app-state/app-state.actions';
import { CommonMessagesConstants, RoutesConstants } from 'src/app/core/constants';
import { AppointmentsService } from 'src/app/core/services/appointments.service';

import { NzModalService } from 'ng-zorro-antd/modal';
import { UserService } from 'src/app/core/services/user.service';
import { BaseResponseModel } from 'src/app/shared/models';
import {
  RequestActivateAppointmentModel,
  RequestCreateAppointmentModel,
  RequestDeactivateAppointmentModel,
  RequestGetAppointmentAuditLogsModel,
  RequestGetAppointmentByIdModel,
  RequestGetAppointmentListModel,
  RequestGetPatientDetailsByAppointmentIdModel,
  RequestUpdateAppointmentDetailsModel,
  RequestUpdateAppointmentReportModel,
  RequestUpdateAppointmentSettingsModel,
  RequestUpdateAppointmentStatusModel,
  ResponseGetAppointmentListModel,
  ResponseGetPatientDetailsByAppointmentIdModel,
} from '../models';
import { RequestUpdateAppointmentModel } from '../models/request/request-update-appointment.model';
import { ResponseGetAppointmentByIdModel } from '../models/response/response-get-appointment-by-id.model';
import * as appointmentActions from './appointments.actions';
import { selectAppointmentsSearchParams } from './appointments.selectors';
import { ResponseGetAuditLogListModel } from '../models/response/response-get-audit-log-list.model';
import { AppointmentStatusEnum } from '../enums';

@Injectable()
export class AppointmentEffects {
  constructor(
    private actions$: Actions,
    private store$: Store,
    private readonly appointmentService: AppointmentsService,
    private readonly userService: UserService,
    private router: Router,
    private notification: NzNotificationService,
    private modalService: NzModalService
  ) {}

  create$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(appointmentActions.appointmentCreateAction),
      switchMap((action: { payload: RequestCreateAppointmentModel }) => {
        return this.appointmentService.create(action.payload).pipe(
          map((data: BaseResponseModel & { id: string }) => {
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
              CommonMessagesConstants.NOTIFICATION_APPOINTMENT_CREATED
            );

            this.router.navigate([
              RoutesConstants.DASHBOARD_INDEX,
              RoutesConstants.DASHBOARD_APPOINTMENTS,
            ]);

            return appointmentActions.appointmentCreateSuccessAction({ payload: data });
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
      ofType(appointmentActions.appointmentGetByIdAction),
      switchMap((action: { payload: RequestGetAppointmentByIdModel }) => {
        return this.appointmentService.getById(action.payload).pipe(
          map((data: ResponseGetAppointmentByIdModel) => {
            if (!data.success) {
              return errorActions.errorAction({
                payload: {
                  error: data.message,
                  isApiError: true,
                },
              });
            }

            return appointmentActions.appointmentGetByIdSuccessAction({ payload: data });
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

  getPatientDetails$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(appointmentActions.appointmentsGetPatientDetailsAction),
      switchMap((action: { payload: RequestGetPatientDetailsByAppointmentIdModel }) => {
        return this.appointmentService
          .getPatientDetailsByAppointmentId(action.payload)
          .pipe(
            map((data: ResponseGetPatientDetailsByAppointmentIdModel) => {
              if (!data.success) {
                return errorActions.errorAction({
                  payload: {
                    error: data.message,
                    isApiError: true,
                  },
                });
              }

              return appointmentActions.appointmentsGetPatientDetailsSuccessAction({
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

  searchAppointments$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(appointmentActions.setAppointmentsSearchParamsAction),
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
              appointmentActions.appointmentsSearchSuccessAction({
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
      ofType(appointmentActions.appointmentUpdateAction),
      switchMap((action: { payload: RequestUpdateAppointmentModel }) => {
        return this.appointmentService.update(action.payload).pipe(
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
              CommonMessagesConstants.NOTIFICATION_APPOINTMENT_UPDATED
            );

            return appointmentActions.appointmentUpdateSuccessAction({ payload: data });
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

  cancel$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(appointmentActions.appointmentCancelAction),
      switchMap((action: { payload: { id: string } }) => {
        return this.appointmentService.cancel(action.payload).pipe(
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
              CommonMessagesConstants.NOTIFICATION_APPOINTMENT_CANCELED
            );

            this.modalService.closeAll();

            return appointmentActions.appointmentCancelSuccessAction({ payload: data });
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
      ofType(appointmentActions.appointmentDeactivateAction),
      switchMap((action: { payload: RequestDeactivateAppointmentModel }) => {
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

            return appointmentActions.appointmentDeactivateSuccessAction({
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
      ofType(appointmentActions.appointmentActivateAction),
      switchMap((action: { payload: RequestActivateAppointmentModel }) => {
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

            return appointmentActions.appointmentActivateSuccessAction({ payload: data });
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

  searchAppointmentAuditLogs$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(appointmentActions.appointmentAuditLogListSearchAction),
      switchMap((action: { payload: RequestGetAppointmentAuditLogsModel }) => {
        return this.appointmentService.getAppointmentAuditLogs(action.payload).pipe(
          map((data: ResponseGetAuditLogListModel) => {
            if (!data.success) {
              return errorActions.errorAction({
                payload: {
                  error: data.message,
                  isApiError: true,
                },
              });
            }

            return appointmentActions.patientsAuditLogListSearchSuccessAction({
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

  updateAppointmentDetails$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(appointmentActions.appointmentUpdateDetailsAction),
      switchMap((action: { payload: RequestUpdateAppointmentDetailsModel }) => {
        return this.appointmentService.updateAppointmentDetails(action.payload).pipe(
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

            this.notification.success(
              CommonMessagesConstants.NOTIFICATION_SUCCESS,
              CommonMessagesConstants.NOTIFICATION_APPOINTMENT_UPDATED
            );

            return of(
              appointmentActions.appointmentUpdateDetailsSuccessAction(),
              appointmentActions.appointmentGetByIdAction({
                payload: { id: action.payload.appointmentId },
              }),
              appointmentActions.appointmentsGetPatientDetailsAction({
                payload: { appointmentId: action.payload.appointmentId },
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

  updateAppointmentSettings$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(appointmentActions.appointmentUpdateStatsAction),
      switchMap((action: { payload: RequestUpdateAppointmentSettingsModel }) => {
        return this.appointmentService.updateAppointmentSettings(action.payload).pipe(
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

            this.notification.success(
              CommonMessagesConstants.NOTIFICATION_SUCCESS,
              CommonMessagesConstants.NOTIFICATION_APPOINTMENT_UPDATED
            );

            return of(
              appointmentActions.appointmentUpdateStatsSuccessAction(),
              appointmentActions.appointmentGetByIdAction({
                payload: { id: action.payload.appointmentId },
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

  changeStatusAction$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(appointmentActions.appointmentChangeStatusAction),
      switchMap((action: { payload: RequestUpdateAppointmentStatusModel }) => {
        return this.appointmentService.appointmentChangeStatus(action.payload).pipe(
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

            this.modalService.closeAll();
            if (action.payload.status !== AppointmentStatusEnum.Attended) {
              this.router.navigate([
                RoutesConstants.DASHBOARD_INDEX,
                RoutesConstants.DASHBOARD_APPOINTMENTS,
              ]);
            }

            return of(appointmentActions.appointmentChangeStatusSuccessAction());
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

  updateReport$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(appointmentActions.appointmentUpdateReportAction),
      switchMap((action: { payload: RequestUpdateAppointmentReportModel }) => {
        return this.appointmentService.updateAppointmentReport(action.payload).pipe(
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

            this.notification.success(
              CommonMessagesConstants.NOTIFICATION_SUCCESS,
              CommonMessagesConstants.NOTIFICATION_APPOINTMENT_REPORT_UPDATED
            );

            return of(appointmentActions.appointmentUpdateReportSuccessAction());
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
        appointmentActions.appointmentUpdateSuccessAction,
        appointmentActions.appointmentActivateSuccessAction,
        appointmentActions.appointmentCreateSuccessAction,
        appointmentActions.appointmentCancelSuccessAction,
        appointmentActions.appointmentDeactivateSuccessAction
      ),
      concatLatestFrom(() => this.store$.select(selectAppointmentsSearchParams)),
      mergeMap(([action, searchParams]) => {
        if (!searchParams) return of();

        return of(
          appointmentActions.setAppointmentsSearchParamsAction({ payload: searchParams })
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
