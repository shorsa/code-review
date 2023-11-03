import { AuthState } from '../modules/auth/store';
import { ClientState } from '../modules/dashboard/client/store';
import { DepartmentState } from '../modules/dashboard/departments/store';
import { PatientState } from '../modules/dashboard/patients/store';
import { ProductState } from '../modules/dashboard/products/store';
import { ReferralState } from '../modules/dashboard/referral/state';
import { StaffState } from '../modules/dashboard/staff/store';
import { AppStoreState } from './app-state';

export enum ReducerNodesEnum {
  auth = 'auth',
  client = 'client',
  clinics = 'clinics',
  department = 'department',
  staff = 'staff',
  permissions = 'permissions',
  patient = 'patient',
  referral = 'referral',
  product = 'product',
  clinician = 'clinician',
  appointments = 'appointments',
  location = 'location',
  stats = 'stats',
  radiology = 'radiology',
  letters = 'letters',
  contracts = 'contracts',
  schedule = 'schedule',
  invoicing = 'invoicing',
  appState = 'appState',
}

export interface AppState {
  auth?: AuthState;
  client?: ClientState;
  department?: DepartmentState;
  staff?: StaffState;
  patient?: PatientState;
  product?: ProductState;
  referral?: ReferralState;
  appState?: AppStoreState;
}
