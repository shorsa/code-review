import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiEndpointsConstants } from 'src/app/core/constants';
import {
  RequestCreatePatientNoteModel,
  RequestDeleteConfidentialNoteModel,
  RequestGetNoteListByPatientIdModel,
  RequestUpdatePatientNoteModel,
  ResponseCreatePatientNoteModel,
  ResponseGetNoteListByPatientIdModel,
  ResponseUpdatePatientNoteModel,
} from 'src/app/modules/dashboard/patients/models/notes';
import { ApiEndpointHelper } from 'src/app/shared/helpers';
import { BaseResponseModel } from 'src/app/shared/models';

@Injectable({
  providedIn: 'root',
})
export class PatientNotesService {
  constructor(private httpClient: HttpClient) {}

  create(
    model: RequestCreatePatientNoteModel
  ): Observable<ResponseCreatePatientNoteModel> {
    return this.httpClient.post<ResponseCreatePatientNoteModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.PATIENT_NOTE_CREATE),
      model
    );
  }

  update(
    model: RequestUpdatePatientNoteModel
  ): Observable<ResponseUpdatePatientNoteModel> {
    return this.httpClient.post<ResponseUpdatePatientNoteModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.PATIENT_NOTE_UPDATE),
      model
    );
  }

  getAll(
    model: RequestGetNoteListByPatientIdModel
  ): Observable<ResponseGetNoteListByPatientIdModel> {
    return this.httpClient.post<ResponseGetNoteListByPatientIdModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.PATIENT_NOTE_GET_ALL),
      model
    );
  }

  deleteConfidentialNote(
    model: RequestDeleteConfidentialNoteModel
  ): Observable<BaseResponseModel> {
    return this.httpClient.post<BaseResponseModel>(
      ApiEndpointHelper.get(ApiEndpointsConstants.PATIENT_NOTE_DELETE),
      model
    );
  }
}
