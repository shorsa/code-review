import { createAction, props } from '@ngrx/store';
import {
  RequestCreatePatientNoteModel,
  RequestDeleteConfidentialNoteModel,
  RequestGetNoteListByPatientIdModel,
  RequestUpdatePatientNoteModel,
  ResponseCreatePatientNoteModel,
  ResponseGetNoteListByPatientIdModel,
  ResponseUpdatePatientNoteModel,
} from '../models/notes';

//SEARCH NOTE
const PATIENT_NOTE_SEARCH = '[PATIENT] search notes';
export const patientsNoteListSearchAction = createAction(
  PATIENT_NOTE_SEARCH,
  props<{ payload: RequestGetNoteListByPatientIdModel }>()
);

export const patientsNoteListSearchSuccessAction = createAction(
  `${PATIENT_NOTE_SEARCH} success`,
  props<{
    payload: ResponseGetNoteListByPatientIdModel;
  }>()
);

//CREATE NOTE
const PATIENT_NOTE_CREATE = '[PATIENT] create note';
export const patientCreateNoteAction = createAction(
  PATIENT_NOTE_CREATE,
  props<{
    payload: {
      data: RequestCreatePatientNoteModel;
      searchParams: RequestGetNoteListByPatientIdModel;
    };
  }>()
);

export const patientCreateNoteSuccessAction = createAction(
  `${PATIENT_NOTE_CREATE} success`,
  props<{
    payload: {
      data: ResponseCreatePatientNoteModel;
      searchParams: RequestGetNoteListByPatientIdModel;
    };
  }>()
);

//DELETE NOTE
const PATIENT_NOTE_DELETE = '[PATIENT] delete note';
export const patientDeleteNoteAction = createAction(
  PATIENT_NOTE_DELETE,
  props<{
    payload: {
      data: RequestDeleteConfidentialNoteModel;
      searchParams: RequestGetNoteListByPatientIdModel;
    };
  }>()
);

export const patientDeleteNoteSuccessAction = createAction(
  `${PATIENT_NOTE_DELETE} success`,
  props<{
    payload: {
      searchParams: RequestGetNoteListByPatientIdModel;
    };
  }>()
);

//UPDATE NOTE
const PATIENT_NOTE_UPDATE = '[PATIENT] update patient note';
export const patientNoteUpdateAction = createAction(
  PATIENT_NOTE_UPDATE,
  props<{
    payload: {
      data: RequestUpdatePatientNoteModel;
      searchParams: RequestGetNoteListByPatientIdModel;
    };
  }>()
);

export const patientNoteUpdateSuccessAction = createAction(
  `${PATIENT_NOTE_UPDATE} success`,
  props<{
    payload: {
      data: ResponseUpdatePatientNoteModel;
      searchParams: RequestGetNoteListByPatientIdModel;
    };
  }>()
);
