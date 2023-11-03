import { BaseResponseModel } from 'src/app/shared/models';

export interface ResponseGetClinicianOptionsModel extends BaseResponseModel {
  clinicians: ResponseGetClinicianOptionsModelItem[];
}

export interface ResponseGetClinicianOptionsModelItem {
  id: string;
  name: string;
}
