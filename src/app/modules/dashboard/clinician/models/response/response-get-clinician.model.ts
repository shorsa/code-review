import { BaseResponseModel, ClinicianModel } from 'src/app/shared/models';

export interface ResponseGetClinicianModel extends BaseResponseModel {
  clinician: ClinicianModel;
}
