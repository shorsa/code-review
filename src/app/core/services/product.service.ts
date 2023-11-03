import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiEndpointsConstants } from 'src/app/core/constants';
import {
  RequestGetPatientOptionsModel,
  ResponseGetPatientOptionsModel,
} from 'src/app/modules/dashboard/patients/models/patients';
import {
  RequestActivateProductModel,
  RequestCreateProductModel,
  RequestDeactivateProductModel,
  RequestDeleteProductModel,
  RequestGetProductByIdModel,
  RequestGetProductListModel,
  RequestGetProductOptionsModel,
  RequestUpdateProductModel,
  ResponseCreateProductModel,
  ResponseDeactivateProductModel,
  ResponseGetProductByIdModel,
  ResponseGetProductListModel,
  ResponseGetProductOptionsModel,
  ResponseUpdateProductModel,
} from 'src/app/modules/dashboard/products/models';
import { ResponseGetTemplateHeadingModel } from 'src/app/modules/dashboard/products/models/response/response-get-template-heading.model';

import { ApiEndpointHelper } from 'src/app/shared/helpers';
import { BaseResponseModel } from 'src/app/shared/models';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClient: HttpClient) {}

  create(model: RequestCreateProductModel): Observable<ResponseCreateProductModel> {
    return this.httpClient.post<ResponseCreateProductModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.PRODUCT_CREATE),
      model
    );
  }

  update(model: RequestUpdateProductModel): Observable<ResponseUpdateProductModel> {
    return this.httpClient.post<ResponseUpdateProductModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.PRODUCT_UPDATE),
      model
    );
  }

  getById(model: RequestGetProductByIdModel): Observable<ResponseGetProductByIdModel> {
    return this.httpClient.get<ResponseGetProductByIdModel>(
      `${ApiEndpointHelper.get(ApiEndpointsConstants.PRODUCT_GET_BY_ID)}?id=${model.id}`
    );
  }

  getAll(model: RequestGetProductListModel): Observable<ResponseGetProductListModel> {
    return this.httpClient.post<ResponseGetProductListModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.PRODUCT_GET_ALL),
      model
    );
  }

  delete(model: RequestDeleteProductModel): Observable<BaseResponseModel> {
    return this.httpClient.post<BaseResponseModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.PRODUCT_DELETE),
      model
    );
  }

  deactivate(model: RequestDeactivateProductModel): Observable<BaseResponseModel> {
    return this.httpClient.post<BaseResponseModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.PRODUCT_DEACTIVATE),
      model
    );
  }

  activate(
    model: RequestActivateProductModel
  ): Observable<ResponseDeactivateProductModel> {
    return this.httpClient.post<ResponseDeactivateProductModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.PRODUCT_ACTIVATE),
      model
    );
  }

  getProductOptions(
    model: RequestGetProductOptionsModel
  ): Observable<ResponseGetProductOptionsModel> {
    return this.httpClient.post<ResponseGetProductOptionsModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.PRODUCT_OPTIONS),
      model
    );
  }

  getTemplateHeadingByAppointmentId(
    appointmentId: string
  ): Observable<ResponseGetTemplateHeadingModel> {
    return this.httpClient.get<ResponseGetTemplateHeadingModel>(
      `${ApiEndpointHelper.get(
        ApiEndpointsConstants.PRODUCT_TEMPLATE_HEADING_BY_ID
      )}?appointmentId=${appointmentId}`
    );
  }
}
