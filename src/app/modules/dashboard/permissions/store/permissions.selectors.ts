import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ReducerNodesEnum } from 'src/app/app-store';
import { PermissionsState } from '.';

const selectPermissionFeature = createFeatureSelector<PermissionsState>(
  ReducerNodesEnum.permissions
);

export const selectPermissionsList = createSelector(
  selectPermissionFeature,
  (state: PermissionsState) => state?.permissionsList
);

export const selectPermissionsByEnum = createSelector(
  selectPermissionFeature,
  (state: PermissionsState) => state?.permissionsListByEnum
);
