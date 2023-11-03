import { ClientModel } from './client.model';
import { DepartmentModel } from './department.model';
import { UserModel } from './user.model';

export interface ClientUserModel {
  id: string;
  customClientUserId: string;
  applicationUserId: string;
  applicationUser: UserModel;
  isSuperuser: boolean;
  clientId: string;
  client: ClientModel;
  departmentId?: string;
  department: DepartmentModel;
  clientUserDepartments: ClientUserDepartmentModel[];
  canBookOnline: boolean;
}

export interface ClientUserDepartmentModel {
  id?: string;
  clientUserId?: string;
  clientUser?: ClientUserModel;
  departmentId: string;
  department?: DepartmentModel;
}



