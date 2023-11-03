import { createAction, props } from '@ngrx/store';
import {
  RequestActionsClientModel,
  RequestCreateClientModel,
  RequestGetClientByIdModel,
  RequestGetClientListModel,
  RequestUpdateClientModel,
  ResponseActionsClientModel,
  ResponseCreateClientModel,
  ResponseGetClientByIdModel,
  ResponseGetClientListModel,
  ResponseUpdateClientModel,
} from '../models';

//CREATE CLIENT
const CLIENT_CREATE = '[CLIENT] client create';
export const clientCreateAction = createAction(
  CLIENT_CREATE,
  props<{ payload: RequestCreateClientModel }>()
);

const CLIENT_CREATE_SUCCESS = '[CLIENT] client create success';
export const clientCreateSuccessAction = createAction(
  CLIENT_CREATE_SUCCESS,
  props<{ payload: ResponseCreateClientModel }>()
);

//UPDATE CLIENT
const CLIENT_UPDATE = '[CLIENT] client update';
export const clientUpdateAction = createAction(
  CLIENT_UPDATE,
  props<{ payload: RequestUpdateClientModel }>()
);

const CLIENT_UPDATE_SUCCESS = '[CLIENT] client update success';
export const clientUpdateSuccessAction = createAction(
  CLIENT_UPDATE_SUCCESS,
  props<{ payload: ResponseUpdateClientModel }>()
);

//GET CLIENT BY ID
const CLIENT_GET_BY_ID = '[CLIENT] client get by id';
export const clientGetByIdAction = createAction(
  CLIENT_GET_BY_ID,
  props<{ payload: RequestGetClientByIdModel }>()
);

const CLIENT_GET_BY_ID_SUCCESS = '[CLIENT] client get by id success';
export const clientGetByIdSuccessAction = createAction(
  CLIENT_GET_BY_ID_SUCCESS,
  props<{ payload: ResponseGetClientByIdModel }>()
);

//SEARCH CLIENT
// const CLIENT_SEARCH = '[CLIENT] search clients';
// export const clientsSearchAction = createAction(
//   CLIENT_SEARCH,
//   props<{ payload: RequestGetClientListModel }>()
// );

const CLIENT_SEARCH_SUCCESS = '[CLIENT] search clients success';
export const clientsSearchSuccessAction = createAction(
  CLIENT_SEARCH_SUCCESS,
  props<{
    payload: ResponseGetClientListModel;
  }>()
);

//ACTIVATE CLIENT
const CLIENT_ACTIVATE = '[CLIENT] activate client';
export const clientActivateAction = createAction(
  CLIENT_ACTIVATE,
  props<{ payload: RequestActionsClientModel }>()
);

const CLIENT_ACTIVATE_SUCCESS = '[CLIENT] activate client success';
export const clientActivateSuccessAction = createAction(
  CLIENT_ACTIVATE_SUCCESS,
  props<{
    payload: ResponseActionsClientModel;
  }>()
);

//DEACTIVATE CLIENT
const CLIENT_DEACTIVATE = '[CLIENT] deactivate client';
export const clientDeactivateAction = createAction(
  CLIENT_DEACTIVATE,
  props<{ payload: RequestActionsClientModel }>()
);

const CLIENT_DEACTIVATE_SUCCESS = '[CLIENT] deactivate client success';
export const clientDeactivateSuccessAction = createAction(
  CLIENT_DEACTIVATE_SUCCESS,
  props<{
    payload: ResponseActionsClientModel;
  }>()
);

//LOCAL
const SET_SEARCH_PARAMS = '[CLIENT] set clients search params';
export const setClientsSearchParamsAction = createAction(
  SET_SEARCH_PARAMS,
  props<{ payload: RequestGetClientListModel }>()
);

const CLIENT_CLEAR_DETAILS = '[CLIENT] clear client details';
export const clearClientDetailsDataAction = createAction(CLIENT_CLEAR_DETAILS);

const CLIENT_CLEAR_SEARCH_PARAMS = '[CLIENT] clear client details';
export const clearClientSearchParamsAction = createAction(CLIENT_CLEAR_SEARCH_PARAMS);
