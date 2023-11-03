import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiEndpointsConstants } from 'src/app/core/constants';
import {
  RequestAcceptTermsAndConditionsModel,
  RequestCreateTermsAndConditionsModel,
  RequestDeleteTermsAndConditionsModel,
  RequestDownloadClientTermsAndConditionsModel,
  RequestGetTermsAndConditionsListModel,
  RequestGetTermsAndConditionsModel,
  RequestUpdateTermsAndConditionsModel,
  ResponseCreateTermsAndConditionsModel,
  ResponseDeleteTermsAndConditionsModel,
  ResponseGetTermsAndConditionsListModel,
  ResponseGetTermsAndConditionsModel,
  ResponseUpdateTermsAndConditionsModel,
} from 'src/app/modules/dashboard/client/models';

import { ApiEndpointHelper } from 'src/app/shared/helpers';
import { BaseResponseModel } from 'src/app/shared/models';

@Injectable({
  providedIn: 'root',
})
export class TermsAndConditionsService {
  constructor(private httpClient: HttpClient) {}

  create(
    model: RequestCreateTermsAndConditionsModel
  ): Observable<ResponseCreateTermsAndConditionsModel> {
    return this.httpClient.post<ResponseCreateTermsAndConditionsModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.TERMS_AND_CONDITIONS_DOCUMENT_CREATE),
      model
    );
  }

  update(
    model: RequestUpdateTermsAndConditionsModel
  ): Observable<ResponseUpdateTermsAndConditionsModel> {
    return this.httpClient.post<ResponseUpdateTermsAndConditionsModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.TERMS_AND_CONDITIONS_DOCUMENT_UPDATE),
      model
    );
  }

  acceptTermsAndConditions(
    model: RequestAcceptTermsAndConditionsModel
  ): Observable<BaseResponseModel> {
    return this.httpClient.post<BaseResponseModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.TERMS_AND_CONDITIONS_ACCEPT),
      model
    );
  }

  downloadTermsAndConditionsByClientId(
    model: RequestDownloadClientTermsAndConditionsModel
  ): Observable<Blob> {
    return this.httpClient.get<Blob>(
      `${ApiEndpointHelper.get(
        ApiEndpointsConstants.TERMS_AND_CONDITIONS_DOCUMENT_DOWNLOAD
      )}?clientId=${model.clientId}`,
      { responseType: 'blob' as 'json' }
    );
  }

  getByClientId(
    model: RequestGetTermsAndConditionsModel
  ): Observable<ResponseGetTermsAndConditionsModel> {
    return this.httpClient.get<ResponseGetTermsAndConditionsModel>(
      `${ApiEndpointHelper.get(
        ApiEndpointsConstants.TERMS_AND_CONDITIONS_DOCUMENT_GET_BY_CLIENT_ID
      )}?clientId=${model.clientId}`
    );
  }

  getUserTerms(): Observable<BaseResponseModel> {
    return this.httpClient.post<BaseResponseModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.TERMS_AND_CONDITIONS_GET_USER_TERMS),
      {}
    );
  }

  getAll(
    model: RequestGetTermsAndConditionsListModel
  ): Observable<ResponseGetTermsAndConditionsListModel> {
    return this.httpClient.post<ResponseGetTermsAndConditionsListModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.TERMS_AND_CONDITIONS_DOCUMENT_GET_ALL),
      model
    );
  }

  delete(
    model: RequestDeleteTermsAndConditionsModel
  ): Observable<ResponseDeleteTermsAndConditionsModel> {
    return this.httpClient.post<ResponseDeleteTermsAndConditionsModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.TERMS_AND_CONDITIONS_DOCUMENT_DELETE),
      model
    );
  }
}
