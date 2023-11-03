import { createAction, props } from '@ngrx/store';
import {
  RequestCreateInvoiceModel,
  RequestDeactivateInvoiceModel,
  RequestGetInvoiceByIdModel,
  RequestGetInvoiceListModel,
  RequestReactivateInvoiceModel,
  RequestUpdateInvoiceModel,
  ResponseCreateInvoiceModel,
  ResponseGetInvoiceByIdModel,
  ResponseGetInvoiceListModel,
} from '../models';

//CREATE
const INVOICING_CREATE = '[INVOICING] invoicing create';
export const invoicingCreateAction = createAction(
  INVOICING_CREATE,
  props<{ payload: RequestCreateInvoiceModel }>()
);

export const invoicingCreateSuccessAction = createAction(
  `${INVOICING_CREATE} success`,
  props<{ payload: ResponseCreateInvoiceModel }>()
);

//UPDATE
const INVOICING_UPDATE = '[INVOICING] invoicing update';
export const invoicingUpdateAction = createAction(
  INVOICING_UPDATE,
  props<{ payload: RequestUpdateInvoiceModel }>()
);

export const invoicingUpdateSuccessAction = createAction(`${INVOICING_UPDATE} success`);

//GET BY ID
const INVOICING_GET_BY_ID = '[INVOICING] invoicing get by id';
export const invoicingGetByIdAction = createAction(
  INVOICING_GET_BY_ID,
  props<{ payload: RequestGetInvoiceByIdModel }>()
);

export const invoicingGetByIdSuccessAction = createAction(
  `${INVOICING_GET_BY_ID} success`,
  props<{ payload: ResponseGetInvoiceByIdModel }>()
);

//SEARCH
const INVOICING_SEARCH = '[INVOICING] search invoicing';

export const invoicingSearchSuccessAction = createAction(
  `${INVOICING_SEARCH} success`,
  props<{ payload: ResponseGetInvoiceListModel }>()
);

//ACTIVATE INVOICING
const INVOICING_ACTIVATE = '[INVOICING] activate invoicing';
export const invoicingActivateAction = createAction(
  INVOICING_ACTIVATE,
  props<{ payload: RequestReactivateInvoiceModel }>()
);

export const invoicingActivateSuccessAction = createAction(
  `${INVOICING_ACTIVATE} success`
);

//DEACTIVATE INVOICING
const INVOICING_DEACTIVATE = '[INVOICING] deactivate invoicing';
export const invoicingDeactivateAction = createAction(
  INVOICING_DEACTIVATE,
  props<{ payload: RequestDeactivateInvoiceModel }>()
);

export const invoicingDeactivateSuccessAction = createAction(
  `${INVOICING_DEACTIVATE} success`
);

//DOWNLOAD SELECTED INVOICES
const DOWNLOAD_SELECTED_INVOICES = '[INVOICING] download selected invoices';
export const downloadSelectedInvoicesAction = createAction(
  DOWNLOAD_SELECTED_INVOICES,
  props<{ payload: { invoiceIds: string[]; customIds: string[] } }>()
);

export const downloadSelectedInvoicesSuccessAction = createAction(
  `${DOWNLOAD_SELECTED_INVOICES} success`
);

//DOWNLOAD INVOICE
const DOWNLOAD_INVOICE = '[INVOICING] download invoice';
export const downloadInvoiceAction = createAction(
  DOWNLOAD_INVOICE,
  props<{ payload: { invoiceId: string; customId: string } }>()
);

export const downloadInvoiceSuccessAction = createAction(`${DOWNLOAD_INVOICE} success`);

//LOCAL
const SET_SEARCH_PARAMS = '[INVOICING] set invoicing search params';
export const setInvoicingSearchParamsAction = createAction(
  SET_SEARCH_PARAMS,
  props<{ payload: RequestGetInvoiceListModel }>()
);

const INVOICING_CLEAR_DETAILS = '[INVOICING] clear invoicing details';
export const clearInvoicingDetailsDataAction = createAction(INVOICING_CLEAR_DETAILS);

const INVOICING_CLEAR_SEARCH_PARAMS = '[INVOICING] clear search params invoicing';
export const clearInvoicingSearchParamsAction = createAction(
  INVOICING_CLEAR_SEARCH_PARAMS
);
