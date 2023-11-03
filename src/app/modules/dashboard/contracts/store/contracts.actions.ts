import { createAction, props } from '@ngrx/store';
import {
  RequestCreateContractModel,
  RequestDeactivateContractModel,
  RequestGenerateSageExportModel,
  RequestGetContractByIdModel,
  RequestGetContractCliniciansOptionsByContractIdModel,
  RequestGetContractListModel,
  RequestGetContractProductsOptionsByContractIdModel,
  RequestReactivateContractModel,
  RequestUpdateContractProductModel,
  ResponseContractClinicianItemModel,
  ResponseContractProductItemModel,
  ResponseGetContractByIdModel,
  ResponseGetContractCliniciansModel,
  ResponseGetContractListModel,
  ResponseGetContractProductsModel,
} from '../models';

//SEARCH CONTRACTS
const CONTRACT_SEARCH = '[CONTRACT] search contracts';
export const contractsSearchAction = createAction(
  CONTRACT_SEARCH,
  props<{ payload: RequestGetContractListModel }>()
);

export const contractsSearchSuccessAction = createAction(
  `${CONTRACT_SEARCH} success`,
  props<{
    payload: ResponseGetContractListModel;
  }>()
);

//CREATE CONTRACT
const CONTRACT_CREATE = '[CONTRACT] create contract';
export const createContractAction = createAction(
  CONTRACT_CREATE,
  props<{ payload: RequestCreateContractModel }>()
);

export const createContractSuccessAction = createAction(`${CONTRACT_CREATE} success`);

//UPDATE CONTRACT
const CONTRACT_UPDATE = '[CONTRACT] update contract';
export const updateContractAction = createAction(
  CONTRACT_UPDATE,
  props<{ payload: RequestCreateContractModel }>()
);

export const updateContractSuccessAction = createAction(`${CONTRACT_UPDATE} success`);

//GET CONTRACT
const GET_CONTRACT = '[CONTRACT] get contract by id';
export const getContractByIdAction = createAction(
  GET_CONTRACT,
  props<{ payload: RequestGetContractByIdModel }>()
);

export const getContractByIdSuccessAction = createAction(
  `${GET_CONTRACT} success`,
  props<{
    payload: ResponseGetContractByIdModel;
  }>()
);

//CONTRACT DEACTIVATE
const DEACTIVATE_CONTRACT = '[CONTRACT] deactivate contract';
export const deactivateContractAction = createAction(
  DEACTIVATE_CONTRACT,
  props<{ payload: RequestDeactivateContractModel }>()
);

export const deactivateContractSuccessAction = createAction(
  `${DEACTIVATE_CONTRACT} success`
);

//CONTRACT REACTIVATE
const REACTIVATE_CONTRACT = '[CONTRACT] reactivate contract';
export const reactivateContractAction = createAction(
  REACTIVATE_CONTRACT,
  props<{ payload: RequestDeactivateContractModel }>()
);

export const reactivateContractSuccessAction = createAction(
  `${REACTIVATE_CONTRACT} success`
);

//CONTRACT CLOSE
const CLOSE_CONTRACT = '[CONTRACT] close contract';
export const markAsClosedContractAction = createAction(
  CLOSE_CONTRACT,
  props<{ payload: RequestDeactivateContractModel }>()
);

export const markAsClosedContractSuccessAction = createAction(
  `${CLOSE_CONTRACT} success`
);

//CONTRACT OPEN
const OPEN_CONTRACT = '[CONTRACT] open contract';
export const markAsOpenContractAction = createAction(
  OPEN_CONTRACT,
  props<{ payload: RequestReactivateContractModel }>()
);

export const markAsOpenContractSuccessAction = createAction(`${OPEN_CONTRACT} success`);

//GET CONTRACT PRODUCTS
const GET_CONTRACT_PRODUCT = '[CONTRACT] get contract products';
export const getContractProductsAction = createAction(
  GET_CONTRACT_PRODUCT,
  props<{ payload: RequestGetContractProductsOptionsByContractIdModel }>()
);

