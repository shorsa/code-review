import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import * as errorActions from 'src/app/app-store/app-state/app-state.actions';
import { CommonMessagesConstants } from 'src/app/core/constants';
import { ClientDocumentService } from 'src/app/core/services/client-document.service';
import { DownloadDocumentsHelper } from 'src/app/shared/helpers/download-documents.helper';
import { RequestDeleteDocumentModel } from '../../documents/models';
import {
  GetClientDocumentListResponseModel,
  RequestCreateClientDocumentModel,
  RequestGetClientDocumentByIdModel,
  RequestGetClientDocumentListByClientIdModel,
  ResponseCreateClientModel,
} from '../models';
import * as clientDocumentsActions from './client-documents.actions';

@Injectable()
export class ClientDocumentEffects {
  constructor(
    private actions$: Actions,
    private readonly clientDocumentService: ClientDocumentService,
    private readonly downloadDocumentsHelper: DownloadDocumentsHelper,
    private notification: NzNotificationService
  ) {}

  createDocument$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(clientDocumentsActions.clientDocumentCreateAction),
      switchMap(
        (action: {
          payload: {
            data: RequestCreateClientDocumentModel;
            searchParams: RequestGetClientDocumentListByClientIdModel;
          };
        }) => {
          return this.clientDocumentService.create(action.payload.data).pipe(
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
                CommonMessagesConstants.NOTIFICATION_DOCUMENT_UPDATED
              );

              return clientDocumentsActions.clientDocumentCreateSuccessAction({
                payload: {
                  data,
                  searchParams: {
                    ...action.payload.searchParams,
                    clientId: action.payload.data.clientId,
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
      ofType(clientDocumentsActions.clientDocumentDeleteAction),
      switchMap(
        (action: {
          payload: {
            data: RequestDeleteDocumentModel;
            searchParams: RequestGetClientDocumentListByClientIdModel;
          };
        }) => {
          return this.clientDocumentService.delete(action.payload.data).pipe(
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
                CommonMessagesConstants.NOTIFICATION_DOCUMENT_DELETE
              );

              return clientDocumentsActions.clientDocumentDeleteSuccessAction({
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

  // getDocumentById$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(clientDocumentsActions.clientDocumentGetByIdAction),
  //     switchMap((action: { payload: RequestGetClientDocumentByIdModel }) => {
  //       return this.clientDocumentService.getByIdWithContent(action.payload).pipe(
  //         map((data: ResponseGetClientDocumentModel) => {
  //           if (!data.success) {
  //             return errorActions.errorAction({
  //               payload: {
  //                 error: data.message,
  //                 isApiError: true,
  //               },
  //             });
  //           }

  //           return clientDocumentsActions.clientDocumentGetByIdSuccessAction({
  //             payload: data,
  //           });
  //         }),

  //         catchError((error) => {
  //           return of(
  //             errorActions.errorAction({
  //               payload: {
  //                 error: JSON.stringify(error),
  //                 isApiError: true,
  //               },
  //             })
  //           );
  //         })
  //       );
  //     })
  //   );
  // });

  searchClientDocuments$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(clientDocumentsActions.clientDocumentsSearchAction),
      switchMap((action: { payload: RequestGetClientDocumentListByClientIdModel }) => {
        return this.clientDocumentService.getAll(action.payload).pipe(
          switchMap((data: GetClientDocumentListResponseModel) => {
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
              clientDocumentsActions.clientDocumentsSearchSuccessAction({
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

  downloadClientDocuments$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(clientDocumentsActions.downloadClientDocumentAction),
      switchMap(
        (action: {
          payload: RequestGetClientDocumentByIdModel & { fileName: string };
        }) => {
          return this.clientDocumentService.getByIdWithContent(action.payload).pipe(
            switchMap((data: Blob) => {
              // if (!data.success) {
              //   return of(
              //     errorActions.errorAction({
              //       payload: {
              //         error: data.message,
              //         isApiError: true,
              //       },
              //     })
              //   );
              // }

              this.downloadDocumentsHelper.downloadDocument(
                data,
                action.payload.fileName
              );

              return of(clientDocumentsActions.downloadClientDocumentActionSuccess());
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
        clientDocumentsActions.clientDocumentCreateSuccessAction,
        clientDocumentsActions.clientDocumentDeleteSuccessAction
      ),
      mergeMap((action) => {
        return of(
          clientDocumentsActions.clientDocumentsSearchAction({
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
