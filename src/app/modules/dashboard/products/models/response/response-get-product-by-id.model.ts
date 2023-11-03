import { BaseResponseModel, ProductModel } from 'src/app/shared/models';

export interface ResponseGetProductByIdModel extends BaseResponseModel {
  product: ProductModel;
}
