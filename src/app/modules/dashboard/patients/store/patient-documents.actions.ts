import { createAction, props } from '@ngrx/store';
import {
  RequestCreatePatientDocumentModel,
  RequestDeletePatientDocumentModel,
  RequestDownloadPatientDocumentsModel,
  RequestGetPatientDocumentListByPatientIdModel,
  ResponseCreatePatientDocumentModel,
  ResponseDeletePatientDocumentModel,
  ResponseGetPatientDocumentListModel,
} from '../models/documents';

//CREATE PATIENT  DOCUMENT
const PATIENT_DOCUMENT_CREATE = '[PATIENT] patient documents create';
export const patientDocumentCreateAction = createAction(
  PATIENT_DOCUMENT_CREATE,
  props<{
    payload: {
      data: RequestCreatePatientDocumentModel;
      searchParams: RequestGetPatientDocumentListByPatientIdModel;
    };
  }>()
);

export const patientDocumentCreateSuccessAction = createAction(
  `${PATIENT_DOCUMENT_CREATE} success`,
  props<{
    payload: {
      data: ResponseCreatePatientDocumentModel;
      searchParams: RequestGetPatientDocumentListByPatientIdModel;
    };
  }>()
);

//SEARCH PATIENT  DOCUMENTS
const PATIENT_DOCUMENT_SEARCH = '[PATIENT] search patient documents ';
export const patientDocumentsSearchAction = createAction(
  PATIENT_DOCUMENT_SEARCH,
  props<{ payload: RequestGetPatientDocumentListByPatientIdModel }>()
);

export const patientDocumentsSearchSuccessAction = createAction(
  `${PATIENT_DOCUMENT_SEARCH} success`,
  props<{
    payload: ResponseGetPatientDocumentListModel;
  }>()
);

//DELETE PATIENT  DOCUMENT
const PATIENT_DOCUMENT_DELETE = '[PATIENT] delete patient documents';
export const patientDocumentDeleteAction = createAction(
  PATIENT_DOCUMENT_DELETE,
  props<{
    payload: {
      data: RequestDeletePatientDocumentModel;
      searchParams: RequestGetPatientDocumentListByPatientIdModel;
    };
  }>()
);

export const patientDocumentDeleteSuccessAction = createAction(
  `${PATIENT_DOCUMENT_DELETE} success`,
  props<{
    payload: {
      data: ResponseDeletePatientDocumentModel;
      searchParams: RequestGetPatientDocumentListByPatientIdModel;
    };
  }>()
);

//DOWNLOAD PATIENT  DOCUMENT
const DOWNLOAD_DOCUMENT = '[PATIENT] download patient document';
export const downloadPatientDocumentAction = createAction(
  DOWNLOAD_DOCUMENT,
  props<{ payload: RequestDownloadPatientDocumentsModel & { fileName: string } }>()
);

export const downloadPatientDocumentActionSuccess = createAction(
  `${DOWNLOAD_DOCUMENT} success`
);
