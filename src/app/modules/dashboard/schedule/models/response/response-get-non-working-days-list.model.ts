import { BaseResponseModel } from 'src/app/shared/models';

export interface ResponseGetNonWorkingDaysListModel extends BaseResponseModel {
  days: ResponseNonWorkingDayListItemModel[];
  totalCount: number;
}

export interface ResponseNonWorkingDayListItemModel {
  id?: string;
  date: string;
}
