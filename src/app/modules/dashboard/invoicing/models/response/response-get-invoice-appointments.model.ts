import { BaseResponseModel } from 'src/app/shared/models';

export interface ResponseGetInvoiceAppointmentsModel extends BaseResponseModel {
  totalCount: number;
  appointments: ResponseInvoiceAppointmentListItemModel[];
}

export interface ResponseInvoiceAppointmentListItemModel {
  id: string;
  customId: string;
  referralCustomId: string;
  appointmentTime: string;
  patientCustomId: string;
  appointmentType: string;
  lateCancellation: boolean;
  dna: boolean;
  price?: number;
}
