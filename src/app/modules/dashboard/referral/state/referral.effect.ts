import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import * as errorActions from 'src/app/app-store/app-state/app-state.actions';
import { CommonMessagesConstants, RoutesConstants } from 'src/app/core/constants';
import { ReferralService } from 'src/app/core/services/referral.service';

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

import { PatientService } from 'src/app/core/services/patient.service';
import { ProductService } from 'src/app/core/services/product.service';
import {
  RequestGetPatientListModel,
  ResponseGetAuditLogListModel,
  ResponseGetPatientListModel,
  ResponseGetPatientOptionsModel,
} from '../../patients/models/patients';
import {
  RequestGetProductOptionsModel,
  ResponseGetProductOptionsModel,
} from '../../products/models';
import {
  CreateReferralResponseModel,
  RequestActivateReferralModel,
  RequestCreateReferralModel,
  RequestDeactivateReferralModel,
  RequestGetReferralAuditLogsModel,
  RequestGetReferralByIdModel,
  RequestGetReferralListModel,
  RequestUpdateReferralModel,
  RequestUpdateReferralProductModel,
  RequestUpdateReferralStatusModel,
  ResponseGetReferralListModel,
  ResponseGetReferralModel,
} from '../models';
import * as referralActions from './referral.actions';
import { selectReferralsSearchParams } from './referral.selectors';

@Injectable()
export class ReferralEffects {
  constructor(
    private actions$: Actions,
    private store$: Store,
    private readonly referralService: ReferralService,
    private readonly departmentService: DepartmentService,
    private readonly patientService: PatientService,
    private readonly clientService: ClientService,
    private readonly productService: ProductService,
    private router: Router,
    private notification: NzNotificationService,
    private modalService: NzModalService
  ) {}

