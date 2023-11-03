import { RequestBasePaginationModel } from 'src/app/shared/models';

export interface RequestGetDepartmentOptionsByClientIdModel
  extends RequestBasePaginationModel {
  departmentNameSearch?: string;
  clientIds?: string[];
}
