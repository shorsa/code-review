import { RequestGetMriRequestListModel, ResponseGetMriRequestListModel } from '../models';

export interface RadiologyState {
  radiologySearchParams?: RequestGetMriRequestListModel;
  radiologyListData?: ResponseGetMriRequestListModel;
}
