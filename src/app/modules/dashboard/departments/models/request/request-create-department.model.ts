import { PatientTimeFrameEnum } from '../../enums';

export interface RequestCreateDepartmentModel {
  name: string;
  email: string;
  alertsEmail: string;
  clientId: string;
  patientTimeFrameInHours?: PatientTimeFrameEnum;
}
