import { RequestBasePaginationModel } from 'src/app/shared/models';

export interface RequestGetClientOptionsModel extends RequestBasePaginationModel {
  searchText?: string;
}
