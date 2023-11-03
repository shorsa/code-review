import { BaseResponseModel } from 'src/app/shared/models';

export interface ResponseGetContractProductsModel extends BaseResponseModel {
  totalCount: number;
  contractProducts: ResponseContractProductItemModel[];
}

export interface ResponseContractProductItemModel {
  customId: string;
  id: string;
  productId: string;
  name: string;
  price?: number;
}
