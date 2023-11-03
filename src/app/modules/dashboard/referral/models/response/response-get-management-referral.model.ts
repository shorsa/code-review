import { BaseResponseModel, ReferralModel } from 'src/app/shared/models';
import { ManagementReferralReasonEnum } from '../../enums';
import { PhoneCodeEnum } from 'src/app/shared/enums';
import { ReferralDetailsModel } from './response-get-referral-by-id.model';

export interface ResponseGetManagementReferralModel extends BaseResponseModel {
  referral: ManagementReferralModel;
}

export interface ManagementReferralModel extends ReferralDetailsModel {
  employeeName: string;
  dateOfBirth?: string;
  department: string;
  employeeNumber: string;
  jobTitle: string;
  workLocation: string;
  serviceLength: string;
  contactEmail: string;
  homeAddress: string;
  contactTelephoneNumberCode: PhoneCodeEnum;
  contactTelephoneNumber: string;
  reason: ManagementReferralModel;
  isCurrentlyAbsent: boolean;
  absenceStartDate?: string;
  absenceReason?: string;
  isCurrentlyFitForWork: boolean;
  areThereAttendaceRecordReasons: boolean;
  areTherePerformanceConsernsReasons: boolean;
  haveWorkTasksContributed: boolean;
  haveDomesticIssuesContributed: boolean;
  whatAreRecoveryTimescales: boolean;
  areWorkRestrictionsRequired: boolean;
  willRestrictionsBeTemporary: boolean;
  isIndividualTakingSteps: boolean;
  whatFactorsMightDelay: boolean;
  doesIndividualMeetCriteria: boolean;
  isMedConditionWillBeCovered: boolean;
  whatIsLongtermOutlook: boolean;
  additionalPoints: string;
  usingDisplayScreen: boolean;
  safetyCriticalJob: boolean;
  officeBased: boolean;
  workingAtHeights: boolean;
  regularPublicContact: boolean;
  confinedSpaces: boolean;
  nightWorker: boolean;
  loneWorker: boolean;
  vibrationTools: boolean;
  driving: boolean;
  noisyEnvironments: boolean;
  operatingMachinery: boolean;
  dustChems: boolean;
  manualHandling: boolean;
  workDuties: string;
  documentsWithReferral: string;
  isReferralReasonWasDiscussed: boolean;
  referringManagerName: string;
  contactTelephone: string;
  date?: string;
}
