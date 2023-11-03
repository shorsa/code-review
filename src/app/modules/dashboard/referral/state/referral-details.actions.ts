import { createAction, props } from '@ngrx/store';
import {
  RequestGetManagementReferralByIdModel,
  RequestGetOccupationalHealthGeneralReferralByIdModel,
  RequestUpdateManagementReferralModel,
  RequestUpdateOccupationalHealthGeneralReferralModel,
  ResponseGetManagementReferralModel,
  ResponseGetOccupationalHealthGeneralReferralModel,
} from '../models';

//GET REFERRAL OCCUPATION DETAILS
const REFERRAL_GET_OCCUPATIONAL_HEALTH =
  '[REFERRAL] referral details occupational health';
export const getOccupationalHealthAction = createAction(
  REFERRAL_GET_OCCUPATIONAL_HEALTH,
  props<{ payload: RequestGetOccupationalHealthGeneralReferralByIdModel }>()
);

export const getOccupationalHealthSuccessAction = createAction(
  `${REFERRAL_GET_OCCUPATIONAL_HEALTH} success`,
  props<{ payload: ResponseGetOccupationalHealthGeneralReferralModel }>()
);

//UPDATE REFERRAL OCCUPATION DETAILS
const REFERRAL_DETAILS_OCCUPATION_DETAILS =
  '[REFERRAL] update occupational referral details';
export const updateReferralOccupationalDetailsAction = createAction(
  REFERRAL_DETAILS_OCCUPATION_DETAILS,
  props<{ payload: RequestUpdateOccupationalHealthGeneralReferralModel }>()
);

export const updateReferralOccupationalDetailsSuccessAction = createAction(
  `${REFERRAL_DETAILS_OCCUPATION_DETAILS} success`
);

//GET REFERRAL MANAGEMENT DETAILS
const REFERRAL_GET_MANAGEMENT = '[REFERRAL] referral management details';
export const getReferralManagementDetailsAction = createAction(
  REFERRAL_GET_MANAGEMENT,
  props<{ payload: RequestGetManagementReferralByIdModel }>()
);

export const getReferralManagementDetailsSuccessAction = createAction(
  `${REFERRAL_GET_MANAGEMENT} success`,
  props<{ payload: ResponseGetManagementReferralModel }>()
);

//UPDATE REFERRAL MANAGEMENT DETAILS
const REFERRAL_DETAILS_MANAGEMENT_DETAILS =
  '[REFERRAL] update  referral management details';
export const updateReferralManagementDetailsAction = createAction(
  REFERRAL_DETAILS_MANAGEMENT_DETAILS,
  props<{ payload: RequestUpdateManagementReferralModel }>()
);

export const updateReferralManagementDetailsSuccessAction = createAction(
  `${REFERRAL_DETAILS_MANAGEMENT_DETAILS} success`
);
