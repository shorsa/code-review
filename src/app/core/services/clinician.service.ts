import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiEndpointsConstants } from 'src/app/core/constants';
import {
  RequestActivateClinicianModel,
  RequestClinicianAddProductsModel,
  RequestClinicianDeleteProductModel,
  RequestCreateClinicianModel,
  RequestDeactivateClinicianModel,
  RequestGetClinicianByIdModel,
  RequestGetClinicianListModel,
  RequestGetClinicianOptionsModel,
  RequestGetClinicianProductsOptionsByClinicianIdModel,
  RequestGetClinicianProductsOptionsModel,
  RequestGetNearestAvailableClinicianDateModel,
  RequestUpdateClinicianModel,
  ResponseGetClinicianListModel,
  ResponseGetClinicianModel,
  ResponseGetClinicianOptionsModel,
  ResponseGetClinicianProductsModel,
  ResponseGetNearestAvailableClinicianDateResponseModel,
} from 'src/app/modules/dashboard/clinician/models';

import { ApiEndpointHelper } from 'src/app/shared/helpers';
import { BaseResponseModel } from 'src/app/shared/models';

@Injectable({
  providedIn: 'root',
})
export class ClinicianService {
  constructor(private httpClient: HttpClient) {}

  create(
    model: RequestCreateClinicianModel
  ): Observable<BaseResponseModel & { id: string }> {
    return this.httpClient.post<BaseResponseModel & { id: string }>(
      ApiEndpointHelper.get(ApiEndpointsConstants.CLINICIAN_CREATE),
      model
    );
  }

  getById(model: RequestGetClinicianByIdModel): Observable<ResponseGetClinicianModel> {
    return this.httpClient.get<ResponseGetClinicianModel>(
      `${ApiEndpointHelper.get(ApiEndpointsConstants.CLINICIAN_GET_BY_ID)}?id=${model.id}`
    );
  }

  getAll(model: RequestGetClinicianListModel): Observable<ResponseGetClinicianListModel> {
    return this.httpClient.post<ResponseGetClinicianListModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.CLINICIAN_GET_ALL),
      model
    );
  }

  update(model: RequestUpdateClinicianModel): Observable<BaseResponseModel> {
    return this.httpClient.post<BaseResponseModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.CLINICIAN_UPDATE),
      model
    );
  }

  delete(model: any): Observable<BaseResponseModel> {
    return this.httpClient.post<BaseResponseModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.CLINICIAN_DELETE),
      model
    );
  }

  deactivate(model: RequestDeactivateClinicianModel): Observable<BaseResponseModel> {
    return this.httpClient.post<BaseResponseModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.CLINICIAN_DEACTIVATE),
      model
    );
  }

  activate(model: RequestActivateClinicianModel): Observable<BaseResponseModel> {
    return this.httpClient.post<BaseResponseModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.CLINICIAN_ACTIVATE),
      model
    );
  }

  getClinicianOptions(
    model: RequestGetClinicianOptionsModel
  ): Observable<ResponseGetClinicianOptionsModel> {
    return this.httpClient.post<ResponseGetClinicianOptionsModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.CLINICIAN_GET_OPTIONS),
      model
    );
  }

  getNearestAvailableClinicianDate(
    model: RequestGetNearestAvailableClinicianDateModel
  ): Observable<ResponseGetNearestAvailableClinicianDateResponseModel> {
    return this.httpClient.get<ResponseGetNearestAvailableClinicianDateResponseModel>(
      `${ApiEndpointHelper.get(
        ApiEndpointsConstants.CLINICIAN_GET_NEAREST_AVAILABLE_DATE
      )}?id=${model.id}`
    );
  }

  deleteProduct(
    model: RequestClinicianDeleteProductModel
  ): Observable<BaseResponseModel> {
    return this.httpClient.post<BaseResponseModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.CLINICIAN_DELETE_PRODUCTS),
      model
    );
  }

  addProducts(model: RequestClinicianAddProductsModel): Observable<BaseResponseModel> {
    return this.httpClient.post<BaseResponseModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.CLINICIAN_ADD_PRODUCTS),
      model
    );
  }

  getClinicianProductsOptions(
    model: RequestGetClinicianProductsOptionsModel
  ): Observable<ResponseGetClinicianProductsModel> {
    return this.httpClient.post<ResponseGetClinicianProductsModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.CLINICIAN_GET_PRODUCTS_OPTIONS),
      model
    );
  }

  getClinicianProductsOptionsByClinicianId(
    model: RequestGetClinicianProductsOptionsByClinicianIdModel
  ): Observable<ResponseGetClinicianProductsModel> {
    return this.httpClient.post<ResponseGetClinicianProductsModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.CLINICIAN_GET_PRODUCTS_BY_CLINICIAN_ID),
      model
    );
  }
}
