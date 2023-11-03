import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ReducerNodesEnum } from 'src/app/app-store';
import { PatientState } from '.';

const selectPatientFeature = createFeatureSelector<PatientState>(
  ReducerNodesEnum.patient
);

export const selectPatientState = createSelector(
  selectPatientFeature,
  (state: PatientState) => state
);

export const selectPatientDetails = createSelector(
  selectPatientFeature,
  (state: PatientState) => state?.patientDetails
);

export const selectPatientDepartments = createSelector(
  selectPatientFeature,
  (state: PatientState) => state?.patientDetails?.clientUser.clientUserDepartments
);

export const selectPatientName = createSelector(
  selectPatientFeature,
  (state: PatientState) =>
    `${state?.patientDetails?.clientUser?.applicationUser?.firstName} ${state?.patientDetails?.clientUser?.applicationUser?.lastName}`
);

export const selectPatientsList = createSelector(
  selectPatientFeature,
  (state: PatientState) => state?.patientsListData
);

export const selectPatientsForMergeList = createSelector(
  selectPatientFeature,
  (state: PatientState) => state?.patientsMergeListData
);

export const selectPatientsSearchParams = createSelector(
  selectPatientFeature,
  (state: PatientState) => state?.patientsSearchParams
);

export const selectDepartmentOptions = createSelector(
  selectPatientFeature,
  (state: PatientState) => state?.departmentsListData
);

export const selectClientOptions = createSelector(
  selectPatientFeature,
  (state: PatientState) => state?.clientOptions
);

//Referrals
export const selectPatientReferralsSearchParams = createSelector(
  selectPatientFeature,
  (state: PatientState) => state?.referralsSearchParams
);

export const selectPatientReferralsListData = createSelector(
  selectPatientFeature,
  (state: PatientState) => state?.referralsListData
);

//Documents
export const selectPatientDocumentsListData = createSelector(
  selectPatientFeature,
  (state: PatientState) => state?.documentsList
);

//Notes
export const selectPatientNoteListData = createSelector(
  selectPatientFeature,
  (state: PatientState) => state?.noteListData
);

//Audit Logs
export const selectPatientAuditLogListData = createSelector(
  selectPatientFeature,
  (state: PatientState) => state?.auditLogListData
);

//Pre Delete
export const selectPatientPreDeleteData = createSelector(
  selectPatientFeature,
  (state: PatientState) => state?.patientsPreDeleteListData
);
