import { PatientModel } from './patient.model';

export interface ConfidentialNoteModel {
  id: string;
  patientId: string;
  patient?: PatientModel;
  description: string;
}
