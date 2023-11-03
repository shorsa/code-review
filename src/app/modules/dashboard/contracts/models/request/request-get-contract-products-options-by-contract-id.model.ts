import { RequestBasePaginationModel } from 'src/app/shared/models';

export interface RequestGetContractProductsOptionsByContractIdModel
  extends RequestBasePaginationModel {
  contractId?: string;
  searchText?: string;
}
