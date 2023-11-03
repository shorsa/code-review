import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiEndpointsConstants } from 'src/app/core/constants';
import {
  RequestActivateStaffUserModel,
  RequestCreateStuffUserModel,
  RequestDeactivateStaffUserModel,
  RequestDeleteStaffUserModel,
  RequestGetStaffUserByIdModel,
  RequestGetStaffUserListModel,
  RequestUpdateStaffUserModel,
  ResponseCreateStaffUserModel,
  ResponseDeleteStaffUserModel,
  ResponseGetStaffUserByIdModel,
  ResponseGetStaffUserListModel,
  ResponseUpdateStaffUserModel,
} from 'src/app/modules/dashboard/staff/models';
import { ApiEndpointHelper } from 'src/app/shared/helpers';
import { BaseResponseModel } from 'src/app/shared/models';

@Injectable({
  providedIn: 'root',
})
export class StaffService {
  constructor(private httpClient: HttpClient) {}

  create(model: RequestCreateStuffUserModel): Observable<ResponseCreateStaffUserModel> {
    return this.httpClient.post<ResponseCreateStaffUserModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.STAFF_CREATE),
      model
    );
  }

  update(model: RequestUpdateStaffUserModel): Observable<ResponseUpdateStaffUserModel> {
    return this.httpClient.post<ResponseUpdateStaffUserModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.STAFF_UPDATE),
      model
    );
  }

  getById(
    model: RequestGetStaffUserByIdModel
  ): Observable<ResponseGetStaffUserByIdModel> {
    return this.httpClient.get<ResponseGetStaffUserByIdModel>(
      `${ApiEndpointHelper.get(ApiEndpointsConstants.STAFF_GET_BY_ID)}?id=${model.id}`
    );
  }

  getAll(model: RequestGetStaffUserListModel): Observable<ResponseGetStaffUserListModel> {
    return this.httpClient.post<ResponseGetStaffUserListModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.STAFF_GET_ALL),
      model
    );
  }

  delete(model: RequestDeleteStaffUserModel): Observable<ResponseDeleteStaffUserModel> {
    return this.httpClient.post<ResponseDeleteStaffUserModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.STAFF_DELETE),
      model
    );
  }

  deactivate(model: RequestDeactivateStaffUserModel): Observable<BaseResponseModel> {
    return this.httpClient.post<BaseResponseModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.STAFF_DEACTIVATE),
      model
    );
  }

  activate(model: RequestActivateStaffUserModel): Observable<BaseResponseModel> {
    return this.httpClient.post<BaseResponseModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.STAFF_ACTIVATE),
      model
    );
  }
}
