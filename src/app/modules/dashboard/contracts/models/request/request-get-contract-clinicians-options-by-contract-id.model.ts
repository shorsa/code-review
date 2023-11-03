import { RequestBasePaginationModel } from 'src/app/shared/models';

export interface RequestGetContractCliniciansOptionsByContractIdModel
  extends RequestBasePaginationModel {
  contractId?: string;
  searchText?: string;
  productIds: string[];
}
