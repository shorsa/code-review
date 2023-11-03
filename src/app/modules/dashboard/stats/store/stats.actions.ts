import { createAction, props } from '@ngrx/store';
import { BaseResponseModel } from 'src/app/shared/models';
import {
  RequestActivateAppointmentStatModel,
  RequestCreateAppointmentStatModel,
  RequestDeactivateAppointmentStatModel,
  RequestGetAppointmentStatByIdModel,
  RequestGetAppointmentStatsListModel,
  RequestUpdateAppointmentStatModel,
  ResponseGetAppointmentStatByIdModel,
  ResponseGetAppointmentStatListModel,
} from '../models';

//CREATE STATS
const STATS_CREATE = '[STATS] stats create';
export const statsCreateAction = createAction(
  STATS_CREATE,
  props<{
    payload: RequestCreateAppointmentStatModel;
    searchParams: RequestGetAppointmentStatsListModel;
  }>()
);

export const statsCreateSuccessAction = createAction(
  `${STATS_CREATE} success`,
  props<{
    payload: BaseResponseModel;
    searchParams: RequestGetAppointmentStatsListModel;
  }>()
);

//UPDATE STATS
const STATS_UPDATE = '[STATS] stats update';
export const statsUpdateAction = createAction(
  STATS_UPDATE,
  props<{
    payload: RequestUpdateAppointmentStatModel;
    searchParams: RequestGetAppointmentStatsListModel;
  }>()
);

export const statsUpdateSuccessAction = createAction(
  `${STATS_UPDATE} success`,
  props<{
    payload: BaseResponseModel;
    searchParams: RequestGetAppointmentStatsListModel;
  }>()
);

//GET BY ID STATS
const STATS_GET_BY_ID = '[STATS] stats get by id';
export const statsGetByIdAction = createAction(
  STATS_GET_BY_ID,
  props<{ payload: RequestGetAppointmentStatByIdModel }>()
);

export const statsGetByIdSuccessAction = createAction(
  `${STATS_GET_BY_ID} success`,
  props<{ payload: ResponseGetAppointmentStatByIdModel }>()
);

//SEARCH STATS
const STATS_SEARCH = '[STATS] stats search';
export const statsSearchAction = createAction(
  STATS_SEARCH,
  props<{ payload: RequestGetAppointmentStatsListModel }>()
);

export const statsSearchSuccessAction = createAction(
  `${STATS_SEARCH} success`,
  props<{ payload: ResponseGetAppointmentStatListModel }>()
);

//ACTIVATE STATS
const STATS_ACTIVATE = '[STATS] stats activate';
export const statsActivateAction = createAction(
  STATS_ACTIVATE,
  props<{
    payload: RequestActivateAppointmentStatModel;
    searchParams: RequestGetAppointmentStatsListModel;
  }>()
);

export const statsActivateSuccessAction = createAction(
  `${STATS_ACTIVATE} success`,
  props<{
    payload: BaseResponseModel;
    searchParams: RequestGetAppointmentStatsListModel;
  }>()
);

//DEACTIVATE STATS
const STATS_DEACTIVATE = '[STATS] stats deactivate';
export const statsDeactivateAction = createAction(
  STATS_DEACTIVATE,
  props<{
    payload: RequestDeactivateAppointmentStatModel;
    searchParams: RequestGetAppointmentStatsListModel;
  }>()
);

export const statsDeactivateSuccessAction = createAction(
  `${STATS_DEACTIVATE} success`,
  props<{
    payload: BaseResponseModel;
    searchParams: RequestGetAppointmentStatsListModel;
  }>()
);

const STATS_CLEAR_DETAILS = '[STATS] clear stats details';
export const clearStatsDetailsDataAction = createAction(STATS_CLEAR_DETAILS);

const STATS_CLEAR_STATS_LIST = '[STATS] clear stats list';
export const clearStatsListDataAction = createAction(STATS_CLEAR_STATS_LIST);
