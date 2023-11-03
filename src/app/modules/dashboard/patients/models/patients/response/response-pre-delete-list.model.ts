import { ResponseClientUserListItem } from 'src/app/modules/dashboard/client/models';
import { GenderEnum } from 'src/app/shared/enums';
import { BaseResponseModel } from 'src/app/shared/models';
import { ResponsePatientListItem } from './response-get-patient-list.model';

export interface ResponseGetPatientPreDeleteListModel extends BaseResponseModel {
  patients: ResponsePatientListItem[];
  totalCount: number;
}

export interface ResponsePatientPreDeleteItemModel {
  id: string;
  customPatientId: string;
  gender: GenderEnum;
  clientUserId: string;
  clientUser: ResponseClientUserListItem;
  leavingDate?: string;
  referrals?: PatientPreDeleteModelReferral[];
}

export interface PatientPreDeleteModelReferral {
  id: string;
  customReferralId: string;
}
