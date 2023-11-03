import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { IsActiveFilterEnum } from 'src/app/shared/enums';
import { PatientState } from '.';
import { ReferralOrderByOptionsEnum } from '../../referral/enums';
import { PatientOrderByOptionsEnum } from '../enums';
import * as patientAuditLogsActions from './patient-audit-logs.actions';
import * as patientDocumentsActions from './patient-documents.actions';
import * as patientNotesActions from './patient-notes.actions';
import * as patientReferralActions from './patient-referral.actions';
import * as patientActions from './patient.actions';
import { CommonConstants } from 'src/app/core/constants';

const initialState: PatientState = {
  patientDetails: undefined,
  patientsSearchParams: {
    pageSize: CommonConstants.PAGE_SIZE_OPTIONS[0],
    pageIndex: 0,
    searchText: undefined,
    patientOrderByOptions: PatientOrderByOptionsEnum.None,
    isOrderByAsc: undefined,
    isActiveFilter: IsActiveFilterEnum.Active,
  },
  referralsSearchParams: {
    pageSize: CommonConstants.PAGE_SIZE_OPTIONS[0],
    pageIndex: 0,
    patientId: undefined,
    searchText: undefined,
    referralOrderByOptions: ReferralOrderByOptionsEnum.None,
    isOrderByAsc: undefined,
    statusFilter: undefined,
    isActiveFilter: IsActiveFilterEnum.Active,
  },
  documentsList: undefined,
  patientsListData: undefined,
  patientsMergeListData: undefined,
  patientsPreDeleteListData: undefined,
};

export const patientReducer: ActionReducer<PatientState, Action> = createReducer(
  initialState,
  on(
    patientActions.patientGetByIdSuccessAction,
    (state: PatientState, { payload }): PatientState => {
      const { patient } = payload;
      return {
        ...state,
        patientDetails: patient,
      };
    }
  ),
  on(
    patientActions.setPatientsSearchParamsAction,

    (state: PatientState, { payload }): PatientState => {
      return {
        ...state,
        patientsSearchParams: payload,
      };
    }
  ),

  on(
    patientActions.patientsSearchSuccessAction,
    (state: PatientState, { payload }): PatientState => {
      return {
        ...state,
        patientsListData: payload,
      };
    }
  ),
  on(
    patientActions.patientsSearchForMergeSuccessAction,
    (state: PatientState, { payload }): PatientState => {
      return {
        ...state,
        patientsMergeListData: payload,
      };
    }
  ),
  on(
    patientActions.getDepartmentOptionsSuccessAction,
    (state: PatientState, { payload }): PatientState => {
      return {
        ...state,
        departmentsListData: payload.departmentsByClient,
      };
    }
  ),
  on(
    patientActions.getClientOptionsSuccessAction,
    (state: PatientState, { payload }): PatientState => {
      return {
        ...state,
        clientOptions: payload,
      };
    }
  ),
  on(
    patientActions.clearDepartmentOptionsSuccessAction,
    (state: PatientState): PatientState => {
      return {
        ...state,
        clientOptions: initialState.clientOptions,
      };
    }
  ),
  on(
    patientActions.clearPatientDetailsDataAction,
    (state: PatientState): PatientState => {
      return {
        ...state,
        patientDetails: initialState.patientDetails,
      };
    }
  ),
  on(
    patientActions.clearPatientSearchParamsAction,
    (state: PatientState): PatientState => {
      return {
        ...state,
        patientsSearchParams: initialState.patientsSearchParams,
      };
    }
  ),
  on(
    patientActions.clearPatientSearchParamsAction,
    (state: PatientState): PatientState => {
      return {
        ...state,
        referralsSearchParams: initialState.referralsSearchParams,
      };
    }
  ),
  //Referral
  on(
    patientReferralActions.setPatientReferralSearchParamsAction,

    (state: PatientState, { payload }): PatientState => {
      return {
        ...state,
        referralsSearchParams: payload,
      };
    }
  ),
  on(
    patientReferralActions.patientsReferralSearchSuccessAction,

    (state: PatientState, { payload }): PatientState => {
      return {
        ...state,
        referralsListData: payload,
      };
    }
  ),
  //Documents
  on(
    patientDocumentsActions.patientDocumentsSearchSuccessAction,

    (state: PatientState, { payload }): PatientState => {
      return {
        ...state,
        documentsList: payload,
      };
    }
  ),
  //Notes
  on(
    patientNotesActions.patientsNoteListSearchSuccessAction,

    (state: PatientState, { payload }): PatientState => {
      return {
        ...state,
        noteListData: payload,
      };
    }
  ),
  //Audit Logs
  on(
    patientAuditLogsActions.patientsAuditLogListSearchSuccessAction,
    (state: PatientState, { payload }): PatientState => {
      return {
        ...state,
        auditLogListData: payload,
      };
    }
  ),
  //Pre Delete
  on(
    patientActions.preDeletePatientsSearchSuccessAction,
    (state: PatientState, { payload }): PatientState => {
      return {
        ...state,
        patientsPreDeleteListData: payload,
      };
    }
  )
);

export function PatientReducer(state: PatientState, action: Action) {
  return patientReducer(state, action);
}
