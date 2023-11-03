import { PhoneCodeEnum, ReferralStatusEnum } from 'src/app/shared/enums';
import { BaseResponseModel } from 'src/app/shared/models';
import { ReferralTypeEnum } from '../../enums';
import {
  ResponseGetPatientOptionsModelItem,
  ResponsePatientListItem,
} from '../../../patients/models/patients';

export interface ResponseGetReferralModel extends BaseResponseModel {
  referral: ReferralDetailsModel;
}

export interface ReferralDetailsModel {
  id: string;
  customReferralId: string;
  patient: ResponseGetPatientOptionsModelItem;
  location: string;
  contractId: string;
  created: string;
  createdBy: string;
  client: ReferralDetailsCLientModel;
  status: ReferralStatusEnum;
  clientKpi?: number;
  isActive: boolean;
  departments?: ReferralDetailsDepartmentModel[];
  product: ReferralDetailsProductModel;
  referralType: ReferralTypeEnum;
}

export interface ReferralDetailsCLientModel {
  id: string;
  name: string;
}

export interface ReferralDetailsProductModel {
  id: string;
  name: string;
}

export interface ReferralDetailsDepartmentModel {
  id: string;
  name: string;
}
