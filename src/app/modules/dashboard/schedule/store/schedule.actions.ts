import { createAction, props } from '@ngrx/store';
import {
  RequestCreateNonWorkingDayModel,
  RequestDeleteNonWorkingDayModel,
  RequestGetNonWorkingDaysListModel,
  ResponseGetNonWorkingDaysListModel,
} from '../models';

//ADD DATE
const SCHEDULE_ADD_DATE = '[SCHEDULE] schedule add holiday date';
export const scheduleAddDateAction = createAction(
  SCHEDULE_ADD_DATE,
  props<{
    payload: RequestCreateNonWorkingDayModel;
    searchParams: RequestGetNonWorkingDaysListModel;
  }>()
);

export const scheduleAddDateSuccessAction = createAction(`${SCHEDULE_ADD_DATE} success`);

//DELETE SCHEDULE
const SCHEDULE_DATE_DELETE = '[SCHEDULE] schedule delete holiday date';
export const scheduleDeleteDateAction = createAction(
  SCHEDULE_DATE_DELETE,
  props<{
    payload: RequestDeleteNonWorkingDayModel;
    searchParams: RequestGetNonWorkingDaysListModel;
  }>()
);

export const scheduleDeleteDateSuccessAction = createAction(
  `${SCHEDULE_DATE_DELETE} success`
);

//GET SCHEDULE
const GET_SCHEDULE = '[SCHEDULE] get schedule dates ';
export const getScheduleAction = createAction(
  GET_SCHEDULE,
  props<{ payload: RequestGetNonWorkingDaysListModel }>()
);

export const getScheduleSuccessAction = createAction(
  `${GET_SCHEDULE} success`,
  props<{ payload: ResponseGetNonWorkingDaysListModel }>()
);
