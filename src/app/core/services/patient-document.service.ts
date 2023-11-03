import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiEndpointsConstants } from 'src/app/core/constants';
import {
  RequestCreatePatientDocumentModel,
  RequestDeletePatientDocumentModel,
  RequestDownloadPatientDocumentsModel,
  RequestGetPatientDocumentListByPatientIdModel,
  ResponseCreatePatientDocumentModel,
  ResponseDeletePatientDocumentModel,
  ResponseGetPatientDocumentListModel,
} from 'src/app/modules/dashboard/patients/models/documents';
import { ApiEndpointHelper } from 'src/app/shared/helpers';

@Injectable({
  providedIn: 'root',
})
export class PatientDocumentService {
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

  create(
    model: RequestCreatePatientDocumentModel
  ): Observable<ResponseCreatePatientDocumentModel> {
    const formData = this.getFormData<RequestCreatePatientDocumentModel>(model);

    return this.httpClient.post<ResponseCreatePatientDocumentModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.PATIENT_DOCUMENT_CREATE),
      formData
    );
  }

  download(model: RequestDownloadPatientDocumentsModel): Observable<Blob> {
    return this.httpClient.post<Blob>(
      ApiEndpointHelper.get(ApiEndpointsConstants.PATIENT_DOCUMENT_DOWNLOAD),
      model,
      { responseType: 'blob' as 'json' }
    );
  }

  getAll(
    model: RequestGetPatientDocumentListByPatientIdModel
  ): Observable<ResponseGetPatientDocumentListModel> {
    return this.httpClient.post<ResponseGetPatientDocumentListModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.PATIENT_DOCUMENT_GET_ALL),
      model
    );
  }

  // update(
  //   model: RequestUpdateClientDocumentModel
  // ): Observable<UpdateClientDocumentResponseModel> {
  //   return this.httpClient.post<UpdateClientDocumentResponseModel>(
  //     ApiEndpointHelper.get(ApiEndpointsConstants.PATIENT_DOCUMENT_UPDATE),
  //     model
  //   );
  // }

  delete(
    model: RequestDeletePatientDocumentModel
  ): Observable<ResponseDeletePatientDocumentModel> {
    return this.httpClient.post<ResponseDeletePatientDocumentModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.PATIENT_DOCUMENT_DELETE),
      model
    );
  }
}
