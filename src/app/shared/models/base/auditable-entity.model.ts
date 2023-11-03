export interface AuditableEntityModel {
  createdBy: string;
  created: string;
  lastModifiedBy: string;
  lastModified: string | null;
}
