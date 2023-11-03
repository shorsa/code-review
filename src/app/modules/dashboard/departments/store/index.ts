import { DepartmentModel } from 'src/app/shared/models';
import { ResponseGetPatientListModel } from '../../patients/models/patients';
import {
  RequestGetDepartmentListModel,
  ResponseGetDepartmentListModel,
  ResponseGetDepartmentOptionsModelIdem,
} from '../models';

export interface DepartmentState {
  departmentDetails?: DepartmentModel;
  departmentsSearchParams?: RequestGetDepartmentListModel;
  departmentsListData?: ResponseGetDepartmentListModel;
  departmentsOptions?: { [key: string]: ResponseGetDepartmentOptionsModelIdem[] };
  patientsListData?: ResponseGetPatientListModel;
}
