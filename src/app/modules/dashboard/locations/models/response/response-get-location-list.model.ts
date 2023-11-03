import { BaseResponseModel, RequestBasePaginationModel } from 'src/app/shared/models';
import { ResponseSiteListItem } from './response-get-site-list.model';

export interface ResponseGetLocationListModel extends BaseResponseModel {
  locations: ResponseLocationListItem[];
  totalCount: number;
}

export interface ResponseLocationListItem {
  id: string;
  name: string;
  sites: ResponseSiteListItem[];
}
