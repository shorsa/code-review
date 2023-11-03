import { BaseResponseModel, ClientModel, ClientUserModel } from 'src/app/shared/models';

export interface ResponseGetClientUserByIdModel extends BaseResponseModel {
  clientUser: ClientUserModel;
}
