import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiEndpointsConstants } from 'src/app/core/constants';
import {
  RequestActivatePatientModel,
  RequestCancelPreDeleteModel,
  RequestChangeDeletionDateModel,
  RequestCreatePatientModel,
  RequestDeactivatePatientModel,
  RequestDeletePatientJobDocumentModel,
  RequestDeletePatientModel,
  RequestGetPatientByIdModel,
  RequestGetPatientListModel,
  RequestGetPatientOptionsModel,
  RequestGetPreDeleteListModel,
  RequestMergePatientsModel,
  RequestTransferPatientsToDepartmentModel,
  RequestUpdatePatientModal,
  ResponseCreatePatientModel,
  ResponseGetPatientByIdModel,
  ResponseGetPatientListModel,
  ResponseGetPatientOptionsModel,
  ResponseGetPatientPreDeleteListModel,
  ResponseUpdatePatientModel,
} from 'src/app/modules/dashboard/patients/models/patients';

import { ApiEndpointHelper } from 'src/app/shared/helpers';
import { BaseResponseModel } from 'src/app/shared/models';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  constructor(private httpClient: HttpClient) {}

  private getFormData<T>(
    model: RequestUpdatePatientModal | RequestCreatePatientModel
  ): FormData {
    const formData = new FormData();

    const getIsoString = (dateString: string) => {
      const dateObj = new Date(dateString);
      const isoString = dateObj.toISOString();
      return isoString;
    };

    if ((model as RequestUpdatePatientModal)?.id)
      formData.append('id', (model as RequestUpdatePatientModal)?.id);
    formData.append('firstName', model.firstName);
    formData.append('lastName', model.lastName);
    formData.append('dateOfBirth', getIsoString(model.dateOfBirth));
    if (model?.pin) formData.append('pin', model?.pin);
    formData.append('homeAddress', model.homeAddress);
    if (model?.email) formData.append('email', model?.email);
    formData.append('phoneNumber', model.phoneNumber);
    formData.append('phoneCode', model.phoneCode.toString());
    if (model.gender) formData.append('gender', model.gender?.toString());
    formData.append('clientId', model.clientId);
    model.patientJobs?.forEach((job, jobIndex) => {
      if (job.id) formData.append(`patientJobs[${jobIndex}].id`, job.id);
      if (job.patientId)
        formData.append(`patientJobs[${jobIndex}].patientId`, job.patientId);
      if (job.title) formData.append(`patientJobs[${jobIndex}].title`, job.title);
      if (job.description)
        formData.append(`patientJobs[${jobIndex}].description`, job.description);
      if (job.startDate)
        formData.append(
          `patientJobs[${jobIndex}].startDate`,
          getIsoString(job.startDate)
        );
      formData.append(`patientJobs[${jobIndex}].notAvailable`, `${job.notAvailable}`);

      job.patientJobDocuments?.forEach((document, docIndex) => {
        if (document.id)
          formData.append(
            `patientJobs[${jobIndex}].patientJobDocuments[${docIndex}].id`,
            document.id
          );
        if (document.patientJobId)
          formData.append(
            `patientJobs[${jobIndex}].patientJobDocuments[${docIndex}].patientJobId`,
            document.patientJobId
          );
        if (document.name)
          formData.append(
            `patientJobs[${jobIndex}].patientJobDocuments[${docIndex}].name`,
            document.name
          );

        if (document.file) {
          formData.append(
            `patientJobs[${jobIndex}].patientJobDocuments[${docIndex}].file`,
            document.file,
            document.file.name
          );
        }
      });
    });

    // Для массива departmentIds
    model.departmentIds?.forEach((departmentId: string, index: number) => {
      formData.append(`departmentIds[${index}]`, departmentId);
    });

    // Для массива occupationalHistory
    model.occupationalHistory?.forEach((history: string, index: number) => {
      if (history) formData.append(`occupationalHistory[${index}]`, history);
    });

    return formData;
  }

  create(model: RequestCreatePatientModel): Observable<ResponseCreatePatientModel> {
    const formData = this.getFormData<ResponseCreatePatientModel>(model);

    return this.httpClient.post<ResponseCreatePatientModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.PATIENT_CREATE),
      formData
    );
  }

  getById(model: RequestGetPatientByIdModel): Observable<ResponseGetPatientByIdModel> {
    return this.httpClient.get<ResponseGetPatientByIdModel>(
      `${ApiEndpointHelper.get(ApiEndpointsConstants.PATIENT_GET_BY_ID)}?id=${model.id}`
    );
  }

  getAll(model: RequestGetPatientListModel): Observable<ResponseGetPatientListModel> {
    return this.httpClient.post<ResponseGetPatientListModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.PATIENT_GET_ALL),
      model
    );
  }

  transferPatientsToDepartment(
    model: RequestTransferPatientsToDepartmentModel
  ): Observable<BaseResponseModel> {
    return this.httpClient.post<BaseResponseModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.PATIENT_TRANSFER_TO_DEPARTMENT),
      model
    );
  }

  merge(model: RequestMergePatientsModel): Observable<BaseResponseModel> {
    return this.httpClient.post<BaseResponseModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.PATIENT_MERGE),
      model
    );
  }

  update(model: RequestUpdatePatientModal): Observable<ResponseUpdatePatientModel> {
    const formData = this.getFormData<ResponseUpdatePatientModel>(model);

    return this.httpClient.post<ResponseUpdatePatientModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.PATIENT_UPDATE),
      formData
    );
  }

  delete(model: RequestDeletePatientModel): Observable<BaseResponseModel> {
    return this.httpClient.post<BaseResponseModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.PATIENT_DELETE),
      model
    );
  }

  deactivate(model: RequestDeactivatePatientModel): Observable<BaseResponseModel> {
    return this.httpClient.post<BaseResponseModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.PATIENT_DEACTIVATE),
      model
    );
  }

  activate(model: RequestActivatePatientModel): Observable<BaseResponseModel> {
    return this.httpClient.post<BaseResponseModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.PATIENT_ACTIVATE),
      model
    );
  }

  getPreDeletePatients(
    model: RequestGetPreDeleteListModel
  ): Observable<ResponseGetPatientPreDeleteListModel> {
    return this.httpClient.post<ResponseGetPatientPreDeleteListModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.PATIENT_GET_PRE_DELETE),
      model
    );
  }

  changeDeletionDate(
    model: RequestChangeDeletionDateModel
  ): Observable<BaseResponseModel> {
    return this.httpClient.post<BaseResponseModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.PATIENT_CHANGE_DELETION_DATE),
      model
    );
  }

  cancelPreDelete(model: RequestCancelPreDeleteModel): Observable<BaseResponseModel> {
    return this.httpClient.post<BaseResponseModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.PATIENT_CANCEL_PRE_DELETE),
      model
    );
  }

  deletePreDelete(model: RequestCancelPreDeleteModel): Observable<BaseResponseModel> {
    return this.httpClient.post<BaseResponseModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.PATIENT_DELETE_PRE_DELETE),
      model
    );
  }

  getPatientOptions(
    model: RequestGetPatientOptionsModel
  ): Observable<ResponseGetPatientOptionsModel> {
    return this.httpClient.post<ResponseGetPatientOptionsModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.PATIENT_GET_OPTIONS),
      model
    );
  }

  deletePatientJobDocument(
    model: RequestDeletePatientJobDocumentModel
  ): Observable<BaseResponseModel> {
    return this.httpClient.post<BaseResponseModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.PATIENT_DELETE_PATIENT_JOB_DOCUMENT),
      model
    );
  }
}
