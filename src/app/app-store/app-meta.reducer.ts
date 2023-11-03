import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { AppState } from '.';
import { AuthReducer } from '../modules/auth/store/auth.reducer';
import { ClientReducer } from '../modules/dashboard/client/store/client.reducer';
import { ClinicReducer } from '../modules/dashboard/clinics/store/clinics.reducer';
import { DepartmentReducer } from '../modules/dashboard/departments/store/department.reducer';
import { LocationReducer } from '../modules/dashboard/locations/store/locations.reducer';
import { PatientReducer } from '../modules/dashboard/patients/store/patient.reducer';
import { ProductReducer } from '../modules/dashboard/products/store/products.reducer';
import { ReferralReducer } from '../modules/dashboard/referral/state/referral.reducer';
import { StatsReducer } from '../modules/dashboard/stats/store/stats.reducer';
import { StaffReducer } from '../modules/dashboard/staff/store/staff.reducer';
import { saveStorMetaReducer } from './app-save-store';
import { AppStateReducer } from './app-state/app-state.reducer';
import { ClinicianReducer } from '../modules/dashboard/clinician/store/clinician.reducer';
import { RadiologyReducer } from '../modules/dashboard/radiology/store/radiology.reducer';

export const reducers: ActionReducerMap<any, any> = {
  auth: AuthReducer,
  client: ClientReducer,
  department: DepartmentReducer,
  staff: StaffReducer,
  patient: PatientReducer,
  product: ProductReducer,
  referral: ReferralReducer,
  clinician: ClinicianReducer,
  location: LocationReducer,
  clinics: ClinicReducer,
  radiology: RadiologyReducer,
  appState: AppStateReducer,
  stats: StatsReducer,
};

export function logger(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return (state, action) => {
    console.log('state', state);
    console.log('action', action);
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<any>[] = !environment.production
  ? [saveStorMetaReducer]
  : [saveStorMetaReducer];
