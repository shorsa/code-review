import { ClinicModel } from 'src/app/shared/models';
import { RequestGetClinicListModel, ResponseClinicByIdItem, ResponseGetClinicListModel } from '../models';
import { ResponseGetAppointmentListModel } from '../../appointments/models';

export interface ClinicsState {
  clinicDetails?: ResponseClinicByIdItem;
  clinicsSearchParams?: RequestGetClinicListModel;
  clinicsListData?: ResponseGetClinicListModel;
  clinicAppointmentsListData?: ResponseGetAppointmentListModel;
}
