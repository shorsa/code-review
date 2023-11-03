import {
  BaseResponseModel,
  ProductModel,
  RequestBasePaginationModel,
} from 'src/app/shared/models';

export interface ResponseGetProductListModel extends BaseResponseModel {
  products: ProductModel[];
  totalCount: number;
}
