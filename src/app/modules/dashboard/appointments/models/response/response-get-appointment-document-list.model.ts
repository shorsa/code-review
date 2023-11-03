import { BaseDocumentModel, BaseResponseModel } from 'src/app/shared/models';

export interface ResponseGetAppointmentDocumentListModel extends BaseResponseModel {
  documents: AppointmentDocumentModel[];
  totalCount: number;
}

export interface AppointmentDocumentModel extends BaseDocumentModel {
  appointmentId: string;
}
