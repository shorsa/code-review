import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiEndpointsConstants } from 'src/app/core/constants';
import {
  RequestGetAuditLogsByPatientIdModel,
  ResponseGetAuditLogListModel,
} from 'src/app/modules/dashboard/patients/models/patients';
import { ApiEndpointHelper } from 'src/app/shared/helpers';

@Injectable({
  providedIn: 'root',
})
export class PatientAuditLogsService {
  constructor(private httpClient: HttpClient) {}

  getAll(
    model: RequestGetAuditLogsByPatientIdModel
  ): Observable<ResponseGetAuditLogListModel> {
    return this.httpClient.post<ResponseGetAuditLogListModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.PATIENT_AUDIT_LOG_GET_ALL),
      model
    );
  }
}
