import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { IsActiveFilterEnum } from 'src/app/shared/enums';
import { ReferralState } from '.';
import { ReferralOrderByOptionsEnum } from '../enums';
import * as referralAppointmentsActions from './referral-appointments.actions';
import * as referralDetailsActions from './referral-details.actions';
import * as referralDocumentsActions from './referral-documents.actions';
import * as referralActions from './referral.actions';
import { CommonConstants } from 'src/app/core/constants';

const initialState: ReferralState = {
  referralDetails: undefined,
  referralSearchParams: {
    pageSize: CommonConstants.PAGE_SIZE_OPTIONS[0],
    pageIndex: 0,
    searchText: undefined,
    referralOrderByOptions: ReferralOrderByOptionsEnum.None,
    isOrderByAsc: undefined,
    isActiveFilter: IsActiveFilterEnum.Active,
  },
  referralList: undefined,
  clientOptions: undefined,
  departmentOptions: undefined,
  patientsListData: undefined,
  productOptions: undefined,
  occupationalHealthDetails: undefined,
};

export const referralReducer: ActionReducer<ReferralState, Action> = createReducer(
  initialState,
  on(
    referralActions.referralGetByIdSuccessAction,
    (state: ReferralState, { payload }): ReferralState => {
      const { referral } = payload;
      return {
        ...state,
        referralDetails: referral,
      };
    }
  ),
  on(
    referralActions.setReferralSearchParamsAction,

    (state: ReferralState, { payload }): ReferralState => {
      return {
        ...state,
        referralSearchParams: payload,
      };
    }
  ),

  on(
    referralActions.referralsSearchSuccessAction,
    (state: ReferralState, { payload }): ReferralState => {
      return {
        ...state,
        referralList: payload,
      };
    }
  ),
  on(
    referralActions.clearReferralDetailsDataAction,
    (state: ReferralState): ReferralState => {
      return {
        ...state,
        referralDetails: initialState.referralDetails,
      };
    }
  ),
  //CLIENTS OPTIONS
  on(
    referralActions.getClientOptionsSuccessAction,
    (state: ReferralState, { payload }): ReferralState => {
      return {
        ...state,
        clientOptions: payload.map((item) => ({ name: item.label, id: item.value })),
      };
    }
  ),

  //DEPARTMENTS OPTIONS
  on(
    referralActions.getDepartmentOptionsSuccessAction,
    (state: ReferralState, { payload }): ReferralState => {
      return {
        ...state,
        departmentOptions: payload,
      };
    }
  ),
  on(
    referralActions.clearDepartmentOptionsAction,
    (state: ReferralState): ReferralState => {
      return {
        ...state,
        departmentOptions: initialState.departmentOptions,
      };
    }
  ),

  //PATIENTS OPTIONS
  on(
    referralActions.getPatientOptionsSuccessAction,
    (state: ReferralState, { payload }): ReferralState => {
      return {
        ...state,
        patientsListData: payload,
      };
    }
  ),
  on(referralActions.clearPatientOptionsAction, (state: ReferralState): ReferralState => {
    return {
      ...state,
      patientsListData: initialState.patientsListData,
    };
  }),
  //PRODUCTS OPTIONS
  on(
    referralActions.getProductOptionsSuccessAction,
    (state: ReferralState, { payload }): ReferralState => {
      return {
        ...state,
        productOptions: payload,
      };
    }
  ),

  //OCCUPATIONAL HEALTH
  on(
    referralDetailsActions.getOccupationalHealthSuccessAction,
    (state: ReferralState, { payload: { referral } }): ReferralState => {
      return {
        ...state,
        occupationalHealthDetails: { ...referral },
      };
    }
  ),
  //MANAGEMENT REFERRAL FORM
  on(
    referralDetailsActions.getReferralManagementDetailsSuccessAction,
    (state: ReferralState, { payload: { referral } }): ReferralState => {
      return {
        ...state,
        referralManagementFormDetails: { ...referral },
      };
    }
  ),
  //DOCUMENTS
  on(
    referralDocumentsActions.referralDocumentsSearchSuccessAction,
    (state: ReferralState, { payload }): ReferralState => {
      return {
        ...state,
        documentsList: payload,
      };
    }
  ),
  //APPOINTMENTS
  on(
    referralAppointmentsActions.appointmentsSearchSuccessAction,
    (state: ReferralState, { payload }): ReferralState => {
      return {
        ...state,
        appointmentList: payload,
      };
    }
  ),
  //APPOINTMENTS
  on(
    referralActions.referralsSearchAuditLogsSuccessAction,
    (state: ReferralState, { payload }): ReferralState => {
      return {
        ...state,
        auditLogList: payload,
      };
    }
  ),
  //LOCAL
  on(
    referralActions.clearReferralSearchParamsAction,
    (state: ReferralState): ReferralState => {
      return {
        ...state,
        referralSearchParams: initialState.referralSearchParams,
      };
    }
  )
);

export function ReferralReducer(state: ReferralState, action: Action) {
  return referralReducer(state, action);
}
