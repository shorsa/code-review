import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import * as errorActions from 'src/app/app-store/app-state/app-state.actions';
import { CommonMessagesConstants } from 'src/app/core/constants';

import { ReferralService } from 'src/app/core/services/referral.service';
import { BaseResponseModel } from 'src/app/shared/models';
import {
  RequestActivateReferralModel,
  RequestDeactivateReferralModel,
  RequestDeleteReferralModel,
  RequestGetReferralListModel,
  RequestUpdateReferralStatusModel,
  ResponseGetReferralListModel,
} from '../../referral/models';
import * as patientReferralActions from './patient-referral.actions';
import { selectPatientReferralsSearchParams } from './patient.selectors';

@Injectable()
export class PatientReferralEffects {
  constructor(
    private actions$: Actions,
    private store$: Store,
    private readonly referralService: ReferralService,
    private notification: NzNotificationService
  ) {}

  searchPatientsReferral$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(patientReferralActions.setPatientReferralSearchParamsAction),
      switchMap((action: { payload: RequestGetReferralListModel }) => {
        return this.referralService.getAll(action.payload).pipe(
          map((data: ResponseGetReferralListModel) => {
            if (!data.success) {
              return errorActions.errorAction({
                payload: {
                  error: data.message,
                  isApiError: true,
                },
              });
            }

            return patientReferralActions.patientsReferralSearchSuccessAction({
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

  delete$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(patientReferralActions.patientDeleteReferralAction),
      switchMap((action: { payload: RequestDeleteReferralModel }) => {
        return this.referralService.delete(action.payload).pipe(
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
              CommonMessagesConstants.NOTIFICATION_REFERRAL_DELETED
            );

            return patientReferralActions.patientDeleteReferralSuccessAction({
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

  deactivate$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(patientReferralActions.patientReferralDeactivateAction),
      switchMap((action: { payload: RequestDeactivateReferralModel }) => {
        return this.referralService.deactivate(action.payload).pipe(
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
              CommonMessagesConstants.NOTIFICATION_REFERRAL_DEACTIVATED
            );

            return patientReferralActions.patientReferralDeactivateSuccessAction({
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

  activate$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(patientReferralActions.patientReferralActivateAction),
      switchMap((action: { payload: RequestActivateReferralModel }) => {
        return this.referralService.activate(action.payload).pipe(
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
              CommonMessagesConstants.NOTIFICATION_REFERRAL_REACTIVATED
            );

            return patientReferralActions.patientReferralActivateSuccessAction({
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

  changeStatus$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(patientReferralActions.patientReferralChangeStatusAction),
      switchMap((action: { payload: RequestUpdateReferralStatusModel }) => {
        return this.referralService.updateStatus(action.payload).pipe(
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
              CommonMessagesConstants.NOTIFICATION_REFERRAL_STATUS_CHANGED
            );

            return patientReferralActions.patientReferralChangeStatusSuccessAction({
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

  searchAfterActions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        patientReferralActions.patientDeleteReferralSuccessAction,
        patientReferralActions.patientReferralDeactivateSuccessAction,
        patientReferralActions.patientReferralActivateSuccessAction,
        patientReferralActions.patientReferralChangeStatusSuccessAction
      ),
      concatLatestFrom(() => this.store$.select(selectPatientReferralsSearchParams)),
      mergeMap(([action, searchParams]) => {
        if (!searchParams) return of();

        return of(
          patientReferralActions.setPatientReferralSearchParamsAction({
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
