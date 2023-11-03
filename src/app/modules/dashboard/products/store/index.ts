import { ProductModel } from 'src/app/shared/models';
import { RequestGetProductListModel, ResponseGetProductListModel } from '../models';

export interface ProductState {
  productDetails?: ProductModel;
  productSearchParams?: RequestGetProductListModel;
  productListData?: ResponseGetProductListModel;
}
