import { createAction, props } from '@ngrx/store';
import {
  RequestActionsClientModel,
  RequestCreateClientUserModel,
  RequestGetClientUsersListModel,
  RequestUpdateClientUserModel,
  ResponseActionsClientModel,
  ResponseGetClientUserByIdModel,
  ResponseGetClientUserListModel,
} from '../models';
import { BaseResponseModel } from 'src/app/shared/models';

//CREATE CLIENT USER
const CLIENT_USERS_CREATE = '[CLIENT] client user create';
export const clientUsersCreateAction = createAction(
  CLIENT_USERS_CREATE,
  props<{ payload: RequestCreateClientUserModel }>()
);

const CLIENT_USERS_CREATE_SUCCESS = '[CLIENT] client user create success';
export const clientUserCreateSuccessAction = createAction(
  CLIENT_USERS_CREATE_SUCCESS,
  props<{ payload: ResponseActionsClientModel }>()
);

//UPDATE CLIENT USER
const CLIENT_USERS_UPDATE = '[CLIENT] client users update';
export const clientUserUpdateAction = createAction(
  CLIENT_USERS_UPDATE,
  props<{ payload: RequestUpdateClientUserModel }>()
);

const CLIENT_USERS_UPDATE_SUCCESS = '[CLIENT] client users update success';
export const clientUserUpdateSuccessAction = createAction(
  CLIENT_USERS_UPDATE_SUCCESS,
  props<{ payload: ResponseActionsClientModel }>()
);

//GET CLIENT USER BY ID
const CLIENT_USERS_GET_BY_ID = '[CLIENT] client user get by id';
export const clientUserGetByIdAction = createAction(
  CLIENT_USERS_GET_BY_ID,
  props<{ payload: RequestActionsClientModel }>()
);

const CLIENT_USERS_GET_BY_ID_SUCCESS = '[CLIENT] client user get by id success';
export const clientUserGetByIdSuccessAction = createAction(
  CLIENT_USERS_GET_BY_ID_SUCCESS,
  props<{ payload: ResponseGetClientUserByIdModel }>()
);

//SEARCH CLIENT USERS
// const CLIENT_USERS_SEARCH = '[CLIENT] search client users';
// export const clientUsersSearchAction = createAction(
//   CLIENT_USERS_SEARCH,
//   props<{ payload: RequestGetClientUsersListModel }>()
// );

const CLIENT_USERS_SEARCH_SUCCESS = '[CLIENT] search client users success';
export const clientUsersSearchSuccessAction = createAction(
  CLIENT_USERS_SEARCH_SUCCESS,
  props<{
    payload: ResponseGetClientUserListModel;
  }>()
);

//ACTIVATE CLIENT USER
const CLIENT_USERS_ACTIVATE = '[CLIENT] activate client user';
export const clientUsersActivateAction = createAction(
  CLIENT_USERS_ACTIVATE,
  props<{ payload: RequestActionsClientModel }>()
);

const CLIENT_USERS_ACTIVATE_SUCCESS = '[CLIENT] activate client user success';
export const clientUserActivateSuccessAction = createAction(
  CLIENT_USERS_ACTIVATE_SUCCESS,
  props<{
    payload: ResponseActionsClientModel;
  }>()
);

//DEACTIVATE CLIENT USER
const CLIENT_USERS_DEACTIVATE = '[CLIENT] deactivate client user';
export const clientUserDeactivateAction = createAction(
  CLIENT_USERS_DEACTIVATE,
  props<{ payload: RequestActionsClientModel }>()
);

const CLIENT_USERS_DEACTIVATE_SUCCESS = '[CLIENT] deactivate client user success';
export const clientUserDeactivateSuccessAction = createAction(
  CLIENT_USERS_DEACTIVATE_SUCCESS,
  props<{
    payload: ResponseActionsClientModel;
  }>()
);

//UNLOCK CLIENT USER
const CLIENT_USERS_UNLOCK = '[CLIENT] unlock client user';
export const clientUserUnlockAction = createAction(
  CLIENT_USERS_UNLOCK,
  props<{ payload: RequestActionsClientModel }>()
);

const CLIENT_USERS_UNLOCK_SUCCESS = '[CLIENT] unlock client user success';
export const clientUserUnlockSuccessAction = createAction(
  CLIENT_USERS_UNLOCK_SUCCESS,
  props<{
    payload: BaseResponseModel;
  }>()
);

//LOCAL
const SET_SEARCH_PARAMS = '[CLIENT] set client users search params';
export const setClientUsersSearchParamsAction = createAction(
  SET_SEARCH_PARAMS,
  props<{ payload: RequestGetClientUsersListModel }>()
);

const CLIENT_CLEAR_DETAILS = '[CLIENT] clear client user details';
export const clearClientUserDetailsDataAction = createAction(CLIENT_CLEAR_DETAILS);

const CLIENT_CLEAR_SEARCH_PARAMS = '[CLIENT] clear client user search params';
export const clearClientUserSearchParamsAction = createAction(CLIENT_CLEAR_SEARCH_PARAMS);
