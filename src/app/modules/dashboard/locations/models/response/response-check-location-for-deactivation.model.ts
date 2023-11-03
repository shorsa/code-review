import { BaseResponseModel } from 'src/app/shared/models';

export interface ResponseCheckLocationEntityForDeactivationModel
  extends BaseResponseModel {
  appointments: ResponseCheckLocationEntityForDeactivationAppointmentModel[];
}

export interface ResponseCheckLocationEntityForDeactivationAppointmentModel {
  appointmentId: string;
  date: string;
  referralCustomId: string;
  clientName: string;
}
