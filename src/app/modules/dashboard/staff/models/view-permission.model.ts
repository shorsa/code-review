export interface ViewPermissionModel {
  clinicClaimsDictionary?: PermissionItem[];
  locationClaimsDictionary?: PermissionItem[];
  clientClaimsDictionary?: PermissionItem[];
  departmentClaimsDictionary?: PermissionItem[];
  clientUserClaimsDictionary?: PermissionItem[];
  clientDocumentClaimsDictionary?: PermissionItem[];
  patientClaimsDictionary?: PermissionItem[];
  patientDocumentClaimsDictionary?: PermissionItem[];
  patientConfidentialNotesClaimsDictionary?: PermissionItem[];
  patientReferralClaimsDictionary?: PermissionItem[];
  clinicianClaimsDictionary?: PermissionItem[];
  referralClaimsDictionary?: PermissionItem[];
  appointmentClaimsDictionary?: PermissionItem[];
  contractClaimsDictionary?: PermissionItem[];
  invoiceClaimsDictionary?: PermissionItem[];
  productClaimsDictionary?: PermissionItem[];
  documentClaimsDictionary?: PermissionItem[];
}

export interface PermissionItem {
  label: string;
  value: string;
  isChecked: boolean;
  show?: boolean;
}
