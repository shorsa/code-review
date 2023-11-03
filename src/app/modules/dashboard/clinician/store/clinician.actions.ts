import { createAction, props } from '@ngrx/store';
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

//CREATE CLINICIAN
const CLINICIAN_CREATE = '[CLINICIAN] clinician create';
export const clinicianCreateAction = createAction(
  CLINICIAN_CREATE,
  props<{ payload: RequestCreateClinicianModel }>()
);

export const clinicianCreateSuccessAction = createAction(`${CLINICIAN_CREATE} success`);

//UPDATE CLINICIAN
const CLINICIAN_UPDATE = '[CLINICIAN] clinician update';
export const clinicianUpdateAction = createAction(
  CLINICIAN_UPDATE,
  props<{ payload: RequestUpdateClinicianModel }>()
);

export const clinicianUpdateSuccessAction = createAction(
  `${CLINICIAN_UPDATE} success`,
  props<{ payload: BaseResponseModel }>()
);

//GET CLINICIAN BY ID
const CLINICIAN_GET_BY_ID = '[CLINICIAN] clinician get by id';
export const clinicianGetByIdAction = createAction(
  CLINICIAN_GET_BY_ID,
  props<{ payload: RequestGetClinicianByIdModel }>()
);

export const clinicianGetByIdSuccessAction = createAction(
  `${CLINICIAN_GET_BY_ID} success`,
  props<{ payload: ResponseGetClinicianModel }>()
);

//SEARCH CLINICIAN
const CLINICIAN_SEARCH = '[CLINICIAN] search clinicians';
export const cliniciansSearchAction = createAction(
  CLINICIAN_SEARCH,
  props<{ payload: RequestGetClinicianListModel }>()
);

export const cliniciansSearchSuccessAction = createAction(
  `${CLINICIAN_SEARCH} success`,
  props<{
    payload: ResponseGetClinicianListModel;
  }>()
);

//ACTIVATE CLINICIAN
const CLINICIAN_ACTIVATE = '[CLINICIAN] activate clinician';
export const clinicianActivateAction = createAction(
  CLINICIAN_ACTIVATE,
  props<{ payload: RequestActivateClinicianModel }>()
);

export const clinicianActivateSuccessAction = createAction(
  `${CLINICIAN_ACTIVATE} success`
);

//DEACTIVATE CLINICIAN
const CLINICIAN_DEACTIVATE = '[CLINICIAN] deactivate clinician';
export const clinicianDeactivateAction = createAction(
  CLINICIAN_DEACTIVATE,
  props<{ payload: RequestDeactivateClinicianModel }>()
);

export const clinicianDeactivateSuccessAction = createAction(
  `${CLINICIAN_DEACTIVATE} success`
);

//UNLOCK CLINICIAN
const CLINICIAN_USERS_UNLOCK = '[CLINICIAN] unlock clinician';
export const clinicianUnlockAction = createAction(
  CLINICIAN_USERS_UNLOCK,
  props<{ payload: { id: string } }>()
);

export const clinicianUnlockSuccessAction = createAction(
  `${CLINICIAN_USERS_UNLOCK} success`
);

//PRODUCTS SEARCH
const CLINICIAN_SEARCH_PRODUCTS = '[CLINICIAN] search clinician products';
export const getClinicianProductsAction = createAction(
  CLINICIAN_SEARCH_PRODUCTS,
  props<{ payload: RequestGetClinicianProductsOptionsByClinicianIdModel }>()
);

export const getClinicianProductsSuccessAction = createAction(
  `${CLINICIAN_SEARCH_PRODUCTS} success`,
  props<{ payload: ResponseGetClinicianProductsModel }>()
);

//PRODUCTS ADD
const CLINICIAN_ADD_PRODUCTS = '[CLINICIAN] add products';
export const clinicianAddProductsAction = createAction(
  CLINICIAN_ADD_PRODUCTS,
  props<{
    payload: RequestClinicianAddProductsModel;
    searchParams: RequestGetClinicianProductsOptionsByClinicianIdModel;
  }>()
);

export const clinicianAddProductsSuccessAction = createAction(
  `${CLINICIAN_ADD_PRODUCTS} success`,
  props<{
    searchParams: RequestGetClinicianProductsOptionsByClinicianIdModel;
  }>()
);

//PRODUCT DELETE
const CLINICIAN_DELETE_PRODUCT = '[CLINICIAN] delete products';
export const clinicianDeleteProductAction = createAction(
  CLINICIAN_DELETE_PRODUCT,
  props<{
    payload: RequestClinicianDeleteProductModel;
    searchParams: RequestGetClinicianProductsOptionsByClinicianIdModel;
  }>()
);

export const clinicianDeleteProductSuccessAction = createAction(
  `${CLINICIAN_DELETE_PRODUCT} success`,
  props<{
    searchParams: RequestGetClinicianProductsOptionsByClinicianIdModel;
  }>()
);

//LOCAL
const SET_SEARCH_PARAMS = '[CLINICIAN] set clinicians search params';
export const setCliniciansSearchParamsAction = createAction(
  SET_SEARCH_PARAMS,
  props<{ payload: RequestGetClinicianListModel }>()
);

const CLINICIAN_CLEAR_DETAILS = '[CLINICIAN] clear clinician details';
export const clearClinicianDetailsDataAction = createAction(CLINICIAN_CLEAR_DETAILS);

const CLINICIAN_CLEAR_SEARCH_PARAMS = '[CLINICIAN] clear clinician details';
export const clearClinicianSearchParamsAction = createAction(
  CLINICIAN_CLEAR_SEARCH_PARAMS
);
