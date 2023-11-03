import { createAction, props } from '@ngrx/store';
import {
  RequestGetRoleByEnumModel,
  RequestUpdateRoleClaimsModel,
  ResponseGetPermissionsListModel,
  ResponseGetRoleByEnumModel,
} from '../models';
import { BaseResponseModel } from 'src/app/shared/models';

//GET BY ENUM
const PERMISSIONS_GET_BY_ENUM = '[PERMISSIONS] get permissions list by enum ';
export const getPermissionsByEnumAction = createAction(
  PERMISSIONS_GET_BY_ENUM,
  props<{ payload: RequestGetRoleByEnumModel }>()
);

const PERMISSIONS_GET_BY_ENUM_SUCCESS =
  '[PERMISSIONS] get permissions list by enum success';
export const getPermissionsByEnumSuccessAction = createAction(
  PERMISSIONS_GET_BY_ENUM_SUCCESS,
  props<{ payload: ResponseGetRoleByEnumModel }>()
);

//GET LIST
const PERMISSIONS_LIST = '[PERMISSIONS] get permissions list ';
export const getListAction = createAction(PERMISSIONS_LIST);

const PERMISSIONS_LIST_SUCCESS = '[PERMISSIONS] get permissions list  success';
export const getListSuccessAction = createAction(
  PERMISSIONS_LIST_SUCCESS,
  props<{ payload: ResponseGetPermissionsListModel }>()
);

//UPDATE PERMISSION
const PERMISSIONS_UPDATE = '[PERMISSIONS] update permission ';
export const updatePermissionAction = createAction(
  PERMISSIONS_UPDATE,
  props<{ payload: RequestUpdateRoleClaimsModel }>()
);

const PERMISSIONS_UPDATE_SUCCESS = '[PERMISSIONS] update permission  success';
export const updatePermissionSuccessAction = createAction(
  PERMISSIONS_UPDATE_SUCCESS,
  props<{ payload: BaseResponseModel }>()
);
