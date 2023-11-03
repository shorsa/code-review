import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { IsActiveFilterEnum } from 'src/app/shared/enums';
import { InvoicingState } from '.';

import * as invoicingActions from './invoicing.actions';
import { InvoiceOrderByOptionsEnum } from '../enums';
import { CommonConstants } from 'src/app/core/constants';

const initialState: InvoicingState = {
  invoicingDetails: undefined,
  invoicingSearchParams: {
    pageSize: CommonConstants.PAGE_SIZE_OPTIONS[0],
    pageIndex: 0,
    searchText: undefined,
    isActiveFilter: IsActiveFilterEnum.Active,
    statusFilter: undefined,
    orderByOptions: InvoiceOrderByOptionsEnum.None,
    isOrderByAsc: undefined,
  },
  invoicingListData: undefined,
};

export const invoicingReducer: ActionReducer<InvoicingState, Action> = createReducer(
  initialState,
  on(
    invoicingActions.invoicingGetByIdSuccessAction,
    (state: InvoicingState, { payload }): InvoicingState => {
      return {
        ...state,
        invoicingDetails: payload,
      };
    }
  ),
  on(
    invoicingActions.setInvoicingSearchParamsAction,
    (state: InvoicingState, { payload }): InvoicingState => {
      return {
        ...state,
        invoicingSearchParams: payload,
      };
    }
  ),
  on(
    invoicingActions.invoicingSearchSuccessAction,
    (state: InvoicingState, { payload }): InvoicingState => {
      return {
        ...state,
        invoicingListData: payload,
      };
    }
  ),
  on(
    invoicingActions.clearInvoicingDetailsDataAction,
    (state: InvoicingState): InvoicingState => {
      return {
        ...state,
        invoicingDetails: initialState.invoicingDetails,
      };
    }
  ),
  on(
    invoicingActions.clearInvoicingSearchParamsAction,
    (state: InvoicingState): InvoicingState => {
      return {
        ...state,
        invoicingSearchParams: initialState.invoicingSearchParams,
      };
    }
  )
);

export function InvoicingReducer(state: InvoicingState, action: Action) {
  return invoicingReducer(state, action);
}
