import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiEndpointsConstants } from 'src/app/core/constants';
import {
  RequestActivateAppointmentModel,
  RequestCreateAppointmentModel,
  RequestDeactivateAppointmentModel,
  RequestGetAppointmentByIdModel,
  RequestGetAppointmentListModel,
  RequestGetPatientDetailsByAppointmentIdModel,
  RequestUpdateAppointmentDetailsModel,
  RequestUpdateAppointmentModel,
  RequestUpdateAppointmentReportModel,
  RequestUpdateAppointmentSettingsModel,
  RequestUpdateAppointmentStatusModel,
  RequestUpdatePatientContactInformationModel,
  ResponseCreateAppointmentModel,
  ResponseGetAppointmentByIdModel,
  ResponseGetAppointmentListModel,
  ResponseGetPatientDetailsByAppointmentIdModel,
} from 'src/app/modules/dashboard/appointments/models';
import { RequestGetAppointmentAuditLogsModel } from 'src/app/modules/dashboard/appointments/models/request/request-get-appointment-audit-logs.model';
import { ResponseGetAuditLogListModel } from 'src/app/modules/dashboard/appointments/models/response/response-get-audit-log-list.model';
import { ApiEndpointHelper } from 'src/app/shared/helpers';
import { BaseResponseModel } from 'src/app/shared/models';

@Injectable({
  providedIn: 'root',
})
export class AppointmentsService {
  constructor(private httpClient: HttpClient) {}

  private getFormData(model: RequestUpdateAppointmentReportModel): FormData {
    const formData = new FormData();

    if (typeof model !== 'object' || model === null) return formData;

    for (const key in model) {
      if (model.hasOwnProperty(key)) {
        const value = model[key as keyof RequestUpdateAppointmentReportModel];

        if (value instanceof Array && key === 'voiceFiles') {
          value.forEach((file: Blob, index: number) => {
            formData.append(`voiceFiles`, file, `voiceFile-${index}.blob`);
          });
        } else if (typeof value === 'string' || value instanceof Blob) {
          formData.append(key, value);
        } else if (typeof value === 'boolean') {
          formData.append(key, value ? '1' : '0');
        }
      }
    }

    return formData;
  }

  create(
    model: RequestCreateAppointmentModel
  ): Observable<ResponseCreateAppointmentModel> {
    return this.httpClient.post<ResponseCreateAppointmentModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.APPOINTMENTS_CREATE),
      model
    );
  }

  getById(
    model: RequestGetAppointmentByIdModel
  ): Observable<ResponseGetAppointmentByIdModel> {
    return this.httpClient.get<ResponseGetAppointmentByIdModel>(
      `${ApiEndpointHelper.get(ApiEndpointsConstants.APPOINTMENTS_GET_BY_ID)}?id=${
        model.id
      }`
    );
  }

  getAll(
    model: RequestGetAppointmentListModel
  ): Observable<ResponseGetAppointmentListModel> {
    return this.httpClient.post<ResponseGetAppointmentListModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.APPOINTMENTS_GET_ALL),
      model
    );
  }

  update(model: RequestUpdateAppointmentModel): Observable<BaseResponseModel> {
    return this.httpClient.post<BaseResponseModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.APPOINTMENTS_UPDATE),
      model
    );
  }

  deactivate(model: RequestDeactivateAppointmentModel): Observable<BaseResponseModel> {
    return this.httpClient.post<BaseResponseModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.APPOINTMENTS_DEACTIVATE),
      model
    );
  }

  activate(model: RequestActivateAppointmentModel): Observable<BaseResponseModel> {
    return this.httpClient.post<BaseResponseModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.APPOINTMENTS_ACTIVATE),
      model
    );
  }

  cancel(model: { id: string }): Observable<BaseResponseModel> {
    return this.httpClient.post<BaseResponseModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.APPOINTMENTS_CANCEL),
      model
    );
  }

  getAppointmentAuditLogs(
    model: RequestGetAppointmentAuditLogsModel
  ): Observable<ResponseGetAuditLogListModel> {
    return this.httpClient.post<ResponseGetAuditLogListModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.APPOINTMENTS_GET_AUDIT_LOGS),
      model
    );
  }

  updateAppointmentDetails(
    model: RequestUpdateAppointmentDetailsModel
  ): Observable<BaseResponseModel> {
    return this.httpClient.post<BaseResponseModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.APPOINTMENTS_UPDATE_DETAILS),
      model
    );
  }

  updateAppointmentSettings(
    model: RequestUpdateAppointmentSettingsModel
  ): Observable<BaseResponseModel> {
    return this.httpClient.post<BaseResponseModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.APPOINTMENTS_UPDATE_SETTINGS),
      model
    );
  }

  appointmentChangeStatus(
    model: RequestUpdateAppointmentStatusModel
  ): Observable<BaseResponseModel> {
    return this.httpClient.post<BaseResponseModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.APPOINTMENTS_UPDATE_STATUS),
      model
    );
  }

  updatePatientContactInformation(
    model: RequestUpdatePatientContactInformationModel
  ): Observable<BaseResponseModel> {
    return this.httpClient.post<BaseResponseModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.PATIENT_UPDATE_CONTRACT_INFORM),
      model
    );
  }

  updateAppointmentReport(
    model: RequestUpdateAppointmentReportModel
  ): Observable<BaseResponseModel> {
    const formData = this.getFormData(model);

    return this.httpClient.post<BaseResponseModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.APPOINTMENTS_UPDATE_REPORT),
      formData
    );
  }

  getPatientDetailsByAppointmentId(
    model: RequestGetPatientDetailsByAppointmentIdModel
  ): Observable<ResponseGetPatientDetailsByAppointmentIdModel> {
    return this.httpClient.get<ResponseGetPatientDetailsByAppointmentIdModel>(
      `${ApiEndpointHelper.get(
        ApiEndpointsConstants.APPOINTMENTS_GET_PATIENT_DETAILS
      )}?appointmentId=${model.appointmentId}`
    );
  }
}
