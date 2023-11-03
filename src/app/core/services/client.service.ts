import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiEndpointsConstants } from 'src/app/core/constants';
import {
  RequestCreateClientModel,
  ResponseCreateClientModel,
  RequestGetClientByIdModel,
  RequestGetClientListModel,
  ResponseGetClientListModel,
  ResponseGetClientByIdModel,
  RequestUpdateClientModel,
  ResponseUpdateClientModel,
  RequestActionsClientModel,
  ResponseActionsClientModel,
  ResponseGetClientOptionsModel,
  RequestGetClientOptionsModel,
} from 'src/app/modules/dashboard/client/models';
import { ApiEndpointHelper } from 'src/app/shared/helpers';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor(private httpClient: HttpClient) {}

  acceptTermsAndConditions(
    model: RequestCreateClientModel
  ): Observable<ResponseCreateClientModel> {
    return this.httpClient.post<ResponseCreateClientModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.CLIENT_CREATE),
      model
    );
  }

  create(model: RequestCreateClientModel): Observable<ResponseCreateClientModel> {
    return this.httpClient.post<ResponseCreateClientModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.CLIENT_CREATE),
      model
    );
  }

  getById(model: RequestGetClientByIdModel): Observable<ResponseGetClientByIdModel> {
    return this.httpClient.get<ResponseGetClientByIdModel>(
      `${ApiEndpointHelper.get(ApiEndpointsConstants.CLIENT_GET_BY_ID)}?id=${model.id}`
    );
  }

  getAll(model: RequestGetClientListModel): Observable<ResponseGetClientListModel> {
    return this.httpClient.post<ResponseGetClientListModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.CLIENT_GET_ALL),
      model
    );
  }

  update(model: RequestUpdateClientModel): Observable<ResponseUpdateClientModel> {
    return this.httpClient.post<ResponseUpdateClientModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.CLIENT_UPDATE),
      model
    );
  }

  delete(model: RequestActionsClientModel): Observable<ResponseActionsClientModel> {
    return this.httpClient.post<ResponseActionsClientModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.CLIENT_DELETE),
      model
    );
  }

  deactivate(model: RequestActionsClientModel): Observable<ResponseActionsClientModel> {
    return this.httpClient.post<ResponseActionsClientModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.CLIENT_DEACTIVATE),
      model
    );
  }

  activate(model: RequestActionsClientModel): Observable<ResponseActionsClientModel> {
    return this.httpClient.post<ResponseActionsClientModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.CLIENT_ACTIVATE),
      model
    );
  }

  getClientOptions(
    model: RequestGetClientOptionsModel
  ): Observable<ResponseGetClientOptionsModel> {
    return this.httpClient.post<ResponseGetClientOptionsModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.CLIENT_GET_OPTIONS),
      model
    );
  }
}
