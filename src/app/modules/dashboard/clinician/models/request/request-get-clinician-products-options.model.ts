import { RequestBasePaginationModel } from 'src/app/shared/models';

export interface RequestGetClinicianProductsOptionsModel
  extends RequestBasePaginationModel {
  searchText?: string;
  productIds: string[];
}
