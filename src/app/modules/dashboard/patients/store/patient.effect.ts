import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import * as errorActions from 'src/app/app-store/app-state/app-state.actions';
import {
  CommonConstants,
  CommonMessagesConstants,
  RoutesConstants,
} from 'src/app/core/constants';
import { PatientService } from 'src/app/core/services/patient.service';

import { NzModalService } from 'ng-zorro-antd/modal';
import { ClientService } from 'src/app/core/services/client.service';
import { DepartmentService } from 'src/app/core/services/department.service';
import { BaseResponseModel } from 'src/app/shared/models';
import {
  RequestGetClientOptionsModel,
  ResponseGetClientOptionsModel,
} from '../../client/models';
import {
  GetDepartmentOptionsResponseModel,
  RequestGetDepartmentOptionsByClientIdModel,
} from '../../departments/models';
import {
  RequestActivatePatientModel,
  RequestCancelPreDeleteModel,
  RequestChangeDeletionDateModel,
  RequestCreatePatientModel,
  RequestDeactivatePatientModel,
  RequestGetPatientByIdModel,
  RequestGetPatientListModel,
  RequestGetPreDeleteListModel,
  RequestMergePatientsModel,
  RequestTransferPatientsToDepartmentModel,
  RequestUpdatePatientModal,
  ResponseCreatePatientModel,
  ResponseGetPatientByIdModel,
  ResponseGetPatientListModel,
  ResponseGetPatientOptionsModel,
  ResponseGetPatientPreDeleteListModel,
  ResponseUpdatePatientModel,
} from '../models/patients';
import * as patientActions from './patient.actions';
import { selectPatientsSearchParams } from './patient.selectors';

@Injectable()
export class PatientEffects {
  constructor(
    private actions$: Actions,
    private store$: Store,
    private readonly patientService: PatientService,
    private readonly departmentService: DepartmentService,
    private readonly clientService: ClientService,
    private router: Router,
    private notification: NzNotificationService,
    private modalService: NzModalService
  ) {}

