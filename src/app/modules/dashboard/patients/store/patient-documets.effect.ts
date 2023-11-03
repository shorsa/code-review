import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import * as errorActions from 'src/app/app-store/app-state/app-state.actions';
import { CommonMessagesConstants } from 'src/app/core/constants';
import { PatientDocumentService } from 'src/app/core/services/patient-document.service';
import { DownloadDocumentsHelper } from 'src/app/shared/helpers/download-documents.helper';
import {
  RequestCreatePatientDocumentModel,
  RequestDeletePatientDocumentModel,
  RequestDownloadPatientDocumentsModel,
  RequestGetPatientDocumentListByPatientIdModel,
  ResponseCreatePatientDocumentModel,
  ResponseDeletePatientDocumentModel,
  ResponseGetPatientDocumentListModel,
} from '../models/documents';
import * as patientDocumentsActions from './patient-documents.actions';

@Injectable()
export class PatientDocumentEffects {
  constructor(
    private actions$: Actions,
    private readonly patientDocumentService: PatientDocumentService,
    private readonly downloadDocumentsHelper: DownloadDocumentsHelper,
    private notification: NzNotificationService
  ) {}

  createDocument$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(patientDocumentsActions.patientDocumentCreateAction),
      switchMap(
        (action: {
          payload: {
            data: RequestCreatePatientDocumentModel;
            searchParams: RequestGetPatientDocumentListByPatientIdModel;
          };
        }) => {
          return this.patientDocumentService.create(action.payload.data).pipe(
            map((data: ResponseCreatePatientDocumentModel) => {
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

              return patientDocumentsActions.patientDocumentCreateSuccessAction({
                payload: {
                  data,
                  searchParams: {
                    ...action.payload.searchParams,
                    patientId: action.payload.data.patientId,
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
      ofType(patientDocumentsActions.patientDocumentDeleteAction),
      switchMap(
        (action: {
          payload: {
            data: RequestDeletePatientDocumentModel;
            searchParams: RequestGetPatientDocumentListByPatientIdModel;
          };
        }) => {
          return this.patientDocumentService.delete(action.payload.data).pipe(
            map((data: ResponseDeletePatientDocumentModel) => {
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

              return patientDocumentsActions.patientDocumentDeleteSuccessAction({
                payload: {
                  data,
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

  searchPatientDocuments$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(patientDocumentsActions.patientDocumentsSearchAction),
      switchMap((action: { payload: RequestGetPatientDocumentListByPatientIdModel }) => {
        return this.patientDocumentService.getAll(action.payload).pipe(
          switchMap((data: ResponseGetPatientDocumentListModel) => {
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
              patientDocumentsActions.patientDocumentsSearchSuccessAction({
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

  downloadPatientDocuments$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(patientDocumentsActions.downloadPatientDocumentAction),
      switchMap(
        (action: {
          payload: RequestDownloadPatientDocumentsModel & { fileName: string };
        }) => {
          return this.patientDocumentService.download(action.payload).pipe(
            switchMap((data: Blob) => {
              this.downloadDocumentsHelper.downloadDocument(
                data,
                `${action.payload.fileName}.zip`
              );

              return of(patientDocumentsActions.downloadPatientDocumentActionSuccess());
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
        patientDocumentsActions.patientDocumentCreateSuccessAction,
        patientDocumentsActions.patientDocumentDeleteSuccessAction
      ),
      mergeMap((action) => {
        return of(
          patientDocumentsActions.patientDocumentsSearchAction({
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
