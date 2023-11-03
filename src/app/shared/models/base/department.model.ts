import { ClientUserModel } from './client-user.model';
import { ClientModel } from './client.model';
import { ContractModel } from './contract.model';
import { PatientDepartmentRecordModel } from './patient-department-record.model';

export interface DepartmentModel {
  id: string;
  name: string;
  email: string;
  alertsEmail: string;
  clientId: string;
  client: ClientModel;
  contracts: ContractModel[];
  customDepartmentId: string;
  clientUsers: ClientUserModel[];
  isActive: boolean;
  patientDepartmentRecords: PatientDepartmentRecordModel[];
}
