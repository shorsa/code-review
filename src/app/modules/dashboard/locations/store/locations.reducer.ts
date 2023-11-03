import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { IsActiveFilterEnum } from 'src/app/shared/enums';
import { LocationsState } from '.';
import * as locationActions from './locations.actions';
import * as sitesActions from './sites.actions';
import * as roomsActions from './rooms.actions';

const initialState: LocationsState = {
  locationDetails: undefined,
  locationListData: undefined,
  siteDetails: undefined,
  sitesListData: undefined,
  roomDetails: undefined,
  roomsListData: undefined,
};

export const locationReducer: ActionReducer<LocationsState, Action> = createReducer(
  initialState,
  on(
    locationActions.locationGetByIdSuccessAction,
    (state: LocationsState, { payload }): LocationsState => {
      const { location } = payload;
      return {
        ...state,
        locationDetails: location,
      };
    }
  ),
  on(
    locationActions.locationsSearchSuccessAction,
    (state: LocationsState, { payload }): LocationsState => {
      return {
        ...state,
        locationListData: payload,
      };
    }
  ),
  on(
    locationActions.clearLocationDetailsDataAction,
    (state: LocationsState): LocationsState => {
      return {
        ...state,
        locationDetails: initialState.locationDetails,
      };
    }
  ),
  on(
    sitesActions.siteGetByIdSuccessAction,
    (state: LocationsState, { payload }): LocationsState => {
      const { site } = payload;
      return {
        ...state,
        siteDetails: site,
      };
    }
  ),
  on(
    sitesActions.sitesSearchSuccessAction,
    (state: LocationsState, { payload }): LocationsState => {
      return {
        ...state,
        sitesListData: payload,
      };
    }
  ),
  on(sitesActions.clearSiteDetailsDataAction, (state: LocationsState): LocationsState => {
    return {
      ...state,
      siteDetails: initialState.siteDetails,
    };
  }),
  on(
    roomsActions.roomGetByIdSuccessAction,
    (state: LocationsState, { payload }): LocationsState => {
      const { room } = payload;
      return {
        ...state,
        roomDetails: room,
      };
    }
  ),
  on(
    roomsActions.roomsSearchSuccessAction,
    (state: LocationsState, { payload }): LocationsState => {
      return {
        ...state,
        roomsListData: payload,
      };
    }
  ),
  on(roomsActions.clearRoomDetailsDataAction, (state: LocationsState): LocationsState => {
    return {
      ...state,
      roomDetails: initialState.roomDetails,
    };
  })
);

export function LocationReducer(state: LocationsState, action: Action) {
  return locationReducer(state, action);
}
