import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import * as errorActions from 'src/app/app-store/app-state/app-state.actions';
import { CommonMessagesConstants } from 'src/app/core/constants';

import { NzModalService } from 'ng-zorro-antd/modal';
import { PatientNotesService } from 'src/app/core/services/patient-notes.service';
import {
  RequestCreatePatientNoteModel,
  RequestDeleteConfidentialNoteModel,
  RequestGetNoteListByPatientIdModel,
  RequestUpdatePatientNoteModel,
  ResponseCreatePatientNoteModel,
  ResponseGetNoteListByPatientIdModel,
  ResponseUpdatePatientNoteModel,
} from '../models/notes';
import * as patientNotesActions from './patient-notes.actions';
import { BaseResponseModel } from 'src/app/shared/models';

@Injectable()
export class PatientNotesEffects {
  constructor(
    private actions$: Actions,
    private readonly patientNotesService: PatientNotesService,
    private nzModalService: NzModalService,
    private notification: NzNotificationService
  ) {}

  createNote$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(patientNotesActions.patientCreateNoteAction),
      switchMap(
        (action: {
          payload: {
            data: RequestCreatePatientNoteModel;
            searchParams: RequestGetNoteListByPatientIdModel;
          };
        }) => {
          return this.patientNotesService.create(action.payload.data).pipe(
            map((data: ResponseCreatePatientNoteModel) => {
              if (!data.success) {
                return errorActions.errorAction({
                  payload: {
                    error: data.message,
                    isApiError: true,
                  },
                });
              }
              this.nzModalService.closeAll();

              this.notification.success(
                CommonMessagesConstants.NOTIFICATION_SUCCESS,
                CommonMessagesConstants.NOTIFICATION_NOTE_CREATED
              );

              return patientNotesActions.patientCreateNoteSuccessAction({
                payload: {
                  data,
                  searchParams: {
                    ...action.payload.searchParams,
                    patientId: action.payload.data.patientId,
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

  deleteNote$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(patientNotesActions.patientDeleteNoteAction),
      switchMap(
        (action: {
          payload: {
            data: RequestDeleteConfidentialNoteModel;
            searchParams: RequestGetNoteListByPatientIdModel;
          };
        }) => {
          return this.patientNotesService
            .deleteConfidentialNote(action.payload.data)
            .pipe(
              map((data: BaseResponseModel) => {
                if (!data.success) {
                  return errorActions.errorAction({
                    payload: {
                      error: data.message,
                      isApiError: true,
                    },
                  });
                }
                this.nzModalService.closeAll();

                this.notification.success(
                  CommonMessagesConstants.NOTIFICATION_SUCCESS,
                  CommonMessagesConstants.NOTIFICATION_NOTE_DELETED
                );

                return patientNotesActions.patientDeleteNoteSuccessAction({
                  payload: {
                    searchParams: {
                      ...action.payload.searchParams,
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

  updateNote$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(patientNotesActions.patientNoteUpdateAction),
      switchMap(
        (action: {
          payload: {
            data: RequestUpdatePatientNoteModel;
            searchParams: RequestGetNoteListByPatientIdModel;
          };
        }) => {
          return this.patientNotesService.update(action.payload.data).pipe(
            map((data: ResponseUpdatePatientNoteModel) => {
              if (!data.success) {
                return errorActions.errorAction({
                  payload: {
                    error: data.message,
                    isApiError: true,
                  },
                });
              }

              this.nzModalService.closeAll();

              this.notification.success(
                CommonMessagesConstants.NOTIFICATION_SUCCESS,
                CommonMessagesConstants.NOTIFICATION_NOTE_UPDATED
              );

              return patientNotesActions.patientNoteUpdateSuccessAction({
                payload: {
                  data,
                  searchParams: {
                    ...action.payload.searchParams,
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

  searchPatientNotes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(patientNotesActions.patientsNoteListSearchAction),
      switchMap((action: { payload: RequestGetNoteListByPatientIdModel }) => {
        return this.patientNotesService.getAll(action.payload).pipe(
          switchMap((data: ResponseGetNoteListByPatientIdModel) => {
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
              patientNotesActions.patientsNoteListSearchSuccessAction({
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

  searchNoteAfterActions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        patientNotesActions.patientCreateNoteSuccessAction,
        patientNotesActions.patientNoteUpdateSuccessAction,
        patientNotesActions.patientDeleteNoteSuccessAction
      ),
      mergeMap((action) => {
        return of(
          patientNotesActions.patientsNoteListSearchAction({
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
