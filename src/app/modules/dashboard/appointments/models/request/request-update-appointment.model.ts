import { AppointmentNoteModel } from 'src/app/shared/models';
import { AddictionTimeEnum } from '../../enums';

export interface RequestUpdateAppointmentModel {
  id: string;
  timeInPost: string;
  timeWithEmployer: string;
  hoursPerWeek: number;
  shifts: AddictionTimeEnum;
  isAtWork: boolean;
  dateAbsenceCommenced?: string;
  relevantMedicalHistory?: string;
  pastMedicalHealth?: string;
  medication?: string;
  socialWelfare?: string;
  smoker: AddictionTimeEnum;
  alcohol: AddictionTimeEnum;
  drugs: AddictionTimeEnum;
  notes?: AppointmentNoteModel[];
}
