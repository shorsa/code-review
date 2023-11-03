import { BaseResponseModel, PatientDocumentModel } from 'src/app/shared/models';

export interface ResponseGetPatientDocumentListModel extends BaseResponseModel {
  documents: ResponsePatientDocumentListItem[];
  totalCount: number;
}

export interface ResponsePatientDocumentListItem extends BaseResponseModel {
  id: string;
  name: string;
}