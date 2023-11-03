import { ClinicianModel } from 'src/app/shared/models';
import {
  RequestGetClinicianListModel,
  ResponseGetClinicianListModel,
  ResponseGetClinicianModel,
  ResponseGetClinicianProductsModel,
} from '../models';

export interface CliniciansState {
  clinicianDetails?: ClinicianModel;
  cliniciansSearchParams?: RequestGetClinicianListModel;
  cliniciansListData?: ResponseGetClinicianListModel;
  clinicianProductsListData?: ResponseGetClinicianProductsModel;
}
