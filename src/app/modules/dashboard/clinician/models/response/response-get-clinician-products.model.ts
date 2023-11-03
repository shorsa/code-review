import { BaseResponseModel } from 'src/app/shared/models';

export interface ResponseGetClinicianProductsModel extends BaseResponseModel {
  totalCount: number;
  clinicianProducts: ResponseClinicianProductItemModel[];
  productIds: string[];
}

export interface ResponseClinicianProductItemModel {
  customId: string;
  id: string;
  productId: string;
  name: string;
  price?: number;
}
