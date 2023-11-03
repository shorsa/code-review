import { BaseResponseModel, DepartmentModel } from 'src/app/shared/models';

export interface ResponseGetDepartmentByIdModel extends BaseResponseModel {
  department: DepartmentModel;
}
