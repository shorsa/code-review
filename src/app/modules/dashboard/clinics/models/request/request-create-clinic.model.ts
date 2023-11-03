import { ClinicTypeEnum, DaysOfWeekEnum, RecurrenceTypeEnum } from 'src/app/shared/enums';
import { CustomRecurrenceIntervalType } from '../../enums';

export interface RequestCreateClinicModel {
  startDate?: string;
  startTimeHour: number;
  startTimeMinute: number;
  endTimeHour: number;
  endTimeMinute: number;
  roomId: string;
  clinicianId: string;
  clinicType: ClinicTypeEnum;
  appointmentLengthInMinutes: number;
  recurenceType: RecurrenceTypeEnum;
  customDaysOfWeek?: DaysOfWeekEnum[] ;
  endsAfterCount?: number;
  endsOnDate?: string;
  customDates: string[];
}
