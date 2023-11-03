import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiEndpointsConstants } from 'src/app/core/constants';
import {
  RequestCreateContractModel,
  RequestDeactivateContractModel,
  RequestGenerateSageExportModel,
  RequestGetContractByIdModel,
  RequestGetContractCliniciansOptionsByContractIdModel,
  RequestGetContractCliniciansOptionsModel,
  RequestGetContractListModel,
  RequestGetContractOptionsModel,
  RequestGetContractProductsOptionsByContractIdModel,
  RequestGetContractProductsOptionsModel,
  RequestReactivateContractModel,
  RequestUpdateContractModel,
  ResponseCreateContractModel,
  ResponseGetContractByIdModel,
  ResponseGetContractCliniciansModel,
  ResponseGetContractListModel,
  ResponseGetContractOptionsModel,
  ResponseGetContractProductsModel,
} from 'src/app/modules/dashboard/contracts/models';
import { ApiEndpointHelper } from 'src/app/shared/helpers';
import { BaseResponseModel } from 'src/app/shared/models';

@Injectable({
  providedIn: 'root',
})
export class ContractsService {
  constructor(private httpClient: HttpClient) {}

  create(model: RequestCreateContractModel): Observable<ResponseCreateContractModel> {
    return this.httpClient.post<ResponseCreateContractModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.CONTRACTS_CREATE),
      model
    );
  }

  getById(model: RequestGetContractByIdModel): Observable<ResponseGetContractByIdModel> {
    return this.httpClient.get<ResponseGetContractByIdModel>(
      `${ApiEndpointHelper.get(ApiEndpointsConstants.CONTRACTS_GET_BY_ID)}?id=${model.id}`
    );
  }

  getAll(model: RequestGetContractListModel): Observable<ResponseGetContractListModel> {
    return this.httpClient.post<ResponseGetContractListModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.CONTRACTS_GET_ALL),
      model
    );
  }

  update(model: RequestUpdateContractModel): Observable<BaseResponseModel> {
    return this.httpClient.post<BaseResponseModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.CONTRACTS_UPDATE),
      model
    );
  }

  deactivate(model: RequestDeactivateContractModel): Observable<BaseResponseModel> {
    return this.httpClient.post<BaseResponseModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.CONTRACTS_DEACTIVATE),
      model
    );
  }

  reactivate(model: RequestReactivateContractModel): Observable<BaseResponseModel> {
    return this.httpClient.post<BaseResponseModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.CONTRACTS_REACTIVATE),
      model
    );
  }

  markAsClosed(model: RequestDeactivateContractModel): Observable<BaseResponseModel> {
    return this.httpClient.post<BaseResponseModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.CONTRACTS_MARK_AS_CLOSED),
      model
    );
  }

  markAsOpen(model: RequestReactivateContractModel): Observable<BaseResponseModel> {
    return this.httpClient.post<BaseResponseModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.CONTRACTS_MARK_AS_OPEN),
      model
    );
  }

  getContractCliniciansOptions(
    model: RequestGetContractCliniciansOptionsModel
  ): Observable<ResponseGetContractCliniciansModel> {
    return this.httpClient.post<ResponseGetContractCliniciansModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.CONTRACTS_GET_CLINICIAN_OPTIONS),
      model
    );
  }

  getContractCliniciansOptionsByContractId(
    model: RequestGetContractCliniciansOptionsByContractIdModel
  ): Observable<ResponseGetContractCliniciansModel> {
    return this.httpClient.post<ResponseGetContractCliniciansModel>(
      ApiEndpointHelper.get(
        ApiEndpointsConstants.CONTRACTS_GET_CLINICIANS_OPTIONS_BY_CONTRACT_ID
      ),
      model
    );
  }

  downloadSelected(model: RequestGenerateSageExportModel): Observable<Blob> {
    return this.httpClient.post<Blob>(
      ApiEndpointHelper.get(ApiEndpointsConstants.CONTRACTS_GENERATE_SAGE_EXPORT),
      model,
      { responseType: 'blob' as 'json' }
    );
  }

  downloadContract(model: { id: string }): Observable<Blob> {
    return this.httpClient.post<Blob>(
      ApiEndpointHelper.get(ApiEndpointsConstants.CONTRACTS_DOWNLOAD),
      model,
      { responseType: 'blob' as 'json' }
    );
  }

  getContractProductsOptions(
    model: RequestGetContractProductsOptionsModel
  ): Observable<ResponseGetContractProductsModel> {
    return this.httpClient.post<ResponseGetContractProductsModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.CONTRACTS_GET_PRODUCTS_OPTIONS),
      model
    );
  }

  getContractProductsOptionsByContractId(
    model: RequestGetContractProductsOptionsByContractIdModel
  ): Observable<ResponseGetContractProductsModel> {
    return this.httpClient.post<ResponseGetContractProductsModel>(
      ApiEndpointHelper.get(
        ApiEndpointsConstants.CONTRACTS_GET_PRODUCT_OPTIONS_BY_CONTRACT_ID
      ),
      model
    );
  }

  getContractOptions(
    model: RequestGetContractOptionsModel
  ): Observable<ResponseGetContractOptionsModel> {
    return this.httpClient.post<ResponseGetContractOptionsModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.CONTRACTS_GET_OPTIONS),
      model
    );
  }
}
