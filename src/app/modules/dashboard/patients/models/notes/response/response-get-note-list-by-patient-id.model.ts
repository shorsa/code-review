import { BaseResponseModel, PatientModel } from 'src/app/shared/models';

export interface ResponseGetNoteListByPatientIdModel extends BaseResponseModel {
  confidentialNotes: ResponseNoteListItem[];
  totalCount: number;
}

export interface ResponseNoteListItem {
  id: string;
  patientId: string;
  created: Date;
  createdByName: string;
  description: string;
}
