import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { AppStoreState } from '.';
import * as actions from './app-state.actions';

const initialState: AppStoreState = {
  error: undefined,
  isApiError: undefined,
  isControlError: undefined,
  isLoading: false,
};

export const appStateReducer: ActionReducer<AppStoreState, Action> = createReducer(
  initialState,
  on(actions.errorAction, (state: AppStoreState, { payload }): AppStoreState => {
    const { error, isApiError, isControlError } = payload;

    return { ...state, error, isApiError, isControlError };
  }),
  on(
    actions.clearErrorAction,
    (state: AppStoreState): AppStoreState => ({
      ...state,
      ...initialState,
    })
  ),
  on(
    actions.showLoaderAction,
    (state: AppStoreState): AppStoreState => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    actions.hideLoaderAction,
    (state: AppStoreState): AppStoreState => ({
      ...state,
      isLoading: false,
    })
  ),
  on(
    actions.tokenRefreshingAction,
    (state: AppStoreState): AppStoreState => ({
      ...state,
      isRefreshingToken: true,
    })
  ),
  on(
    actions.tokenRefreshedAction,
    (state: AppStoreState): AppStoreState => ({
      ...state,
      isRefreshingToken: false,
    })
  )
);

export function AppStateReducer(state: AppStoreState, action: Action): AppStoreState {
  return appStateReducer(state, action);
}
