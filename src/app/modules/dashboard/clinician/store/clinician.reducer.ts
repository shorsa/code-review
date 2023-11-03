import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { IsActiveFilterEnum } from 'src/app/shared/enums';
import { CliniciansState } from '.';
import * as clinicianActions from './clinician.actions';
import { ClinicianOrderByOptionsEnum } from '../enums/clinician-order-by-options.enum';
import { CommonConstants } from 'src/app/core/constants';

const initialState: CliniciansState = {
  clinicianDetails: undefined,
  cliniciansSearchParams: {
    pageSize: CommonConstants.PAGE_SIZE_OPTIONS[0],
    pageIndex: 0,
    searchText: undefined,
    clinicianOrderByOptions: ClinicianOrderByOptionsEnum.None,
    isActiveFilter: IsActiveFilterEnum.Active,
  },
  cliniciansListData: undefined,
  clinicianProductsListData: undefined,
};

export const clinicianReducer: ActionReducer<CliniciansState, Action> = createReducer(
  initialState,
  on(
    clinicianActions.clinicianGetByIdSuccessAction,
    (state: CliniciansState, { payload }): CliniciansState => {
      const { clinician } = payload;
      return {
        ...state,
        clinicianDetails: clinician,
      };
    }
  ),
  on(
    clinicianActions.setCliniciansSearchParamsAction,

    (state: CliniciansState, { payload }): CliniciansState => {
      return {
        ...state,
        cliniciansSearchParams: payload,
      };
    }
  ),

  on(
    clinicianActions.cliniciansSearchSuccessAction,
    (state: CliniciansState, { payload }): CliniciansState => {
      return {
        ...state,
        cliniciansListData: payload,
      };
    }
  ),
  on(
    clinicianActions.clearClinicianDetailsDataAction,
    (state: CliniciansState): CliniciansState => {
      return {
        ...state,
        clinicianDetails: initialState.clinicianDetails,
      };
    }
  ),
  on(
    clinicianActions.clearClinicianSearchParamsAction,
    (state: CliniciansState): CliniciansState => {
      return {
        ...state,
        cliniciansSearchParams: initialState.cliniciansSearchParams,
      };
    }
  ),
  //PRODUCTS
  on(
    clinicianActions.getClinicianProductsSuccessAction,
    (state: CliniciansState, { payload }): CliniciansState => {
      return {
        ...state,
        clinicianProductsListData: payload,
      };
    }
  )
);

export function ClinicianReducer(state: CliniciansState, action: Action) {
  return clinicianReducer(state, action);
}
