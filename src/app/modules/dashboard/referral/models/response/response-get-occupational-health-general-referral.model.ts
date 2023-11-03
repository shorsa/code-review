import { BaseResponseModel } from 'src/app/shared/models';
import { ReferralDetailsModel } from './response-get-referral-by-id.model';
import { PhoneCodeEnum } from 'src/app/shared/enums';

export interface ResponseGetOccupationalHealthGeneralReferralModel
  extends BaseResponseModel {
  referral: OccupationalHealthGeneralReferral;
}

export interface OccupationalHealthGeneralReferral extends ReferralDetailsModel {
  reference: string;
  date?: string;
  jurisdiction: string;
  employer: string;
  employerPhoneCode: PhoneCodeEnum;
  employerPhone: string;
  managerFirstName: string;
  managerLastName: string;
  managerEmail: string;
  employeeFirstName: string;
  employeeLastName: string;
  dateOfBirth?: string;
  staffId: string;
  address: string;
  employeePhoneCode: PhoneCodeEnum;
  employeePhone: string;
  employeeEmail: string;
  employmentStartDate?: string;
  occupation: string;
  workLocation: string;
  insurer: string;
  jobDescription: string;
  previousReferrals: string;
  absenceStartDate?: string;
  absenceEndDate?: string;
  isRtwDate: boolean;
  reviewType: boolean;
  absenceReason: string;
  assessmentReason: string;
  issues: string;
}
