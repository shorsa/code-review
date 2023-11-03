import { PhoneCodeEnum } from 'src/app/shared/enums';
import { ConsentTypeEnum, ReportNotificationTypeEnum } from '../../enums';

export interface RequestUpdateAppointmentDetailsModel {
  appointmentId: string;
  consentType: ConsentTypeEnum;
  reportNotificationType: ReportNotificationTypeEnum;
  patientPhoneNumber?: string;
  phoneCode?: PhoneCodeEnum;
  patientEmail?: string;
}
