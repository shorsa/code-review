import { AppStoreState } from '.';
import { createAction, props } from '@ngrx/store';

const ERROR = '[APP] Error';
export const errorAction = createAction(
  ERROR,
  props<{ payload: Omit<AppStoreState, 'isLoading'> }>()
);

const TOKEN_REFRESHING = '[APP] Token refreshing';
export const tokenRefreshingAction = createAction(TOKEN_REFRESHING);

const TOKEN_REFRESHED = '[APP] Token refreshed';
export const tokenRefreshedAction = createAction(TOKEN_REFRESHED);

const SHOW_LOADER = '[APP] Show loader';
export const showLoaderAction = createAction(SHOW_LOADER);

const HIDE_LOADER = '[APP] Hide loader';
export const hideLoaderAction = createAction(HIDE_LOADER);

const CLEAR_ERROR = '[APP] Error clear';
export const clearErrorAction = createAction(CLEAR_ERROR);

export function loginAttemptErrorAction(arg0: {
  payload: { error: string | undefined; isControlError: boolean };
}): any {
  throw new Error('Function not implemented.');
}
