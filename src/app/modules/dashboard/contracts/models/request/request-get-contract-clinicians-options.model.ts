import { RequestBasePaginationModel } from 'src/app/shared/models';

export interface RequestGetContractCliniciansOptionsModel
  extends RequestBasePaginationModel {
  searchText?: string;
  productIds: string[];
  clinicianIds: string[];
}
