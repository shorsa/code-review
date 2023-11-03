import { createAction, props } from '@ngrx/store';
import { BaseResponseModel } from 'src/app/shared/models';

import {
  RequestActivateReferralModel,
  RequestDeactivateReferralModel,
  RequestDeleteReferralModel,
  RequestGetReferralListModel,
  RequestUpdateReferralStatusModel,
  ResponseGetReferralListModel,
} from '../../referral/models';

//SEARCH REFERRAL
const PATIENT_REFERRAL_SEARCH = '[PATIENT] search referrals';
export const patientsReferralSearchAction = createAction(
  PATIENT_REFERRAL_SEARCH,
  props<{ payload: RequestGetReferralListModel }>()
);

export const patientsReferralSearchSuccessAction = createAction(
  `${PATIENT_REFERRAL_SEARCH} success`,
  props<{
    payload: ResponseGetReferralListModel;
  }>()
);

//DELETE REFERRAL
const PATIENT_REFERRAL_DELETE = '[PATIENT] delete referral';
export const patientDeleteReferralAction = createAction(
  PATIENT_REFERRAL_DELETE,
  props<{ payload: RequestDeleteReferralModel }>()
);

export const patientDeleteReferralSuccessAction = createAction(
  `${PATIENT_REFERRAL_DELETE} success`,
  props<{
    payload: BaseResponseModel;
  }>()
);

//ACTIVATE REFERRAL
const PATIENT_REFERRAL_ACTIVATE = '[PATIENT] activate patient referral';
export const patientReferralActivateAction = createAction(
  PATIENT_REFERRAL_ACTIVATE,
  props<{ payload: RequestActivateReferralModel }>()
);

export const patientReferralActivateSuccessAction = createAction(
  `${PATIENT_REFERRAL_ACTIVATE} success`,
  props<{
    payload: BaseResponseModel;
  }>()
);

//DEACTIVATE REFERRAL
const PATIENT_REFERRAL_DEACTIVATE = '[PATIENT] deactivate patient referral';
export const patientReferralDeactivateAction = createAction(
  PATIENT_REFERRAL_DEACTIVATE,
  props<{ payload: RequestDeactivateReferralModel }>()
);

export const patientReferralDeactivateSuccessAction = createAction(
  `${PATIENT_REFERRAL_DEACTIVATE} success`,
  props<{
    payload: BaseResponseModel;
  }>()
);

//CHANGE STATUS REFERRAL
const PATIENT_REFERRAL_CHANGE_STATUS = '[PATIENT]  patient referral change status';
export const patientReferralChangeStatusAction = createAction(
  PATIENT_REFERRAL_CHANGE_STATUS,
  props<{ payload: RequestUpdateReferralStatusModel }>()
);

export const patientReferralChangeStatusSuccessAction = createAction(
  `${PATIENT_REFERRAL_CHANGE_STATUS} success`,
  props<{
    payload: BaseResponseModel;
  }>()
);

//LOCAL ACTIONS
const SET_SEARCH_REFERRAL_PARAMS = '[PATIENT] set referrals search params';
export const setPatientReferralSearchParamsAction = createAction(
  SET_SEARCH_REFERRAL_PARAMS,
  props<{ payload: RequestGetReferralListModel }>()
);

const REFERRAL_CLEAR_SEARCH_PARAMS = '[PATIENT] clear referrals search params';
export const clearPatientReferralSearchParamsAction = createAction(
  REFERRAL_CLEAR_SEARCH_PARAMS
);
