import { BaseResponseModel, RoomModel } from 'src/app/shared/models';

export interface ResponseGetRoomModel extends BaseResponseModel {
  room: RoomModel;
}
