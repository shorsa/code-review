import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiEndpointsConstants } from 'src/app/core/constants';
import {
  RequestGetAvailableAppointmentDatesByMonthModel,
  ResponseGetAvailableAppointmentDatesByMonthModel,
  RequestActivateClinicModel,
  RequestCreateClinicModel,
  RequestDeactivateClinicModel,
  RequestGetAvailableAppointmentTimesOnDateModel,
  RequestGetClinicByIdModel,
  RequestGetClinicListModel,
  RequestUpdateClinicModel,
  ResponseCreateClinicModel,
  ResponseGetAvailableAppointmentTimesOnDateModel,
  ResponseGetClinicByIdModel,
  ResponseGetClinicListModel,
  RequestGetAvailableAppointmentDatesModel,
  ResponseGetAvailableAppointmentDatesModel,
} from 'src/app/modules/dashboard/clinics/models';
import { ApiEndpointHelper } from 'src/app/shared/helpers';
import { BaseResponseModel } from 'src/app/shared/models';

@Injectable({
  providedIn: 'root',
})
export class ClinicsService {
  constructor(private httpClient: HttpClient) {}

  create(model: RequestCreateClinicModel): Observable<ResponseCreateClinicModel> {
    return this.httpClient.post<ResponseCreateClinicModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.CLINICS_CREATE),
      model
    );
  }

  getById(model: RequestGetClinicByIdModel): Observable<ResponseGetClinicByIdModel> {
    return this.httpClient.get<ResponseGetClinicByIdModel>(
      `${ApiEndpointHelper.get(ApiEndpointsConstants.CLINICS_GET_BY_ID)}?id=${model.id}`
    );
  }

  getAll(model: RequestGetClinicListModel): Observable<ResponseGetClinicListModel> {
    return this.httpClient.post<ResponseGetClinicListModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.CLINICS_GET_ALL),
      model
    );
  }

  update(model: RequestUpdateClinicModel): Observable<BaseResponseModel> {
    return this.httpClient.post<BaseResponseModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.CLINICS_UPDATE),
      model
    );
  }

  deactivate(model: RequestDeactivateClinicModel): Observable<BaseResponseModel> {
    return this.httpClient.post<BaseResponseModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.CLINICS_DEACTIVATE),
      model
    );
  }

  activate(model: RequestActivateClinicModel): Observable<BaseResponseModel> {
    return this.httpClient.post<BaseResponseModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.CLINICS_ACTIVATE),
      model
    );
  }

  getAvailableAppointmentTimesOnDate(
    model: RequestGetAvailableAppointmentTimesOnDateModel
  ): Observable<ResponseGetAvailableAppointmentTimesOnDateModel> {
    return this.httpClient.post<ResponseGetAvailableAppointmentTimesOnDateModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.CLINICS_GET_AVAILABLE_APPOINTMENT_TIME),
      model
    );
  }

  getAvailableAppointmentDatesByMonth(
    model: RequestGetAvailableAppointmentDatesByMonthModel
  ): Observable<ResponseGetAvailableAppointmentDatesByMonthModel> {
    return this.httpClient.post<ResponseGetAvailableAppointmentDatesByMonthModel>(
      ApiEndpointHelper.get(
        ApiEndpointsConstants.CLINICS_GET_AVAILABLE_APPOINTMENT_DATES_BY_MONTH
      ),
      model
    );
  }

  getAvailableAppointmentDates(
    model: RequestGetAvailableAppointmentDatesModel
  ): Observable<ResponseGetAvailableAppointmentDatesModel> {
    return this.httpClient.post<ResponseGetAvailableAppointmentDatesModel>(
      ApiEndpointHelper.get(
        ApiEndpointsConstants.CLINICS_GET_AVAILABLE_APPOINTMENT_DATES
      ),
      model
    );
  }
}
