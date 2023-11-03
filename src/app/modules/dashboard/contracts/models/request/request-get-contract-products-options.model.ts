import { RequestBasePaginationModel } from 'src/app/shared/models';

export interface RequestGetContractProductsOptionsModel
  extends RequestBasePaginationModel {
  searchText?: string;
  productIds: string[];
}
