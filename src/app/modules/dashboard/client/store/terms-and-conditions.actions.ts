import { createAction, props } from '@ngrx/store';
import {
  RequestCreateTermsAndConditionsModel,
  RequestDownloadClientTermsAndConditionsModel,
  RequestGetTermsAndConditionsModel,
  RequestUpdateTermsAndConditionsModel,
  ResponseCreateTermsAndConditionsModel,
  ResponseGetTermsAndConditionsModel,
  ResponseUpdateTermsAndConditionsModel,
} from '../models';

//CREATE CLIENT TERMS AND CONDITIONS
const CLIENT_TERMS_AND_CONDITIONS_CREATE = '[CLIENT] terms and conditions create';
export const clientTrmAndCondCreateAction = createAction(
  CLIENT_TERMS_AND_CONDITIONS_CREATE,
  props<{ payload: RequestCreateTermsAndConditionsModel }>()
);

const CLIENT_TERMS_AND_CONDITIONS_CREATE_SUCCESS =
  '[CLIENT] terms and conditions create success';
export const clientTrmAndCondCreateSuccessAction = createAction(
  CLIENT_TERMS_AND_CONDITIONS_CREATE_SUCCESS,
  props<{ payload: ResponseCreateTermsAndConditionsModel; clientId: string }>()
);

//UPDATE CLIENT TERMS AND CONDITIONS
const CLIENT_TERMS_AND_CONDITIONS_UPDATE = '[CLIENT] terms and conditions update';
export const clientTrmAndCondUpdateAction = createAction(
  CLIENT_TERMS_AND_CONDITIONS_UPDATE,
  props<{ payload: RequestUpdateTermsAndConditionsModel }>()
);

const CLIENT_TERMS_AND_CONDITIONS_UPDATE_SUCCESS =
  '[CLIENT] terms and conditions update success';
export const clientTrmAndCondUpdateSuccessAction = createAction(
  CLIENT_TERMS_AND_CONDITIONS_UPDATE_SUCCESS,
  props<{ payload: ResponseUpdateTermsAndConditionsModel }>()
);

//GET BY CLIENT ID TERMS AND CONDITIONS
const GET_BY_CLIENT_ID_UPDATE = '[CLIENT] terms and conditions get by id';
export const clientTrmAndCondGetByClientIdAction = createAction(
  GET_BY_CLIENT_ID_UPDATE,
  props<{ payload: RequestGetTermsAndConditionsModel }>()
);

const GET_BY_CLIENT_ID_SUCCESS = '[CLIENT] terms and conditions get by id success';
export const clientTrmAndCondGetByClientIdSuccessAction = createAction(
  GET_BY_CLIENT_ID_SUCCESS,
  props<{ payload: ResponseGetTermsAndConditionsModel }>()
);

//DOWNLOAD TERMS AND CONDITIONS
const DOWNLOAD_TERMS = '[CLIENT] download terms and conditions';
export const downloadClientTermsAndCondAction = createAction(
  DOWNLOAD_TERMS,
  props<{
    payload: RequestDownloadClientTermsAndConditionsModel & { fileName: string };
  }>()
);

const DOWNLOAD_TERMS_SUCCESS = '[CLIENT] download terms and conditions success';
export const downloadClientTermsAndCondSuccessAction =
  createAction(DOWNLOAD_TERMS_SUCCESS);
