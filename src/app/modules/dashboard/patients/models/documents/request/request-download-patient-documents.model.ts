export interface RequestDownloadPatientDocumentsModel {
  patientId: string;
  documentIds?: string[];
  includePassword: boolean;
}
