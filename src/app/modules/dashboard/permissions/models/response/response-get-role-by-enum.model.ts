import { BaseResponseModel } from '../../../../../shared/models/base/base-response.model';
import { RoleModel } from '../../../../../shared/models/base/role.model';

export interface ResponseGetRoleByEnumModel extends BaseResponseModel {
  role: RoleModel;
}
