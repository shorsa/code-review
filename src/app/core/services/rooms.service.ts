import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiEndpointsConstants } from 'src/app/core/constants';
import {
  RequestActivateRoomModel,
  RequestCreateRoomModel,
  RequestDeactivateRoomModel,
  RequestGetRoomByIdModel,
  RequestGetRoomListModel,
  RequestUpdateRoomModel,
  ResponseGetRoomListModel,
  ResponseGetRoomModel,
} from 'src/app/modules/dashboard/locations/models';
import { ApiEndpointHelper } from 'src/app/shared/helpers';
import { BaseResponseModel } from 'src/app/shared/models';

@Injectable({
  providedIn: 'root',
})
export class RoomsService {
  constructor(private httpClient: HttpClient) {}

  create(model: RequestCreateRoomModel): Observable<BaseResponseModel> {
    return this.httpClient.post<BaseResponseModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.ROOMS_CREATE),
      model
    );
  }

  getById(model: RequestGetRoomByIdModel): Observable<ResponseGetRoomModel> {
    return this.httpClient.get<ResponseGetRoomModel>(
      `${ApiEndpointHelper.get(ApiEndpointsConstants.ROOMS_GET_BY_ID)}?id=${model.id}`
    );
  }

  getAll(model: RequestGetRoomListModel): Observable<ResponseGetRoomListModel> {
    return this.httpClient.post<ResponseGetRoomListModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.ROOMS_GET_ALL),
      model
    );
  }

  update(model: RequestUpdateRoomModel): Observable<BaseResponseModel> {
    return this.httpClient.post<BaseResponseModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.ROOMS_UPDATE),
      model
    );
  }

  deactivate(model: RequestDeactivateRoomModel): Observable<BaseResponseModel> {
    return this.httpClient.post<BaseResponseModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.ROOMS_DEACTIVATE),
      model
    );
  }

  activate(model: RequestActivateRoomModel): Observable<BaseResponseModel> {
    return this.httpClient.post<BaseResponseModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.ROOMS_ACTIVATE),
      model
    );
  }
}
