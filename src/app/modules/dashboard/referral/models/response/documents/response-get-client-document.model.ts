import {
  BaseDocumentModel,
  BaseResponseModel,
  ReferralModel,
} from 'src/app/shared/models';

export interface ResponseGetReferralDocumentModel extends BaseResponseModel {
  clientDocument: ReferralDocumentModel;
  content: string;
  contentType: string;
}

export interface ReferralDocumentModel extends BaseDocumentModel {
  referralId: string;
}
