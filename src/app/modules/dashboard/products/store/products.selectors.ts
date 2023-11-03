import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ReducerNodesEnum } from 'src/app/app-store';
import { ProductState } from '.';

const selectProductFeature = createFeatureSelector<ProductState>(
  ReducerNodesEnum.product
);

export const selectProductData = createSelector(
  selectProductFeature,
  (state: ProductState) => state
);

export const selectProductDetails = createSelector(
  selectProductFeature,
  (state: ProductState) => state?.productDetails
);

export const selectProductList = createSelector(
  selectProductFeature,
  (state: ProductState) => state?.productListData
);

export const selectProductSearchParams = createSelector(
  selectProductFeature,
  (state: ProductState) => state?.productSearchParams
);
