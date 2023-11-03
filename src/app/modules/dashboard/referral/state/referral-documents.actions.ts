import { createAction, props } from '@ngrx/store';
import {
  DeleteReferralDocumentResponseModel,
  RequestCreateReferralDocumentModel,
  RequestDeleteReferralDocumentModel,
  RequestGetReferralDocumentByIdModel,
  RequestGetReferralDocumentListByReferralIdModel,
  RequestUpdateReferralDocumentModel,
  ResponseCreateReferralDocumentModel,
  ResponseGetReferralDocumentListModel,
  ResponseGetReferralDocumentModel,
  UpdateReferralDocumentResponseModel,
} from '../models';

//CREATE REFERRAL DOCUMENT
const REFERRAL_DOCUMENT_CREATE = '[REFERRAL] referral documents create';
export const referralDocumentCreateAction = createAction(
  REFERRAL_DOCUMENT_CREATE,
  props<{
    payload: {
      data: RequestCreateReferralDocumentModel;
      searchParams: RequestGetReferralDocumentListByReferralIdModel;
    };
  }>()
);

export const referralDocumentCreateSuccessAction = createAction(
  `${REFERRAL_DOCUMENT_CREATE} success`,
  props<{
    payload: {
      data: ResponseCreateReferralDocumentModel;
      searchParams: RequestGetReferralDocumentListByReferralIdModel;
    };
  }>()
);

//UPDATE REFERRAL DOCUMENT
const REFERRAL_DOCUMENT_UPDATE = '[REFERRAL] referral documents  update';
export const referralDocumentUpdateAction = createAction(
  REFERRAL_DOCUMENT_UPDATE,
  props<{ payload: RequestUpdateReferralDocumentModel }>()
);

export const referralDocumentUpdateSuccessAction = createAction(
  `${REFERRAL_DOCUMENT_UPDATE} success`,
  props<{ payload: UpdateReferralDocumentResponseModel }>()
);

//GET REFERRAL DOCUMENT BY ID
const REFERRAL_DOCUMENT_GET_BY_ID = '[REFERRAL] referral documents get by id';
export const referralDocumentGetByIdAction = createAction(
  REFERRAL_DOCUMENT_GET_BY_ID,
  props<{ payload: RequestGetReferralDocumentByIdModel }>()
);

export const referralDocumentGetByIdSuccessAction = createAction(
  `${REFERRAL_DOCUMENT_GET_BY_ID} success`,
  props<{ payload: ResponseGetReferralDocumentModel }>()
);

//SEARCH REFERRAL DOCUMENTS
const REFERRAL_DOCUMENT_SEARCH = '[REFERRAL] search referral documents ';
export const referralDocumentsSearchAction = createAction(
  REFERRAL_DOCUMENT_SEARCH,
  props<{ payload: RequestGetReferralDocumentListByReferralIdModel }>()
);

export const referralDocumentsSearchSuccessAction = createAction(
  `${REFERRAL_DOCUMENT_SEARCH} success`,
  props<{
    payload: ResponseGetReferralDocumentListModel;
  }>()
);

//DELETE REFERRAL DOCUMENT
const REFERRAL_DOCUMENT_DELETE = '[REFERRAL] delete referral documents';
export const referralDocumentDeleteAction = createAction(
  REFERRAL_DOCUMENT_DELETE,
  props<{
    payload: {
      data: RequestDeleteReferralDocumentModel;
      searchParams: RequestGetReferralDocumentListByReferralIdModel;
    };
  }>()
);

export const referralDocumentDeleteSuccessAction = createAction(
  `${REFERRAL_DOCUMENT_DELETE} success`,
  props<{
    payload: {
      data: DeleteReferralDocumentResponseModel;
      searchParams: RequestGetReferralDocumentListByReferralIdModel;
    };
  }>()
);

//DOWNLOAD REFERRAL DOCUMENT
const DOWNLOAD_DOCUMENT = '[REFERRAL] download referral document';
export const downloadReferralDocumentAction = createAction(
  DOWNLOAD_DOCUMENT,
  props<{ payload: RequestGetReferralDocumentByIdModel & { fileName: string } }>()
);

export const downloadReferralDocumentActionSuccess = createAction(
  `${DOWNLOAD_DOCUMENT} success`
);
