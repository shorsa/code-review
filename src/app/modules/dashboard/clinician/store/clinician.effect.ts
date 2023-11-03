import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import * as errorActions from 'src/app/app-store/app-state/app-state.actions';
import { CommonMessagesConstants, RoutesConstants } from 'src/app/core/constants';
import { ClinicianService } from 'src/app/core/services/clinician.service';

import { NzModalService } from 'ng-zorro-antd/modal';
import { BaseResponseModel } from 'src/app/shared/models';
import {
  RequestActivateClinicianModel,
  RequestClinicianAddProductsModel,
  RequestClinicianDeleteProductModel,
  RequestCreateClinicianModel,
  RequestDeactivateClinicianModel,
  RequestGetClinicianByIdModel,
  RequestGetClinicianListModel,
  RequestGetClinicianProductsOptionsByClinicianIdModel,
  RequestUpdateClinicianModel,
  ResponseGetClinicianListModel,
  ResponseGetClinicianModel,
  ResponseGetClinicianProductsModel,
} from '../models';
import * as clinicianActions from './clinician.actions';
import { selectCliniciansSearchParams } from './clinician.selectors';
import { UserService } from 'src/app/core/services/user.service';

@Injectable()
export class ClinicianEffects {
  constructor(
    private actions$: Actions,
    private store$: Store,
    private readonly clinicianService: ClinicianService,
    private readonly userService: UserService,
    private router: Router,
    private notification: NzNotificationService,
    private modalService: NzModalService
  ) {}

  create$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(clinicianActions.clinicianCreateAction),
      switchMap((action: { payload: RequestCreateClinicianModel }) => {
        return this.clinicianService.create(action.payload).pipe(
          map((data: BaseResponseModel & { id: string }) => {
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
              CommonMessagesConstants.NOTIFICATION_CLINICIAN_CREATED
            );

            this.router.navigate(
              [
                RoutesConstants.DASHBOARD_INDEX,
                RoutesConstants.DASHBOARD_CLINICIAN,
                RoutesConstants.DASHBOARD_CLINICIAN_EDIT,
              ],
              { queryParams: { id: data.id } }
            );

            return clinicianActions.clinicianCreateSuccessAction();
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
      ofType(clinicianActions.clinicianGetByIdAction),
      switchMap((action: { payload: RequestGetClinicianByIdModel }) => {
        return this.clinicianService.getById(action.payload).pipe(
          map((data: ResponseGetClinicianModel) => {
            if (!data.success) {
              return errorActions.errorAction({
                payload: {
                  error: data.message,
                  isApiError: true,
                },
              });
            }

            return clinicianActions.clinicianGetByIdSuccessAction({ payload: data });
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

  searchClinicians$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(clinicianActions.setCliniciansSearchParamsAction),
      switchMap((action: { payload: RequestGetClinicianListModel }) => {
        return this.clinicianService.getAll(action.payload).pipe(
          switchMap((data: ResponseGetClinicianListModel) => {
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
              clinicianActions.cliniciansSearchSuccessAction({
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
      ofType(clinicianActions.clinicianUpdateAction),
      switchMap((action: { payload: RequestUpdateClinicianModel }) => {
        return this.clinicianService.update(action.payload).pipe(
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
              CommonMessagesConstants.NOTIFICATION_CLINICIAN_UPDATED
            );

            this.router.navigate([
              RoutesConstants.DASHBOARD_INDEX,
              RoutesConstants.DASHBOARD_CLINICIAN,
            ]);

            return clinicianActions.clinicianUpdateSuccessAction({ payload: data });
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

  unlock$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(clinicianActions.clinicianUnlockAction),
      switchMap((action: { payload: { id: string } }) => {
        return this.userService.unlock(action.payload).pipe(
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
              CommonMessagesConstants.NOTIFICATION_USER_UNLOCKED
            );

            this.modalService.closeAll();

            return clinicianActions.clinicianUnlockSuccessAction();
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
      ofType(clinicianActions.clinicianDeactivateAction),
      switchMap((action: { payload: RequestDeactivateClinicianModel }) => {
        return this.clinicianService.deactivate(action.payload).pipe(
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
              CommonMessagesConstants.NOTIFICATION_CLINICIAN_DEACTIVATED
            );

            this.modalService.closeAll();

            return clinicianActions.clinicianDeactivateSuccessAction();
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
      ofType(clinicianActions.clinicianActivateAction),
      switchMap((action: { payload: RequestActivateClinicianModel }) => {
        return this.clinicianService.activate(action.payload).pipe(
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
              CommonMessagesConstants.NOTIFICATION_CLINICIAN_REACTIVATED
            );

            return clinicianActions.clinicianActivateSuccessAction();
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
        clinicianActions.clinicianUpdateSuccessAction,
        clinicianActions.clinicianActivateSuccessAction,
        clinicianActions.clinicianCreateSuccessAction,
        clinicianActions.clinicianUnlockSuccessAction,
        clinicianActions.clinicianDeactivateSuccessAction
      ),
      concatLatestFrom(() => this.store$.select(selectCliniciansSearchParams)),
      mergeMap(([action, searchParams]) => {
        if (!searchParams) return of();

        return of(
          clinicianActions.setCliniciansSearchParamsAction({ payload: searchParams })
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

  //PRODUCTS
  searchProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(clinicianActions.getClinicianProductsAction),
      switchMap(
        (action: { payload: RequestGetClinicianProductsOptionsByClinicianIdModel }) => {
          return this.clinicianService
            .getClinicianProductsOptionsByClinicianId(action.payload)
            .pipe(
              switchMap((data: ResponseGetClinicianProductsModel) => {
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
                  clinicianActions.getClinicianProductsSuccessAction({
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
        }
      )
    );
  });

  deleteProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(clinicianActions.clinicianDeleteProductAction),
      switchMap(
        (action: {
          payload: RequestClinicianDeleteProductModel;
          searchParams: RequestGetClinicianProductsOptionsByClinicianIdModel;
        }) => {
          return this.clinicianService.deleteProduct(action.payload).pipe(
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

              return of(
                clinicianActions.clinicianDeleteProductSuccessAction({
                  searchParams: action.searchParams,
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

  addProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(clinicianActions.clinicianAddProductsAction),
      switchMap(
        (action: {
          payload: RequestClinicianAddProductsModel;
          searchParams: RequestGetClinicianProductsOptionsByClinicianIdModel;
        }) => {
          return this.clinicianService.addProducts(action.payload).pipe(
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

              this.modalService.closeAll();

              return of(
                clinicianActions.clinicianAddProductsSuccessAction({
                  searchParams: action.searchParams,
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

  searchProductsAfterActions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        clinicianActions.clinicianAddProductsSuccessAction,
        clinicianActions.clinicianDeleteProductSuccessAction
      ),
      map((action) => {
        return clinicianActions.getClinicianProductsAction({
          payload: action.searchParams,
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
  });
}
