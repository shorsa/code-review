import { RequestBasePaginationModel } from 'src/app/shared/models';
import { NotesOrderByOptionsEnum } from '../../../enums';

export interface RequestGetNoteListByPatientIdModel extends RequestBasePaginationModel {
  confidentialNotesOrderByOptions?: NotesOrderByOptionsEnum;
  isOrderByAsc?: boolean;
  searchText?: string;
  patientId: string;
}
