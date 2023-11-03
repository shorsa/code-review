import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import * as errorActions from 'src/app/app-store/app-state/app-state.actions';
import { CommonMessagesConstants, RoutesConstants } from 'src/app/core/constants';
import { InvoiceService } from 'src/app/core/services/invoice.service';
import { BaseResponseModel } from 'src/app/shared/models';
import {
  RequestCreateInvoiceModel,
  RequestDeactivateInvoiceModel,
  RequestGetInvoiceByIdModel,
  RequestGetInvoiceListModel,
  RequestReactivateInvoiceModel,
  RequestUpdateInvoiceModel,
  ResponseCreateInvoiceModel,
  ResponseGetInvoiceByIdModel,
  ResponseGetInvoiceListModel,
} from '../models';
import * as invoicingActions from './invoicing.actions';
import { selectInvoicingSearchParams } from './invoicing.selectors';
import { DownloadDocumentsHelper } from 'src/app/shared/helpers/download-documents.helper';

@Injectable()
export class InvoicingEffects {
  constructor(
    private actions$: Actions,
    private readonly invoicingService: InvoiceService,
    private router: Router,
    private store$: Store,
    private readonly downloadDocumentsHelper: DownloadDocumentsHelper,
    private notification: NzNotificationService
  ) {}

  create$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(invoicingActions.invoicingCreateAction),
      switchMap((action: { payload: RequestCreateInvoiceModel }) => {
        return this.invoicingService.create(action.payload).pipe(
          map((data: ResponseCreateInvoiceModel) => {
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
              CommonMessagesConstants.NOTIFICATION_INVOICE_CREATED
            );

            this.router.navigate([
              RoutesConstants.DASHBOARD_INDEX,
              RoutesConstants.DASHBOARD_INVOICING,
            ]);
            return invoicingActions.invoicingCreateSuccessAction({ payload: data });
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
      ofType(invoicingActions.invoicingGetByIdAction),
      switchMap((action: { payload: RequestGetInvoiceByIdModel }) => {
        return this.invoicingService.getById(action.payload).pipe(
          map((data: ResponseGetInvoiceByIdModel) => {
            if (!data.success) {
              return errorActions.errorAction({
                payload: {
                  error: data.message,
                  isApiError: true,
                },
              });
            }

            return invoicingActions.invoicingGetByIdSuccessAction({ payload: data });
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

  searchInvoicingList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(invoicingActions.setInvoicingSearchParamsAction),
      switchMap((action: { payload: RequestGetInvoiceListModel }) => {
        return this.invoicingService.getAll(action.payload).pipe(
          switchMap((data: ResponseGetInvoiceListModel) => {
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

            return of(invoicingActions.invoicingSearchSuccessAction({ payload: data }));
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
      ofType(invoicingActions.invoicingUpdateAction),
      switchMap((action: { payload: RequestUpdateInvoiceModel }) => {
        return this.invoicingService.update(action.payload).pipe(
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
              CommonMessagesConstants.NOTIFICATION_INVOICE_UPDATED
            );

            this.router.navigate([
              RoutesConstants.DASHBOARD_INDEX,
              RoutesConstants.DASHBOARD_INVOICING,
            ]);

            return invoicingActions.invoicingUpdateSuccessAction();
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
      ofType(invoicingActions.invoicingDeactivateAction),
      switchMap((action: { payload: RequestDeactivateInvoiceModel }) => {
        return this.invoicingService.deactivate(action.payload).pipe(
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
              CommonMessagesConstants.NOTIFICATION_INVOICE_DEACTIVATED
            );
            return invoicingActions.invoicingActivateSuccessAction();
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
      ofType(invoicingActions.invoicingActivateAction),
      switchMap((action: { payload: RequestReactivateInvoiceModel }) => {
        return this.invoicingService.activate(action.payload).pipe(
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
              CommonMessagesConstants.NOTIFICATION_INVOICE_REACTIVATED
            );
            return invoicingActions.invoicingActivateSuccessAction();
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

  downloadSelectedInvoices$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(invoicingActions.downloadSelectedInvoicesAction),
      switchMap((action: { payload: { invoiceIds: string[]; customIds: string[] } }) => {
        return this.invoicingService.downloadSelected(action.payload).pipe(
          switchMap((data: Blob) => {
            this.downloadDocumentsHelper.downloadDocument(
              data,
              `${action.payload.customIds.join('_')}.zip`
            );

            return of(invoicingActions.downloadSelectedInvoicesSuccessAction());
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

  downloadInvoice$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(invoicingActions.downloadInvoiceAction),
      switchMap((action: { payload: { invoiceId: string; customId: string } }) => {
        return this.invoicingService
          .downloadInvoice({ id: action.payload.invoiceId })
          .pipe(
            switchMap((data: Blob) => {
              this.downloadDocumentsHelper.downloadDocument(
                data,
                action.payload.customId
              );

              return of(invoicingActions.downloadInvoiceSuccessAction());
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
        invoicingActions.invoicingCreateSuccessAction,
        invoicingActions.invoicingUpdateSuccessAction,
        invoicingActions.invoicingActivateSuccessAction,
        invoicingActions.invoicingDeactivateSuccessAction
      ),
      concatLatestFrom(() => this.store$.select(selectInvoicingSearchParams)),
      mergeMap(([action, searchParams]) => {
        if (!searchParams) return of();

        return of(
          invoicingActions.setInvoicingSearchParamsAction({ payload: searchParams })
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
