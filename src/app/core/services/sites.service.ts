import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiEndpointsConstants } from 'src/app/core/constants';
import {
  RequestActivateSiteModel,
  RequestCreateSiteModel,
  RequestDeactivateSiteModel,
  RequestDeleteSiteDocumentModel,
  RequestGetSiteByIdModel,
  RequestGetSiteListModel,
  RequestUpdateSiteModel,
  ResponseGetSiteListModel,
  ResponseGetSiteModel,
} from 'src/app/modules/dashboard/locations/models';
import { ApiEndpointHelper } from 'src/app/shared/helpers';
import { BaseResponseModel } from 'src/app/shared/models';

@Injectable({
  providedIn: 'root',
})
export class SitesService {
  constructor(private httpClient: HttpClient) {}

  private getFormData<T>(model: RequestCreateSiteModel | RequestUpdateSiteModel): any {
    const formData = new FormData();
    formData.append('name', model.name);
    if ('locationId' in model) {
      formData.append('locationId', model.locationId);
    } else if ('id' in model) {
      formData.append('id', model.id);
    }

    if ((model as RequestCreateSiteModel).documents) {
      for (const file of (model as RequestCreateSiteModel).documents!) {
        formData.append('documents', file);
      }
    }
    if ((model as RequestUpdateSiteModel).newDocuments) {
      for (const file of (model as RequestUpdateSiteModel).newDocuments!) {
        formData.append('newDocuments', file);
      }
    }
    return formData;
  }

  create(model: RequestCreateSiteModel): Observable<BaseResponseModel> {
    const formData = this.getFormData<RequestCreateSiteModel>(model);

    return this.httpClient.post<BaseResponseModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.SITES_CREATE),
      formData
    );
  }

  getById(model: RequestGetSiteByIdModel): Observable<ResponseGetSiteModel> {
    return this.httpClient.get<ResponseGetSiteModel>(
      `${ApiEndpointHelper.get(ApiEndpointsConstants.SITES_GET_BY_ID)}?id=${model.id}`
    );
  }

  getAll(model: RequestGetSiteListModel): Observable<ResponseGetSiteListModel> {
    return this.httpClient.post<ResponseGetSiteListModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.SITES_GET_ALL),
      model
    );
  }

  update(model: RequestUpdateSiteModel): Observable<BaseResponseModel> {
    const formData = this.getFormData<RequestUpdateSiteModel>(model);

    return this.httpClient.post<BaseResponseModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.SITES_UPDATE),
      formData
    );
  }

  deactivate(model: RequestDeactivateSiteModel): Observable<BaseResponseModel> {
    return this.httpClient.post<BaseResponseModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.SITES_DEACTIVATE),
      model
    );
  }

  activate(model: RequestActivateSiteModel): Observable<BaseResponseModel> {
    return this.httpClient.post<BaseResponseModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.SITES_ACTIVATE),
      model
    );
  }

  deleteDocument(model: RequestDeleteSiteDocumentModel): Observable<BaseResponseModel> {
    return this.httpClient.post<BaseResponseModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.SITES_DOCUMENT_DELETE),
      model
    );
  }

  getByIdWithContent(model: RequestDeleteSiteDocumentModel): Observable<Blob> {
    return this.httpClient.get<Blob>(
      `${ApiEndpointHelper.get(
        ApiEndpointsConstants.SITES_DOCUMENT_DOWNLOAD
      )}?documentId=${model.documentId}`,
      { responseType: 'blob' as 'json' }
    );
  }
}
