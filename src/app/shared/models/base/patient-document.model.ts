import { BaseDocumentModel } from './base-document.model';
import { PatientModel } from './patient.model';
export interface PatientDocumentModel extends BaseDocumentModel {
  patientId: string;
  patient: PatientModel;
}