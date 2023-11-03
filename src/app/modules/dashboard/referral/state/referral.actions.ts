import { createAction, props } from '@ngrx/store';
import { BaseResponseModel, SelectOptionModel } from 'src/app/shared/models';
import { RequestGetClientOptionsModel } from '../../client/models';
import {
  RequestGetDepartmentOptionsByClientIdModel,
  ResponseGetDepartmentOptionsModelIdem,
} from '../../departments/models';
import {
  RequestGetPatientListModel,
  ResponseGetAuditLogListModel,
  ResponseGetPatientOptionsModelItem,
  ResponsePatientListItem,
} from '../../patients/models/patients';
import {
  RequestGetProductOptionsModel,
  ResponseGetProductOptionsModelItem,
} from '../../products/models';
import {
  CreateReferralResponseModel,
  RequestActivateReferralModel,
  RequestCreateReferralModel,
  RequestDeactivateReferralModel,
  RequestGetReferralAuditLogsModel,
  RequestGetReferralByIdModel,
  RequestGetReferralListModel,
  RequestUpdateReferralModel,
  RequestUpdateReferralProductModel,
  RequestUpdateReferralStatusModel,
  ResponseGetReferralListModel,
  ResponseGetReferralModel,
} from '../models';

//CREATE REFERRAL
const REFERRAL_CREATE = '[REFERRAL] referral create';
export const referralCreateAction = createAction(
  REFERRAL_CREATE,
  props<{ payload: RequestCreateReferralModel }>()
);

export const referralCreateSuccessAction = createAction(
  `${REFERRAL_CREATE} success`,
  props<{ payload: CreateReferralResponseModel }>()
);

//UPDATE REFERRAL
const REFERRAL_UPDATE = '[REFERRAL] referral update';
export const referralUpdateAction = createAction(
  REFERRAL_UPDATE,
  props<{ payload: RequestUpdateReferralModel }>()
);

export const referralUpdateSuccessAction = createAction(`${REFERRAL_UPDATE} success`);

//GET REFERRAL BY ID
const REFERRAL_GET_BY_ID = '[REFERRAL] referral get by id';
export const referralGetByIdAction = createAction(
  REFERRAL_GET_BY_ID,
  props<{ payload: RequestGetReferralByIdModel }>()
);

export const referralGetByIdSuccessAction = createAction(
  `${REFERRAL_GET_BY_ID} success`,
  props<{ payload: ResponseGetReferralModel }>()
);

//SEARCH REFERRAL
const REFERRAL_SEARCH = '[REFERRAL] search referrals';
export const referralsSearchAction = createAction(
  REFERRAL_SEARCH,
  props<{ payload: RequestGetReferralListModel }>()
);

export const referralsSearchSuccessAction = createAction(
  `${REFERRAL_SEARCH} success`,
  props<{
    payload: ResponseGetReferralListModel;
  }>()
);

//ACTIVATE REFERRAL
const REFERRAL_ACTIVATE = '[REFERRAL] activate referral';
export const referralActivateAction = createAction(
  REFERRAL_ACTIVATE,
  props<{ payload: RequestActivateReferralModel }>()
);

export const referralActivateSuccessAction = createAction(`${REFERRAL_ACTIVATE} success`);

//DEACTIVATE REFERRAL
const REFERRAL_DEACTIVATE = '[REFERRAL] deactivate referral';
export const referralDeactivateAction = createAction(
  REFERRAL_DEACTIVATE,
  props<{ payload: RequestDeactivateReferralModel }>()
);

export const referralDeactivateSuccessAction = createAction(
  `${REFERRAL_DEACTIVATE} success`,
  props<{
    payload: BaseResponseModel;
  }>()
);

//CHANGE STATUS REFERRAL
const REFERRAL_CHANGE_STATUS = '[REFERRAL]  referral change status';
export const referralChangeStatusAction = createAction(
  REFERRAL_CHANGE_STATUS,
  props<{ payload: RequestUpdateReferralStatusModel }>()
);

export const referralChangeStatusSuccessAction = createAction(
  `${REFERRAL_CHANGE_STATUS} success`
);

//CHANGE PRODUCT TYPE
const REFERRAL_CHANGE_SAME_PRODUCT_TYPE = '[REFERRAL] referral change same product type';
export const referralChangeSameProductTypeAction = createAction(
  REFERRAL_CHANGE_SAME_PRODUCT_TYPE,
  props<{ payload: RequestUpdateReferralProductModel }>()
);

