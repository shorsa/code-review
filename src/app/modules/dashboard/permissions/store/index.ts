import { ResponseGetPermissionsListModel, ResponseGetRoleByEnumModel } from '../models';

export interface PermissionsState {
  permissionsListByEnum?: ResponseGetRoleByEnumModel;
  permissionsList?: Omit<ResponseGetPermissionsListModel, 'message' | 'success'>;
}
