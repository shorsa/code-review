import { BaseResponseModel } from 'src/app/shared/models';

export interface ResponseGetTermsAndConditionsModel extends BaseResponseModel {
  id: string;
  clientId: string;
  content: string;
}
