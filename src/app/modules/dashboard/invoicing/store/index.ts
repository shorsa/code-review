import {
  RequestGetInvoiceListModel,
  ResponseGetInvoiceByIdModel,
  ResponseGetInvoiceListModel,
} from '../models';

export interface InvoicingState {
  invoicingDetails?: ResponseGetInvoiceByIdModel;
  invoicingSearchParams?: RequestGetInvoiceListModel;
  invoicingListData?: ResponseGetInvoiceListModel;
}
