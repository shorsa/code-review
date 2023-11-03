import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { ContractsState } from '.';
import * as contractsActions from './contracts.actions';
import { RequestUpdateContractModel, ResponseGetContractByIdModel } from '../models';
import { ResponseClientListItem } from '../../client/models';
import { CommonConstants } from 'src/app/core/constants';

const initialState: ContractsState = {
  contractsSearchParams: {
    pageSize: CommonConstants.PAGE_SIZE_OPTIONS[0],
    pageIndex: 0,
    searchText: undefined,
    contractOrderByOptions: undefined,
    isOrderByAsc: undefined,
  },
  contractsListData: undefined,
  // contractDetails: undefined,
  contractTemporaryData: undefined,
  notificationMessage: undefined,
  // contractProductsList: undefined,
  // contractCliniciansList: undefined,
};

export const contractsReducer: ActionReducer<ContractsState, Action> = createReducer(
  initialState,
  on(
    contractsActions.setContractsSearchParamsAction,

    (state: ContractsState, { payload }): ContractsState => {
      return {
        ...state,
        contractsSearchParams: payload,
      };
    }
  ),

  on(
    contractsActions.contractsSearchSuccessAction,
    (state: ContractsState, { payload }): ContractsState => {
      return {
        ...state,
        contractsListData: payload,
      };
    }
  ),
  on(
    contractsActions.clearContractsSearchParamsAction,
    (state: ContractsState): ContractsState => {
      return {
        ...state,
        contractsSearchParams: initialState.contractsSearchParams,
      };
    }
  ),
  on(
    contractsActions.getContractByIdSuccessAction,
    (state: ContractsState, { payload }): ContractsState => {
      const model: RequestUpdateContractModel &
        Partial<Pick<ResponseGetContractByIdModel, 'client' | 'customId'>> = {
        id: payload.id,
        clientId: payload.clientId,
        clientAddress: payload.clientAddress,
        paymentTimeFrame: payload.paymentTimeFrame,
        invoiceType: payload.invoiceType,
        products: [],
        clinicianIds: [],
        client: payload.client,
        customId: payload.customId,
      };

      return {
        ...state,
        contractTemporaryData: model,
      };
    }
  ),

  on(
    contractsActions.saveContractDataToStoreAction,
    (state: ContractsState, { payload }): ContractsState => {
      const contractTemporaryData = state.contractTemporaryData;

      return {
        ...state,
        contractTemporaryData: { ...contractTemporaryData, ...payload },
      };
    }
  ),

  //PRODUCT TYPES
  on(
    contractsActions.getContractProductsSuccessAction,
    (state: ContractsState, { payload }): ContractsState => {
      return {
        ...state,
        contractTemporaryData: {
          ...state.contractTemporaryData!,
          contractProducts: payload.contractProducts,
        },
      };
    }
  ),
  on(
    contractsActions.deleteProductItemAction,
    (state: ContractsState, { payload }): ContractsState => {
      const contractProducts = [...state.contractTemporaryData!.contractProducts!] ?? [];
      const productIndexToRemove = contractProducts?.findIndex(
        (item) => item.productId === payload.productId
      )!;
      contractProducts?.splice(productIndexToRemove, 1);

      const remainingProductIds = contractProducts.map((product) => product.productId);

      if (state.contractTemporaryData?.contractClinicians?.length) {
        const originalClinicians = [...state.contractTemporaryData?.contractClinicians!];

        const updatedClinicians = state.contractTemporaryData?.contractClinicians?.filter(
          (clinician) => {
            return clinician.products.some((product) =>
              remainingProductIds.includes(product)
            );
          }
        );

        const removedClinicians = originalClinicians
          .filter((clinician) => !updatedClinicians.includes(clinician))
          ?.map((item) => item.name);

        if (removedClinicians.length) {
          const removedCliniciansMessage = `Due to the removal of the product, kindly exclude the doctor ${removedClinicians.join(
            ', '
          )}  from the contract.`;
          return {
            ...state,
            notificationMessage: removedCliniciansMessage,
          };
        }
        return {
          ...state,
          contractTemporaryData: {
            ...state.contractTemporaryData!,
            contractProducts: contractProducts,
            contractClinicians: updatedClinicians,
          },
        };
      }

      return {
        ...state,
        contractTemporaryData: {
          ...state.contractTemporaryData!,
          contractProducts: contractProducts,
        },
      };
    }
  ),

  on(
    contractsActions.clearNotificationAction,
    (state: ContractsState): ContractsState => {
      return {
        ...state,
        notificationMessage: initialState.notificationMessage,
      };
    }
  ),

  on(
    contractsActions.addProductsItemsAction,
    (state: ContractsState, { payload }): ContractsState => {
      return {
        ...state,
        contractTemporaryData: {
          ...state.contractTemporaryData!,
          contractProducts: payload,
        },
      };
    }
  ),
  // on(
  //   contractsActions.clearProductTypesAction,
  //   (state: ContractsState): ContractsState => {
  //     return {
  //       ...state,
  //       contractProductsList: initialState.contractProductsList,
  //     };
  //   }
  // ),

  // CLINICIANS
  on(
    contractsActions.getContractCliniciansSuccessAction,
    (state: ContractsState, { payload }): ContractsState => {
      return {
        ...state,
        contractTemporaryData: {
          ...state.contractTemporaryData!,
          contractClinicians: payload.contractClinicians,
        },
      };
    }
  ),
  on(
    contractsActions.addCliniciansItemsAction,
    (state: ContractsState, { payload }): ContractsState => {
      const clinicians = state.contractTemporaryData?.contractClinicians ?? [];

      return {
        ...state,
        contractTemporaryData: {
          ...state.contractTemporaryData!,
          contractClinicians: payload.clinicians,
        },
      };
    }
  ),
  on(
    contractsActions.deleteClinicianItemAction,
    (state: ContractsState, { payload }): ContractsState => {
      const clinicianIds = [...state.contractTemporaryData!.clinicianIds!] ?? [];
      const productIndexToRemove = clinicianIds?.findIndex(
        (item) => item === payload.clinicianId
      )!;

      clinicianIds?.splice(productIndexToRemove, 1);
      return {
        ...state,
        contractTemporaryData: {
          ...state.contractTemporaryData!,
          clinicianIds: clinicianIds,
        },
      };
    }
  ),
  on(
    contractsActions.clearContractsDetailsAction,
    (state: ContractsState): ContractsState => {
      return {
        ...state,
        contractTemporaryData: initialState.contractTemporaryData,
      };
    }
  )
);

export function ContractsReducer(state: ContractsState, action: Action) {
  return contractsReducer(state, action);
}
