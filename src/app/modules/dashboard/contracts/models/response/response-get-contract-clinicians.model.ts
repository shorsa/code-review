import { BaseResponseModel } from 'src/app/shared/models';

export interface ResponseGetContractCliniciansModel extends BaseResponseModel {
  totalCount: number;
  contractClinicians: ResponseContractClinicianItemModel[];
}

export interface ResponseContractClinicianItemModel {
  id?: string;
  clinicianId: string;
  customId: string;
  name: string;
  phoneNumber: string;
  email: string;
  products: string[];
}
