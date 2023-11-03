import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { PermissionsState } from '.';
import * as permissionsActions from './permissions.actions';

const initialState: PermissionsState = {
  permissionsListByEnum: undefined,
  permissionsList: undefined,
};

export const permissionsReducer: ActionReducer<PermissionsState, Action> = createReducer(
  initialState,
  on(
    permissionsActions.getPermissionsByEnumSuccessAction,
    (state: PermissionsState, { payload }): PermissionsState => {
      return {
        ...state,
        permissionsListByEnum: payload,
      };
    }
  ),
  on(
    permissionsActions.getListSuccessAction,
    (state: PermissionsState, { payload }): PermissionsState => {
      return {
        ...state,
        permissionsList: {
          clinicClaimsDictionary: payload.clinicClaimsDictionary,
          locationClaimsDictionary: payload.locationClaimsDictionary,
          clientClaimsDictionary: payload.clientClaimsDictionary,
          departmentClaimsDictionary: payload.departmentClaimsDictionary,
          clientUserClaimsDictionary: payload.clientUserClaimsDictionary,
          clientDocumentClaimsDictionary: payload.clientDocumentClaimsDictionary,
          patientClaimsDictionary: payload.patientClaimsDictionary,
          patientDocumentClaimsDictionary: payload.patientDocumentClaimsDictionary,
          patientConfidentialNotesClaimsDictionary:
            payload.patientConfidentialNotesClaimsDictionary,
          patientReferralClaimsDictionary: payload.patientReferralClaimsDictionary,
          clinicianClaimsDictionary: payload.clinicianClaimsDictionary,
          referralClaimsDictionary: payload.referralClaimsDictionary,
          appointmentClaimsDictionary: payload.appointmentClaimsDictionary,
          contractClaimsDictionary: payload.contractClaimsDictionary,
          invoiceClaimsDictionary: payload.invoiceClaimsDictionary,
          productClaimsDictionary: payload.productClaimsDictionary,
          documentClaimsDictionary: payload.documentClaimsDictionary,
        },
      };
    }
  )
);

export function PermissionsReducer(state: PermissionsState, action: Action) {
  return permissionsReducer(state, action);
}