export const getContractProductsSuccessAction = createAction(
  `${GET_CONTRACT_PRODUCT} success`,
  props<{
    payload: ResponseGetContractProductsModel;
  }>()
);

//GET CONTRACT CLINICIANS
const GET_CONTRACT_CLINICIANS = '[CONTRACT] get contract clinicians';
export const getContractCliniciansAction = createAction(
  GET_CONTRACT_CLINICIANS,
  props<{ payload: RequestGetContractCliniciansOptionsByContractIdModel }>()
);
export const getContractCliniciansSuccessAction = createAction(
  `${GET_CONTRACT_CLINICIANS} success`,
  props<{
    payload: ResponseGetContractCliniciansModel;
  }>()
);

//DOWNLOAD SELECTED CONTRACTS
const DOWNLOAD_SELECTED_CONTRACTS = '[CONTRACT] download selected contracts';
export const downloadSelectedContractAction = createAction(
  DOWNLOAD_SELECTED_CONTRACTS,
  props<{ payload: RequestGenerateSageExportModel & { customIds: string[] } }>()
);

export const downloadSelectedContractSuccessAction = createAction(
  `${DOWNLOAD_SELECTED_CONTRACTS} success`
);

//DOWNLOAD INVOICE
const DOWNLOAD_CONTRACT = '[CONTRACT] download contract';
export const downloadContractAction = createAction(
  DOWNLOAD_CONTRACT,
  props<{ payload: { contractId: string; customId: string } }>()
);

export const downloadContractSuccessAction = createAction(`${DOWNLOAD_CONTRACT} success`);

//LOCAL
const SAVE_LOCAL_CONTRACT_DATA = '[CONTRACT] save contact data to store';
export const saveContractDataToStoreAction = createAction(
  SAVE_LOCAL_CONTRACT_DATA,
  props<{ payload: RequestCreateContractModel }>()
);

const SET_SEARCH_PARAMS = '[CONTRACT] set contracts search params';
export const setContractsSearchParamsAction = createAction(
  SET_SEARCH_PARAMS,
  props<{ payload: RequestGetContractListModel }>()
);

const CONTRACT_CLEAR_SEARCH_PARAMS = '[CONTRACT] clear contract search params';
export const clearContractsSearchParamsAction = createAction(
  CONTRACT_CLEAR_SEARCH_PARAMS
);

const CLEAR_NOTIFICATION = '[CONTRACT] clear notification';
export const clearNotificationAction = createAction(CLEAR_NOTIFICATION);

const CLEAR_CONTRACT_DETAILS = '[CONTRACT] clear contract details';
export const clearContractsDetailsAction = createAction(CLEAR_CONTRACT_DETAILS);

const CLEAR_PRODUCT_TYPES = '[CONTRACT] clear product types';
export const clearProductTypesAction = createAction(CLEAR_PRODUCT_TYPES);

const CLEAR_PRODUCT_CLINICIANS = '[CONTRACT] clear contract clinicians';
export const clearContractCliniciansAction = createAction(CLEAR_PRODUCT_CLINICIANS);

const DELETE_PRODUCT_TYPE = '[CONTRACT] delete product';
export const deleteProductItemAction = createAction(
  DELETE_PRODUCT_TYPE,
  props<{ payload: { productId: string } }>()
);

const ADD_PRODUCTS = '[CONTRACT] add products';
export const addProductsItemsAction = createAction(
  ADD_PRODUCTS,
  props<{ payload: ResponseContractProductItemModel[] }>()
);

const ADD_CLINICIANS = '[CONTRACT] add clinicians';
export const addCliniciansItemsAction = createAction(
  ADD_CLINICIANS,
  props<{ payload: { clinicians: ResponseContractClinicianItemModel[] } }>()
);

const DELETE_CLINICIAN = '[CONTRACT] delete clinician';
export const deleteClinicianItemAction = createAction(
  DELETE_CLINICIAN,
  props<{ payload: { clinicianId: string } }>()
);

const SHOW_NOTIFICATION = '[CONTRACT] show notification';
export const showNotificationAction = createAction(
  SHOW_NOTIFICATION,
  props<{ payload: { message: string } }>()
);
