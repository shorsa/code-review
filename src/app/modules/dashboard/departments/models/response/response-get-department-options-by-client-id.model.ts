import { BaseResponseModel } from 'src/app/shared/models';

export interface GetDepartmentOptionsResponseModel extends BaseResponseModel {
  departmentsByClient: { [key: string]: ResponseGetDepartmentOptionsModelIdem[] };
}

export interface ResponseGetDepartmentOptionsModelIdem {
  id: string;
  name: string;
}
