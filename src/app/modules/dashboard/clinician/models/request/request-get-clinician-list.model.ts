import { IsActiveFilterEnum } from 'src/app/shared/enums';
import { RequestBasePaginationModel } from 'src/app/shared/models';
import { ClinicianOrderByOptionsEnum } from '../../enums/clinician-order-by-options.enum';

export interface RequestGetClinicianListModel extends RequestBasePaginationModel {
  searchText?: string;
  clinicianOrderByOptions?: ClinicianOrderByOptionsEnum;
  isOrderByAsc?: boolean;
  isActiveFilter: IsActiveFilterEnum;
}
