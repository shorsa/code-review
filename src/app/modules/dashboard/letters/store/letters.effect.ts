import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import * as errorActions from 'src/app/app-store/app-state/app-state.actions';

import { LettersService } from 'src/app/core/services/letters.service';
import {
  RequestGetAppointmentReportsListModel,
  ResponseGetAppointmentReportListModel,
} from '../models';
import * as appointmentActions from './letters.actions';

@Injectable()
export class LettersEffects {
  constructor(
    private actions$: Actions,
    private readonly lettersService: LettersService
  ) {}

  searchAppointments$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(appointmentActions.setLettersSearchParamsAction),
      switchMap((action: { payload: RequestGetAppointmentReportsListModel }) => {
        return this.lettersService.getAll(action.payload).pipe(
          switchMap((data: ResponseGetAppointmentReportListModel) => {
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
              appointmentActions.lettersSearchSuccessAction({
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
}
