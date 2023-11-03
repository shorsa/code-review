import { BaseResponseModel } from 'src/app/shared/models';

export interface ResponseGetContractOptionsModel extends BaseResponseModel {
  contracts: ResponseContractOptionItemModel[];
}

export interface ResponseContractOptionItemModel {
  id: string;
  clientId: string;
  customId: string;
}
