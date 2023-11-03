import { BaseResponseModel, PatientModel } from 'src/app/shared/models';
import { ResponseClientUserListItem } from '../../../../client/models';

export interface ResponseGetPatientListModel extends BaseResponseModel {
  patients: ResponsePatientListItem[];
  totalCount: number;
}

export interface ResponsePatientListItem {
  id: string;
  identifier: string;
  customPatientId: string;
  dateOfBirth: string;
  clientUserId: string;
  clientUser: ResponseClientUserListItem;
}