import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  RequestGetRoleByEnumModel,
  RequestUpdateRoleClaimsModel,
  ResponseGetPermissionsListModel,
  ResponseGetRoleByEnumModel,
} from 'src/app/modules/dashboard/permissions/models';
import { ApiEndpointHelper } from 'src/app/shared/helpers';
import { BaseResponseModel } from 'src/app/shared/models';
import { ApiEndpointsConstants } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class PermissionsService {
  constructor(private httpClient: HttpClient) {}

  getByEnum(model: RequestGetRoleByEnumModel): Observable<ResponseGetRoleByEnumModel> {
    return this.httpClient.get<ResponseGetRoleByEnumModel>(
      `${ApiEndpointHelper.get(ApiEndpointsConstants.ROLE_GET_BY_ENUM)}?role=${
        model.role
      }`
    );
  }

  updateClaims(model: RequestUpdateRoleClaimsModel): Observable<BaseResponseModel> {
    return this.httpClient.post<BaseResponseModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.ROLE_UPDATE_CLAIMS),
      model
    );
  }

  getPermissions(): Observable<ResponseGetPermissionsListModel> {
    return this.httpClient.get<ResponseGetPermissionsListModel>(
      `${ApiEndpointHelper.get(ApiEndpointsConstants.ROLE_GET_LIST)}`
    );
  }
}
