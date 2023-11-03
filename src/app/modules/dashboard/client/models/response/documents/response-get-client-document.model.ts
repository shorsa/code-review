import { BaseDocumentModel, BaseResponseModel, ClientModel } from 'src/app/shared/models';

export interface ResponseGetClientDocumentModel extends BaseResponseModel {
  clientDocument: ClientDocumentModel;
  content: string;
  contentType: string;
}

export interface ClientDocumentModel extends BaseDocumentModel {
  clientId: string;
  client: ClientModel;
}
