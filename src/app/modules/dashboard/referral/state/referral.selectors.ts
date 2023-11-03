import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ReducerNodesEnum } from 'src/app/app-store';
import { ReferralState } from '.';

const selectReferralFeature = createFeatureSelector<ReferralState>(
  ReducerNodesEnum.referral
);

export const selectReferralState = createSelector(
  selectReferralFeature,
  (state: ReferralState) => state
);

export const selectReferralDetails = createSelector(
  selectReferralFeature,
  (state: ReferralState) => state?.referralDetails
);

export const selectReferralType = createSelector(
  selectReferralFeature,
  (state: ReferralState) => state?.referralDetails?.referralType
);

export const selectReferralsList = createSelector(
  selectReferralFeature,
  (state: ReferralState) => state?.referralList
);

export const selectReferralsSearchParams = createSelector(
  selectReferralFeature,
  (state: ReferralState) => state?.referralSearchParams
);

export const selectClientOptions = createSelector(
  selectReferralFeature,
  (state: ReferralState) => state?.clientOptions
);

export const selectDepartmentOptions = createSelector(
  selectReferralFeature,
  (state: ReferralState) => state?.departmentOptions
);

export const selectPatientOptions = createSelector(
  selectReferralFeature,
  (state: ReferralState) => state?.patientsListData
);

export const selectProductsOptions = createSelector(
  selectReferralFeature,
  (state: ReferralState) => state?.productOptions
);

export const selectReferralDocumentsList = createSelector(
  selectReferralFeature,
  (state: ReferralState) => state?.documentsList
);

export const selectAppointmentsList = createSelector(
  selectReferralFeature,
  (state: ReferralState) => state?.appointmentList
);

export const selectAuditLogList = createSelector(
  selectReferralFeature,
  (state: ReferralState) => state?.auditLogList
);

//Referral Details
export const selectOccupationalHealthDetails = createSelector(
  selectReferralFeature,
  (state: ReferralState) => state?.occupationalHealthDetails
);
export const selectManagementReferralForm = createSelector(
  selectReferralFeature,
  (state: ReferralState) => state?.referralManagementFormDetails
);
