//Request
export * from './request/request-activate-appointment.model';
export * from './request/request-create-appointment.model';
export * from './request/request-deactivate-appointment.model';
export * from './request/request-get-appointment-by-id.model';
export * from './request/request-get-appointment-list.model';
export * from './request/request-update-appointment.model';
export * from './request/request-update-appointment-status.model';
export * from './request/request-update-appointment-report.model';

//Patient Details
export * from './request/request-get-patient-details-by-appointment-id.model';

//Documents
export * from './request/request-get-appointment-document-list-by-appointmentId.model';
export * from './request/request-create-appointment-document.model';
export * from './request/request-get-appointment-document-by-id-with-content.model';
export * from './request/request-delete-appointment-document.model';

//Audit logs
export * from './request/request-get-appointment-audit-logs.model';

//Attendance yes details
export * from './request/request-get-attendance-yes-details.model';
export * from './request/request-update-appointment-details.model';
export * from './request/request-update-patient-contact-information.model';

//Appointment yes stats
export * from './request/request-update-appointment-settings.model';

//Response
export * from './response/response-create-appointment.model';
export * from './response/response-get-appointment-by-id.model';
export * from './response/response-get-appointment-list.model';

//Patient Details
export * from './response/response-get-patient-details-by-appointment-id.model';

//Documents
export * from './response/response-get-appointment-document-list.model';

//Audit logs
export * from './response/response-get-audit-log-list.model';
