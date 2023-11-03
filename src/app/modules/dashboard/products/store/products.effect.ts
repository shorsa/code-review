import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import * as errorActions from 'src/app/app-store/app-state/app-state.actions';
import { CommonMessagesConstants, RoutesConstants } from 'src/app/core/constants';
import { ProductService } from 'src/app/core/services/product.service';
import { BaseResponseModel } from 'src/app/shared/models';
import {
  RequestActivateProductModel,
  RequestCreateProductModel,
  RequestDeactivateProductModel,
  RequestGetProductByIdModel,
  RequestGetProductListModel,
  RequestUpdateProductModel,
  ResponseCreateProductModel,
  ResponseGetProductByIdModel,
  ResponseGetProductListModel,
  ResponseUpdateProductModel,
} from '../models';
import * as productActions from './products.actions';
import { selectProductSearchParams } from './products.selectors';
import { NzModalService } from 'ng-zorro-antd/modal';

@Injectable()
export class ProductEffects {
  constructor(
    private actions$: Actions,
    private readonly productService: ProductService,
    private router: Router,
    private store$: Store,
    private nzModalService: NzModalService,
    private notification: NzNotificationService
  ) {}

  create$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(productActions.productCreateAction),
      switchMap((action: { payload: RequestCreateProductModel }) => {
        return this.productService.create(action.payload).pipe(
          map((data: ResponseCreateProductModel) => {
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
              CommonMessagesConstants.NOTIFICATION_PRODUCT_CREATED
            );

            this.nzModalService.closeAll();

            return productActions.productCreateSuccessAction({ payload: data });
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
      ofType(productActions.productGetByIdAction),
      switchMap((action: { payload: RequestGetProductByIdModel }) => {
        return this.productService.getById(action.payload).pipe(
          map((data: ResponseGetProductByIdModel) => {
            if (!data.success) {
              return errorActions.errorAction({
                payload: {
                  error: data.message,
                  isApiError: true,
                },
              });
            }

            return productActions.productGetByIdSuccessAction({ payload: data });
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

  searchProductList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(productActions.setProductSearchParamsAction),
      switchMap((action: { payload: RequestGetProductListModel }) => {
        return this.productService.getAll(action.payload).pipe(
          map((data: ResponseGetProductListModel) => {
            if (!data.success) {
              return errorActions.errorAction({
                payload: {
                  error: data.message,
                  isApiError: true,
                },
              });
            }

            return productActions.productsSearchSuccessAction({ payload: data });
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
      ofType(productActions.productUpdateAction),
      switchMap((action: { payload: RequestUpdateProductModel }) => {
        return this.productService.update(action.payload).pipe(
          map((data: ResponseUpdateProductModel) => {
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
              CommonMessagesConstants.NOTIFICATION_PRODUCT_UPDATED
            );

            this.router.navigate([
              RoutesConstants.DASHBOARD_INDEX,
              RoutesConstants.DASHBOARD_PRODUCTS,
            ]);

            productActions.clearProductDetailsDataAction();

            return productActions.productUpdateSuccessAction({ payload: data });
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
      ofType(productActions.productDeactivateAction),
      switchMap((action: { payload: RequestDeactivateProductModel }) => {
        return this.productService.deactivate(action.payload).pipe(
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
              CommonMessagesConstants.NOTIFICATION_PRODUCT_DEACTIVATED
            );
            return productActions.productDeactivateSuccessAction({ payload: data });
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
      ofType(productActions.productActivateAction),
      switchMap((action: { payload: RequestActivateProductModel }) => {
        return this.productService.activate(action.payload).pipe(
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
              CommonMessagesConstants.NOTIFICATION_PRODUCT_REACTIVATED
            );
            return productActions.productActivateSuccessAction({ payload: data });
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
        productActions.productCreateSuccessAction,
        productActions.productUpdateSuccessAction,
        productActions.productActivateSuccessAction,
        productActions.productDeactivateSuccessAction
      ),
      concatLatestFrom(() => this.store$.select(selectProductSearchParams)),
      mergeMap(([action, searchParams]) => {
        if (!searchParams) return of();

        return of(productActions.setProductSearchParamsAction({ payload: searchParams }));
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
