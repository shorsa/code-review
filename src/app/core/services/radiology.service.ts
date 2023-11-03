import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiEndpointsConstants } from 'src/app/core/constants';
import {
  RequestCreateMriRequestModel,
  RequestDismissMriRequestModel,
  RequestGetMriRequestListModel,
  RequestMarkAsPrintedMriModel,
  ResponseGetMriRequestListModel,
  ResponseGetMriTypesModel,
} from 'src/app/modules/dashboard/radiology/models';

import { ApiEndpointHelper } from 'src/app/shared/helpers';
import { BaseResponseModel } from 'src/app/shared/models';

@Injectable({
  providedIn: 'root',
})
export class RadiologyService {
  constructor(private httpClient: HttpClient) {}

  create(model: RequestCreateMriRequestModel): Observable<BaseResponseModel> {
    return this.httpClient.post<BaseResponseModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.RADIOLOGY_CREATE),
      model
    );
  }

  getAll(
    model: RequestGetMriRequestListModel
  ): Observable<ResponseGetMriRequestListModel> {
    return this.httpClient.post<ResponseGetMriRequestListModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.RADIOLOGY_GET_ALL),
      model
    );
  }

  dismiss(model: RequestDismissMriRequestModel): Observable<BaseResponseModel> {
    return this.httpClient.post<BaseResponseModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.RADIOLOGY_DISMISS),
      model
    );
  }

  markAsPrinted(model: RequestMarkAsPrintedMriModel): Observable<BaseResponseModel> {
    return this.httpClient.post<BaseResponseModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.RADIOLOGY_MARK_AS_PRINTED),
      model
    );
  }

  getMriTypes(): Observable<ResponseGetMriTypesModel> {
    return this.httpClient.get<ResponseGetMriTypesModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.RADIOLOGY_GET_MRI_TYPES)
    );
  }

  getMriRequestByIdWithContent(id: string): Observable<Blob> {
    return this.httpClient.get<Blob>(
      `${ApiEndpointHelper.get(
        ApiEndpointsConstants.RADIOLOGY_GET_MRI_CONTENT
      )}?id=${id}`,
      { responseType: 'blob' as 'json' }
    );
  }
}
