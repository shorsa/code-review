import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiEndpointsConstants } from 'src/app/core/constants';
import {
  RequestCreateInvoiceModel,
  RequestDeactivateInvoiceModel,
  RequestGetAppointmentsForInvoiceModel,
  RequestGetInvoiceByIdModel,
  RequestGetInvoiceListModel,
  RequestReactivateInvoiceModel,
  RequestUpdateInvoiceModel,
  ResponseCreateInvoiceModel,
  ResponseGetInvoiceByIdModel,
  ResponseGetInvoiceListModel,
} from 'src/app/modules/dashboard/invoicing/models';
import { ResponseGetInvoiceAppointmentsModel } from 'src/app/modules/dashboard/invoicing/models/response/response-get-invoice-appointments.model';
import { ApiEndpointHelper } from 'src/app/shared/helpers';
import { BaseResponseModel } from 'src/app/shared/models';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  constructor(private httpClient: HttpClient) {}

  create(model: RequestCreateInvoiceModel): Observable<ResponseCreateInvoiceModel> {
    return this.httpClient.post<ResponseCreateInvoiceModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.INVOICE_CREATE),
      model
    );
  }

  update(model: RequestUpdateInvoiceModel): Observable<BaseResponseModel> {
    return this.httpClient.post<BaseResponseModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.INVOICE_UPDATE),
      model
    );
  }

  getById(model: RequestGetInvoiceByIdModel): Observable<ResponseGetInvoiceByIdModel> {
    return this.httpClient.get<ResponseGetInvoiceByIdModel>(
      `${ApiEndpointHelper.get(ApiEndpointsConstants.INVOICE_GET_BY_ID)}?id=${model.id}`
    );
  }

  getAll(model: RequestGetInvoiceListModel): Observable<ResponseGetInvoiceListModel> {
    return this.httpClient.post<ResponseGetInvoiceListModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.INVOICE_GET_ALL),
      model
    );
  }

  deactivate(model: RequestDeactivateInvoiceModel): Observable<BaseResponseModel> {
    return this.httpClient.post<BaseResponseModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.INVOICE_DEACTIVATE),
      model
    );
  }

  activate(model: RequestReactivateInvoiceModel): Observable<BaseResponseModel> {
    return this.httpClient.post<BaseResponseModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.INVOICE_ACTIVATE),
      model
    );
  }

  getAppointmentsForInvoice(
    model: RequestGetAppointmentsForInvoiceModel
  ): Observable<ResponseGetInvoiceAppointmentsModel> {
    return this.httpClient.post<ResponseGetInvoiceAppointmentsModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.INVOICE_GET_APPOINTMENTS),
      model
    );
  }

  downloadSelected(model: { invoiceIds: string[] }): Observable<Blob> {
    return this.httpClient.post<Blob>(
      ApiEndpointHelper.get(ApiEndpointsConstants.INVOICE_DOWNLOAD_SELECTED),
      model,
      { responseType: 'blob' as 'json' }
    );
  }

  downloadInvoice(model: { id: string }): Observable<Blob> {
    return this.httpClient.post<Blob>(
      ApiEndpointHelper.get(ApiEndpointsConstants.INVOICE_DOWNLOAD),
      model,
      { responseType: 'blob' as 'json' }
    );
  }
}
