import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiEndpointsConstants } from 'src/app/core/constants';
import {
  RequestActionsClientModel,
  RequestCreateClientUserModel,
  RequestGetClientUsersListModel,
  RequestUpdateClientModel,
  ResponseActionsClientModel,
  ResponseGetClientUserByIdModel,
  ResponseGetClientUserListModel,
  ResponseUpdateClientModel,
  RequestUpdateClientUserModel,
} from 'src/app/modules/dashboard/client/models';
import { ApiEndpointHelper } from 'src/app/shared/helpers';

@Injectable({
  providedIn: 'root',
})
export class ClientUserService {
  constructor(private httpClient: HttpClient) {}

  create(model: RequestCreateClientUserModel): Observable<ResponseActionsClientModel> {
    return this.httpClient.post<ResponseActionsClientModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.CLIENT_USER_CREATE),
      model
    );
  }

  update(model: RequestUpdateClientUserModel): Observable<ResponseUpdateClientModel> {
    return this.httpClient.post<ResponseUpdateClientModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.CLIENT_USER_UPDATE),
      model
    );
  }

  getById(model: RequestActionsClientModel): Observable<ResponseGetClientUserByIdModel> {
    return this.httpClient.get<ResponseGetClientUserByIdModel>(
      `${ApiEndpointHelper.get(ApiEndpointsConstants.CLIENT_USER_GET_BY_ID)}?id=${
        model.id
      }`
    );
  }

  getAll(
    model: RequestGetClientUsersListModel
  ): Observable<ResponseGetClientUserListModel> {
    return this.httpClient.post<ResponseGetClientUserListModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.CLIENT_USER_GET_ALL),
      model
    );
  }

  delete(model: RequestActionsClientModel): Observable<ResponseActionsClientModel> {
    return this.httpClient.post<ResponseActionsClientModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.CLIENT_USER_DELETE),
      model
    );
  }

  deactivate(model: RequestActionsClientModel): Observable<ResponseActionsClientModel> {
    return this.httpClient.post<ResponseActionsClientModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.CLIENT_USER_DEACTIVATE),
      model
    );
  }

  activate(model: RequestActionsClientModel): Observable<ResponseActionsClientModel> {
    return this.httpClient.post<ResponseActionsClientModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.CLIENT_USER_ACTIVATE),
      model
    );
  }
}
