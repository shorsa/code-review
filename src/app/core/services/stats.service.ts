import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiEndpointsConstants } from 'src/app/core/constants';
import {
  RequestActivateAppointmentStatModel,
  RequestCreateAppointmentStatModel,
  RequestDeactivateAppointmentStatModel,
  RequestGetAppointmentStatByIdModel,
  RequestGetAppointmentStatsListModel,
  RequestUpdateAppointmentStatModel,
  ResponseGetAppointmentStatListModel,
  ResponseGetAppointmentStatByIdModel,
} from 'src/app/modules/dashboard/stats/models';
import { ApiEndpointHelper } from 'src/app/shared/helpers';
import { BaseResponseModel } from 'src/app/shared/models';

@Injectable({
  providedIn: 'root',
})
export class StatsService {
  constructor(private httpClient: HttpClient) {}

  create(model: RequestCreateAppointmentStatModel): Observable<BaseResponseModel> {
    return this.httpClient.post<BaseResponseModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.STATS_CREATE),
      model
    );
  }

  update(model: RequestUpdateAppointmentStatModel): Observable<BaseResponseModel> {
    return this.httpClient.post<BaseResponseModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.STATS_UPDATE),
      model
    );
  }

  getById(
    model: RequestGetAppointmentStatByIdModel
  ): Observable<ResponseGetAppointmentStatByIdModel> {
    return this.httpClient.get<ResponseGetAppointmentStatByIdModel>(
      `${ApiEndpointHelper.get(ApiEndpointsConstants.STATS_GET_BY_ID)}?id=${model.id}`
    );
  }

  getAll(
    model: RequestGetAppointmentStatsListModel
  ): Observable<ResponseGetAppointmentStatListModel> {
    return this.httpClient.post<ResponseGetAppointmentStatListModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.STATS_GET_ALL),
      model
    );
  }

  deactivate(
    model: RequestDeactivateAppointmentStatModel
  ): Observable<BaseResponseModel> {
    return this.httpClient.post<BaseResponseModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.STATS_DEACTIVATE),
      model
    );
  }

  activate(model: RequestActivateAppointmentStatModel): Observable<BaseResponseModel> {
    return this.httpClient.post<BaseResponseModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.STATS_ACTIVATE),
      model
    );
  }
}
