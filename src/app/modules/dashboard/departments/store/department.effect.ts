import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import * as errorActions from 'src/app/app-store/app-state/app-state.actions';
import { CommonMessagesConstants } from 'src/app/core/constants';
import { DepartmentService } from 'src/app/core/services/department.service';
import {
  GetDepartmentOptionsResponseModel,
  RequestActionsDepartmentModel,
  RequestCreateDepartmentModel,
  RequestGetDepartmentByIdModel,
  RequestGetDepartmentListModel,
  RequestGetDepartmentOptionsByClientIdModel,
  RequestUpdateDepartmentModel,
  ResponseCreateDepartmentModel,
  ResponseGetDepartmentByIdModel,
  ResponseGetDepartmentListModel,
  ResponseUpdateDepartmentModel,
} from '../models';
import * as departmentActions from './department.actions';
import { selectDepartmentsSearchParams } from './department.selectors';
import { PatientService } from 'src/app/core/services/patient.service';
import {
  RequestGetPatientByIdModel,
  RequestGetPatientListModel,
  ResponseGetPatientListModel,
} from '../../patients/models/patients';

@Injectable()
export class DepartmentEffects {
  constructor(
    private actions$: Actions,
    private readonly departmentService: DepartmentService,
    private readonly patientService: PatientService,
    private router: Router,
    private modalService: NzModalService,
    private store$: Store,
    private notification: NzNotificationService
  ) {}

  create$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(departmentActions.departmentCreateAction),
      switchMap((action: { payload: RequestCreateDepartmentModel }) => {
        return this.departmentService.create(action.payload).pipe(
          map((data: ResponseCreateDepartmentModel) => {
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
              CommonMessagesConstants.NOTIFICATION_DEPARTMENT_CREATED
            );
            this.modalService.closeAll();
            return departmentActions.departmentCreateSuccessAction({ payload: data });
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
      ofType(departmentActions.departmentGetByIdAction),
      switchMap((action: { payload: RequestGetDepartmentByIdModel }) => {
        return this.departmentService.getById(action.payload).pipe(
          map((data: ResponseGetDepartmentByIdModel) => {
            if (!data.success) {
              return errorActions.errorAction({
                payload: {
                  error: data.message,
                  isApiError: true,
                },
              });
            }

            return departmentActions.departmentGetByIdSuccessAction({ payload: data });
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

  searchDepartments$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(departmentActions.setDepartmentSearchParamsAction),
      switchMap((action: { payload: RequestGetDepartmentListModel }) => {
        return this.departmentService.getAll(action.payload).pipe(
          switchMap((data: ResponseGetDepartmentListModel) => {
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
              departmentActions.departmentsSearchSuccessAction({
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

  searchPatients$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(departmentActions.getPatientsByDepartmentIdAction),
      switchMap((action: { payload: RequestGetPatientListModel }) => {
        return this.patientService.getAll(action.payload).pipe(
          map((data: ResponseGetPatientListModel) => {
            if (!data.success) {
              return errorActions.errorAction({
                payload: {
                  error: data.message,
                  isApiError: true,
                },
              });
            }

            return departmentActions.getPatientsByDepartmentIdSuccessAction({
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

  getDepartmentOptions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(departmentActions.getDepartmentOptionsAction),
      switchMap((action: { payload: RequestGetDepartmentOptionsByClientIdModel }) => {
        return this.departmentService.getDepartmentOptionsByClientId(action.payload).pipe(
          map((data: GetDepartmentOptionsResponseModel) => {
            if (!data.success) {
              return errorActions.errorAction({
                payload: {
                  error: data.message,
                  isApiError: true,
                },
              });
            }

            return departmentActions.getDepartmentOptionsSuccessAction({ payload: data });
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
      ofType(departmentActions.departmentUpdateAction),
      switchMap((action: { payload: RequestUpdateDepartmentModel }) => {
        return this.departmentService.update(action.payload).pipe(
          map((data: ResponseUpdateDepartmentModel) => {
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
              CommonMessagesConstants.NOTIFICATION_DEPARTMENT_UPDATED
            );
            this.modalService.closeAll();
            departmentActions.clearDepartmentDetailsDataAction();

            return departmentActions.departmentUpdateSuccessAction({ payload: data });
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
      ofType(departmentActions.departmentDeactivateAction),
      switchMap((action: { payload: RequestActionsDepartmentModel }) => {
        return this.departmentService.deactivate(action.payload).pipe(
          map((data: ResponseUpdateDepartmentModel) => {
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
              CommonMessagesConstants.NOTIFICATION_DEPARTMENT_DEACTIVATED
            );
            return departmentActions.departmentActivateSuccessAction({ payload: data });
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
      ofType(departmentActions.departmentActivateAction),
      switchMap((action: { payload: RequestActionsDepartmentModel }) => {
        return this.departmentService.activate(action.payload).pipe(
          map((data: ResponseUpdateDepartmentModel) => {
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
              CommonMessagesConstants.NOTIFICATION_DEPARTMENT_REACTIVATED
            );
            return departmentActions.departmentActivateSuccessAction({ payload: data });
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
        departmentActions.departmentCreateSuccessAction,
        departmentActions.departmentUpdateSuccessAction,
        departmentActions.departmentActivateSuccessAction,
        departmentActions.departmentDeactivateSuccessAction
      ),
      concatLatestFrom(() => this.store$.select(selectDepartmentsSearchParams)),
      mergeMap(([action, searchParams]) => {
        if (!searchParams) return of();

        return of(
          departmentActions.setDepartmentSearchParamsAction({ payload: searchParams })
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
