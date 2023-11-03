import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ReducerNodesEnum } from 'src/app/app-store';
import { AppointmentsState } from '.';

const selectAppointmentFeature = createFeatureSelector<AppointmentsState>(
  ReducerNodesEnum.appointments
);

export const selectAppointmentState = createSelector(
  selectAppointmentFeature,
  (state: AppointmentsState) => state
);

export const selectAppointmentDetails = createSelector(
  selectAppointmentFeature,
  (state: AppointmentsState) => state?.appointmentDetails
);

export const selectAppointmentsList = createSelector(
  selectAppointmentFeature,
  (state: AppointmentsState) => state?.appointmentsListData
);

export const selectAppointmentsSearchParams = createSelector(
  selectAppointmentFeature,
  (state: AppointmentsState) => state?.appointmentsSearchParams
);

export const selectPatientDetails = createSelector(
  selectAppointmentFeature,
  (state: AppointmentsState) => state?.patientDetails
);

export const selectAppointmentDocuments = createSelector(
  selectAppointmentFeature,
  (state: AppointmentsState) => state?.documentsList
);

export const selectAppointmentAuditLogListData = createSelector(
  selectAppointmentFeature,
  (state: AppointmentsState) => state?.historyLogList
);
