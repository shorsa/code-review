import { BaseResponseModel } from 'src/app/shared/models';

export interface ResponseGetMriTypesModel extends BaseResponseModel {
  mriTypes: string[];
}
