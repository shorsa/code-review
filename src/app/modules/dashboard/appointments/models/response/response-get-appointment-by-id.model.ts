import {
  AppointmentModel,
  AppointmentNoteModel,
  AppointmentSettingToAppointmentModel,
  BaseResponseModel,
  ClinicModel,
} from 'src/app/shared/models';
import {
  AddictionTimeEnum,
  AppointmentStatusEnum,
  AppointmentTypeEnum,
  ConsentTypeEnum,
  ReportNotificationTypeEnum,
} from '../../enums';
import { AppointmentReportStatusEnum } from '../../../letters/enums';
import { PhoneCodeEnum } from 'src/app/shared/enums';

export interface ResponseGetAppointmentByIdModel extends BaseResponseModel {
  id: string;
  customAppointmentId: string;
  clinicId: string;
  clinic: ClinicModel;
  startTime: string;
  referralId: string;
  status: AppointmentStatusEnum;
  statusReason?: string;
  report?: string;
  reportStatus: AppointmentReportStatusEnum;
  isActive: boolean;
  type: AppointmentTypeEnum;
  timeInPost?: string;
  timeWithEmployer?: string;
  hoursPerWeek: number;
  shifts: AddictionTimeEnum;
  isAtWork: boolean;
  dateAbsenceCommenced?: string;
  relevantMedicalHistory?: string;
  pastMedicalHealth?: string;
  medication?: string;
  socialWelfare?: string;
  smoker: AddictionTimeEnum;
  alcohol: AddictionTimeEnum;
  drugs: AddictionTimeEnum;
  consentType: ConsentTypeEnum;
  reportNotificationType: ReportNotificationTypeEnum;
  patientPhoneNumber?: string;
  patientPhoneCode?: PhoneCodeEnum;
  patientEmail?: string;
  statsRequired: boolean;
  voiceTranscryptionMessage?: string;
  isMriRequestCreated: boolean;
  appointmentSettingToAppointments: AppointmentSettingToAppointmentModel[];
  notes?: AppointmentNoteModel[];

  isRedFlag: boolean;
  isUrgent: boolean;
}
