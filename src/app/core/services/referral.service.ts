import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiEndpointsConstants } from 'src/app/core/constants';
import { ResponseGetAuditLogListModel } from 'src/app/modules/dashboard/patients/models/patients';
import {
  RequestCreateReferralModel,
  CreateReferralResponseModel,
  RequestGetReferralByIdModel,
  ResponseGetReferralModel,
  RequestGetReferralListModel,
  ResponseGetReferralListModel,
  RequestUpdateReferralModel,
  RequestUpdateReferralStatusModel,
  RequestDeleteReferralModel,
  RequestActivateReferralModel,
  RequestDeactivateReferralModel,
  RequestGetOccupationalHealthGeneralReferralByIdModel,
  ResponseGetOccupationalHealthGeneralReferralModel,
  RequestGetManagementReferralByIdModel,
  ResponseGetManagementReferralModel,
  RequestUpdateManagementReferralModel,
  RequestUpdateOccupationalHealthGeneralReferralModel,
  RequestGetReferralOptionsModel,
  ResponseGetReferralOptionsModel,
  RequestUpdateReferralProductModel,
  RequestGetReferralAuditLogsModel,
} from 'src/app/modules/dashboard/referral/models';
import { ApiEndpointHelper } from 'src/app/shared/helpers';
import { BaseResponseModel } from 'src/app/shared/models';

@Injectable({
  providedIn: 'root',
})
export class ReferralService {
  constructor(private httpClient: HttpClient) {}

  create(model: RequestCreateReferralModel): Observable<CreateReferralResponseModel> {
    return this.httpClient.post<CreateReferralResponseModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.REFERRAL_CREATE),
      model
    );
  }

  getById(model: RequestGetReferralByIdModel): Observable<ResponseGetReferralModel> {
    return this.httpClient.get<ResponseGetReferralModel>(
      `${ApiEndpointHelper.get(ApiEndpointsConstants.REFERRAL_GET_BY_ID)}?id=${model.id}`
    );
  }

  getAll(model: RequestGetReferralListModel): Observable<ResponseGetReferralListModel> {
    return this.httpClient.post<ResponseGetReferralListModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.REFERRAL_GET_ALL),
      model
    );
  }

  update(model: RequestUpdateReferralModel): Observable<BaseResponseModel> {
    return this.httpClient.post<BaseResponseModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.REFERRAL_UPDATE),
      model
    );
  }

  updateStatus(model: RequestUpdateReferralStatusModel): Observable<BaseResponseModel> {
    return this.httpClient.post<BaseResponseModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.REFERRAL_UPDATE_STATUS),
      model
    );
  }

  updateProductSameType(
    model: RequestUpdateReferralProductModel
  ): Observable<BaseResponseModel> {
    return this.httpClient.post<BaseResponseModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.REFERRAL_UPDATE_PRODUCT_SAME_TYPE),
      model
    );
  }

  updateProductNewType(
    model: RequestUpdateReferralProductModel
  ): Observable<BaseResponseModel & { id: string }> {
    return this.httpClient.post<BaseResponseModel & { id: string }>(
      ApiEndpointHelper.get(ApiEndpointsConstants.REFERRAL_UPDATE_PRODUCT_NEW_TYPE),
      model
    );
  }

  delete(model: RequestDeleteReferralModel): Observable<BaseResponseModel> {
    return this.httpClient.post<BaseResponseModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.REFERRAL_DELETE),
      model
    );
  }
  activate(model: RequestActivateReferralModel): Observable<BaseResponseModel> {
    return this.httpClient.post<BaseResponseModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.REFERRAL_ACTIVATE),
      model
    );
  }
  deactivate(model: RequestDeactivateReferralModel): Observable<BaseResponseModel> {
    return this.httpClient.post<BaseResponseModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.REFERRAL_DEACTIVATE),
      model
    );
  }

  getOccupationalHealthGeneralReferralById(
    model: RequestGetOccupationalHealthGeneralReferralByIdModel
  ): Observable<ResponseGetOccupationalHealthGeneralReferralModel> {
    return this.httpClient.get<ResponseGetOccupationalHealthGeneralReferralModel>(
      `${ApiEndpointHelper.get(
        ApiEndpointsConstants.REFERRAL_GET_OCCUPATIONAL_REFERRAL
      )}?id=${model.id}`
    );
  }

  getManagementReferralById(
    model: RequestGetManagementReferralByIdModel
  ): Observable<ResponseGetManagementReferralModel> {
    return this.httpClient.get<ResponseGetManagementReferralModel>(
      `${ApiEndpointHelper.get(
        ApiEndpointsConstants.REFERRAL_GET_MANAGEMENT_REFERRAL
      )}?id=${model.id}`
    );
  }

  updateManagementReferral(
    model: RequestUpdateManagementReferralModel
  ): Observable<BaseResponseModel> {
    return this.httpClient.post<BaseResponseModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.REFERRAL_UPDATE_MANAGEMENT_REFERRAL),
      model
    );
  }

  updateOccupationalHealthGeneralReferral(
    model: RequestUpdateOccupationalHealthGeneralReferralModel
  ): Observable<BaseResponseModel> {
    return this.httpClient.post<BaseResponseModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.REFERRAL_UPDATE_OCCUPATIONAL_REFERRAL),
      model
    );
  }

  getReferralOptions(
    model: RequestGetReferralOptionsModel
  ): Observable<ResponseGetReferralOptionsModel> {
    return this.httpClient.post<ResponseGetReferralOptionsModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.REFERRAL_GET_OPTIONS),
      model
    );
  }

  getReferralDocument(id: string): Observable<Blob> {
    return this.httpClient.get<Blob>(
      `${ApiEndpointHelper.get(
        ApiEndpointsConstants.REFERRAL_DOWNLOAD_PREVIEW
      )}?id=${id}`,
      { responseType: 'blob' as 'json' }
    );
  }

  getReferralAuditLogs(
    model: RequestGetReferralAuditLogsModel
  ): Observable<ResponseGetAuditLogListModel> {
    return this.httpClient.post<ResponseGetAuditLogListModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.REFERRAL_GET_AUDIT_LOGS),
      model
    );
  }
}
