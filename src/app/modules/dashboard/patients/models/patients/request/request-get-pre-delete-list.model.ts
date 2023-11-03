import { IsActiveFilterEnum } from 'src/app/shared/enums';
import { PatientOrderByOptionsEnum } from '../../../enums';
import { RequestBasePaginationModel } from 'src/app/shared/models';

export interface RequestGetPreDeleteListModel extends RequestBasePaginationModel {
  searchText?: string;
  patientOrderByOptions?: PatientOrderByOptionsEnum;
  isOrderByAsc?: boolean;
  isActiveFilter?: IsActiveFilterEnum;
}
