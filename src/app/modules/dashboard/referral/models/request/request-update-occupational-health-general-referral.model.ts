import { PhoneCodeEnum } from 'src/app/shared/enums';

export interface RequestUpdateOccupationalHealthGeneralReferralModel {
  id: string;
  reference: string;
  date: string;
  jurisdiction: string;
  employer: string;
  employerPhone: string;
  employerPhoneCode: PhoneCodeEnum;
  managerFirstName: string;
  managerLastName: string;
  managerEmail: string;
  employeeFirstName: string;
  employeeLastName: string;
  dOB: string;
  staffId: string;
  address: string;
  employeePhone: string;
  employeePhoneCode: PhoneCodeEnum;
  employeeEmail: string;
  employmentStartDate: string;
  occupation: string;
  workLocation: string;
  insurer: string;
  jobDescription: string;
  previousReferrals: string;
  absenceStartDate: string;
  absenceEndDate: string;
  isRtwDate: boolean;
  reviewType: boolean;
  absenceReason: string;
  assessmentReason: string;
  issues: string;
  isSubmit: boolean;
  productId: string;
}
