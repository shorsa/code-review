import { BaseDocumentModel, BaseResponseModel } from 'src/app/shared/models';

export interface GetDocumentListResponseModel extends BaseResponseModel {
  documents: BaseDocumentModel[];
  totalCount: number;
}
