import { BaseResponseModel, BaseDocumentModel } from 'src/app/shared/models';

export interface GetDocumentResponseModel extends BaseResponseModel {
  document: BaseDocumentModel;
  content: string;
  contentType: string;
}
