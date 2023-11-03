import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ReducerNodesEnum } from 'src/app/app-store';
import { ContractsState } from '.';

const selectContractsFeature = createFeatureSelector<ContractsState>(
  ReducerNodesEnum.contracts
);

export const selectContractsState = createSelector(
  selectContractsFeature,
  (state: ContractsState) => state
);

export const selectContractsList = createSelector(
  selectContractsFeature,
  (state: ContractsState) => state?.contractsListData
);

export const selectNotificationMessage = createSelector(
  selectContractsFeature,
  (state: ContractsState) => state?.notificationMessage
);

// export const selectContractDetails = createSelector(
//   selectContractsFeature,
//   (state: ContractsState) => state?.contractDetails
// );

export const selectContractTemporaryDetails = createSelector(
  selectContractsFeature,
  (state: ContractsState) => state?.contractTemporaryData
);

export const selectContractsSearchParams = createSelector(
  selectContractsFeature,
  (state: ContractsState) => state?.contractsSearchParams
);

export const selectContractProductsList = createSelector(
  selectContractsFeature,
  (state: ContractsState) => state?.contractTemporaryData?.contractProducts
);

export const selectContractClinicianList = createSelector(
  selectContractsFeature,
  (state: ContractsState) => state?.contractTemporaryData?.contractClinicians
);