  create$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(patientActions.patientCreateAction),
      switchMap((action: { payload: RequestCreatePatientModel }) => {
        return this.patientService.create(action.payload).pipe(
          map((data: ResponseCreatePatientModel) => {
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
              CommonMessagesConstants.NOTIFICATION_PATIENT_CREATED
            );

            this.router.navigate(
              [
                RoutesConstants.DASHBOARD_INDEX,
                RoutesConstants.DASHBOARD_PATIENT,
                RoutesConstants.DASHBOARD_PATIENT_EDIT,
              ],
              { queryParams: { id: data.id } }
            );

            return patientActions.patientCreateSuccessAction();
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
      ofType(patientActions.patientGetByIdAction),
      switchMap((action: { payload: RequestGetPatientByIdModel }) => {
        return this.patientService.getById(action.payload).pipe(
          map((data: ResponseGetPatientByIdModel) => {
            if (!data.success) {
              return errorActions.errorAction({
                payload: {
                  error: data.message,
                  isApiError: true,
                },
              });
            }

            return patientActions.patientGetByIdSuccessAction({ payload: data });
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
      ofType(patientActions.patientsSearchAction),
      switchMap((action: { payload: RequestGetPatientListModel }) => {
        return this.patientService.getAll(action.payload).pipe(
          switchMap((data: ResponseGetPatientListModel) => {
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
              patientActions.patientsSearchSuccessAction({
                payload: data,
              }),
              patientActions.setPatientsSearchParamsAction({ payload: action.payload })
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

  preDeletePatientsSearch$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(patientActions.preDeletePatientsSearchAction),
      switchMap((action: { payload: RequestGetPreDeleteListModel }) => {
        return this.patientService.getPreDeletePatients(action.payload).pipe(
          switchMap((data: ResponseGetPatientPreDeleteListModel) => {
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
              patientActions.preDeletePatientsSearchSuccessAction({
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

  searchPatientsForMerge$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(patientActions.patientsSearchForMergeAction),
      switchMap((action: { payload: RequestGetPatientListModel }) => {
        return this.patientService.getAll(action.payload).pipe(
          switchMap((data: ResponseGetPatientListModel) => {
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
              patientActions.patientsSearchForMergeSuccessAction({
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

  getDepartmentOptions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(patientActions.getDepartmentOptionsAction),
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

            return patientActions.getDepartmentOptionsSuccessAction({ payload: data });
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

  getClientOptions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(patientActions.getClientOptionsAction),
      switchMap((action: { payload: RequestGetClientOptionsModel }) => {
        return this.clientService.getClientOptions(action.payload).pipe(
          map((data: ResponseGetClientOptionsModel) => {
            if (!data.success) {
              return errorActions.errorAction({
                payload: {
                  error: data.message,
                  isApiError: true,
                },
              });
            }

            return patientActions.getClientOptionsSuccessAction({
              payload: data.clients,
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

  update$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(patientActions.patientUpdateAction),
      switchMap((action: { payload: RequestUpdatePatientModal }) => {
        return this.patientService.update(action.payload).pipe(
          map((data: ResponseUpdatePatientModel) => {
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
              CommonMessagesConstants.NOTIFICATION_PATIENT_UPDATED
            );

            this.router.navigate([
              RoutesConstants.DASHBOARD_INDEX,
              RoutesConstants.DASHBOARD_PATIENT,
            ]);

            return patientActions.patientUpdateSuccessAction();
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
      ofType(patientActions.patientDeactivateAction),
      switchMap((action: { payload: RequestDeactivatePatientModel }) => {
        return this.patientService.deactivate(action.payload).pipe(
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
              CommonMessagesConstants.NOTIFICATION_PATIENT_DEACTIVATED
            );

            this.modalService.closeAll();

            return patientActions.patientDeactivateSuccessAction();
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

  changePreDeleteDate$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(patientActions.changePreDeleteDateAction),
      switchMap((action: { payload: RequestChangeDeletionDateModel }) => {
        return this.patientService.changeDeletionDate(action.payload).pipe(
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
              CommonMessagesConstants.NOTIFICATION_PRE_DELETE_DATE
            );

            this.modalService.closeAll();

            return patientActions.changePreDeleteDateSuccessAction();
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

  cancelPreDelete$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(patientActions.cancelPreDeleteAction),
      switchMap((action: { payload: RequestCancelPreDeleteModel }) => {
        return this.patientService.cancelPreDelete(action.payload).pipe(
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
              CommonMessagesConstants.NOTIFICATION_PRE_DELETE_CANCEL
            );

            this.modalService.closeAll();

            return patientActions.cancelPreDeleteSuccessAction();
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

  deletePreDelete$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(patientActions.deletePreDeleteAction),
      switchMap((action: { payload: RequestCancelPreDeleteModel }) => {
        return this.patientService.deletePreDelete(action.payload).pipe(
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

            this.notification.success(
              CommonMessagesConstants.NOTIFICATION_SUCCESS,
              CommonMessagesConstants.NOTIFICATION_PRE_DELETE_DELETE
            );

            this.modalService.closeAll();

            return of(
              patientActions.deletePreDeleteSuccessAction(),
              patientActions.preDeletePatientsSearchAction({
                payload: {
                  pageSize: CommonConstants.PAGE_SIZE_OPTIONS[0],
                  pageIndex: 0,
                },
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

  deletePatientJobDocument$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(patientActions.deletePatientJobDocumentAction),
      switchMap((action: { payload: RequestCancelPreDeleteModel; patientId: string }) => {
        return this.patientService.deletePreDelete(action.payload).pipe(
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

            this.notification.success(
              CommonMessagesConstants.NOTIFICATION_SUCCESS,
              CommonMessagesConstants.NOTIFICATION_PRE_DELETE_DELETE
            );

            this.modalService.closeAll();

            return of(
              patientActions.deletePatientJobDocumentSuccessAction(),
              patientActions.patientGetByIdAction({
                payload: {
                  id: action.patientId,
                },
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

  transferToDepartment$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(patientActions.transferToDepartmentAction),
      switchMap((action: { payload: RequestTransferPatientsToDepartmentModel }) => {
        return this.patientService.transferPatientsToDepartment(action.payload).pipe(
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
              CommonMessagesConstants.NOTIFICATION_PATIENT_TRANSFERRED
            );

            this.modalService.closeAll();

            return patientActions.transferToDepartmentSuccessAction();
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
      ofType(patientActions.patientActivateAction),
      switchMap((action: { payload: RequestActivatePatientModel }) => {
        return this.patientService.activate(action.payload).pipe(
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
              CommonMessagesConstants.NOTIFICATION_PATIENT_REACTIVATED
            );

            return patientActions.patientActivateSuccessAction();
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

  merge$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(patientActions.patientsToMergeAction),
      switchMap((action: { payload: RequestMergePatientsModel }) => {
        return this.patientService.merge(action.payload).pipe(
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
              CommonMessagesConstants.NOTIFICATION_PATIENT_MERGED
            );

            this.modalService.closeAll();

            return patientActions.patientsToMergeSuccessAction();
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
        patientActions.patientUpdateSuccessAction,
        patientActions.patientActivateSuccessAction,
        patientActions.patientDeactivateSuccessAction,
        patientActions.deletePreDeleteSuccessAction,
        patientActions.transferToDepartmentSuccessAction,
        patientActions.patientsToMergeSuccessAction
      ),
      concatLatestFrom(() => this.store$.select(selectPatientsSearchParams)),
      mergeMap(([action, searchParams]) => {
        if (!searchParams) return of();

        return of(patientActions.patientsSearchAction({ payload: searchParams }));
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
