import { PatientTimeFrameEnum } from '../../enums';

export interface RequestUpdateDepartmentModel {
  id: string;
  name: string;
  email: string;
  alertsEmail: string;
  clientId: string;
  patientTimeFrameInHours?: PatientTimeFrameEnum;
}
