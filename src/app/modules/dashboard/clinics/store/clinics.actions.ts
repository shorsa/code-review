import { createAction, props } from '@ngrx/store';
import { BaseResponseModel } from 'src/app/shared/models';
import {
  RequestActivateClinicModel,
  RequestCreateClinicModel,
  RequestDeactivateClinicModel,
  RequestGetClinicByIdModel,
  RequestGetClinicListModel,
  RequestUpdateClinicModel,
  ResponseCreateClinicModel,
  ResponseGetClinicByIdModel,
  ResponseGetClinicListModel,
} from '../models';

//CREATE CLINIC
const CLINIC_CREATE = '[CLINIC] clinic create';
export const clinicCreateAction = createAction(
  CLINIC_CREATE,
  props<{ payload: RequestCreateClinicModel }>()
);

const CLINIC_CREATE_SUCCESS = '[CLINIC] clinic create success';
export const clinicCreateSuccessAction = createAction(
  CLINIC_CREATE_SUCCESS,
  props<{ payload: ResponseCreateClinicModel }>()
);

//UPDATE CLINIC
const CLINIC_UPDATE = '[CLINIC] clinic update';
export const clinicUpdateAction = createAction(
  CLINIC_UPDATE,
  props<{ payload: RequestUpdateClinicModel }>()
);

const CLINIC_UPDATE_SUCCESS = '[CLINIC] clinic update success';
export const clinicUpdateSuccessAction = createAction(
  CLINIC_UPDATE_SUCCESS,
  props<{ payload: BaseResponseModel }>()
);

//GET CLINIC BY ID
const CLINIC_GET_BY_ID = '[CLINIC] clinic get by id';
export const clinicGetByIdAction = createAction(
  CLINIC_GET_BY_ID,
  props<{ payload: RequestGetClinicByIdModel }>()
);

const CLINIC_GET_BY_ID_SUCCESS = '[CLINIC] clinic get by id success';
export const clinicGetByIdSuccessAction = createAction(
  CLINIC_GET_BY_ID_SUCCESS,
  props<{ payload: ResponseGetClinicByIdModel }>()
);

//SEARCH CLINIC
// const CLINIC_SEARCH = '[CLINIC] search clinics';
// export const clinicsSearchAction = createAction(
//   CLINIC_SEARCH,
//   props<{ payload: RequestGetClinicListModel }>()
// );

const CLINIC_SEARCH_SUCCESS = '[CLINIC] search clinics success';
export const clinicsSearchSuccessAction = createAction(
  CLINIC_SEARCH_SUCCESS,
  props<{
    payload: ResponseGetClinicListModel;
  }>()
);

//ACTIVATE CLINIC
const CLINIC_ACTIVATE = '[CLINIC] activate clinic';
export const clinicActivateAction = createAction(
  CLINIC_ACTIVATE,
  props<{ payload: RequestActivateClinicModel }>()
);

const CLINIC_ACTIVATE_SUCCESS = '[CLINIC] activate clinic success';
export const clinicActivateSuccessAction = createAction(
  CLINIC_ACTIVATE_SUCCESS,
  props<{
    payload: BaseResponseModel;
  }>()
);

//DEACTIVATE CLINIC
const CLINIC_DEACTIVATE = '[CLINIC] deactivate clinic';
export const clinicDeactivateAction = createAction(
  CLINIC_DEACTIVATE,
  props<{ payload: RequestDeactivateClinicModel }>()
);

const CLINIC_DEACTIVATE_SUCCESS = '[CLINIC] deactivate clinic success';
export const clinicDeactivateSuccessAction = createAction(
  CLINIC_DEACTIVATE_SUCCESS,
  props<{
    payload: BaseResponseModel;
  }>()
);

//SEARCH PREFILLED FIELDS
const SEARCH_PREFILLED_FIELDS = '[CLINIC] deactivate clinic';
export const searchPrefilledFieldsAction = createAction(
  SEARCH_PREFILLED_FIELDS,
  props<{ payload: RequestDeactivateClinicModel }>()
);

export const searchPrefilledFieldsSuccessAction = createAction(
  `${SEARCH_PREFILLED_FIELDS} success`,
  props<{
    payload: BaseResponseModel;
  }>()
);

//LOCAL
const SET_SEARCH_PARAMS = '[CLINIC] set clinics search params';
export const setClinicsSearchParamsAction = createAction(
  SET_SEARCH_PARAMS,
  props<{ payload: RequestGetClinicListModel }>()
);

const CLINIC_CLEAR_DETAILS = '[CLINIC] clear clinic details';
export const clearClinicDetailsDataAction = createAction(CLINIC_CLEAR_DETAILS);

const CLINIC_CLEAR_SEARCH_PARAMS = '[CLINIC] clear clinic details';
export const clearClinicSearchParamsAction = createAction(CLINIC_CLEAR_SEARCH_PARAMS);
