import {
  AddictionTimeEnum,
  AppointmentStatusEnum,
  AppointmentTypeEnum,
  ConsentTypeEnum,
  ReportNotificationTypeEnum,
} from 'src/app/modules/dashboard/appointments/enums';
import { PhoneCodeEnum } from '../../enums';
import { AppointmentNoteModel } from './appointment-note.model';
import { AppointmentSettingModel } from './appointment-setting.model';
import { ClinicModel } from './clinic.model';

export interface AppointmentModel {
  id: string;
  customAppointmentId: string;
  clinicId: string;
  clinic: ClinicModel;
  startTime: string;
  referralId: string;
  status: AppointmentStatusEnum;
  report: string;
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
  appointmentSettingToAppointments: AppointmentSettingToAppointmentModel[];
  notes?: AppointmentNoteModel[];
}

export interface AppointmentSettingToAppointmentModel {
  id: string;
  appointmentId: string;
  appointmentSettingId: string;
  appointmentSetting: AppointmentSettingModel;
}
