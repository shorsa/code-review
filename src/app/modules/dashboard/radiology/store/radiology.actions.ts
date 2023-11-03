import { createAction, props } from '@ngrx/store';
import { BaseResponseModel } from 'src/app/shared/models';
import {
  RequestCreateMriRequestModel,
  RequestDismissMriRequestModel,
  RequestGetMriRequestListModel,
  RequestMarkAsPrintedMriModel,
  ResponseGetMriRequestListModel,
} from '../models';

//CREATE
const MRI_CREATE = '[RADIOLOGY] mri create';
export const mriCreateAction = createAction(
  MRI_CREATE,
  props<{ payload: RequestCreateMriRequestModel }>()
);

export const mriCreateSuccessAction = createAction(
  `${MRI_CREATE} success`,
  props<{ payload: BaseResponseModel }>()
);

//SEARCH
const SEARCH_MRI = '[RADIOLOGY]  search mri';
export const setMriSearchParamsAction = createAction(
  SEARCH_MRI,
  props<{ payload: RequestGetMriRequestListModel }>()
);

export const mriSearchSuccessAction = createAction(
  `${SEARCH_MRI} success`,
  props<{ payload: ResponseGetMriRequestListModel }>()
);

//DISMISS
const MRI_DISMISS = '[RADIOLOGY] mri dismiss';
export const mriDismissAction = createAction(
  MRI_DISMISS,
  props<{ payload: RequestDismissMriRequestModel }>()
);

export const mriDismissSuccessAction = createAction(
  `${MRI_DISMISS} success`,
  props<{ payload: BaseResponseModel }>()
);

//DISMISS
const MRI_MARK_AD_PRINTED = '[RADIOLOGY] mri mark as printed';
export const mriMarkAsPrintedAction = createAction(
  MRI_MARK_AD_PRINTED,
  props<{ payload: RequestMarkAsPrintedMriModel }>()
);

export const mriMarkAsPrintedSuccessAction = createAction(
  `${MRI_DISMISS} success`,
  props<{ payload: BaseResponseModel }>()
);

const RADIOLOGY_CLEAR_DETAILS = '[RADIOLOGY] clear mri details';
export const clearMriDetailsDataAction = createAction(RADIOLOGY_CLEAR_DETAILS);

const RADIOLOGY_CLEAR_SEARCH_PARAMS = '[RADIOLOGY] clear search params mri';
export const clearMriSearchParamsAction = createAction(RADIOLOGY_CLEAR_SEARCH_PARAMS);
