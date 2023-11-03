import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ReducerNodesEnum } from 'src/app/app-store';
import { CliniciansState } from '.';

const selectClinicianFeature = createFeatureSelector<CliniciansState>(
  ReducerNodesEnum.clinician
);

export const selectClinicianState = createSelector(
  selectClinicianFeature,
  (state: CliniciansState) => state
);

export const selectClinicianDetails = createSelector(
  selectClinicianFeature,
  (state: CliniciansState) => state?.clinicianDetails
);

export const selectClinicianName = createSelector(
  selectClinicianFeature,
  (state: CliniciansState) =>
    state?.clinicianDetails?.applicationUser
      ? `${state?.clinicianDetails?.applicationUser.firstName} ${state?.clinicianDetails?.applicationUser.lastName}`
      : ''
);

export const selectCliniciansList = createSelector(
  selectClinicianFeature,
  (state: CliniciansState) => state?.cliniciansListData
);

export const selectClinicianProductsList = createSelector(
  selectClinicianFeature,
  (state: CliniciansState) => state?.clinicianProductsListData
);

export const selectCliniciansSearchParams = createSelector(
  selectClinicianFeature,
  (state: CliniciansState) => state?.cliniciansSearchParams
);