  create$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(referralActions.referralCreateAction),
      switchMap((action: { payload: RequestCreateReferralModel }) => {
        return this.referralService.create(action.payload).pipe(
          map((data: CreateReferralResponseModel) => {
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
              CommonMessagesConstants.NOTIFICATION_REFERRAL_CREATED
            );

            this.router.navigate(
              [
                RoutesConstants.DASHBOARD_INDEX,
                RoutesConstants.DASHBOARD_REFERRAL,
                RoutesConstants.DASHBOARD_REFERRAL_EDIT,
              ],
              { queryParams: { id: data.id } }
            );

            this.modalService.closeAll();

            return referralActions.referralCreateSuccessAction({ payload: data });
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
      ofType(referralActions.referralGetByIdAction),
      switchMap((action: { payload: RequestGetReferralByIdModel }) => {
        return this.referralService.getById(action.payload).pipe(
          map((data: ResponseGetReferralModel) => {
            if (!data.success) {
              return errorActions.errorAction({
                payload: {
                  error: data.message,
                  isApiError: true,
                },
              });
            }

            return referralActions.referralGetByIdSuccessAction({ payload: data });
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

  searchReferrals$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(referralActions.setReferralSearchParamsAction),
      switchMap((action: { payload: RequestGetReferralListModel }) => {
        return this.referralService.getAll(action.payload).pipe(
          map((data: ResponseGetReferralListModel) => {
            if (!data.success) {
              return errorActions.errorAction({
                payload: {
                  error: data.message,
                  isApiError: true,
                },
              });
            }

            return referralActions.referralsSearchSuccessAction({
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

  update$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(referralActions.referralUpdateAction),
      switchMap((action: { payload: RequestUpdateReferralModel }) => {
        return this.referralService.update(action.payload).pipe(
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
              CommonMessagesConstants.NOTIFICATION_REFERRAL_UPDATED
            );

            this.router.navigate([
              RoutesConstants.DASHBOARD_INDEX,
              RoutesConstants.DASHBOARD_REFERRAL,
            ]);

            return referralActions.referralUpdateSuccessAction();
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
      ofType(referralActions.referralDeactivateAction),
      switchMap((action: { payload: RequestDeactivateReferralModel }) => {
        return this.referralService.deactivate(action.payload).pipe(
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
              CommonMessagesConstants.NOTIFICATION_REFERRAL_DEACTIVATED
            );

            this.modalService.closeAll();

            return referralActions.referralDeactivateSuccessAction({ payload: data });
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
      ofType(referralActions.referralActivateAction),
      switchMap((action: { payload: RequestActivateReferralModel }) => {
        return this.referralService.activate(action.payload).pipe(
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
              CommonMessagesConstants.NOTIFICATION_REFERRAL_REACTIVATED
            );

            return referralActions.referralActivateSuccessAction();
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

  changeStatus$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(referralActions.referralChangeStatusAction),
      switchMap((action: { payload: RequestUpdateReferralStatusModel }) => {
        return this.referralService.updateStatus(action.payload).pipe(
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
              CommonMessagesConstants.NOTIFICATION_REFERRAL_STATUS_CHANGED
            );

            this.modalService.closeAll();

            return referralActions.referralChangeStatusSuccessAction();
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

  updateSameProductType$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(referralActions.referralChangeSameProductTypeAction),
      switchMap((action: { payload: RequestUpdateReferralProductModel }) => {
        return this.referralService.updateProductSameType(action.payload).pipe(
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
              CommonMessagesConstants.NOTIFICATION_REFERRAL_PRODUCT_CHANGED
            );

            return referralActions.referralChangeSameProductTypeSuccessAction({
              payload: { ...data, id: action.payload.referralId },
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

  updateNewProductType$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(referralActions.referralChangeNewProductTypeAction),
      switchMap((action: { payload: RequestUpdateReferralProductModel }) => {
        return this.referralService.updateProductNewType(action.payload).pipe(
          map((data: BaseResponseModel & { id: string }) => {
            debugger;

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
              CommonMessagesConstants.NOTIFICATION_REFERRAL_PRODUCT_CHANGED
            );

            this.router.navigate(
              [
                RoutesConstants.DASHBOARD_INDEX,
                RoutesConstants.DASHBOARD_REFERRAL,
                RoutesConstants.DASHBOARD_REFERRAL_EDIT,
              ],
              { queryParams: { id: data.id } }
            );

            return referralActions.referralChangeNewProductTypeSuccessAction({
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

  getClientOptions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(referralActions.getClientOptionsAction),
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

            return referralActions.getClientOptionsSuccessAction({
              payload: data.clients.map((item) => ({ label: item.name, value: item.id })),
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
      ofType(referralActions.getDepartmentOptionsAction),
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

            return referralActions.getDepartmentOptionsSuccessAction({
              payload: data.departmentsByClient,
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

  getPatientOptions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(referralActions.getPatientOptionsAction),
      switchMap((action: { payload: RequestGetPatientListModel }) => {
        return this.patientService.getPatientOptions(action.payload).pipe(
          map((data: ResponseGetPatientOptionsModel) => {
            if (!data.success) {
              return errorActions.errorAction({
                payload: {
                  error: data.message,
                  isApiError: true,
                },
              });
            }

            return referralActions.getPatientOptionsSuccessAction({
              payload: data.patients,
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

  getProductOptions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(referralActions.getProductOptionsAction),
      switchMap((action: { payload: RequestGetProductOptionsModel }) => {
        return this.productService.getProductOptions(action.payload).pipe(
          map((data: ResponseGetProductOptionsModel) => {
            if (!data.success) {
              return errorActions.errorAction({
                payload: {
                  error: data.message,
                  isApiError: true,
                },
              });
            }

            return referralActions.getProductOptionsSuccessAction({
              payload: data.products,
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

  //AUDIT LOGS
  searchReferralAuditLogs$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(referralActions.referralsSearchAuditLogsAction),
      switchMap((action: { payload: RequestGetReferralAuditLogsModel }) => {
        return this.referralService.getReferralAuditLogs(action.payload).pipe(
          map((data: ResponseGetAuditLogListModel) => {
            if (!data.success) {
              return errorActions.errorAction({
                payload: {
                  error: data.message,
                  isApiError: true,
                },
              });
            }

            return referralActions.referralsSearchAuditLogsSuccessAction({
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

  // getDetailsAfterActions$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(
  //       referralActions.referralChangeSameProductTypeSuccessAction,
  //       referralActions.referralChangeNewProductTypeSuccessAction
  //     ),
  //     mergeMap((data) => {
  //       if (!data) return of();

  //       return of(
  //         referralActions.referralGetByIdAction({ payload: { id: data.payload.id } })
  //       );
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

  searchAfterActions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        referralActions.referralUpdateSuccessAction,
        referralActions.referralActivateSuccessAction,
        referralActions.referralCreateSuccessAction,
        referralActions.referralDeactivateSuccessAction,
        referralActions.referralChangeStatusSuccessAction
      ),
      concatLatestFrom(() => this.store$.select(selectReferralsSearchParams)),
      mergeMap(([action, searchParams]) => {
        if (!searchParams) return of();

        return of(
          referralActions.setReferralSearchParamsAction({ payload: searchParams })
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
