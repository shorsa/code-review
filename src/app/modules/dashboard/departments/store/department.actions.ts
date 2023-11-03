import { createAction, props } from '@ngrx/store';
import {
  GetDepartmentOptionsResponseModel,
  RequestActionsDepartmentModel,
  RequestCreateDepartmentModel,
  RequestGetDepartmentByIdModel,
  RequestGetDepartmentListModel,
  RequestGetDepartmentOptionsByClientIdModel,
  RequestUpdateDepartmentModel,
  ResponseActionsDepartmentModel,
  ResponseCreateDepartmentModel,
  ResponseGetDepartmentByIdModel,
  ResponseGetDepartmentListModel,
  ResponseUpdateDepartmentModel,
} from '../models';
import {
  RequestGetPatientListModel,
  ResponseGetPatientListModel,
} from '../../patients/models/patients';

//CREATE
const DEPARTMENT_CREATE = '[DEPARTMENT] department create';
export const departmentCreateAction = createAction(
  DEPARTMENT_CREATE,
  props<{ payload: RequestCreateDepartmentModel }>()
);

const DEPARTMENT_CREATE_SUCCESS = '[DEPARTMENT] department create success';
export const departmentCreateSuccessAction = createAction(
  DEPARTMENT_CREATE_SUCCESS,
  props<{ payload: ResponseCreateDepartmentModel }>()
);

//UPDATE
const DEPARTMENT_UPDATE = '[DEPARTMENT] department update';
export const departmentUpdateAction = createAction(
  DEPARTMENT_UPDATE,
  props<{ payload: RequestUpdateDepartmentModel }>()
);

const DEPARTMENT_UPDATE_SUCCESS = '[DEPARTMENT] department update success';
export const departmentUpdateSuccessAction = createAction(
  DEPARTMENT_UPDATE_SUCCESS,
  props<{ payload: ResponseUpdateDepartmentModel }>()
);

//GET BY ID
const DEPARTMENT_GET_BY_ID = '[DEPARTMENT] department get by id';
export const departmentGetByIdAction = createAction(
  DEPARTMENT_GET_BY_ID,
  props<{ payload: RequestGetDepartmentByIdModel }>()
);

const DEPARTMENT_GET_BY_ID_SUCCESS = '[DEPARTMENT] department get by id success';
export const departmentGetByIdSuccessAction = createAction(
  DEPARTMENT_GET_BY_ID_SUCCESS,
  props<{ payload: ResponseGetDepartmentByIdModel }>()
);

// //SEARCH
// const DEPARTMENT_SEARCH = '[DEPARTMENT] search departments';
// export const departmentsSearchAction = createAction(
//   DEPARTMENT_SEARCH,
//   props<{ payload: RequestGetDepartmentListModel }>()
// );

const DEPARTMENT_SEARCH_SUCCESS = '[DEPARTMENT] search departments success';
export const departmentsSearchSuccessAction = createAction(
  DEPARTMENT_SEARCH_SUCCESS,
  props<{ payload: ResponseGetDepartmentListModel }>()
);

//ACTIVATE DEPARTMENT
const DEPARTMENT_ACTIVATE = '[DEPARTMENT] activate department';
export const departmentActivateAction = createAction(
  DEPARTMENT_ACTIVATE,
  props<{ payload: RequestActionsDepartmentModel }>()
);

const DEPARTMENT_ACTIVATE_SUCCESS = '[DEPARTMENT] activate department success';
export const departmentActivateSuccessAction = createAction(
  DEPARTMENT_ACTIVATE_SUCCESS,
  props<{
    payload: ResponseActionsDepartmentModel;
  }>()
);

//DEACTIVATE DEPARTMENT
const DEPARTMENT_DEACTIVATE = '[DEPARTMENT] deactivate department';
export const departmentDeactivateAction = createAction(
  DEPARTMENT_DEACTIVATE,
  props<{ payload: RequestActionsDepartmentModel }>()
);

const DEPARTMENT_DEACTIVATE_SUCCESS = '[DEPARTMENT] deactivate department success';
export const departmentDeactivateSuccessAction = createAction(
  DEPARTMENT_DEACTIVATE_SUCCESS,
  props<{
    payload: ResponseActionsDepartmentModel;
  }>()
);

//DEPARTMENT OPTIONS
const DEPARTMENT_OPTIONS = '[DEPARTMENT] get options department list';
export const getDepartmentOptionsAction = createAction(
  DEPARTMENT_OPTIONS,
  props<{ payload: RequestGetDepartmentOptionsByClientIdModel }>()
);

const DEPARTMENT_OPTIONS_SUCCESS = '[DEPARTMENT] get options department list success';
export const getDepartmentOptionsSuccessAction = createAction(
  DEPARTMENT_OPTIONS_SUCCESS,
  props<{
    payload: GetDepartmentOptionsResponseModel;
  }>()
);

//GET PATIENTS BY DEPARTMENT ID
const GET_PATIENTS = '[DEPARTMENT] get patients list by department id';
export const getPatientsByDepartmentIdAction = createAction(
  GET_PATIENTS,
  props<{ payload: RequestGetPatientListModel }>()
);

const GET_PATIENTS_SUCCESS = '[DEPARTMENT] get patients list by department id success';
export const getPatientsByDepartmentIdSuccessAction = createAction(
  GET_PATIENTS_SUCCESS,
  props<{
    payload: ResponseGetPatientListModel;
  }>()
);

const SET_SEARCH_PARAMS = '[CLIENT] set department search params';
export const setDepartmentSearchParamsAction = createAction(
  SET_SEARCH_PARAMS,
  props<{ payload: RequestGetDepartmentListModel }>()
);

const DEPARTMENT_CLEAR_DETAILS = '[DEPARTMENT] clear department details';
export const clearDepartmentDetailsDataAction = createAction(DEPARTMENT_CLEAR_DETAILS);

const DEPARTMENT_CLEAR_SEARCH_PARAMS = '[DEPARTMENT] clear search params department';
export const clearDepartmentSearchParamsAction = createAction(
  DEPARTMENT_CLEAR_SEARCH_PARAMS
);
