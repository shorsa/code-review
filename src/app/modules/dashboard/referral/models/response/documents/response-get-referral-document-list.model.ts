import { BaseResponseModel } from 'src/app/shared/models';
import { ReferralDocumentModel } from './response-get-client-document.model';

export interface ResponseGetReferralDocumentListModel extends BaseResponseModel {
  documents: ReferralDocumentModel[];
  totalCount: number;
}
