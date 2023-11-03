import { createAction, props } from '@ngrx/store';
import {
  RequestCreateAppointmentDocumentModel,
  RequestDeleteAppointmentDocumentModel,
  RequestGetAppointmentDocumentByIdWithContentModel,
  RequestGetAppointmentDocumentListByAppointmentIdModel,
  ResponseGetAppointmentDocumentListModel,
} from '../models';

//CREATE APPOINTMENT DOCUMENT
const APPOINTMENT_DOCUMENT_CREATE = '[APPOINTMENT] appointment documents create';
export const appointmentDocumentCreateAction = createAction(
  APPOINTMENT_DOCUMENT_CREATE,
  props<{
    payload: {
      data: RequestCreateAppointmentDocumentModel;
      searchParams: RequestGetAppointmentDocumentListByAppointmentIdModel;
    };
  }>()
);

export const appointmentDocumentCreateSuccessAction = createAction(
  `${APPOINTMENT_DOCUMENT_CREATE} success`,
  props<{
    payload: {
      searchParams: RequestGetAppointmentDocumentListByAppointmentIdModel;
    };
  }>()
);

//GET APPOINTMENT DOCUMENT BY ID
const APPOINTMENT_DOCUMENT_GET_BY_ID = '[APPOINTMENT] appointment documents get by id';
export const appointmentDocumentGetByIdAction = createAction(
  APPOINTMENT_DOCUMENT_GET_BY_ID,
  props<{ payload: RequestGetAppointmentDocumentByIdWithContentModel }>()
);

export const appointmentDocumentGetByIdSuccessAction = createAction(
  `${APPOINTMENT_DOCUMENT_GET_BY_ID} success`
);

//SEARCH APPOINTMENT DOCUMENTS
const APPOINTMENT_DOCUMENT_SEARCH = '[APPOINTMENT] search appointment documents ';
export const appointmentDocumentsSearchAction = createAction(
  APPOINTMENT_DOCUMENT_SEARCH,
  props<{ payload: RequestGetAppointmentDocumentListByAppointmentIdModel }>()
);

export const appointmentDocumentsSearchSuccessAction = createAction(
  `${APPOINTMENT_DOCUMENT_SEARCH} success`,
  props<{
    payload: ResponseGetAppointmentDocumentListModel;
  }>()
);

//DELETE APPOINTMENT DOCUMENT
const APPOINTMENT_DOCUMENT_DELETE = '[APPOINTMENT] delete appointment documents';
export const appointmentDocumentDeleteAction = createAction(
  APPOINTMENT_DOCUMENT_DELETE,
  props<{
    payload: {
      data: RequestDeleteAppointmentDocumentModel;
      searchParams: RequestGetAppointmentDocumentListByAppointmentIdModel;
    };
  }>()
);

export const appointmentDocumentDeleteSuccessAction = createAction(
  `${APPOINTMENT_DOCUMENT_DELETE} success`,
  props<{
    payload: {
      searchParams: RequestGetAppointmentDocumentListByAppointmentIdModel;
    };
  }>()
);

//DOWNLOAD APPOINTMENT DOCUMENT
const DOWNLOAD_DOCUMENT = '[APPOINTMENT] download appointment document';
export const downloadAppointmentDocumentAction = createAction(
  DOWNLOAD_DOCUMENT,
  props<{
    payload: RequestGetAppointmentDocumentByIdWithContentModel & { fileName: string };
  }>()
);

export const downloadAppointmentDocumentActionSuccess = createAction(
  `${DOWNLOAD_DOCUMENT} success`
);
