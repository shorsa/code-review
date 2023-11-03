import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { IsActiveFilterEnum } from 'src/app/shared/enums';
import { ProductState } from '.';
import * as productActions from './products.actions';
import { clone } from 'lodash';
import { CommonConstants } from 'src/app/core/constants';

const initialState: ProductState = {
  productDetails: undefined,
  productSearchParams: {
    pageSize: CommonConstants.PAGE_SIZE_OPTIONS[0],
    pageIndex: 0,
    searchText: undefined,
    productOrderByOptions: undefined,
    isActiveFilter: IsActiveFilterEnum.Active,
    isOrderByAsc: undefined,
  },
  productListData: undefined,
};

export const productReducer: ActionReducer<ProductState, Action> = createReducer(
  initialState,
  on(
    productActions.productGetByIdSuccessAction,
    (state: ProductState, { payload }): ProductState => {
      const { product } = payload;
      return {
        ...state,
        productDetails: clone(product),
      };
    }
  ),
  on(
    productActions.setProductSearchParamsAction,
    (state: ProductState, { payload }): ProductState => {
      return {
        ...state,
        productSearchParams: payload,
      };
    }
  ),
  on(
    productActions.productsSearchSuccessAction,
    (state: ProductState, { payload }): ProductState => {
      return {
        ...state,
        productListData: clone(payload),
      };
    }
  ),
  on(
    productActions.clearProductDetailsDataAction,
    (state: ProductState): ProductState => {
      return {
        ...state,
        productDetails: initialState.productDetails,
      };
    }
  ),
  on(
    productActions.clearProductSearchParamsAction,
    (state: ProductState): ProductState => {
      return {
        ...state,
        productSearchParams: initialState.productSearchParams,
      };
    }
  )
);

export function ProductReducer(state: ProductState, action: Action) {
  return productReducer(state, action);
}