export const referralChangeSameProductTypeSuccessAction = createAction(
  `${REFERRAL_CHANGE_SAME_PRODUCT_TYPE} success`,
  props<{
    payload: BaseResponseModel & { id: string };
  }>()
);

//CHANGE PRODUCT TYPE
const REFERRAL_CHANGE_NEW_PRODUCT_TYPE = '[REFERRAL] referral change new product type';
export const referralChangeNewProductTypeAction = createAction(
  REFERRAL_CHANGE_NEW_PRODUCT_TYPE,
  props<{ payload: RequestUpdateReferralProductModel }>()
);

export const referralChangeNewProductTypeSuccessAction = createAction(
  `${REFERRAL_CHANGE_NEW_PRODUCT_TYPE} success`,
  props<{
    payload: BaseResponseModel & { id: string };
  }>()
);

//CLIENT OPTIONS
const CLIENT_OPTIONS = '[REFERRAL] get options client list';
export const getClientOptionsAction = createAction(
  CLIENT_OPTIONS,
  props<{ payload: RequestGetClientOptionsModel }>()
);

export const getClientOptionsSuccessAction = createAction(
  `${CLIENT_OPTIONS} success`,
  props<{
    payload: SelectOptionModel[];
  }>()
);

//DEPARTMENT OPTIONS
const DEPARTMENT_OPTIONS = '[REFERRAL] get options department list';
export const getDepartmentOptionsAction = createAction(
  DEPARTMENT_OPTIONS,
  props<{ payload: RequestGetDepartmentOptionsByClientIdModel }>()
);

export const getDepartmentOptionsSuccessAction = createAction(
  `${DEPARTMENT_OPTIONS} success`,
  props<{
    payload: { [key: string]: ResponseGetDepartmentOptionsModelIdem[] };
  }>()
);

const DEPARTMENT_OPTIONS_CLEAR_SUCCESS =
  '[REFERRAL] get options department list clear success';
export const clearDepartmentOptionsAction = createAction(
  DEPARTMENT_OPTIONS_CLEAR_SUCCESS
);

//PATIENT OPTIONS
const PATIENT_OPTIONS = '[REFERRAL] get options patient list';
export const getPatientOptionsAction = createAction(
  PATIENT_OPTIONS,
  props<{ payload: RequestGetPatientListModel }>()
);

export const getPatientOptionsSuccessAction = createAction(
  `${PATIENT_OPTIONS} success`,
  props<{
    payload: ResponseGetPatientOptionsModelItem[];
  }>()
);

//PRODUCT OPTIONS
const PRODUCT_OPTIONS = '[REFERRAL] get options product list';
export const getProductOptionsAction = createAction(
  PRODUCT_OPTIONS,
  props<{ payload: RequestGetProductOptionsModel }>()
);

export const getProductOptionsSuccessAction = createAction(
  `${PRODUCT_OPTIONS} success`,
  props<{
    payload: ResponseGetProductOptionsModelItem[];
  }>()
);

const PATIENT_OPTIONS_CLEAR_SUCCESS = '[REFERRAL] get options patient list clear success';
export const clearPatientOptionsAction = createAction(PATIENT_OPTIONS_CLEAR_SUCCESS);

//SEARCH AUDIT LOGS
const REFERRAL_SEARCH_AUDIT_LOGS = '[REFERRAL] search referrals';
export const referralsSearchAuditLogsAction = createAction(
  REFERRAL_SEARCH,
  props<{ payload: RequestGetReferralAuditLogsModel }>()
);

export const referralsSearchAuditLogsSuccessAction = createAction(
  `${REFERRAL_SEARCH_AUDIT_LOGS} success`,
  props<{
    payload: ResponseGetAuditLogListModel;
  }>()
);

//LOCAL
const SET_SEARCH_PARAMS = '[REFERRAL] set referrals search params';
export const setReferralSearchParamsAction = createAction(
  SET_SEARCH_PARAMS,
  props<{ payload: RequestGetReferralListModel }>()
);

const REFERRAL_CLEAR_DETAILS = '[REFERRAL] clear referral details';
export const clearReferralDetailsDataAction = createAction(REFERRAL_CLEAR_DETAILS);

const REFERRAL_CLEAR_SEARCH_PARAMS = '[REFERRAL] clear referral details';
export const clearReferralSearchParamsAction = createAction(REFERRAL_CLEAR_SEARCH_PARAMS);
