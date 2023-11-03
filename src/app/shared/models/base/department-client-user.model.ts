import { ClientUserModel } from './client-user.model';
import { DepartmentModel } from './department.model';

export interface DepartmentClientUserModel {
  id: string;
  departmentId: string;
  department: DepartmentModel;
  clientUserId: string;
  clientUser: ClientUserModel;
}
