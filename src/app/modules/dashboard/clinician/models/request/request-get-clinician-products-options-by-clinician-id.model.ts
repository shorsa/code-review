import { RequestBasePaginationModel } from 'src/app/shared/models';

export interface RequestGetClinicianProductsOptionsByClinicianIdModel
  extends RequestBasePaginationModel {
  clinicianId: string;
  searchText?: string;
}
