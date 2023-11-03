import { BaseResponseModel } from 'src/app/shared/models';

export interface ResponseGetSiteListModel extends BaseResponseModel {
  sites: ResponseSiteListItem[];
  totalCount: number;
}

export interface ResponseSiteListItem {
  id: string;
  name: string;
  locationId: string;
  //Add
  // rooms: RoomListResponseItem[];
}
