import { createAction, props } from '@ngrx/store';

import { BaseResponseModel } from 'src/app/shared/models';
import {
  RequestActivateProductModel,
  RequestCreateProductModel,
  RequestDeactivateProductModel,
  RequestGetProductByIdModel,
  RequestUpdateProductModel,
  ResponseCreateProductModel,
  ResponseGetProductByIdModel,
  ResponseGetProductListModel,
  ResponseUpdateProductModel,
} from '../models';

//CREATE
const PRODUCT_CREATE = '[PRODUCT] product create';
export const productCreateAction = createAction(
  PRODUCT_CREATE,
  props<{ payload: RequestCreateProductModel }>()
);

const PRODUCT_CREATE_SUCCESS = '[PRODUCT] product create success';
export const productCreateSuccessAction = createAction(
  PRODUCT_CREATE_SUCCESS,
  props<{ payload: ResponseCreateProductModel }>()
);

//UPDATE
const PRODUCT_UPDATE = '[PRODUCT] product update';
export const productUpdateAction = createAction(
  PRODUCT_UPDATE,
  props<{ payload: RequestUpdateProductModel }>()
);

const PRODUCT_UPDATE_SUCCESS = '[PRODUCT] product update success';
export const productUpdateSuccessAction = createAction(
  PRODUCT_UPDATE_SUCCESS,
  props<{ payload: ResponseUpdateProductModel }>()
);

//GET BY ID
const PRODUCT_GET_BY_ID = '[PRODUCT] product get by id';
export const productGetByIdAction = createAction(
  PRODUCT_GET_BY_ID,
  props<{ payload: RequestGetProductByIdModel }>()
);

const PRODUCT_GET_BY_ID_SUCCESS = '[PRODUCT] product get by id success';
export const productGetByIdSuccessAction = createAction(
  PRODUCT_GET_BY_ID_SUCCESS,
  props<{ payload: ResponseGetProductByIdModel }>()
);

//SEARCH
// const PRODUCT_SEARCH = '[PRODUCT] search products';
// export const productsSearchAction = createAction(
//   PRODUCT_SEARCH,
//   props<{ payload: RequestGetProductListModel }>()
// );

const PRODUCT_SEARCH_SUCCESS = '[PRODUCT] search products success';
export const productsSearchSuccessAction = createAction(
  PRODUCT_SEARCH_SUCCESS,
  props<{ payload: ResponseGetProductListModel }>()
);

//ACTIVATE PRODUCT
const PRODUCT_ACTIVATE = '[PRODUCT] activate product';
export const productActivateAction = createAction(
  PRODUCT_ACTIVATE,
  props<{ payload: RequestActivateProductModel }>()
);

const PRODUCT_ACTIVATE_SUCCESS = '[PRODUCT] activate product success';
export const productActivateSuccessAction = createAction(
  PRODUCT_ACTIVATE_SUCCESS,
  props<{
    payload: BaseResponseModel;
  }>()
);

//DEACTIVATE PRODUCT
const PRODUCT_DEACTIVATE = '[PRODUCT] deactivate product';
export const productDeactivateAction = createAction(
  PRODUCT_DEACTIVATE,
  props<{ payload: RequestDeactivateProductModel }>()
);

const PRODUCT_DEACTIVATE_SUCCESS = '[PRODUCT] deactivate product success';
export const productDeactivateSuccessAction = createAction(
  PRODUCT_DEACTIVATE_SUCCESS,
  props<{
    payload: BaseResponseModel;
  }>()
);

const SET_SEARCH_PARAMS = '[PRODUCT] set product search params';
export const setProductSearchParamsAction = createAction(
  SET_SEARCH_PARAMS,
  props<{ payload: any }>()
);

const PRODUCT_CLEAR_DETAILS = '[PRODUCT] clear product details';
export const clearProductDetailsDataAction = createAction(PRODUCT_CLEAR_DETAILS);

const PRODUCT_CLEAR_SEARCH_PARAMS = '[PRODUCT] clear search params product';
export const clearProductSearchParamsAction = createAction(PRODUCT_CLEAR_SEARCH_PARAMS);
