import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import * as errorActions from 'src/app/app-store/app-state/app-state.actions';
import { CommonMessagesConstants, RoutesConstants } from 'src/app/core/constants';
import {
  RequestCreateClinicModel,
  RequestDeactivateClinicModel,
  RequestGetClinicByIdModel,
  RequestGetClinicListModel,
  RequestUpdateClinicModel,
  ResponseCreateClinicModel,
  ResponseGetClinicByIdModel,
  ResponseGetClinicListModel,
} from '../models';
import * as clinicActions from './clinics.actions';
import { ClinicsService } from 'src/app/core/services/clinics.service';
import { BaseResponseModel } from 'src/app/shared/models';
import { selectClinicsSearchParams } from './clinics.selectors';

@Injectable()
export class ClinicsEffects {
  constructor(
    private actions$: Actions,
    private store$: Store,
    private readonly clinicsService: ClinicsService,
    private router: Router,
    private notification: NzNotificationService
  ) {}

  create$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(clinicActions.clinicCreateAction),
      switchMap((action: { payload: RequestCreateClinicModel }) => {
        return this.clinicsService.create(action.payload).pipe(
          map((data: ResponseCreateClinicModel) => {
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
              CommonMessagesConstants.NOTIFICATION_CLINIC_CREATED
            );

            this.router.navigate(
              [
                RoutesConstants.DASHBOARD_INDEX,
                RoutesConstants.DASHBOARD_CLINICS,
                RoutesConstants.DASHBOARD_CLINICS_EDIT,
              ],
              {
                queryParams: {
                  id: data.id,
                },
              }
            );

            return clinicActions.clinicCreateSuccessAction({ payload: data });
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
      ofType(clinicActions.clinicGetByIdAction),
      switchMap((action: { payload: RequestGetClinicByIdModel }) => {
        return this.clinicsService.getById(action.payload).pipe(
          map((data: ResponseGetClinicByIdModel) => {
            if (!data.success) {
              return errorActions.errorAction({
                payload: {
                  error: data.message,
                  isApiError: true,
                },
              });
            }

            return clinicActions.clinicGetByIdSuccessAction({ payload: data });
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

  searchClinics$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(clinicActions.setClinicsSearchParamsAction),
      switchMap((action: { payload: RequestGetClinicListModel }) => {
        return this.clinicsService.getAll(action.payload).pipe(
          switchMap((data: ResponseGetClinicListModel) => {
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
              clinicActions.clinicsSearchSuccessAction({
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
      ofType(clinicActions.clinicUpdateAction),
      switchMap((action: { payload: RequestUpdateClinicModel }) => {
        return this.clinicsService.update(action.payload).pipe(
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
              CommonMessagesConstants.NOTIFICATION_CLINIC_UPDATED
            );

            this.router.navigate([
              RoutesConstants.DASHBOARD_INDEX,
              RoutesConstants.DASHBOARD_CLINICS,
            ]);

            return clinicActions.clinicUpdateSuccessAction({ payload: data });
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
      ofType(clinicActions.clinicDeactivateAction),
      switchMap((action: { payload: RequestDeactivateClinicModel }) => {
        return this.clinicsService.deactivate(action.payload).pipe(
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
              CommonMessagesConstants.NOTIFICATION_CLINIC_DEACTIVATED
            );

            return clinicActions.clinicDeactivateSuccessAction({ payload: data });
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
      ofType(clinicActions.clinicActivateAction),
      switchMap((action: { payload: RequestDeactivateClinicModel }) => {
        return this.clinicsService.activate(action.payload).pipe(
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
              CommonMessagesConstants.NOTIFICATION_CLINIC_REACTIVATED
            );

            // this.router.navigate(
            //   [RoutesConstants.DASHBOARD_INDEX, RoutesConstants.DASHBOARD_CLINICS],
            //   {
            //     queryParams: {
            //       id: data.id,
            //     },
            //   }
            // );

            return clinicActions.clinicActivateSuccessAction({ payload: data });
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
        clinicActions.clinicUpdateSuccessAction,
        clinicActions.clinicActivateSuccessAction,
        clinicActions.clinicDeactivateSuccessAction
      ),
      concatLatestFrom(() => this.store$.select(selectClinicsSearchParams)),
      mergeMap(([action, searchParams]) => {
        if (!searchParams) return of();
        return of(clinicActions.setClinicsSearchParamsAction({ payload: searchParams }));
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
