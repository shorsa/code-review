import { createAction, props } from '@ngrx/store';
import { BaseResponseModel } from 'src/app/shared/models';
import {
  RequestCreateSiteModel,
  RequestUpdateSiteModel,
  RequestGetSiteByIdModel,
  ResponseGetSiteModel,
  RequestGetSiteListModel,
  ResponseGetSiteListModel,
  RequestActivateSiteModel,
  RequestDeactivateSiteModel,
  RequestDeleteSiteDocumentModel,
  RequestGetSiteDocumentWithContentModel,
} from '../models';

//CREATE SITES
const SITES_CREATE = '[SITES] site create';
export const siteCreateAction = createAction(
  SITES_CREATE,
  props<{ payload: RequestCreateSiteModel; searchParams: RequestGetSiteListModel }>()
);

const SITES_CREATE_SUCCESS = '[SITES] site create success';
export const siteCreateSuccessAction = createAction(
  SITES_CREATE_SUCCESS,
  props<{ payload: BaseResponseModel; searchParams: RequestGetSiteListModel }>()
);

//UPDATE SITES
const SITES_UPDATE = '[SITES] site update';
export const siteUpdateAction = createAction(
  SITES_UPDATE,
  props<{ payload: RequestUpdateSiteModel; searchParams: RequestGetSiteListModel }>()
);

const SITES_UPDATE_SUCCESS = '[SITES] site update success';
export const siteUpdateSuccessAction = createAction(
  SITES_UPDATE_SUCCESS,
  props<{ payload: BaseResponseModel; searchParams: RequestGetSiteListModel }>()
);

//GET SITES BY ID
const SITES_GET_BY_ID = '[SITES] site get by id';
export const siteGetByIdAction = createAction(
  SITES_GET_BY_ID,
  props<{ payload: RequestGetSiteByIdModel }>()
);

const SITES_GET_BY_ID_SUCCESS = '[SITES] site get by id success';
export const siteGetByIdSuccessAction = createAction(
  SITES_GET_BY_ID_SUCCESS,
  props<{ payload: ResponseGetSiteModel }>()
);

//SEARCH SITES
const SITES_SEARCH = '[SITES] search sites';
export const sitesSearchAction = createAction(
  SITES_SEARCH,
  props<{ payload: RequestGetSiteListModel }>()
);

const SITES_SEARCH_SUCCESS = '[SITES] search sites success';
export const sitesSearchSuccessAction = createAction(
  SITES_SEARCH_SUCCESS,
  props<{
    payload: ResponseGetSiteListModel;
  }>()
);

//ACTIVATE SITES
const SITES_ACTIVATE = '[SITES] activate site';
export const siteActivateAction = createAction(
  SITES_ACTIVATE,
  props<{ payload: RequestActivateSiteModel; searchParams: RequestGetSiteListModel }>()
);

const SITES_ACTIVATE_SUCCESS = '[SITES] activate site success';
export const siteActivateSuccessAction = createAction(
  SITES_ACTIVATE_SUCCESS,
  props<{
    payload: BaseResponseModel;
    searchParams: RequestGetSiteListModel;
  }>()
);

//DEACTIVATE SITES
const SITES_DEACTIVATE = '[SITES] deactivate site';
export const siteDeactivateAction = createAction(
  SITES_DEACTIVATE,
  props<{ payload: RequestDeactivateSiteModel; searchParams: RequestGetSiteListModel }>()
);

const SITES_DEACTIVATE_SUCCESS = '[SITES] deactivate site success';
export const siteDeactivateSuccessAction = createAction(
  SITES_DEACTIVATE_SUCCESS,
  props<{
    payload: BaseResponseModel;
    searchParams: RequestGetSiteListModel;
  }>()
);

//LOCAL
const SITES_CLEAR_DETAILS = '[SITES] clear site details';
export const clearSiteDetailsDataAction = createAction(SITES_CLEAR_DETAILS);

//DELETE SITES DOCUMENT
const SITES_DOCUMENT_DELETE = '[SITES] delete site documents';
export const siteDocumentDeleteAction = createAction(
  SITES_DOCUMENT_DELETE,
  props<{
    payload: {
      siteId: string;
      data: RequestDeleteSiteDocumentModel;
    };
  }>()
);

const SITES_DOCUMENT_DELETE_SUCCESS = '[SITES] delete site documents success';
export const siteDocumentDeleteSuccessAction = createAction(
  SITES_DOCUMENT_DELETE_SUCCESS,
  props<{
    payload: {
      data: BaseResponseModel;
    };
  }>()
);

//DOWNLOAD SITES DOCUMENT
const DOWNLOAD_DOCUMENT = '[SITES] download site document';
export const downloadSiteDocumentAction = createAction(
  DOWNLOAD_DOCUMENT,
  props<{ payload: RequestGetSiteDocumentWithContentModel & { fileName: string } }>()
);

const DOWNLOAD_DOCUMENT_SUCCESS = '[SITES] download site document success';
export const downloadSiteDocumentActionSuccess = createAction(DOWNLOAD_DOCUMENT_SUCCESS);
