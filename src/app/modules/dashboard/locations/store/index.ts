import { LocationModel, RoomModel, SiteModel } from 'src/app/shared/models';
import {
  RequestGetLocationListModel,
  ResponseGetLocationListModel,
  ResponseGetRoomListModel,
  ResponseGetSiteListModel,
} from '../models';

export interface LocationsState {
  locationDetails?: LocationModel;
  locationListData?: ResponseGetLocationListModel;
  siteDetails?: SiteModel;
  sitesListData?: ResponseGetSiteListModel;
  roomDetails?: RoomModel;
  roomsListData?: ResponseGetRoomListModel;
}
