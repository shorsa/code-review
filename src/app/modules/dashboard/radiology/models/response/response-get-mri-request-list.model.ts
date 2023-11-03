import { BaseResponseModel, OHRDUserModel } from 'src/app/shared/models';

export interface ResponseGetMriRequestListModel extends BaseResponseModel {
  requests: ResponseGetMriRequestListModelItem[];
  totalCount: number;
}

export interface ResponseGetMriRequestListModelItem {
  id: string;
  customId: string;
  requestDate: string;
  patientName: string;
  consultantName: string;
  type?: string;
  isPrinted: boolean;
}
