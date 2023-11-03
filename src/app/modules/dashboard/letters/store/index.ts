import {
  RequestGetAppointmentReportsListModel,
  ResponseGetAppointmentReportListModel,
} from '../models';

export interface LettersState {
  lettersSearchParams?: RequestGetAppointmentReportsListModel;
  lettersListData?: ResponseGetAppointmentReportListModel;
}
