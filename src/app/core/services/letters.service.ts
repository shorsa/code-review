import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiEndpointsConstants } from 'src/app/core/constants';
import {
  RequestGetAppointmentReportsListModel,
  ResponseGetAppointmentReportListModel,
} from 'src/app/modules/dashboard/letters/models';
import { ApiEndpointHelper } from 'src/app/shared/helpers';

@Injectable({
  providedIn: 'root',
})
export class LettersService {
  constructor(private httpClient: HttpClient) {}

  getAll(
    model: RequestGetAppointmentReportsListModel
  ): Observable<ResponseGetAppointmentReportListModel> {
    return this.httpClient.post<ResponseGetAppointmentReportListModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.LETTERS_GET_ALL),
      model
    );
  }
}
