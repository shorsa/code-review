import { BaseResponseModel } from 'src/app/shared/models';
import { ClientDocumentModel } from './response-get-client-document.model';

export interface GetClientDocumentListResponseModel extends BaseResponseModel {
  documents: ClientDocumentModel[];
  totalCount: number;
}
