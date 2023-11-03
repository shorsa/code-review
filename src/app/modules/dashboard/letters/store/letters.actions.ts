import { createAction, props } from '@ngrx/store';
import { BaseResponseModel } from 'src/app/shared/models';
import {
  RequestGetAppointmentReportsListModel,
  ResponseGetAppointmentReportListModel,
} from '../models';

//SEARCH LETTERS
const LETTER_SEARCH = '[LETTER] search letters';
export const lettersSearchAction = createAction(
  LETTER_SEARCH,
  props<{ payload: RequestGetAppointmentReportsListModel }>()
);

export const lettersSearchSuccessAction = createAction(
  `${LETTER_SEARCH} success`,
  props<{
    payload: ResponseGetAppointmentReportListModel;
  }>()
);

//LOCAL
const SET_SEARCH_PARAMS = '[LETTER] set letters search params';
export const setLettersSearchParamsAction = createAction(
  SET_SEARCH_PARAMS,
  props<{ payload: RequestGetAppointmentReportsListModel }>()
);

const LETTER_CLEAR_SEARCH_PARAMS = '[LETTER] clear letter search params';
export const clearLettersSearchParamsAction = createAction(LETTER_CLEAR_SEARCH_PARAMS);
