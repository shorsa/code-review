import { NzSelectOptionInterface } from 'ng-zorro-antd/select';
import {
  AppointmentStatusEnum,
  AppointmentTypeEnum,
  ConsentTypeEnum,
  ReportNotificationTypeEnum,
} from 'src/app/modules/dashboard/appointments/enums';
import { PatientTimeFrameEnum } from 'src/app/modules/dashboard/departments/enums';
import { ReferralTypeEnum } from 'src/app/modules/dashboard/referral/enums';
import {
  ClinicTypeEnum,
  GenderEnum,
  InvoiceTypeEnum,
  IsActiveFilterEnum,
  PhoneCodeEnum,
  RecurrenceTypeEnum,
  ReferralStatusEnum,
  UserRoleEnum,
} from 'src/app/shared/enums';
import { SelectOptionModel } from 'src/app/shared/models';

export class CommonConstants {
  public static get QUERY_ID(): string {
    return 'id';
  }
  public static get QUERY_DATE(): string {
    return 'date';
  }
  public static get QUERY_LOCATION_ID(): string {
    return 'locationId';
  }
  public static get QUERY_SITE_ID(): string {
    return 'siteId';
  }
  public static get QUERY_USER_ID(): string {
    return 'userId';
  }
  public static get QUERY_CLIENT_ID(): string {
    return 'clientId';
  }
  public static get QUERY_PATIENT_ID(): string {
    return 'patientId';
  }
  public static get QUERY_DEPARTMENT_IDS(): string {
    return 'departmentIds';
  }
  public static get QUERY_CODE(): string {
    return 'code';
  }
  public static get QUERY_EMAIL(): string {
    return 'email';
  }

  public static get ACTIVE_PAGE_TAB(): string {
    return 'activeTab';
  }

  public static get PAGE_SIZE_OPTIONS(): number[] {
    return [10, 20, 50];
  }

  public static phoneCodes: SelectOptionModel<PhoneCodeEnum>[] = [
    {
      value: PhoneCodeEnum.England,
      label: '+44',
    },
    {
      value: PhoneCodeEnum.Ireland,
      label: '+353',
    },
  ];

  public static genderList: SelectOptionModel<GenderEnum>[] = [
    {
      value: GenderEnum.Female,
      label: 'Female',
    },
    {
      value: GenderEnum.Male,
      label: 'Male',
    },
    {
      value: GenderEnum.Other,
      label: 'Other',
    },
  ];

  public static activeFilterOptions: SelectOptionModel<IsActiveFilterEnum>[] = [
    {
      value: IsActiveFilterEnum.Active,
      label: 'Active',
    },
    {
      value: IsActiveFilterEnum.Inactive,
      label: 'Deactivated',
    },
  ];

  public static rolesOptions: SelectOptionModel<UserRoleEnum>[] = [
    {
      value: UserRoleEnum.OHRDAdministrator,
      label: 'OHRD Administrator',
    },
    {
      value: UserRoleEnum.OHRDClinician,
      label: 'OHRD Clinician',
    },
    {
      value: UserRoleEnum.OHRDSuperuser,
      label: 'OHRD Superuser',
    },
    {
      value: UserRoleEnum.ClientAdministrator,
      label: 'Client Administrator',
    },
    {
      value: UserRoleEnum.ClientSuperuser,
      label: 'Client Superuser',
    },
  ];

  public static referralStatusFilterList: SelectOptionModel<ReferralStatusEnum>[] = [
    {
      value: ReferralStatusEnum.AwaitingTriage,
      label: 'Awaiting Triage',
    },
    {
      value: ReferralStatusEnum.AwaitingClient,
      label: 'Awaiting Client',
    },
    {
      value: ReferralStatusEnum.BookedForScreening,
      label: 'Booked For Screening',
    },
    {
      value: ReferralStatusEnum.BookedForAppointment,
      label: 'Booked For Appointment',
    },
    {
      value: ReferralStatusEnum.WaitingForBooking,
      label: 'Waiting for booking',
    },
    {
      value: ReferralStatusEnum.AwaitingSubmit,
      label: 'Awaiting Submission',
    },
    {
      value: ReferralStatusEnum.AttendedReportPending,
      label: 'Attended, Report Pending',
    },
    {
      value: ReferralStatusEnum.ReportWaitingToBeSend,
      label: 'Report Waiting to be Sent',
    },
    {
      value: ReferralStatusEnum.Completed,
      label: 'Completed',
    },
    {
      value: ReferralStatusEnum.Rejected,
      label: 'Referral Rejected',
    },
    {
      value: ReferralStatusEnum.Cancelled,
      label: 'Cancelled',
    },
    {
      value: ReferralStatusEnum.DidNotAttend,
      label: 'Did Not Attend',
    },
  ];

