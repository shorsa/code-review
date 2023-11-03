import { RequestBasePaginationModel } from 'src/app/shared/models';
import { PatientAuditLogOrderByOptions } from '../../../enums';

export interface RequestGetAuditLogsByPatientIdModel extends RequestBasePaginationModel {
  patientId: string;
  patientAuditLogOrderByOptions?: PatientAuditLogOrderByOptions;
  searchText?: string;
  isOrderByAsc?: boolean;
}
