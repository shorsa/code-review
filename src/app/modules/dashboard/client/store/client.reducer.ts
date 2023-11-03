import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { ClientState } from '.';
import * as clientActions from './client.actions';
import * as clientUsersActions from './client-users.actions';
import * as clientDocumentsActions from './client-documents.actions';
import * as termsAndCondActions from './terms-and-conditions.actions';
import { IsActiveFilterEnum } from 'src/app/shared/enums';
import { ClientOrderByOptionsEnum, ClientUserOrderByOptions } from '../enums';
import { ClientUserModel, UserModel } from 'src/app/shared/models';
import { CommonConstants } from 'src/app/core/constants';

const initialState: ClientState = {
  clientDetails: undefined,
  clientsSearchParams: {
    pageSize: CommonConstants.PAGE_SIZE_OPTIONS[0],
    pageIndex: 0,
    searchText: undefined,
    clientOrderByOptions: ClientOrderByOptionsEnum.None,
    isOrderByAsc: undefined,
    isActiveFilter: IsActiveFilterEnum.Active,
  },
  clientsListData: undefined,
  clientUserDetails: undefined,
  clientUsersSearchParams: {
    pageSize: CommonConstants.PAGE_SIZE_OPTIONS[0],
    pageIndex: 0,
    searchText: undefined,
    clientId: undefined,
    clientUserOrderByOptions: ClientUserOrderByOptions.None,
    isOrderByAsc: undefined,
    isActiveFilter: IsActiveFilterEnum.Active,
  },
  clientUsersListData: undefined,
  documentsList: undefined,
  termsAndConditionsDetails: undefined,
};

export const clientReducer: ActionReducer<ClientState, Action> = createReducer(
  initialState,
  on(
    clientActions.clientGetByIdSuccessAction,
    (state: ClientState, { payload }): ClientState => {
      const { client } = payload;
      return {
        ...state,
        clientDetails: client,
      };
    }
  ),
  on(
    clientActions.setClientsSearchParamsAction,

    (state: ClientState, { payload }): ClientState => {
      return {
        ...state,
        clientsSearchParams: payload,
      };
    }
  ),
  on(
    clientActions.clientsSearchSuccessAction,
    (state: ClientState, { payload }): ClientState => {
      return {
        ...state,
        clientsListData: payload,
      };
    }
  ),
  on(clientActions.clearClientDetailsDataAction, (state: ClientState): ClientState => {
    return {
      ...state,
      clientDetails: initialState.clientDetails,
    };
  }),
  on(clientActions.clearClientSearchParamsAction, (state: ClientState): ClientState => {
    return {
      ...state,
      clientsSearchParams: initialState.clientsSearchParams,
    };
  }),

  on(
    clientUsersActions.clientUserGetByIdSuccessAction,
    (state: ClientState, { payload }): ClientState => {
      const { clientUser } = payload;
      return {
        ...state,
        clientUserDetails: clientUser,
      };
    }
  ),
  on(
    clientUsersActions.setClientUsersSearchParamsAction,
    (state: ClientState, { payload }): ClientState => {
      return {
        ...state,
        clientUsersSearchParams: payload,
      };
    }
  ),
  on(
    clientUsersActions.clientUsersSearchSuccessAction,
    (state: ClientState, { payload }): ClientState => {
      return {
        ...state,
        clientUsersListData: payload,
      };
    }
  ),
  on(
    clientUsersActions.clearClientUserDetailsDataAction,
    (state: ClientState): ClientState => {
      return {
        ...state,
        clientUserDetails: initialState.clientUserDetails,
      };
    }
  ),
  on(
    clientUsersActions.clearClientUserSearchParamsAction,
    (state: ClientState): ClientState => {
      return {
        ...state,
        clientUsersSearchParams: initialState.clientUsersSearchParams,
      };
    }
  ),
  on(
    clientDocumentsActions.clientDocumentsSearchSuccessAction,
    (state: ClientState, { payload }): ClientState => {
      return {
        ...state,
        documentsList: payload,
      };
    }
  ),
  on(
    termsAndCondActions.clientTrmAndCondGetByClientIdSuccessAction,
    (state: ClientState, { payload }): ClientState => {
      return {
        ...state,
        termsAndConditionsDetails: payload,
      };
    }
  )
);

export function ClientReducer(state: ClientState, action: Action) {
  return clientReducer(state, action);
}
