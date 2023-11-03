import { createAction, props } from '@ngrx/store';
import {
  DeleteClientDocumentResponseModel,
  GetClientDocumentListResponseModel,
  RequestCreateClientDocumentModel,
  RequestDeleteClientDocumentModel,
  RequestGetClientDocumentByIdModel,
  RequestGetClientDocumentListByClientIdModel,
  RequestUpdateClientDocumentModel,
  ResponseCreateClientDocumentModel,
  ResponseGetClientDocumentModel,
  UpdateClientDocumentResponseModel,
} from '../models';

//CREATE CLIENT DOCUMENT
const CLIENT_DOCUMENT_CREATE = '[CLIENT] client documents create';
export const clientDocumentCreateAction = createAction(
  CLIENT_DOCUMENT_CREATE,
  props<{
    payload: {
      data: RequestCreateClientDocumentModel;
      searchParams: RequestGetClientDocumentListByClientIdModel;
    };
  }>()
);

const CLIENT_DOCUMENT_CREATE_SUCCESS = '[CLIENT] client documents create success';
export const clientDocumentCreateSuccessAction = createAction(
  CLIENT_DOCUMENT_CREATE_SUCCESS,
  props<{
    payload: {
      data: ResponseCreateClientDocumentModel;
      searchParams: RequestGetClientDocumentListByClientIdModel;
    };
  }>()
);

//UPDATE CLIENT DOCUMENT
const CLIENT_DOCUMENT_UPDATE = '[CLIENT] client documents  update';
export const clientDocumentUpdateAction = createAction(
  CLIENT_DOCUMENT_UPDATE,
  props<{ payload: RequestUpdateClientDocumentModel }>()
);

const CLIENT_DOCUMENT_UPDATE_SUCCESS = '[CLIENT] client documents  update success';
export const clientDocumentUpdateSuccessAction = createAction(
  CLIENT_DOCUMENT_UPDATE_SUCCESS,
  props<{ payload: UpdateClientDocumentResponseModel }>()
);

//GET CLIENT DOCUMENT BY ID
const CLIENT_DOCUMENT_GET_BY_ID = '[CLIENT] client documents get by id';
export const clientDocumentGetByIdAction = createAction(
  CLIENT_DOCUMENT_GET_BY_ID,
  props<{ payload: RequestGetClientDocumentByIdModel }>()
);

const CLIENT_DOCUMENT_GET_BY_ID_SUCCESS = '[CLIENT] client documents get by id success';
export const clientDocumentGetByIdSuccessAction = createAction(
  CLIENT_DOCUMENT_GET_BY_ID_SUCCESS,
  props<{ payload: ResponseGetClientDocumentModel }>()
);

//SEARCH CLIENT DOCUMENTS
const CLIENT_DOCUMENT_SEARCH = '[CLIENT] search client documents ';
export const clientDocumentsSearchAction = createAction(
  CLIENT_DOCUMENT_SEARCH,
  props<{ payload: RequestGetClientDocumentListByClientIdModel }>()
);

const CLIENT_DOCUMENT_SEARCH_SUCCESS = '[CLIENT] search client documents  success';
export const clientDocumentsSearchSuccessAction = createAction(
  CLIENT_DOCUMENT_SEARCH_SUCCESS,
  props<{
    payload: GetClientDocumentListResponseModel;
  }>()
);

//DELETE CLIENT DOCUMENT
const CLIENT_DOCUMENT_DELETE = '[CLIENT] delete client documents';
export const clientDocumentDeleteAction = createAction(
  CLIENT_DOCUMENT_DELETE,
  props<{
    payload: {
      data: RequestDeleteClientDocumentModel;
      searchParams: RequestGetClientDocumentListByClientIdModel;
    };
  }>()
);

const CLIENT_DOCUMENT_DELETE_SUCCESS = '[CLIENT] delete client documents success';
export const clientDocumentDeleteSuccessAction = createAction(
  CLIENT_DOCUMENT_DELETE_SUCCESS,
  props<{
    payload: {
      data: DeleteClientDocumentResponseModel;
      searchParams: RequestGetClientDocumentListByClientIdModel;
    };
  }>()
);

//DOWNLOAD CLIENT DOCUMENT
const DOWNLOAD_DOCUMENT = '[CLIENT] download client document';
export const downloadClientDocumentAction = createAction(
  DOWNLOAD_DOCUMENT,
  props<{ payload: RequestGetClientDocumentByIdModel & { fileName: string } }>()
);

const DOWNLOAD_DOCUMENT_SUCCESS = '[CLIENT] download client document success';
export const downloadClientDocumentActionSuccess = createAction(
  DOWNLOAD_DOCUMENT_SUCCESS
);
