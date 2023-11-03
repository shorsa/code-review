import { BaseResponseModel, ClientModel } from 'src/app/shared/models';

export interface ResponseGetClientByIdModel extends BaseResponseModel {
  client: ClientModel;
}
