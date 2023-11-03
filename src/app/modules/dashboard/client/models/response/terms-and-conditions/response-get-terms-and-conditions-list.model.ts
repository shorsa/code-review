import { BaseResponseModel, TermsAndConditionsModel } from 'src/app/shared/models';

export interface ResponseGetTermsAndConditionsListModel extends BaseResponseModel {
  termsAndConditions: TermsAndConditionsModel[];
  totalCount: number;
}
