import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ReducerNodesEnum } from 'src/app/app-store';
import { ClinicsState } from '.';

const selectClinicsFeature = createFeatureSelector<ClinicsState>(
  ReducerNodesEnum.clinics
);

export const selectClinicState = createSelector(
  selectClinicsFeature,
  (state: ClinicsState) => state
);

export const selectClinicDetails = createSelector(
  selectClinicsFeature,
  (state: ClinicsState) => state?.clinicDetails
);

export const selectClinicsList = createSelector(
  selectClinicsFeature,
  (state: ClinicsState) => state?.clinicsListData
);

export const selectClinicsSearchParams = createSelector(
  selectClinicsFeature,
  (state: ClinicsState) => state?.clinicsSearchParams
);

export const selectClinicAppointmentSearchParams = createSelector(
  selectClinicsFeature,
  (state: ClinicsState) => state?.clinicAppointmentsListData
);
