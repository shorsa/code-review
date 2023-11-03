import { RequestBasePaginationModel } from 'src/app/shared/models';

export interface RequestGetNonWorkingDaysListModel extends RequestBasePaginationModel {
  isOrderByAsc?: boolean;
}
