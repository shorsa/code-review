import { createAction, props } from '@ngrx/store';
import { BaseResponseModel } from 'src/app/shared/models';
import {
  RequestCreateLocationModel,
  RequestUpdateLocationModel,
  RequestGetLocationByIdModel,
  ResponseGetLocationModel,
  RequestGetLocationListModel,
  ResponseGetLocationListModel,
  RequestActivateLocationModel,
  RequestDeactivateLocationModel,
  RequestCheckLocationForDeactivationModel,
  ResponseCheckLocationEntityForDeactivationModel,
} from '../models';

//CREATE LOCATION
const LOCATION_CREATE = '[LOCATION] location create';
export const locationCreateAction = createAction(
  LOCATION_CREATE,
  props<{ payload: RequestCreateLocationModel,  searchParams: RequestGetLocationListModel; }>()
);

const LOCATION_CREATE_SUCCESS = '[LOCATION] location create success';
export const locationCreateSuccessAction = createAction(
  LOCATION_CREATE_SUCCESS,
  props<{ payload: BaseResponseModel,searchParams: RequestGetLocationListModel; }>()
);

//UPDATE LOCATION
const LOCATION_UPDATE = '[LOCATION] location update';
export const locationUpdateAction = createAction(
  LOCATION_UPDATE,
  props<{ payload: RequestUpdateLocationModel,searchParams: RequestGetLocationListModel; }>()
);

const LOCATION_UPDATE_SUCCESS = '[LOCATION] location update success';
export const locationUpdateSuccessAction = createAction(
  LOCATION_UPDATE_SUCCESS,
  props<{ payload: BaseResponseModel,searchParams: RequestGetLocationListModel; }>()
);

//GET LOCATION BY ID
const LOCATION_GET_BY_ID = '[LOCATION] location get by id';
export const locationGetByIdAction = createAction(
  LOCATION_GET_BY_ID,
  props<{ payload: RequestGetLocationByIdModel }>()
);

const LOCATION_GET_BY_ID_SUCCESS = '[LOCATION] location get by id success';
export const locationGetByIdSuccessAction = createAction(
  LOCATION_GET_BY_ID_SUCCESS,
  props<{ payload: ResponseGetLocationModel }>()
);

//SEARCH LOCATION
const LOCATION_SEARCH = '[LOCATION] search locations';
export const locationsSearchAction = createAction(
  LOCATION_SEARCH,
  props<{ payload: RequestGetLocationListModel }>()
);

const LOCATION_SEARCH_SUCCESS = '[LOCATION] search locations success';
export const locationsSearchSuccessAction = createAction(
  LOCATION_SEARCH_SUCCESS,
  props<{
    payload: ResponseGetLocationListModel;
  }>()
);

//ACTIVATE LOCATION
const LOCATION_ACTIVATE = '[LOCATION] activate location';
export const locationActivateAction = createAction(
  LOCATION_ACTIVATE,
  props<{
    payload: RequestActivateLocationModel;
    searchParams: RequestGetLocationListModel;
  }>()
);

const LOCATION_ACTIVATE_SUCCESS = '[LOCATION] activate location success';
export const locationActivateSuccessAction = createAction(
  LOCATION_ACTIVATE_SUCCESS,
  props<{
    payload: BaseResponseModel;
    searchParams: RequestGetLocationListModel;
  }>()
);

//DEACTIVATE LOCATION
const LOCATION_DEACTIVATE = '[LOCATION] deactivate location';
export const locationDeactivateAction = createAction(
  LOCATION_DEACTIVATE,
  props<{
    payload: RequestDeactivateLocationModel;
    searchParams: RequestGetLocationListModel;
  }>()
);

const LOCATION_DEACTIVATE_SUCCESS = '[LOCATION] deactivate location success';
export const locationDeactivateSuccessAction = createAction(
  LOCATION_DEACTIVATE_SUCCESS,
  props<{
    payload: BaseResponseModel;
    searchParams: RequestGetLocationListModel;
  }>()
);

// //CHECK ACTIVE APPOINTMENTS
// const LOCATION_CHECK_APPOINTMENTS = '[LOCATION] check appointments';
// export const checkAction = createAction(
//   LOCATION_CHECK_APPOINTMENTS,
//   props<{ payload: RequestCheckLocationForDeactivationModel }>()
// );

// const LOCATION_CHECK_APPOINTMENTS_SUCCESS = '[LOCATION] check appointments success';
// export const checkSuccessAction = createAction(
//   LOCATION_CHECK_APPOINTMENTS_SUCCESS,
//   props<{
//     payload: ResponseCheckLocationEntityForDeactivationModel;
//   }>()
// );

//LOCAL
const LOCATION_CLEAR_DETAILS = '[LOCATION] clear location details';
export const clearLocationDetailsDataAction = createAction(LOCATION_CLEAR_DETAILS);
