import { RequestBasePaginationModel } from 'src/app/shared/models';

export interface RequestGetClientDocumentListByClientIdModel
  extends RequestBasePaginationModel {
  searchText?: string;
  clientId?: string;
}
