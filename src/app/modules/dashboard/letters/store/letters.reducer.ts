import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { LettersState } from '.';
import { AppointmentReportOrderByOptions } from '../enums/appointment-order-by-options.enum';
import * as letterActions from './letters.actions';
import { AppointmentReportStatusEnum } from '../enums';
import { CommonConstants } from 'src/app/core/constants';

const initialState: LettersState = {
  lettersSearchParams: {
    pageSize: CommonConstants.PAGE_SIZE_OPTIONS[0],
    pageIndex: 0,
    searchText: undefined,
    orderByOptions: AppointmentReportOrderByOptions.None,
    status: AppointmentReportStatusEnum.None,
  },
  lettersListData: undefined,
};

export const letterReducer: ActionReducer<LettersState, Action> = createReducer(
  initialState,
  on(
    letterActions.setLettersSearchParamsAction,

    (state: LettersState, { payload }): LettersState => {
      return {
        ...state,
        lettersSearchParams: payload,
      };
    }
  ),

  on(
    letterActions.lettersSearchSuccessAction,
    (state: LettersState, { payload }): LettersState => {
      return {
        ...state,
        lettersListData: payload,
      };
    }
  ),
  on(
    letterActions.clearLettersSearchParamsAction,
    (state: LettersState): LettersState => {
      return {
        ...state,
        lettersSearchParams: initialState.lettersSearchParams,
      };
    }
  )
);

export function LetterReducer(state: LettersState, action: Action) {
  return letterReducer(state, action);
}
