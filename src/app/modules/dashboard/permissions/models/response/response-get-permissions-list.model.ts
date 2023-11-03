import { BaseResponseModel } from 'src/app/shared/models';

export interface ResponseGetPermissionsListModel extends BaseResponseModel {
  clinicClaimsDictionary: { [key: string]: string }[];
  locationClaimsDictionary: { [key: string]: string }[];
  clientClaimsDictionary: { [key: string]: string }[];
  departmentClaimsDictionary: { [key: string]: string }[];
  clientUserClaimsDictionary: { [key: string]: string }[];
  clientDocumentClaimsDictionary: { [key: string]: string }[];
  patientClaimsDictionary: { [key: string]: string }[];
  patientDocumentClaimsDictionary: { [key: string]: string }[];
  patientConfidentialNotesClaimsDictionary: { [key: string]: string }[];
  patientReferralClaimsDictionary: { [key: string]: string }[];
  clinicianClaimsDictionary: { [key: string]: string }[];
  referralClaimsDictionary: { [key: string]: string }[];
  appointmentClaimsDictionary: { [key: string]: string }[];
  contractClaimsDictionary: { [key: string]: string }[];
  invoiceClaimsDictionary: { [key: string]: string }[];
  productClaimsDictionary: { [key: string]: string }[];
  documentClaimsDictionary: { [key: string]: string }[];
}
