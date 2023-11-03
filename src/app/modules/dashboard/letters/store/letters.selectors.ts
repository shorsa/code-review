import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ReducerNodesEnum } from 'src/app/app-store';
import { LettersState } from '.';

const selectAppointmentFeature = createFeatureSelector<LettersState>(
  ReducerNodesEnum.letters
);

export const selectLettersState = createSelector(
  selectAppointmentFeature,
  (state: LettersState) => state
);

export const selectLettersList = createSelector(
  selectAppointmentFeature,
  (state: LettersState) => state?.lettersListData
);

export const selectLettersSearchParams = createSelector(
  selectAppointmentFeature,
  (state: LettersState) => state?.lettersSearchParams
);
