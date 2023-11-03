import { ClinicTypeEnum, IsActiveFilterEnum } from 'src/app/shared/enums';
import { RequestBasePaginationModel } from 'src/app/shared/models';
import { ClinicOrderByOptionsEnum } from '../../enums';

export interface RequestGetClinicListModel extends RequestBasePaginationModel {
  startDate?: string;
  endDate?: string;
  clinicianId?: string;
  searchText?: string;
  clinicTypes?: ClinicTypeEnum[];
  clinicOrderByOptions?: ClinicOrderByOptionsEnum;
  isOrderByAsc?: boolean;
  isActiveFilter: IsActiveFilterEnum;
}
