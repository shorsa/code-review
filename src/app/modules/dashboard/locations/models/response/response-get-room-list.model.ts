import { BaseResponseModel } from 'src/app/shared/models';

export interface ResponseGetRoomListModel extends BaseResponseModel {
  rooms: ResponseRoomListItem[];
  totalCount: number;
}

export interface ResponseRoomListItem {
  id: string;
  name: string;
  siteId: string;
  isActive: boolean;
}
