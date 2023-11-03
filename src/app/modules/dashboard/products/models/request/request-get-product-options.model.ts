import { RequestBasePaginationModel } from 'src/app/shared/models';

export interface RequestGetProductOptionsModel extends RequestBasePaginationModel {
  searchText?: string;
}
