import { RequestBasePaginationModel } from 'src/app/shared/models';

export interface RequestGetAppointmentDocumentListByAppointmentIdModel
  extends RequestBasePaginationModel {
  searchText?: string;
  appointmentId: string;
}
