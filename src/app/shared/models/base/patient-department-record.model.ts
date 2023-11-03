import { DepartmentModel } from './department.model';
import { PatientModel } from './patient.model';

export interface PatientDepartmentRecordModel {
  id?: string;
  patientId?: string;
  patient?: PatientModel;
  departmentId: string;
  department?: DepartmentModel;
}
