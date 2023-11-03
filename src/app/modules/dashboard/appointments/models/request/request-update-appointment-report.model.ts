export interface RequestUpdateAppointmentReportModel {
  appointmentId: string;
  report?: string;
  isUrgent: boolean;
  isRedFlag: boolean;
  voiceFiles?: Blob[];
  isSubmit: boolean;
}
