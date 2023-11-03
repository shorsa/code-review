import { BaseResponseModel, SiteModel } from 'src/app/shared/models';

export interface ResponseGetSiteModel extends BaseResponseModel {
  site: SiteModel;
}
