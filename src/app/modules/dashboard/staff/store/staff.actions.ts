import { createAction, props } from '@ngrx/store';
import {
  RequestActivateStaffUserModel,
  RequestCreateStuffUserModel,
  RequestDeactivateStaffUserModel,
  RequestGetStaffUserByIdModel,
  RequestGetStaffUserListModel,
  RequestUpdateStaffUserModel,
  ResponseCreateStaffUserModel,
  ResponseGetStaffUserByIdModel,
  ResponseGetStaffUserListModel,
  ResponseUpdateStaffUserModel,
} from '../models';
import { BaseResponseModel } from 'src/app/shared/models';

//CREATE
const STAFF_CREATE = '[STAFF] staff create';
export const staffCreateAction = createAction(
  STAFF_CREATE,
  props<{ payload: RequestCreateStuffUserModel }>()
);

const STAFF_CREATE_SUCCESS = '[STAFF] staff create success';
export const staffCreateSuccessAction = createAction(
  STAFF_CREATE_SUCCESS,
  props<{ payload: ResponseCreateStaffUserModel }>()
);

//UPDATE
const STAFF_UPDATE = '[STAFF] staff update';
export const staffUpdateAction = createAction(
  STAFF_UPDATE,
  props<{ payload: RequestUpdateStaffUserModel }>()
);

const STAFF_UPDATE_SUCCESS = '[STAFF] staff update success';
export const staffUpdateSuccessAction = createAction(
  STAFF_UPDATE_SUCCESS,
  props<{ payload: ResponseUpdateStaffUserModel }>()
);

//GET BY ID
const STAFF_GET_BY_ID = '[STAFF] staff get by id';
export const staffGetByIdAction = createAction(
  STAFF_GET_BY_ID,
  props<{ payload: RequestGetStaffUserByIdModel }>()
);

const STAFF_GET_BY_ID_SUCCESS = '[STAFF] staff get by id success';
export const staffGetByIdSuccessAction = createAction(
  STAFF_GET_BY_ID_SUCCESS,
  props<{ payload: ResponseGetStaffUserByIdModel }>()
);

//SEARCH
// const STAFF_SEARCH = '[STAFF] search staffs';
// export const staffsSearchAction = createAction(
//   STAFF_SEARCH,
//   props<{ payload: RequestGetStaffUserListModel }>()
// );

const STAFF_SEARCH_SUCCESS = '[STAFF] search staffs success';
export const staffsSearchSuccessAction = createAction(
  STAFF_SEARCH_SUCCESS,
  props<{ payload: ResponseGetStaffUserListModel }>()
);

//ACTIVATE STAFF
const STAFF_ACTIVATE = '[STAFF] activate staff';
export const staffActivateAction = createAction(
  STAFF_ACTIVATE,
  props<{ payload: RequestActivateStaffUserModel }>()
);

const STAFF_ACTIVATE_SUCCESS = '[STAFF] activate staff success';
export const staffActivateSuccessAction = createAction(
  STAFF_ACTIVATE_SUCCESS,
  props<{
    payload: BaseResponseModel;
  }>()
);

//DEACTIVATE STAFF
const STAFF_DEACTIVATE = '[STAFF] deactivate staff';
export const staffDeactivateAction = createAction(
  STAFF_DEACTIVATE,
  props<{ payload: RequestDeactivateStaffUserModel }>()
);

const STAFF_DEACTIVATE_SUCCESS = '[STAFF] deactivate staff success';
export const staffDeactivateSuccessAction = createAction(
  STAFF_DEACTIVATE_SUCCESS,
  props<{
    payload: BaseResponseModel;
  }>()
);

//UNLOCK STAFF
const STAFF_UNLOCK = '[STAFF] unlock staff';
export const staffUnlockAction = createAction(
  STAFF_UNLOCK,
  props<{ payload: RequestActivateStaffUserModel }>()
);

const STAFF_UNLOCK_SUCCESS = '[STAFF] unlock staff success';
export const staffUnlockSuccessAction = createAction(
  STAFF_UNLOCK_SUCCESS,
  props<{
    payload: BaseResponseModel;
  }>()
);

const SET_SEARCH_PARAMS = '[STAFF] set staff search params';
export const setStaffSearchParamsAction = createAction(
  SET_SEARCH_PARAMS,
  props<{ payload: any }>()
);

const STAFF_CLEAR_DETAILS = '[STAFF] clear staff details';
export const clearStaffDetailsDataAction = createAction(STAFF_CLEAR_DETAILS);

const STAFF_CLEAR_SEARCH_PARAMS = '[STAFF] clear search params staff';
export const clearStaffSearchParamsAction = createAction(STAFF_CLEAR_SEARCH_PARAMS);
