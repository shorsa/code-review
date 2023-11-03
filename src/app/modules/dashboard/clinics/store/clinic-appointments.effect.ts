import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import * as errorActions from 'src/app/app-store/app-state/app-state.actions';
import { AppointmentsService } from 'src/app/core/services/appointments.service';
import { RequestGetClinicListModel, ResponseGetClinicListModel } from '../models';
import * as clinicAppointmentsActions from './clinic-appointments.actions';
import {
  RequestGetAppointmentListModel,
  ResponseGetAppointmentListModel,
} from '../../appointments/models';

@Injectable()
export class ClinicAppointmentsEffects {
  constructor(
    private actions$: Actions,
    private store$: Store,
    private readonly appointmentsService: AppointmentsService,
    private router: Router,
    private notification: NzNotificationService
  ) {}

  searchClinics$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(clinicAppointmentsActions.clinicAppointmentSearchAction),
      switchMap((action: { payload: RequestGetAppointmentListModel }) => {
        return this.appointmentsService.getAll(action.payload).pipe(
          switchMap((data: ResponseGetAppointmentListModel) => {
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
              clinicAppointmentsActions.clinicAppointmentSearchSuccessAction({
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

  // searchAfterActions$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(
  //       clinicActions.clinicUpdateSuccessAction,
  //       clinicActions.clinicActivateSuccessAction,
  //       clinicActions.clinicDeactivateSuccessAction
  //     ),
  //     concatLatestFrom(() => this.store$.select(selectClinicsSearchParams)),
  //     mergeMap(([action, searchParams]) => {
  //       if (!searchParams) return of();
  //       return of(clinicActions.setClinicsSearchParamsAction({ payload: searchParams }));
  //     }),

  //     catchError((error) => {
  //       return of(
  //         errorActions.errorAction({
  //           payload: {
  //             error: JSON.stringify(error),
  //             isApiError: true,
  //           },
  //         })
  //       );
  //     })
  //   );
  // });
}
