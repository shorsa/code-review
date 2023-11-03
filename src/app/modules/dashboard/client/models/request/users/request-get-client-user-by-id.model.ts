import { RequestBasePaginationModel } from 'src/app/shared/models';

export interface RequestGetClientUserByIdModel extends RequestBasePaginationModel {
  id: string;
}
