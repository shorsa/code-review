import { createAction, props } from '@ngrx/store';
import { BaseResponseModel } from 'src/app/shared/models';
import {
  RequestCreateRoomModel,
  RequestUpdateRoomModel,
  RequestGetRoomByIdModel,
  ResponseGetRoomModel,
  RequestGetRoomListModel,
  ResponseGetRoomListModel,
  RequestActivateRoomModel,
  RequestDeactivateRoomModel,
} from '../models';

//CREATE ROOMS
const ROOMS_CREATE = '[ROOMS] room create';
export const roomCreateAction = createAction(
  ROOMS_CREATE,
  props<{ payload: RequestCreateRoomModel; searchParams: RequestGetRoomListModel }>()
);

const ROOMS_CREATE_SUCCESS = '[ROOMS] room create success';
export const roomCreateSuccessAction = createAction(
  ROOMS_CREATE_SUCCESS,
  props<{ payload: BaseResponseModel; searchParams: RequestGetRoomListModel }>()
);

//UPDATE ROOMS
const ROOMS_UPDATE = '[ROOMS] room update';
export const roomUpdateAction = createAction(
  ROOMS_UPDATE,
  props<{ payload: RequestUpdateRoomModel; searchParams: RequestGetRoomListModel }>()
);

const ROOMS_UPDATE_SUCCESS = '[ROOMS] room update success';
export const roomUpdateSuccessAction = createAction(
  ROOMS_UPDATE_SUCCESS,
  props<{ payload: BaseResponseModel; searchParams: RequestGetRoomListModel }>()
);

//GET ROOMS BY ID
const ROOMS_GET_BY_ID = '[ROOMS] room get by id';
export const roomGetByIdAction = createAction(
  ROOMS_GET_BY_ID,
  props<{ payload: RequestGetRoomByIdModel }>()
);

const ROOMS_GET_BY_ID_SUCCESS = '[ROOMS] room get by id success';
export const roomGetByIdSuccessAction = createAction(
  ROOMS_GET_BY_ID_SUCCESS,
  props<{ payload: ResponseGetRoomModel }>()
);

//SEARCH ROOMS
const ROOMS_SEARCH = '[ROOMS] search rooms';
export const roomsSearchAction = createAction(
  ROOMS_SEARCH,
  props<{ payload: RequestGetRoomListModel }>()
);

const ROOMS_SEARCH_SUCCESS = '[ROOMS] search rooms success';
export const roomsSearchSuccessAction = createAction(
  ROOMS_SEARCH_SUCCESS,
  props<{
    payload: ResponseGetRoomListModel;
  }>()
);

//ACTIVATE ROOMS
const ROOMS_ACTIVATE = '[ROOMS] activate room';
export const roomActivateAction = createAction(
  ROOMS_ACTIVATE,
  props<{ payload: RequestActivateRoomModel; searchParams: RequestGetRoomListModel }>()
);

const ROOMS_ACTIVATE_SUCCESS = '[ROOMS] activate room success';
export const roomActivateSuccessAction = createAction(
  ROOMS_ACTIVATE_SUCCESS,
  props<{
    payload: BaseResponseModel;
    searchParams: RequestGetRoomListModel;
  }>()
);

//DEACTIVATE ROOMS
const ROOMS_DEACTIVATE = '[ROOMS] deactivate room';
export const roomDeactivateAction = createAction(
  ROOMS_DEACTIVATE,
  props<{ payload: RequestDeactivateRoomModel; searchParams: RequestGetRoomListModel }>()
);

const ROOMS_DEACTIVATE_SUCCESS = '[ROOMS] deactivate room success';
export const roomDeactivateSuccessAction = createAction(
  ROOMS_DEACTIVATE_SUCCESS,
  props<{
    payload: BaseResponseModel;
    searchParams: RequestGetRoomListModel;
  }>()
);

//LOCAL
const ROOMS_CLEAR_DETAILS = '[ROOMS] clear room details';
export const clearRoomDetailsDataAction = createAction(ROOMS_CLEAR_DETAILS);
