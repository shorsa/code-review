import { PhoneCodeEnum, UserRoleEnum } from 'src/app/shared/enums';

export interface RequestCreateMriRequestModel {
  appointmentId: string;
  details: string;
  isPatientOlderThan65: boolean;
  hypertension: boolean;
  diabetes: boolean;
  gout: boolean;
  renalDiseaseOrSurgery: boolean;
  liverDiseaseOrTransplant: boolean;
  serumCreatinine?: string;
  eGFR?: string;
  dateChecked?: string;
  mriTypes: string[];
}
