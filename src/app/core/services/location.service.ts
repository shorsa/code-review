import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiEndpointsConstants } from 'src/app/core/constants';
import {
  RequestActivateLocationModel,
  RequestCheckLocationForDeactivationModel,
  RequestCreateLocationModel,
  RequestDeactivateLocationModel,
  RequestGetLocationByIdModel,
  RequestGetLocationListModel,
  RequestUpdateLocationModel,
  ResponseCheckLocationEntityForDeactivationAppointmentModel,
  ResponseCheckLocationEntityForDeactivationModel,
  ResponseGetLocationListModel,
  ResponseGetLocationModel,
} from 'src/app/modules/dashboard/locations/models';
import { ApiEndpointHelper } from 'src/app/shared/helpers';
import { BaseResponseModel } from 'src/app/shared/models';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor(private httpClient: HttpClient) {}

  create(model: RequestCreateLocationModel): Observable<BaseResponseModel> {
    return this.httpClient.post<BaseResponseModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.LOCATIONS_CREATE),
      model
    );
  }

  getById(model: RequestGetLocationByIdModel): Observable<ResponseGetLocationModel> {
    return this.httpClient.get<ResponseGetLocationModel>(
      `${ApiEndpointHelper.get(ApiEndpointsConstants.LOCATIONS_GET_BY_ID)}?id=${model.id}`
    );
  }

  getAll(model: RequestGetLocationListModel): Observable<ResponseGetLocationListModel> {
    return this.httpClient.post<ResponseGetLocationListModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.LOCATIONS_GET_ALL),
      model
    );
  }

  update(model: RequestUpdateLocationModel): Observable<BaseResponseModel> {
    return this.httpClient.post<BaseResponseModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.LOCATIONS_UPDATE),
      model
    );
  }

  deactivate(model: RequestDeactivateLocationModel): Observable<BaseResponseModel> {
    return this.httpClient.post<BaseResponseModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.LOCATIONS_DEACTIVATE),
      model
    );
  }

  activate(model: RequestActivateLocationModel): Observable<BaseResponseModel> {
    return this.httpClient.post<BaseResponseModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.LOCATIONS_ACTIVATE),
      model
    );
  }

  checkLocationEntityForDeactivation(
    model: RequestCheckLocationForDeactivationModel
  ): Observable<ResponseCheckLocationEntityForDeactivationModel> {
    return this.httpClient.post<ResponseCheckLocationEntityForDeactivationModel>(
      ApiEndpointHelper.get(
        ApiEndpointsConstants.LOCATIONS_CHECK_APPOINTMENTS_FOR_DEACTIVATE
      ),
      model
    );
  }
}
