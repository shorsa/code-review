import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as errorActions from 'src/app/app-store/app-state/app-state.actions';
import { ReferralService } from 'src/app/core/services/referral.service';

import { CommonMessagesConstants } from 'src/app/core/constants';
import { BaseResponseModel } from 'src/app/shared/models';
import {
  RequestGetManagementReferralByIdModel,
  RequestGetOccupationalHealthGeneralReferralByIdModel,
  RequestUpdateManagementReferralModel,
  RequestUpdateOccupationalHealthGeneralReferralModel,
  ResponseGetManagementReferralModel,
  ResponseGetOccupationalHealthGeneralReferralModel,
} from '../models';
import * as referralDetailsActions from './referral-details.actions';
import * as referralActions from './referral.actions';

@Injectable()
export class ReferralDetailsEffects {
  constructor(
    private actions$: Actions,
    private readonly referralService: ReferralService,
    private notification: NzNotificationService
  ) {}

  getByIdOccupationalHealth$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(referralDetailsActions.getOccupationalHealthAction),
      switchMap(
        (action: { payload: RequestGetOccupationalHealthGeneralReferralByIdModel }) => {
          return this.referralService
            .getOccupationalHealthGeneralReferralById(action.payload)
            .pipe(
              map((data: ResponseGetOccupationalHealthGeneralReferralModel) => {
                if (!data.success) {
                  return errorActions.errorAction({
                    payload: {
                      error: data.message,
                      isApiError: true,
                    },
                  });
                }

                return referralDetailsActions.getOccupationalHealthSuccessAction({
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
        }
      )
    );
  });

  getReferralManagementDetails$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(referralDetailsActions.getReferralManagementDetailsAction),
      switchMap((action: { payload: RequestGetManagementReferralByIdModel }) => {
        return this.referralService.getManagementReferralById(action.payload).pipe(
          map((data: ResponseGetManagementReferralModel) => {
            if (!data.success) {
              return errorActions.errorAction({
                payload: {
                  error: data.message,
                  isApiError: true,
                },
              });
            }

            return referralDetailsActions.getReferralManagementDetailsSuccessAction({
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

  updateReferralManagementDetails$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(referralDetailsActions.updateReferralManagementDetailsAction),
      switchMap((action: { payload: RequestUpdateManagementReferralModel }) => {
        return this.referralService.updateManagementReferral(action.payload).pipe(
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

            if (action.payload.isSubmit) {
              this.notification.success(
                CommonMessagesConstants.NOTIFICATION_SUCCESS,
                CommonMessagesConstants.NOTIFICATION_REFERRAL_UPDATED
              );
            } else {
              this.notification.success(
                CommonMessagesConstants.NOTIFICATION_SUCCESS,
                CommonMessagesConstants.NOTIFICATION_REFERRAL_SAVED
              );
            }

            return of(
              referralDetailsActions.updateReferralManagementDetailsSuccessAction(),
              referralActions.referralGetByIdAction({
                payload: { id: action.payload.id },
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

  updateReferralOccupationalDetails$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(referralDetailsActions.updateReferralOccupationalDetailsAction),
      switchMap(
        (action: { payload: RequestUpdateOccupationalHealthGeneralReferralModel }) => {
          return this.referralService
            .updateOccupationalHealthGeneralReferral(action.payload)
            .pipe(
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
                if (action.payload.isSubmit) {
                  this.notification.success(
                    CommonMessagesConstants.NOTIFICATION_SUCCESS,
                    CommonMessagesConstants.NOTIFICATION_REFERRAL_UPDATED
                  );
                } else {
                  this.notification.success(
                    CommonMessagesConstants.NOTIFICATION_SUCCESS,
                    CommonMessagesConstants.NOTIFICATION_REFERRAL_SAVED
                  );
                }

                return of(
                  referralDetailsActions.updateReferralOccupationalDetailsSuccessAction(),
                  referralActions.referralGetByIdAction({
                    payload: { id: action.payload.id },
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
}
