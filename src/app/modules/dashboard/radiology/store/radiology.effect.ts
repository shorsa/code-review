import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import * as errorActions from 'src/app/app-store/app-state/app-state.actions';
import { CommonMessagesConstants } from 'src/app/core/constants';
import { RadiologyService } from 'src/app/core/services/radiology.service';
import { BaseResponseModel } from 'src/app/shared/models';
import {
  RequestCreateMriRequestModel,
  RequestDismissMriRequestModel,
  RequestGetMriRequestListModel,
  RequestMarkAsPrintedMriModel,
  ResponseGetMriRequestListModel,
} from '../models';
import * as radiologyActions from './radiology.actions';
import { selectRadiologySearchParams } from './radiology.selectors';

@Injectable()
export class RadiologyEffects {
  constructor(
    private actions$: Actions,
    private readonly radiologyService: RadiologyService,
    private notification: NzNotificationService,
    private modal: NzModalService,
    private store$: Store
  ) {}

  create$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(radiologyActions.mriCreateAction),
      switchMap((action: { payload: RequestCreateMriRequestModel }) => {
        return this.radiologyService.create(action.payload).pipe(
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
              CommonMessagesConstants.NOTIFICATION_MRI_REQUEST_CREATED
            );

            this.modal.closeAll();

            return radiologyActions.mriCreateSuccessAction({ payload: data });
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

  searchList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(radiologyActions.setMriSearchParamsAction),
      switchMap((action: { payload: RequestGetMriRequestListModel }) => {
        return this.radiologyService.getAll(action.payload).pipe(
          switchMap((data: ResponseGetMriRequestListModel) => {
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

            return of(radiologyActions.mriSearchSuccessAction({ payload: data }));
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

  dismiss$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(radiologyActions.mriDismissAction),
      switchMap((action: { payload: RequestDismissMriRequestModel }) => {
        return this.radiologyService.dismiss(action.payload).pipe(
          map((data: BaseResponseModel) => {
            if (!data.success) {
              return errorActions.errorAction({
                payload: {
                  error: data.message,
                  isApiError: true,
                },
              });
            }
            this.modal.closeAll();
            return radiologyActions.mriDismissSuccessAction({ payload: data });
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

  markAsPrinted$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(radiologyActions.mriMarkAsPrintedAction),
      switchMap((action: { payload: RequestMarkAsPrintedMriModel }) => {
        return this.radiologyService.markAsPrinted(action.payload).pipe(
          map((data: BaseResponseModel) => {
            if (!data.success) {
              return errorActions.errorAction({
                payload: {
                  error: data.message,
                  isApiError: true,
                },
              });
            }
            // this.modal.closeAll();

            return radiologyActions.mriMarkAsPrintedSuccessAction({ payload: data });
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
        radiologyActions.mriDismissSuccessAction,
        radiologyActions.mriMarkAsPrintedSuccessAction
      ),
      concatLatestFrom(() => this.store$.select(selectRadiologySearchParams)),
      mergeMap(([action, searchParams]) => {
        if (!searchParams) return of();

        return of(radiologyActions.setMriSearchParamsAction({ payload: searchParams }));
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
