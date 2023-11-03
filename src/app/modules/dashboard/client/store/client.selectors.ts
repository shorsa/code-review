import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ReducerNodesEnum } from 'src/app/app-store';
import { ClientState } from '.';

const selectClientFeature = createFeatureSelector<ClientState>(ReducerNodesEnum.client);

export const selectClientState = createSelector(
  selectClientFeature,
  (state: ClientState) => state
);

export const selectClientDetails = createSelector(
  selectClientFeature,
  (state: ClientState) => state?.clientDetails
);

export const selectClientsList = createSelector(
  selectClientFeature,
  (state: ClientState) => state?.clientsListData
);

export const selectClientsSearchParams = createSelector(
  selectClientFeature,
  (state: ClientState) => state?.clientsSearchParams
);

export const selectClientUsersSearchParams = createSelector(
  selectClientFeature,
  (state: ClientState) => state?.clientUsersSearchParams
);

export const selectClientUserDetails = createSelector(
  selectClientFeature,
  (state: ClientState) => state?.clientUserDetails
);

export const selectClientUsersList = createSelector(
  selectClientFeature,
  (state: ClientState) => state?.clientUsersListData
);

export const selectClientDocumentsList = createSelector(
  selectClientFeature,
  (state: ClientState) => state?.documentsList
);

export const selectTermsAndConditionsDetails = createSelector(
  selectClientFeature,
  (state: ClientState) => state?.termsAndConditionsDetails
);