  public static productReferralOptions: SelectOptionModel<ReferralTypeEnum>[] = [
    {
      value: ReferralTypeEnum.Management,
      label: 'Management referral for occupational health assessment',
    },
    {
      value: ReferralTypeEnum.OccupationalHealthGeneral,
      label: 'AIB occupational health general referral',
    },
  ];

  public static clinicTypeListOptions: NzSelectOptionInterface[] = [
    {
      label: 'General',
      value: ClinicTypeEnum.General,
    },
    {
      label: 'Client Only',
      value: ClinicTypeEnum.ClientOnly,
    },
  ];

  public static defaultAppointmentLengthListOptions: NzSelectOptionInterface[] = [
    {
      label: '30min',
      value: 30,
    },
    {
      label: '40min',
      value: 40,
    },
    {
      label: '45min',
      value: 45,
    },
  ];

  public static recurrenceListOptions: NzSelectOptionInterface[] = [
    {
      label: RecurrenceTypeEnum[RecurrenceTypeEnum.Daily],
      value: RecurrenceTypeEnum.Daily,
    },
    {
      label: RecurrenceTypeEnum[RecurrenceTypeEnum.Weekly],
      value: RecurrenceTypeEnum.Weekly,
    },
    {
      label: RecurrenceTypeEnum[RecurrenceTypeEnum.Custom],
      value: RecurrenceTypeEnum.Custom,
    },
  ];

  public static patientTimeFrameListOptions: NzSelectOptionInterface[] = [
    {
      label: PatientTimeFrameEnum[PatientTimeFrameEnum['24h']],
      value: PatientTimeFrameEnum['24h'],
    },
    {
      label: PatientTimeFrameEnum[PatientTimeFrameEnum['2d']],
      value: PatientTimeFrameEnum['2d'],
    },
    {
      label: PatientTimeFrameEnum[PatientTimeFrameEnum['3d']],
      value: PatientTimeFrameEnum['3d'],
    },
    {
      label: PatientTimeFrameEnum[PatientTimeFrameEnum['4d']],
      value: PatientTimeFrameEnum['4d'],
    },
    {
      label: PatientTimeFrameEnum[PatientTimeFrameEnum['5d']],
      value: PatientTimeFrameEnum['5d'],
    },
  ];

  public static appointmentTypesListOptions: NzSelectOptionInterface[] = [
    {
      label: 'Telephone',
      value: AppointmentTypeEnum.Telephone,
    },
    {
      label: 'Video',
      value: AppointmentTypeEnum.Video,
    },
    {
      label: 'Face to Face',
      value: AppointmentTypeEnum.FaceToFace,
    },
    {
      label: 'Workplace',
      value: AppointmentTypeEnum.Workplace,
    },
    {
      label: 'Home Visit',
      value: AppointmentTypeEnum.HomeVisit,
    },
  ];

  public static consentTypeListOptions: NzSelectOptionInterface[] = [
    {
      label: 'Same Time',
      value: ConsentTypeEnum.SameTime,
    },
    {
      label: 'Before Employer',
      value: ConsentTypeEnum.BeforeEmployer,
    },
    {
      label: 'Withdrawn',
      value: ConsentTypeEnum.Withdrawn,
    },
  ];

  public static notificationTypeListOptions: NzSelectOptionInterface[] = [
    {
      label: 'Phone number',
      value: ReportNotificationTypeEnum.Phone,
    },
    {
      label: 'Email address',
      value: ReportNotificationTypeEnum.Email,
    },
  ];

  static readonly invoiceTypes: SelectOptionModel<InvoiceTypeEnum>[] = [
    {
      value: InvoiceTypeEnum.Weekly,
      label: 'Weekly closed cases',
    },
    {
      value: InvoiceTypeEnum.Monthly,
      label: 'End of Month',
    },
  ];

  static readonly appointmentStatusFilterList: SelectOptionModel<AppointmentStatusEnum>[] =
    [
      {
        value: AppointmentStatusEnum.Attended,
        label: 'Attended',
      },
      {
        value: AppointmentStatusEnum.AttentionRequired,
        label: 'Attention Required',
      },
      {
        value: AppointmentStatusEnum.Booked,
        label: 'Booked',
      },
      {
        value: AppointmentStatusEnum.Canceled,
        label: 'Canceled',
      },
      {
        value: AppointmentStatusEnum.Completed,
        label: 'Completed',
      },
      {
        value: AppointmentStatusEnum.DNA,
        label: 'Did Not Attend',
      },
    ];
}
