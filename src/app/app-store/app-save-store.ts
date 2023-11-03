import { Action, ActionReducer } from '@ngrx/store/src/models';
import * as lodash from 'lodash';
import { ReducerNodesEnum } from '.';

export const STORE_KEY = 'store';

const stateKeysForSave: ReducerNodesEnum[] = [ReducerNodesEnum.auth];

function setSavedState(state: any, localStorageKey: string) {
  localStorage.setItem(localStorageKey, JSON.stringify(state));
}
function getSavedState(localStorageKey: string): any {
  const stateFromLocalStore = localStorage.getItem(localStorageKey);
  if (stateFromLocalStore) {
    return JSON.parse(stateFromLocalStore);
  }
}

export function saveStorMetaReducer<S, A extends Action = Action>(
  reducer: ActionReducer<S, A>
) {
  let onInit = true;
  return (state: S, action: A): S => {
    const nextState = reducer(state, action);
    if (onInit) {
      onInit = false;
      const savedData = getSavedState(STORE_KEY);
      if (savedData) {
        const savedState = savedData;
        return lodash.merge(nextState, savedState);
      }
    }
    const stateToSave = lodash.pick(nextState, stateKeysForSave);
    setSavedState(stateToSave, STORE_KEY);
    return nextState;
  };
}
