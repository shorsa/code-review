import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ReducerNodesEnum } from 'src/app/app-store';
import { InvoicingState } from '.';

const selectInvoicingFeature = createFeatureSelector<InvoicingState>(
  ReducerNodesEnum.invoicing
);

export const selectInvoicingData = createSelector(
  selectInvoicingFeature,
  (state: InvoicingState) => state
);

export const selectInvoicingDetails = createSelector(
  selectInvoicingFeature,
  (state: InvoicingState) => state?.invoicingDetails
);

export const selectInvoicingList = createSelector(
  selectInvoicingFeature,
  (state: InvoicingState) => state?.invoicingListData
);

export const selectInvoicingSearchParams = createSelector(
  selectInvoicingFeature,
  (state: InvoicingState) => state?.invoicingSearchParams
);
