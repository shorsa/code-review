import { createAction, props } from '@ngrx/store';
import { BaseResponseModel } from 'src/app/shared/models';
import {
  RequestGetClientOptionsModel,
  ResponseGetClientOptionsModelItem,
} from '../../client/models';
import {
  GetDepartmentOptionsResponseModel,
  RequestGetDepartmentOptionsByClientIdModel,
} from '../../departments/models';
import {
  RequestActivatePatientModel,
  RequestCancelPreDeleteModel,
  RequestChangeDeletionDateModel,
  RequestCreatePatientModel,
  RequestDeactivatePatientModel,
  RequestGetPatientByIdModel,
  RequestGetPatientListModel,
  RequestGetPreDeleteListModel,
  RequestMergePatientsModel,
  RequestTransferPatientsToDepartmentModel,
  RequestUnlockPatientModel,
  RequestUpdatePatientModal,
  ResponseCreatePatientModel,
  ResponseGetPatientByIdModel,
  ResponseGetPatientListModel,
  ResponseGetPatientPreDeleteListModel,
  ResponseUpdatePatientModel,
} from '../models/patients';

//CREATE PATIENT
const PATIENT_CREATE = '[PATIENT] patient create';
export const patientCreateAction = createAction(
  PATIENT_CREATE,
  props<{ payload: RequestCreatePatientModel }>()
);

export const patientCreateSuccessAction = createAction(`${PATIENT_CREATE} success`);

//UPDATE PATIENT
const PATIENT_UPDATE = '[PATIENT] patient update';
export const patientUpdateAction = createAction(
  PATIENT_UPDATE,
  props<{ payload: RequestUpdatePatientModal }>()
);

export const patientUpdateSuccessAction = createAction(`${PATIENT_UPDATE} success`);

//GET PATIENT BY ID
const PATIENT_GET_BY_ID = '[PATIENT] patient get by id';
export const patientGetByIdAction = createAction(
  PATIENT_GET_BY_ID,
  props<{ payload: RequestGetPatientByIdModel }>()
);

export const patientGetByIdSuccessAction = createAction(
  `${PATIENT_GET_BY_ID} success`,
  props<{ payload: ResponseGetPatientByIdModel }>()
);

//SEARCH PATIENT
const PATIENT_SEARCH = '[PATIENT] search patients';
export const patientsSearchAction = createAction(
  PATIENT_SEARCH,
  props<{ payload: RequestGetPatientListModel }>()
);

export const patientsSearchSuccessAction = createAction(
  `${PATIENT_SEARCH} success`,
  props<{
    payload: ResponseGetPatientListModel;
  }>()
);

//SEARCH PATIENT FOR MERGE
const PATIENT_SEARCH_FOR_MERGE = '[PATIENT] search patients for merge';
export const patientsSearchForMergeAction = createAction(
  PATIENT_SEARCH_FOR_MERGE,
  props<{ payload: RequestGetPatientListModel }>()
);

export const patientsSearchForMergeSuccessAction = createAction(
  `${PATIENT_SEARCH_FOR_MERGE} success`,
  props<{
    payload: ResponseGetPatientListModel;
  }>()
);

//ACTIVATE PATIENT
const PATIENT_ACTIVATE = '[PATIENT] activate patient';
export const patientActivateAction = createAction(
  PATIENT_ACTIVATE,
  props<{ payload: RequestActivatePatientModel }>()
);

export const patientActivateSuccessAction = createAction(`${PATIENT_ACTIVATE} success`);

//DEACTIVATE PATIENT
const PATIENT_DEACTIVATE = '[PATIENT] deactivate patient';
export const patientDeactivateAction = createAction(
  PATIENT_DEACTIVATE,
  props<{ payload: RequestDeactivatePatientModel }>()
);

export const patientDeactivateSuccessAction = createAction(
  `${PATIENT_DEACTIVATE} success`
);

//UNLOCK PATIENT
const PATIENT_USERS_UNLOCK = '[PATIENT] unlock patient';
export const patientUnlockAction = createAction(
  PATIENT_USERS_UNLOCK,
  props<{ payload: RequestUnlockPatientModel }>()
);

export const patientUnlockSuccessAction = createAction(`${PATIENT_USERS_UNLOCK} success`);

//TRANSFER TO DEPARTMENT
const TRANSFER_TO_DEPARTMENT = '[PATIENT] transfer patient to department';
export const transferToDepartmentAction = createAction(
  TRANSFER_TO_DEPARTMENT,
  props<{ payload: RequestTransferPatientsToDepartmentModel }>()
);

