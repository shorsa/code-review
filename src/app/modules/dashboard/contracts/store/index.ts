import { ResponseClientListItem } from '../../client/models';
import {
  RequestCreateContractModel,
  RequestGetContractListModel,
  RequestUpdateContractModel,
  ResponseContractClinicianItemModel,
  ResponseContractProductItemModel,
  ResponseGetContractByIdModel,
  ResponseGetContractCliniciansModel,
  ResponseGetContractListModel,
  ResponseGetContractProductsModel,
} from '../models';

export type ContractTemporaryDataStoreModel = Omit<
  RequestUpdateContractModel,
  'products' | 'clinicians'
> &
  Partial<Pick<ResponseGetContractByIdModel, 'client' | 'customId'>> &
  Partial<Pick<ResponseGetContractProductsModel, 'contractProducts'>> &
  Partial<Pick<ResponseGetContractCliniciansModel, 'contractClinicians'>>;

export interface ContractsState {
  contractsSearchParams?: RequestGetContractListModel;
  contractsListData?: ResponseGetContractListModel;
  contractTemporaryData?: ContractTemporaryDataStoreModel;
  notificationMessage?: string;
}
