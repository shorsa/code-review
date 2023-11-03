import { ResponseClinicianListItem } from 'src/app/modules/dashboard/clinician/models';
import { CustomRecurrenceIntervalType } from 'src/app/modules/dashboard/clinics/enums';
import {
  ResponseLocationListItem,
  ResponseRoomListItem,
  ResponseSiteListItem,
} from 'src/app/modules/dashboard/locations/models';
import { ClinicTypeEnum, DaysOfWeekEnum, RecurrenceTypeEnum } from '../../enums';
import { AppointmentModel } from './appointment.model';
import { ClinicianModel } from './clinician.model';
import { RoomModel } from './room.model';

export interface ClinicModel {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  roomId: string;
  room: ResponseRoomWithLocation;
  clinicianId: string;
  clinician: ResponseClinicianListItem;
  clinicType: ClinicTypeEnum;
  appointmentLengthInMinutes: number;
  recurenceType: RecurrenceTypeEnum;
  customRecurenceInterval?: number;
  customRecurenceIntervalType: CustomRecurrenceIntervalType;
  _CustomDaysOfWeek?: string;
  endsAfterCount?: number;
  endsOnDate?: string;
  isActive: boolean;
  customDates: string[];
  customDaysOfWeek?: DaysOfWeekEnum[];
  appointments: AppointmentModel[];
}

interface ResponseRoomWithLocation extends ResponseRoomListItem {
  site: ResponseSiteListItem & { location: ResponseLocationListItem };
}
