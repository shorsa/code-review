import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiEndpointsConstants } from 'src/app/core/constants';
import {
  RequestCreateAppointmentDocumentModel,
  RequestDeleteAppointmentDocumentModel,
  RequestGetAppointmentDocumentByIdWithContentModel,
  RequestGetAppointmentDocumentListByAppointmentIdModel,
  ResponseGetAppointmentDocumentListModel,
} from 'src/app/modules/dashboard/appointments/models';
import { ApiEndpointHelper } from 'src/app/shared/helpers';
import { BaseResponseModel } from 'src/app/shared/models';

@Injectable({
  providedIn: 'root',
})
export class AppointmentDocumentService {
  constructor(private httpClient: HttpClient) {}

  private getFormData<T>(model: T): FormData {
    const formData = new FormData();

    if (typeof model !== 'object' || model === null) return formData;

    for (const key in model) {
      if (model.hasOwnProperty(key)) {
        const value = model[key] as string | Blob;
        formData.append(key, value);
      }
    }

    return formData;
  }

  create(model: RequestCreateAppointmentDocumentModel): Observable<BaseResponseModel> {
    const formData = this.getFormData<RequestCreateAppointmentDocumentModel>(model);

    return this.httpClient.post<BaseResponseModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.APPOINTMENTS_DOCUMENT_CREATE),
      formData
    );
  }

  download(model: RequestGetAppointmentDocumentByIdWithContentModel): Observable<Blob> {
    return this.httpClient.get<Blob>(
      `${ApiEndpointHelper.get(
        ApiEndpointsConstants.APPOINTMENTS_DOCUMENT_DOWNLOAD
      )}?id=${model.id}`,
      { responseType: 'blob' as 'json' }
    );
  }

  getAll(
    model: RequestGetAppointmentDocumentListByAppointmentIdModel
  ): Observable<ResponseGetAppointmentDocumentListModel> {
    return this.httpClient.post<ResponseGetAppointmentDocumentListModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.APPOINTMENTS_DOCUMENT_GET_ALL),
      model
    );
  }

  delete(model: RequestDeleteAppointmentDocumentModel): Observable<BaseResponseModel> {
    return this.httpClient.post<BaseResponseModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.APPOINTMENTS_DOCUMENT_DELETE),
      model
    );
  }
}
