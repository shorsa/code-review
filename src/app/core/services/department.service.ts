import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiEndpointsConstants } from 'src/app/core/constants';
import {
  GetDepartmentOptionsResponseModel,
  RequestActionsDepartmentModel,
  RequestCreateDepartmentModel,
  RequestDeleteDepartmentModel,
  RequestGetDepartmentByIdModel,
  RequestGetDepartmentListModel,
  RequestGetDepartmentOptionsByClientIdModel,
  RequestUpdateDepartmentModel,
  ResponseActionsDepartmentModel,
  ResponseCreateDepartmentModel,
  ResponseDeleteDepartmentModel,
  ResponseGetDepartmentByIdModel,
  ResponseGetDepartmentListModel,
  ResponseUpdateDepartmentModel,
} from 'src/app/modules/dashboard/departments/models';
import { ApiEndpointHelper } from 'src/app/shared/helpers';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  constructor(private httpClient: HttpClient) {}

  create(model: RequestCreateDepartmentModel): Observable<ResponseCreateDepartmentModel> {
    return this.httpClient.post<ResponseCreateDepartmentModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.DEPARTMENT_CREATE),
      model
    );
  }

  getById(
    model: RequestGetDepartmentByIdModel
  ): Observable<ResponseGetDepartmentByIdModel> {
    return this.httpClient.get<ResponseGetDepartmentByIdModel>(
      `${ApiEndpointHelper.get(ApiEndpointsConstants.DEPARTMENT_GET_BY_ID)}?id=${
        model.id
      }`
    );
  }

  getAll(
    model: RequestGetDepartmentListModel
  ): Observable<ResponseGetDepartmentListModel> {
    return this.httpClient.post<ResponseGetDepartmentListModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.DEPARTMENT_GET_ALL),
      model
    );
  }

  update(model: RequestUpdateDepartmentModel): Observable<ResponseUpdateDepartmentModel> {
    return this.httpClient.post<ResponseUpdateDepartmentModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.DEPARTMENT_UPDATE),
      model
    );
  }

  activate(
    model: RequestActionsDepartmentModel
  ): Observable<ResponseActionsDepartmentModel> {
    return this.httpClient.post<ResponseActionsDepartmentModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.DEPARTMENT_ACTIVATE),
      model
    );
  }

  deactivate(
    model: RequestActionsDepartmentModel
  ): Observable<ResponseActionsDepartmentModel> {
    return this.httpClient.post<ResponseActionsDepartmentModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.DEPARTMENT_DEACTIVATE),
      model
    );
  }

  delete(model: RequestDeleteDepartmentModel): Observable<ResponseDeleteDepartmentModel> {
    return this.httpClient.post<ResponseDeleteDepartmentModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.DEPARTMENT_DELETE),
      model
    );
  }

  getDepartmentOptionsByClientId(
    model: RequestGetDepartmentOptionsByClientIdModel
  ): Observable<GetDepartmentOptionsResponseModel> {
    return this.httpClient.post<GetDepartmentOptionsResponseModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.DEPARTMENT_GET_OPTIONS_BY_ID),
      model
    );
  }
}
