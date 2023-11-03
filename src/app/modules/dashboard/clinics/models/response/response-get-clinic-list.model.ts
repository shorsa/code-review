import { ClinicTypeEnum, DaysOfWeekEnum, RecurrenceTypeEnum } from 'src/app/shared/enums';
import { BaseResponseModel } from 'src/app/shared/models';
import { ResponseClinicianListItem } from '../../../clinician/models';
import { CustomRecurrenceIntervalType } from '../../enums';

export interface ResponseGetClinicListModel extends BaseResponseModel {
  clinics: ResponseClinicListItem[];
  totalCount: number;
}

export interface ResponseClinicListItem {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  roomId: string;
  location: string;
  clinicianId: string;
  clinicianName: string;
  clinicType: ClinicTypeEnum;
  appointmentLengthInMinutes: number;
  recurenceType: RecurrenceTypeEnum;
  customRecurenceInterval?: number;
  customRecurenceIntervalType: CustomRecurrenceIntervalType;
  endsAfterCount?: number;
  endsOnDate?: string;
  isActive: boolean;
  customDates: string[];
  customDaysOfWeek?: DaysOfWeekEnum[];
  bookedAppointments?: number;
  minutesRemaining: number;

}
