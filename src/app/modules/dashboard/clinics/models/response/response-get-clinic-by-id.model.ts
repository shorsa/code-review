import { BaseResponseModel, ClinicModel, RoomModel } from 'src/app/shared/models';
import { ResponseClinicianListItem } from '../../../clinician/models';
import { ClinicTypeEnum, DaysOfWeekEnum, RecurrenceTypeEnum } from 'src/app/shared/enums';
import { CustomRecurrenceIntervalType } from '../../enums';

export interface ResponseGetClinicByIdModel extends BaseResponseModel {
  clinic: ResponseClinicByIdItem;
}

export interface ResponseClinicByIdItem {
  id: string;
  startDate: string;
  startTimeHour: number;
  startTimeMinute: number;
  endTimeHour: number;
  endTimeMinute: number;
  roomId: string;
  room: RoomModel;
  clinicianId: string;
  clinician: ResponseClinicianListItem;
  clinicType: ClinicTypeEnum;
  appointmentLengthInMinutes: number;
  recurenceType: RecurrenceTypeEnum;
  customRecurenceInterval?: number;
  customRecurenceIntervalType: CustomRecurrenceIntervalType;
  customDaysOfWeek?: DaysOfWeekEnum[];
  _CustomDaysOfWeek?: string;
  endsAfterCount?: number;
  endsOnDate?: string;
  isActive: boolean;
  customDates: string[];
}
