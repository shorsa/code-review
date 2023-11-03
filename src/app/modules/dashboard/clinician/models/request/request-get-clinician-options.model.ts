import { RequestBasePaginationModel } from 'src/app/shared/models';

export interface RequestGetClinicianOptionsModel extends RequestBasePaginationModel {
  searchText?: string;
  referralId?: string;
}
