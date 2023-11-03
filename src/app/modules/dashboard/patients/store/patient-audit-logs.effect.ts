import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import * as errorActions from 'src/app/app-store/app-state/app-state.actions';

import { PatientAuditLogsService } from 'src/app/core/services/patient-audit-logs.service';
import {
  RequestGetAuditLogsByPatientIdModel,
  ResponseGetAuditLogListModel,
} from '../models/patients';
import * as patientAuditLogsActions from './patient-audit-logs.actions';

@Injectable()
export class PatientAuditLogsEffects {
  constructor(
    private actions$: Actions,
    private readonly patientAuditLogsService: PatientAuditLogsService,
    private notification: NzNotificationService
  ) {}

  searchPatientAuditLogs$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(patientAuditLogsActions.patientsAuditLogListSearchAction),
      switchMap((action: { payload: RequestGetAuditLogsByPatientIdModel }) => {
        return this.patientAuditLogsService.getAll(action.payload).pipe(
          switchMap((data: ResponseGetAuditLogListModel) => {
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
              patientAuditLogsActions.patientsAuditLogListSearchSuccessAction({
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
