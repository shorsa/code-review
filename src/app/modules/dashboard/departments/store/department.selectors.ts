import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ReducerNodesEnum } from 'src/app/app-store';
import { DepartmentState } from '.';

const selectDepartmentFeature = createFeatureSelector<DepartmentState>(
  ReducerNodesEnum.department
);

export const selectUserData = createSelector(
  selectDepartmentFeature,
  (state: DepartmentState) => state
);

export const selectDepartmentDetails = createSelector(
  selectDepartmentFeature,
  (state: DepartmentState) => state?.departmentDetails
);

export const selectDepartmentsList = createSelector(
  selectDepartmentFeature,
  (state: DepartmentState) => state?.departmentsListData
);

export const selectPatientsList = createSelector(
  selectDepartmentFeature,
  (state: DepartmentState) => state?.patientsListData
);

export const selectDepartmentsSearchParams = createSelector(
  selectDepartmentFeature,
  (state: DepartmentState) => state?.departmentsSearchParams
);

export const selectDepartmentsOptions = createSelector(
  selectDepartmentFeature,
  (state: DepartmentState) => state?.departmentsOptions
);
