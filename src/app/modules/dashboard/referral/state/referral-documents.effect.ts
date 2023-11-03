import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import * as errorActions from 'src/app/app-store/app-state/app-state.actions';
import { CommonMessagesConstants } from 'src/app/core/constants';
import { ReferralDocumentService } from 'src/app/core/services/referral-document.service';
import { DownloadDocumentsHelper } from 'src/app/shared/helpers/download-documents.helper';
import { RequestDeleteDocumentModel } from '../../documents/models';
import {
  RequestCreateReferralDocumentModel,
  RequestGetReferralDocumentByIdModel,
  RequestGetReferralDocumentListByReferralIdModel,
  ResponseCreateReferralDocumentModel,
  ResponseGetReferralDocumentListModel,
} from '../models';
import * as referralDocumentsActions from './referral-documents.actions';

@Injectable()
export class ReferralDocumentEffects {
  constructor(
    private actions$: Actions,
    private readonly referralDocumentService: ReferralDocumentService,
    private readonly downloadDocumentsHelper: DownloadDocumentsHelper,
    private notification: NzNotificationService
  ) {}

  createDocument$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(referralDocumentsActions.referralDocumentCreateAction),
      switchMap(
        (action: {
          payload: {
            data: RequestCreateReferralDocumentModel;
            searchParams: RequestGetReferralDocumentListByReferralIdModel;
          };
        }) => {
          return this.referralDocumentService.create(action.payload.data).pipe(
            map((data: ResponseCreateReferralDocumentModel) => {
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

              return referralDocumentsActions.referralDocumentCreateSuccessAction({
                payload: {
                  data,
                  searchParams: {
                    ...action.payload.searchParams,
                    referralId: action.payload.data.referralId,
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
      ofType(referralDocumentsActions.referralDocumentDeleteAction),
      switchMap(
        (action: {
          payload: {
            data: RequestDeleteDocumentModel;
            searchParams: RequestGetReferralDocumentListByReferralIdModel;
          };
        }) => {
          return this.referralDocumentService.delete(action.payload.data).pipe(
            map((data: ResponseCreateReferralDocumentModel) => {
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

              return referralDocumentsActions.referralDocumentDeleteSuccessAction({
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

  searchReferralDocuments$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(referralDocumentsActions.referralDocumentsSearchAction),
      switchMap(
        (action: { payload: RequestGetReferralDocumentListByReferralIdModel }) => {
          return this.referralDocumentService.getAll(action.payload).pipe(
            switchMap((data: ResponseGetReferralDocumentListModel) => {
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
                referralDocumentsActions.referralDocumentsSearchSuccessAction({
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

  downloadReferralDocuments$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(referralDocumentsActions.downloadReferralDocumentAction),
      switchMap(
        (action: {
          payload: RequestGetReferralDocumentByIdModel & { fileName: string };
        }) => {
          return this.referralDocumentService.getByIdWithContent(action.payload).pipe(
            switchMap((data: Blob) => {
              this.downloadDocumentsHelper.downloadDocument(
                data,
                action.payload.fileName
              );

              return of(referralDocumentsActions.downloadReferralDocumentActionSuccess());
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
        referralDocumentsActions.referralDocumentCreateSuccessAction,
        referralDocumentsActions.referralDocumentDeleteSuccessAction
      ),
      mergeMap((action) => {
        return of(
          referralDocumentsActions.referralDocumentsSearchAction({
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
