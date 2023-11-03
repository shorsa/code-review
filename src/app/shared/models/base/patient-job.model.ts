import { BaseDocumentModel } from './base-document.model';
import { PatientModel } from './patient.model';

export interface PatientJobModel {
  id: string;
  patientId: string;
  description?: string;
  created: string;
  title?: string;
  startDate?: string;
  notAvailable: boolean;
  patientJobDocuments: PatientJobDocumentModel[];
}

export interface PatientJobDocumentModel extends BaseDocumentModel {
  patientJobId: string;
}
