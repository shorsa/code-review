import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ReducerNodesEnum } from 'src/app/app-store';
import { AuthState } from '.';

const selectAuthFeature = createFeatureSelector<AuthState>(ReducerNodesEnum.auth);

export const selectUserData = createSelector(
  selectAuthFeature,
  (state: AuthState) => state
);

export const selectUserEmail = createSelector(
  selectAuthFeature,
  (state: AuthState) => state?.email
);

export const selectSendCodeState = createSelector(
  selectAuthFeature,
  (state: AuthState) => state?.isCodeSended
);

export const selectLoginError = createSelector(
  selectAuthFeature,
  ({ status, remainingAttempts }: AuthState) => ({
    status,
    remainingAttempts,
  })
);

export const selectCodeAndEmail = createSelector(
  selectAuthFeature,
  ({ email, code }: AuthState) => ({
    email: email,
    code: code,
  })
);