export const transferToDepartmentSuccessAction = createAction(
  `${TRANSFER_TO_DEPARTMENT} success`
);

//PATIENTS MERGE
const PATIENTS_MERGE = '[PATIENT] merge patient';
export const patientsToMergeAction = createAction(
  PATIENTS_MERGE,
  props<{ payload: RequestMergePatientsModel }>()
);

export const patientsToMergeSuccessAction = createAction(`${PATIENTS_MERGE} success`);

//DEPARTMENT OPTIONS
const DEPARTMENT_OPTIONS = '[PATIENT] get options department list';
export const getDepartmentOptionsAction = createAction(
  DEPARTMENT_OPTIONS,
  props<{ payload: RequestGetDepartmentOptionsByClientIdModel }>()
);

export const getDepartmentOptionsSuccessAction = createAction(
  `${DEPARTMENT_OPTIONS} success`,
  props<{
    payload: GetDepartmentOptionsResponseModel;
  }>()
);

const DEPARTMENT_OPTIONS_CLEAR_SUCCESS =
  '[PATIENT] get options department list clear success';
export const clearDepartmentOptionsSuccessAction = createAction(
  DEPARTMENT_OPTIONS_CLEAR_SUCCESS
);

//CLIENT OPTIONS
const CLIENT_OPTIONS = '[PATIENT] get options client list';
export const getClientOptionsAction = createAction(
  CLIENT_OPTIONS,
  props<{
    payload: RequestGetClientOptionsModel;
  }>()
);

export const getClientOptionsSuccessAction = createAction(
  `${CLIENT_OPTIONS} success`,
  props<{
    payload: ResponseGetClientOptionsModelItem[];
  }>()
);

//LOCAL
const SET_SEARCH_PARAMS = '[PATIENT] set patients search params';
export const setPatientsSearchParamsAction = createAction(
  SET_SEARCH_PARAMS,
  props<{ payload: RequestGetPatientListModel }>()
);

const PATIENT_CLEAR_DETAILS = '[PATIENT] clear patient details';
export const clearPatientDetailsDataAction = createAction(PATIENT_CLEAR_DETAILS);

const PATIENT_CLEAR_SEARCH_PARAMS = '[PATIENT] clear patient details';
export const clearPatientSearchParamsAction = createAction(PATIENT_CLEAR_SEARCH_PARAMS);

//PRE DELETE PATIENTS
const PRE_DELETE_PATIENT_SEARCH = '[PATIENT] pre delete search patients';
export const preDeletePatientsSearchAction = createAction(
  PRE_DELETE_PATIENT_SEARCH,
  props<{ payload: RequestGetPreDeleteListModel }>()
);

export const preDeletePatientsSearchSuccessAction = createAction(
  `${SET_SEARCH_PARAMS} success`,
  props<{
    payload: ResponseGetPatientPreDeleteListModel;
  }>()
);

//PRE DELETE CHANGE DELETION DATE
const CHANGE_PRE_DELETE_DATE = '[PATIENT] change pre delete patient';
export const changePreDeleteDateAction = createAction(
  CHANGE_PRE_DELETE_DATE,
  props<{ payload: RequestChangeDeletionDateModel }>()
);

export const changePreDeleteDateSuccessAction = createAction(
  `${CHANGE_PRE_DELETE_DATE} success`
);

//CANCEL PRE DELETE
const CANCEL_PRE_DELETE = '[PATIENT] cancel pre delete patient';
export const cancelPreDeleteAction = createAction(
  CANCEL_PRE_DELETE,
  props<{ payload: RequestCancelPreDeleteModel }>()
);

export const cancelPreDeleteSuccessAction = createAction(`${CANCEL_PRE_DELETE} success`);

//DELETE PRE DELETE
const DELETE_PRE_DELETE = '[PATIENT] delete pre delete patient';
export const deletePreDeleteAction = createAction(
  DELETE_PRE_DELETE,
  props<{ payload: RequestCancelPreDeleteModel }>()
);

export const deletePreDeleteSuccessAction = createAction(`${DELETE_PRE_DELETE} success`);

//DELETE PATIENT JOB DOCUMENT
const DELETE_PATIENT_JOB_DOCUMENT = '[PATIENT] delete patient job document';
export const deletePatientJobDocumentAction = createAction(
  DELETE_PATIENT_JOB_DOCUMENT,
  props<{ payload: RequestCancelPreDeleteModel; patientId: string }>()
);

export const deletePatientJobDocumentSuccessAction = createAction(
  `${DELETE_PATIENT_JOB_DOCUMENT} success`
);
