import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiEndpointsConstants } from 'src/app/core/constants';
import {
  DeleteClientDocumentResponseModel,
  GetClientDocumentListResponseModel,
  RequestCreateClientDocumentModel,
  RequestDeleteClientDocumentModel,
  RequestGetClientDocumentByIdModel,
  RequestGetClientDocumentListByClientIdModel,
  RequestUpdateClientDocumentModel,
  ResponseCreateClientDocumentModel,
  UpdateClientDocumentResponseModel,
} from 'src/app/modules/dashboard/client/models';
import { ApiEndpointHelper } from 'src/app/shared/helpers';

@Injectable({
  providedIn: 'root',
})
export class ClientDocumentService {
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
    model: RequestCreateClientDocumentModel
  ): Observable<ResponseCreateClientDocumentModel> {
    const formData = this.getFormData<RequestCreateClientDocumentModel>(model);

    return this.httpClient.post<ResponseCreateClientDocumentModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.CLIENT_DOCUMENT_CREATE),
      formData
    );
  }

  getByIdWithContent(model: RequestGetClientDocumentByIdModel): Observable<Blob> {
    return this.httpClient.get<Blob>(
      `${ApiEndpointHelper.get(ApiEndpointsConstants.CLIENT_DOCUMENT_GET_BY_ID)}?id=${
        model.id
      }`,
      { responseType: 'blob' as 'json' }
    );
  }

  getAll(
    model: RequestGetClientDocumentListByClientIdModel
  ): Observable<GetClientDocumentListResponseModel> {
    return this.httpClient.post<GetClientDocumentListResponseModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.CLIENT_DOCUMENT_GET_ALL),
      model
    );
  }

  update(
    model: RequestUpdateClientDocumentModel
  ): Observable<UpdateClientDocumentResponseModel> {
    return this.httpClient.post<UpdateClientDocumentResponseModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.CLIENT_DOCUMENT_UPDATE),
      model
    );
  }

  delete(
    model: RequestDeleteClientDocumentModel
  ): Observable<DeleteClientDocumentResponseModel> {
    return this.httpClient.post<DeleteClientDocumentResponseModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.CLIENT_DOCUMENT_DELETE),
      model
    );
  }
}
