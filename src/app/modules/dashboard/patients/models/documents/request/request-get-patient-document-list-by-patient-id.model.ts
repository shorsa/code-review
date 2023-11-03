import { RequestBasePaginationModel } from 'src/app/shared/models';

export interface RequestGetPatientDocumentListByPatientIdModel
  extends RequestBasePaginationModel {
  searchText?: string;
  patientId: string;
}
