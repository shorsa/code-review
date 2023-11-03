import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import * as errorActions from 'src/app/app-store/app-state/app-state.actions';

import * as contractsActions from './contracts.actions';
import { ContractsService } from 'src/app/core/services/contracts.service';
import {
  RequestCreateContractModel,
  RequestDeactivateContractModel,
  RequestGenerateSageExportModel,
  RequestGetContractByIdModel,
  RequestGetContractCliniciansOptionsByContractIdModel,
  RequestGetContractCliniciansOptionsModel,
  RequestGetContractProductsOptionsByContractIdModel,
  RequestGetContractProductsOptionsModel,
  RequestReactivateContractModel,
  RequestUpdateContractModel,
  ResponseCreateContractModel,
  ResponseGetContractByIdModel,
  ResponseGetContractCliniciansModel,
  ResponseGetContractProductsModel,
} from '../models';
import { BaseResponseModel } from 'src/app/shared/models';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CommonMessagesConstants, RoutesConstants } from 'src/app/core/constants';
import { Router } from '@angular/router';
import { selectContractsSearchParams } from './contracts.selectors';
import { Store } from '@ngrx/store';
import { DownloadDocumentsHelper } from 'src/app/shared/helpers/download-documents.helper';

@Injectable()
export class ContractsEffects {
  constructor(
    private actions$: Actions,
    private notification: NzNotificationService,
    private readonly contractsService: ContractsService,
    private readonly downloadDocumentsHelper: DownloadDocumentsHelper,
    private router: Router,
    private store$: Store
  ) {}

  search$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(contractsActions.setContractsSearchParamsAction),
      switchMap((action: { payload: any }) => {
        return this.contractsService.getAll(action.payload).pipe(
          switchMap((data: any) => {
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
              contractsActions.contractsSearchSuccessAction({
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

  create$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(contractsActions.createContractAction),
      switchMap((action: { payload: RequestCreateContractModel }) => {
        return this.contractsService.create(action.payload).pipe(
          map((data: ResponseCreateContractModel) => {
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
              CommonMessagesConstants.NOTIFICATION_CONTRACT_CREATED
            );

            this.router.navigate([
              RoutesConstants.DASHBOARD_INDEX,
              RoutesConstants.DASHBOARD_CONTRACTS,
            ]);

            return contractsActions.createContractSuccessAction();
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
      ofType(contractsActions.updateContractAction),
      switchMap((action: { payload: RequestUpdateContractModel }) => {
        return this.contractsService.update(action.payload).pipe(
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
              CommonMessagesConstants.NOTIFICATION_CONTRACT_UPDATED
            );

            this.router.navigate([
              RoutesConstants.DASHBOARD_INDEX,
              RoutesConstants.DASHBOARD_CONTRACTS,
            ]);

            return contractsActions.updateContractSuccessAction();
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

  getProductsByContractId$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(contractsActions.getContractProductsAction),
      switchMap(
        (action: { payload: RequestGetContractProductsOptionsByContractIdModel }) => {
          return this.contractsService
            .getContractProductsOptionsByContractId(action.payload)
            .pipe(
              map((data: ResponseGetContractProductsModel) => {
                if (!data.success) {
                  return errorActions.errorAction({
                    payload: {
                      error: data.message,
                      isApiError: true,
                    },
                  });
                }

                return contractsActions.getContractProductsSuccessAction({
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

  getContractById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(contractsActions.getContractByIdAction),
      switchMap((action: { payload: RequestGetContractByIdModel }) => {
        return this.contractsService.getById(action.payload).pipe(
          map((data: ResponseGetContractByIdModel) => {
            if (!data.success) {
              return errorActions.errorAction({
                payload: {
                  error: data.message,
                  isApiError: true,
                },
              });
            }

            return contractsActions.getContractByIdSuccessAction({
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

  deactivateContract$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(contractsActions.deactivateContractAction),
      switchMap((action: { payload: RequestDeactivateContractModel }) => {
        return this.contractsService.deactivate(action.payload).pipe(
          map((data: BaseResponseModel) => {
            if (!data.success) {
              return errorActions.errorAction({
                payload: {
                  error: data.message,
                  isApiError: true,
                },
              });
            }

            return contractsActions.deactivateContractSuccessAction();
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

  reactivateContract$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(contractsActions.reactivateContractAction),
      switchMap((action: { payload: RequestDeactivateContractModel }) => {
        return this.contractsService.reactivate(action.payload).pipe(
          map((data: BaseResponseModel) => {
            if (!data.success) {
              return errorActions.errorAction({
                payload: {
                  error: data.message,
                  isApiError: true,
                },
              });
            }

            return contractsActions.reactivateContractSuccessAction();
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

  closeContract$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(contractsActions.markAsClosedContractAction),
      switchMap((action: { payload: RequestDeactivateContractModel }) => {
        return this.contractsService.markAsClosed(action.payload).pipe(
          map((data: BaseResponseModel) => {
            if (!data.success) {
              return errorActions.errorAction({
                payload: {
                  error: data.message,
                  isApiError: true,
                },
              });
            }

            return contractsActions.markAsClosedContractSuccessAction();
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

  openContract$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(contractsActions.markAsOpenContractAction),
      switchMap((action: { payload: RequestReactivateContractModel }) => {
        return this.contractsService.markAsOpen(action.payload).pipe(
          map((data: BaseResponseModel) => {
            if (!data.success) {
              return errorActions.errorAction({
                payload: {
                  error: data.message,
                  isApiError: true,
                },
              });
            }

            return contractsActions.markAsClosedContractSuccessAction();
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

  getCliniciansByContractId$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(contractsActions.getContractCliniciansAction),
      switchMap(
        (action: { payload: RequestGetContractCliniciansOptionsByContractIdModel }) => {
          return this.contractsService
            .getContractCliniciansOptionsByContractId(action.payload)
            .pipe(
              map((data: ResponseGetContractCliniciansModel) => {
                if (!data.success) {
                  return errorActions.errorAction({
                    payload: {
                      error: data.message,
                      isApiError: true,
                    },
                  });
                }

                return contractsActions.getContractCliniciansSuccessAction({
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

  downloadSelectedInvoices$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(contractsActions.downloadSelectedContractAction),
      switchMap(
        (action: {
          payload: RequestGenerateSageExportModel & { customIds: string[] };
        }) => {
          return this.contractsService.downloadSelected(action.payload).pipe(
            switchMap((data: Blob) => {
              debugger;
              this.downloadDocumentsHelper.downloadDocument(
                data,
                `${action.payload.customIds.join('_')}.${data.type.split('/')[1]}`
              );

              return of(contractsActions.downloadSelectedContractSuccessAction());
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

  downloadInvoice$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(contractsActions.downloadContractAction),
      switchMap((action: { payload: { contractId: string; customId: string } }) => {
        return this.contractsService
          .downloadContract({ id: action.payload.contractId })
          .pipe(
            switchMap((data: Blob) => {
              this.downloadDocumentsHelper.downloadDocument(
                data,
                action.payload.customId
              );

              return of(contractsActions.downloadContractSuccessAction());
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
        contractsActions.markAsClosedContractSuccessAction,
        contractsActions.deactivateContractSuccessAction,
        contractsActions.reactivateContractSuccessAction,
        contractsActions.markAsOpenContractSuccessAction
      ),
      concatLatestFrom(() => this.store$.select(selectContractsSearchParams)),
      mergeMap(([action, searchParams]) => {
        if (!searchParams) return of();

        return of(
          contractsActions.setContractsSearchParamsAction({ payload: searchParams })
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
