import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import * as errorActions from 'src/app/app-store/app-state/app-state.actions';

import { CommonMessagesConstants } from 'src/app/core/constants';
import { TermsAndConditionsService } from 'src/app/core/services/terms-and-conditions.service';
import { DownloadDocumentsHelper } from 'src/app/shared/helpers/download-documents.helper';
import {
  RequestCreateTermsAndConditionsModel,
  RequestDownloadClientTermsAndConditionsModel,
  RequestGetTermsAndConditionsModel,
  RequestUpdateTermsAndConditionsModel,
  ResponseCreateTermsAndConditionsModel,
  ResponseGetTermsAndConditionsModel,
  ResponseUpdateTermsAndConditionsModel,
} from '../models';
import * as termsAndConditionsActions from './terms-and-conditions.actions';

@Injectable()
export class TermsAndConditionsEffects {
  constructor(
    private actions$: Actions,
    private readonly termsAndConditionsService: TermsAndConditionsService,
    private modalService: NzModalService,
    private notification: NzNotificationService,
    private readonly downloadDocumentsHelper: DownloadDocumentsHelper
  ) {}

  createTermsAndCond$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(termsAndConditionsActions.clientTrmAndCondCreateAction),
      switchMap((action: { payload: RequestCreateTermsAndConditionsModel }) => {
        return this.termsAndConditionsService.create(action.payload).pipe(
          map((data: ResponseCreateTermsAndConditionsModel) => {
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
              CommonMessagesConstants.NOTIFICATION_TERMS_CREATED
            );
            this.modalService.closeAll();
            return termsAndConditionsActions.clientTrmAndCondCreateSuccessAction({
              payload: data,
              clientId: action.payload.clientId,
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

  updateTermsAndCond$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(termsAndConditionsActions.clientTrmAndCondUpdateAction),
      switchMap((action: { payload: RequestUpdateTermsAndConditionsModel }) => {
        return this.termsAndConditionsService.update(action.payload).pipe(
          map((data: ResponseUpdateTermsAndConditionsModel) => {
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
              CommonMessagesConstants.NOTIFICATION_TERMS_UPDATED
            );
            return termsAndConditionsActions.clientTrmAndCondUpdateSuccessAction({
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

  getTermsAndCondById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(termsAndConditionsActions.clientTrmAndCondGetByClientIdAction),
      switchMap((action: { payload: RequestGetTermsAndConditionsModel }) => {
        return this.termsAndConditionsService.getByClientId(action.payload).pipe(
          map((data: ResponseGetTermsAndConditionsModel) => {
            if (!data.success) {
              return termsAndConditionsActions.clientTrmAndCondGetByClientIdSuccessAction(
                {
                  payload: data,
                }
              );
            }

            return termsAndConditionsActions.clientTrmAndCondGetByClientIdSuccessAction({
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

  downloadTermsAndCondById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(termsAndConditionsActions.downloadClientTermsAndCondAction),
      switchMap(
        (action: {
          payload: RequestDownloadClientTermsAndConditionsModel & { fileName: string };
        }) => {
          return this.termsAndConditionsService
            .downloadTermsAndConditionsByClientId(action.payload)
            .pipe(
              map((data: Blob) => {
                this.downloadDocumentsHelper.downloadDocument(
                  data,
                  action.payload.fileName
                );

                return termsAndConditionsActions.downloadClientTermsAndCondSuccessAction();
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

  getAfterCreate$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(termsAndConditionsActions.clientTrmAndCondCreateSuccessAction),
      mergeMap(({ clientId }) => {
        return of(
          termsAndConditionsActions.clientTrmAndCondGetByClientIdAction({
            payload: { clientId },
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
