import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiEndpointsConstants } from 'src/app/core/constants';
import {
  DeleteReferralDocumentResponseModel,
  ResponseGetReferralDocumentListModel,
  RequestCreateReferralDocumentModel,
  RequestDeleteReferralDocumentModel,
  RequestGetReferralDocumentByIdModel,
  RequestGetReferralDocumentListByReferralIdModel,
  RequestUpdateReferralDocumentModel,
  ResponseCreateReferralDocumentModel,
  UpdateReferralDocumentResponseModel,
} from 'src/app/modules/dashboard/referral/models';
import { ApiEndpointHelper } from 'src/app/shared/helpers';

@Injectable({
  providedIn: 'root',
})
export class ReferralDocumentService {
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
    model: RequestCreateReferralDocumentModel
  ): Observable<ResponseCreateReferralDocumentModel> {
    const formData = this.getFormData<RequestCreateReferralDocumentModel>(model);

    return this.httpClient.post<ResponseCreateReferralDocumentModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.REFERRAL_DOCUMENT_CREATE),
      formData
    );
  }

  getByIdWithContent(model: RequestGetReferralDocumentByIdModel): Observable<Blob> {
    return this.httpClient.get<Blob>(
      `${ApiEndpointHelper.get(ApiEndpointsConstants.REFERRAL_DOCUMENT_GET_BY_ID)}?id=${
        model.id
      }`,
      { responseType: 'blob' as 'json' }
    );
  }

  getAll(
    model: RequestGetReferralDocumentListByReferralIdModel
  ): Observable<ResponseGetReferralDocumentListModel> {
    return this.httpClient.post<ResponseGetReferralDocumentListModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.REFERRAL_DOCUMENT_GET_ALL),
      model
    );
  }

  update(
    model: RequestUpdateReferralDocumentModel
  ): Observable<UpdateReferralDocumentResponseModel> {
    return this.httpClient.post<UpdateReferralDocumentResponseModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.REFERRAL_DOCUMENT_UPDATE),
      model
    );
  }

  delete(
    model: RequestDeleteReferralDocumentModel
  ): Observable<DeleteReferralDocumentResponseModel> {
    return this.httpClient.post<DeleteReferralDocumentResponseModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.REFERRAL_DOCUMENT_DELETE),
      model
    );
  }
}
