import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import * as errorActions from 'src/app/app-store/app-state/app-state.actions';
import { CommonMessagesConstants } from 'src/app/core/constants';
import { DownloadDocumentsHelper } from 'src/app/shared/helpers/download-documents.helper';
import { RequestDeleteDocumentModel } from '../../documents/models';
import {
  ResponseGetAppointmentDocumentListModel,
  RequestCreateAppointmentDocumentModel,
  RequestGetAppointmentDocumentByIdWithContentModel,
  RequestGetAppointmentDocumentListByAppointmentIdModel,
  ResponseCreateAppointmentModel,
} from '../models';
import * as appointmentsDocumentsActions from './appointment-documents.actions';
import { AppointmentDocumentService } from 'src/app/core/services/appointment-document.service';
import { BaseResponseModel } from 'src/app/shared/models';

@Injectable()
export class AppointmentDocumentEffects {
  constructor(
    private actions$: Actions,
    private readonly appointmentsDocumentService: AppointmentDocumentService,
    private readonly downloadDocumentsHelper: DownloadDocumentsHelper,
    private notification: NzNotificationService
  ) {}

  createDocument$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(appointmentsDocumentsActions.appointmentDocumentCreateAction),
      switchMap(
        (action: {
          payload: {
            data: RequestCreateAppointmentDocumentModel;
            searchParams: RequestGetAppointmentDocumentListByAppointmentIdModel;
          };
        }) => {
          return this.appointmentsDocumentService.create(action.payload.data).pipe(
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
                CommonMessagesConstants.NOTIFICATION_DOCUMENT_UPDATED
              );

              return appointmentsDocumentsActions.appointmentDocumentCreateSuccessAction({
                payload: {
                  searchParams: {
                    ...action.payload.searchParams,
                    appointmentId: action.payload.data.appointmentId,
                  },
                },
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

  deleteDocument$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(appointmentsDocumentsActions.appointmentDocumentDeleteAction),
      switchMap(
        (action: {
          payload: {
            data: RequestDeleteDocumentModel;
            searchParams: RequestGetAppointmentDocumentListByAppointmentIdModel;
          };
        }) => {
          return this.appointmentsDocumentService.delete(action.payload.data).pipe(
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
                CommonMessagesConstants.NOTIFICATION_DOCUMENT_DELETE
              );

              return appointmentsDocumentsActions.appointmentDocumentDeleteSuccessAction({
                payload: {
                  searchParams: { ...action.payload.searchParams },
                },
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

  searchAppointmentDocuments$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(appointmentsDocumentsActions.appointmentDocumentsSearchAction),
      switchMap(
        (action: { payload: RequestGetAppointmentDocumentListByAppointmentIdModel }) => {
          return this.appointmentsDocumentService.getAll(action.payload).pipe(
            switchMap((data: ResponseGetAppointmentDocumentListModel) => {
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
                appointmentsDocumentsActions.appointmentDocumentsSearchSuccessAction({
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
        }
      )
    );
  });

  downloadAppointmentDocuments$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(appointmentsDocumentsActions.downloadAppointmentDocumentAction),
      switchMap(
        (action: {
          payload: RequestGetAppointmentDocumentByIdWithContentModel & {
            fileName: string;
          };
        }) => {
          return this.appointmentsDocumentService.download(action.payload).pipe(
            switchMap((data: Blob) => {
              this.downloadDocumentsHelper.downloadDocument(
                data,
                action.payload.fileName
              );

              return of(
                appointmentsDocumentsActions.downloadAppointmentDocumentActionSuccess()
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

  searchDocumentAfterActions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        appointmentsDocumentsActions.appointmentDocumentCreateSuccessAction,
        appointmentsDocumentsActions.appointmentDocumentDeleteSuccessAction
      ),
      mergeMap((action) => {
        return of(
          appointmentsDocumentsActions.appointmentDocumentsSearchAction({
            payload: action.payload.searchParams,
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
