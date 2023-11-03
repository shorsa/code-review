export class ApiEndpointsConstants {
  /*----------------AUTH-------------------*/
  static readonly AUTH_SIGN_IN = 'auth/SignIn';
  static readonly AUTH_VERIFICATION_CODE = 'auth/TwoStepSignIn';
  static readonly AUTH_FORGOT_PASSWORD = 'auth/ForgotPassword';
  static readonly AUTH_RESET_PASSWORD = 'auth/ResetPassword';
  static readonly AUTH_ADD_PASSWORD = 'auth/AddPassword';
  static readonly AUTH_CONFIRM_EMAIL = 'auth/ConfirmEmailChange';
  static readonly AUTH_RESET_PASSWORD_CODE = 'auth/ValidateForgotPasswordCode';
  static readonly AUTH_RESEND_VERIFICATION_CODE = 'auth/ResendTwoFactorCode';
  static readonly AUTH_REFRESH_TOKEN = 'auth/RefreshAccessToken';
  static readonly AUTH_CONFIRM_SET_NEW_PASSWORD = 'auth/password-confirm';

  /*----------------CLIENT-------------------*/
  static readonly CLIENT_CREATE = 'client/Create';
  static readonly CLIENT_GET_BY_ID = 'client/GetById';
  static readonly CLIENT_GET_ALL = 'client/GetAll';
  static readonly CLIENT_UPDATE = 'client/Update';
  static readonly CLIENT_DELETE = 'client/Delete';
  static readonly CLIENT_DEACTIVATE = 'client/Deactivate';
  static readonly CLIENT_ACTIVATE = 'client/Activate';
  static readonly CLIENT_GET_OPTIONS = 'client/GetClientOptions';

  /*----------------PATIENT-------------------*/
  static readonly PATIENT_CREATE = 'patient/Create';
  static readonly PATIENT_GET_BY_ID = 'patient/GetById';
  static readonly PATIENT_GET_ALL = 'patient/GetAll';
  static readonly PATIENT_UPDATE = 'patient/Update';
  static readonly PATIENT_DELETE = 'patient/Delete';
  static readonly PATIENT_DEACTIVATE = 'patient/Deactivate';
  static readonly PATIENT_ACTIVATE = 'patient/Activate';
  static readonly PATIENT_TRANSFER_TO_DEPARTMENT = 'patient/TransferPatientsToDepartment';
  static readonly PATIENT_MERGE = 'patient/Merge';
  static readonly PATIENT_GET_PRE_DELETE = 'patient/GetPreDeletePatients';
  static readonly PATIENT_CHANGE_DELETION_DATE = 'patient/ChangeDeletionDate';
  static readonly PATIENT_CANCEL_PRE_DELETE = 'patient/CancelPreDelete';
  static readonly PATIENT_DELETE_PRE_DELETE = 'patient/Delete';
  static readonly PATIENT_DELETE_PATIENT_JOB_DOCUMENT =
    'patient/DeletePatientJobDocument';
  static readonly PATIENT_GET_OPTIONS = 'patient/GetPatientOptions';
  static readonly PATIENT_UPDATE_CONTRACT_INFORM = 'patient/UpdatePatientContactInformation';

  /*----------------PATIENT_DOCUMENTS-------------------*/
  static readonly PATIENT_DOCUMENT_CREATE = 'patientDocument/Create';
  static readonly PATIENT_DOCUMENT_GET_ALL = 'patientDocument/GetAll';
  static readonly PATIENT_DOCUMENT_DOWNLOAD = 'patientDocument/Download';
  static readonly PATIENT_DOCUMENT_UPDATE = 'patientDocument/Update';
  static readonly PATIENT_DOCUMENT_DELETE = 'patientDocument/Delete';

  /*----------------PATIENT_NOTES-------------------*/
  static readonly PATIENT_NOTE_CREATE = 'patient/CreateConfidentialNote';
  static readonly PATIENT_NOTE_UPDATE = 'patient/UpdateConfidentialNote';
  static readonly PATIENT_NOTE_GET_ALL = 'patient/GetConfidentialNotesByPatientId';
  static readonly PATIENT_NOTE_DELETE = 'patient/DeleteConfidentialNote';

  static readonly PATIENT_AUDIT_LOG_CREATE = 'patientAuditLog/Create';
  static readonly PATIENT_AUDIT_LOG_UPDATE = 'patientAuditLog/Update';
  static readonly PATIENT_AUDIT_LOG_GET_ALL = 'patient/GetAuditLogsByPatientId';

  /*----------------CLIENT_USER-------------------*/
  static readonly CLIENT_USER_CREATE = 'clientUser/Create';
  static readonly CLIENT_USER_UPDATE = 'clientUser/Update';
  static readonly CLIENT_USER_GET_BY_ID = 'clientUser/GetById';
  static readonly CLIENT_USER_GET_ALL = 'clientUser/GetAll';
  static readonly CLIENT_USER_DELETE = 'clientUser/Delete';
  static readonly CLIENT_USER_DEACTIVATE = 'clientUser/Deactivate';
  static readonly CLIENT_USER_ACTIVATE = 'clientUser/Activate';

  /*----------------PRODUCT-------------------*/
  static readonly PRODUCT_CREATE = 'product/Create';
  static readonly PRODUCT_UPDATE = 'product/Update';
  static readonly PRODUCT_GET_ALL = 'product/GetAll';
  static readonly PRODUCT_GET_BY_ID = 'product/GetById';
  static readonly PRODUCT_DEACTIVATE = 'product/Deactivate';
  static readonly PRODUCT_ACTIVATE = 'product/Activate';
  static readonly PRODUCT_DELETE = 'product/Delete';
  static readonly PRODUCT_OPTIONS = 'product/GetProductOptions';
  static readonly PRODUCT_TEMPLATE_HEADING_BY_ID =
    'product/GetTemplateHeadingByAppointmentId';

  /*----------------STAFF-------------------*/
  static readonly STAFF_CREATE = 'OHRDUser/Create';
  static readonly STAFF_GET_BY_ID = 'OHRDUser/GetById';
  static readonly STAFF_GET_ALL = 'OHRDUser/GetAll';
  static readonly STAFF_UPDATE = 'OHRDUser/Update';
  static readonly STAFF_DELETE = 'OHRDUser/Delete';
  static readonly STAFF_DEACTIVATE = 'OHRDUser/Deactivate';
  static readonly STAFF_ACTIVATE = 'OHRDUser/Activate';

  /*----------------DEPARTMENT-------------------*/
  static readonly DEPARTMENT_CREATE = 'department/Create';
  static readonly DEPARTMENT_GET_BY_ID = 'department/GetById';
  static readonly DEPARTMENT_GET_ALL = 'department/GetAll';
  static readonly DEPARTMENT_UPDATE = 'department/Update';
  static readonly DEPARTMENT_DELETE = 'department/Delete';
  static readonly DEPARTMENT_DEACTIVATE = 'department/Deactivate';
  static readonly DEPARTMENT_ACTIVATE = 'department/Activate';
  static readonly DEPARTMENT_GET_OPTIONS_BY_ID =
    'department/GetDepartmentOptionsByClientId';

  /*----------------DOCUMENT-------------------*/
  static readonly CLIENT_DOCUMENT_CREATE = 'clientDocument/Create';
  static readonly CLIENT_DOCUMENT_GET_BY_ID = 'clientDocument/GetByIdWithContent';
  static readonly CLIENT_DOCUMENT_GET_ALL = 'clientDocument/GetAll';
  static readonly CLIENT_DOCUMENT_UPDATE = 'clientDocument/Update';
  static readonly CLIENT_DOCUMENT_DELETE = 'clientDocument/Delete';

  /*----------------TERMS AND CONDITIONS-------------------*/
  static readonly TERMS_AND_CONDITIONS_DOCUMENT_CREATE = 'termsAndConditions/Create';
  static readonly TERMS_AND_CONDITIONS_DOCUMENT_GET_BY_CLIENT_ID =
    'termsAndConditions/GetByClientId';
  static readonly TERMS_AND_CONDITIONS_DOCUMENT_DOWNLOAD =
    'termsAndConditions/DownloadTermsAndConditionsByClientId';
  static readonly TERMS_AND_CONDITIONS_DOCUMENT_GET_ALL = 'termsAndConditions/GetAll';
  static readonly TERMS_AND_CONDITIONS_DOCUMENT_UPDATE = 'termsAndConditions/Update';
  static readonly TERMS_AND_CONDITIONS_DOCUMENT_DELETE = 'termsAndConditions/Delete';
  static readonly TERMS_AND_CONDITIONS_ACCEPT = 'client/AcceptTermsAndConditions';
  static readonly TERMS_AND_CONDITIONS_GET_USER_TERMS = 'client/GetTermsAndConditions';

  /*----------------REFERRAL-------------------*/
  static readonly REFERRAL_CREATE = 'referral/Create';
  static readonly REFERRAL_GET_BY_ID = 'referral/GetById';
  static readonly REFERRAL_GET_ALL = 'referral/GetAll';
  static readonly REFERRAL_GET_AUDIT_LOGS = 'referral/GetReferralAuditLogs';
  static readonly REFERRAL_UPDATE = 'referral/Update';
  static readonly REFERRAL_DELETE = 'referral/Delete';
  static readonly REFERRAL_ACTIVATE = 'referral/Activate';
  static readonly REFERRAL_DEACTIVATE = 'referral/Deactivate';
  static readonly REFERRAL_UPDATE_STATUS = 'referral/UpdateStatus';
  static readonly REFERRAL_UPDATE_PRODUCT_SAME_TYPE = 'referral/UpdateProductSameType';
  static readonly REFERRAL_UPDATE_PRODUCT_NEW_TYPE = 'referral/UpdateProductNewType';
  static readonly REFERRAL_GET_OPTIONS = 'referral/GetReferralOptions';
  static readonly REFERRAL_GET_OCCUPATIONAL_REFERRAL =
    'referral/GetOccupationalHealthGeneralReferralById';
  static readonly REFERRAL_UPDATE_OCCUPATIONAL_REFERRAL =
    'referral/UpdateOccupationalHealthGeneralReferral';
  static readonly REFERRAL_GET_MANAGEMENT_REFERRAL = 'referral/GetManagementReferralById';
  static readonly REFERRAL_UPDATE_MANAGEMENT_REFERRAL =
    'referral/UpdateManagementReferral';
  static readonly REFERRAL_DOWNLOAD_PREVIEW = 'referral/GetReferralDocument';

  /*----------------REFERRAL-DOCUMENT-------------------*/
  static readonly REFERRAL_DOCUMENT_CREATE = 'referralDocument/Create';
  static readonly REFERRAL_DOCUMENT_GET_BY_ID = 'referralDocument/GetByIdWithContent';
  static readonly REFERRAL_DOCUMENT_GET_ALL = 'referralDocument/GetAll';
  static readonly REFERRAL_DOCUMENT_UPDATE = 'referralDocument/Update';
  static readonly REFERRAL_DOCUMENT_DELETE = 'referralDocument/Delete';

  /*----------------ROLE-------------------*/
  static readonly ROLE_GET_BY_ENUM = 'role/GetByEnum';
  static readonly ROLE_UPDATE_CLAIMS = 'role/UpdateClaims';
  static readonly ROLE_GET_LIST = 'role/GetPermissions';

  /*----------------USER-------------------*/
  static readonly USER_UNLOCK = 'user/Unlock';

  /*----------------CLINICIAN-------------------*/
  static readonly CLINICIAN_CREATE = 'clinician/Create';
  static readonly CLINICIAN_GET_BY_ID = 'clinician/GetById';
  static readonly CLINICIAN_GET_ALL = 'clinician/GetAll';
  static readonly CLINICIAN_UPDATE = 'clinician/Update';
  static readonly CLINICIAN_DELETE = 'clinician/Delete';
  static readonly CLINICIAN_DEACTIVATE = 'clinician/Deactivate';
  static readonly CLINICIAN_ACTIVATE = 'clinician/Activate';
  static readonly CLINICIAN_GET_OPTIONS = 'clinician/GetClinicianOptions';
  static readonly CLINICIAN_GET_NEAREST_AVAILABLE_DATE =
    'clinician/GetNearestAwailableClinicianDate';
  static readonly CLINICIAN_ADD_PRODUCTS = 'clinician/AddProductToClinician';
  static readonly CLINICIAN_DELETE_PRODUCTS = 'clinician/DeleteProductFromClinician';
  static readonly CLINICIAN_GET_PRODUCTS_BY_CLINICIAN_ID =
    'clinician/GetClinicianProductsOptionsByClinicianId';
  static readonly CLINICIAN_GET_PRODUCTS_OPTIONS =
    'clinician/GetClinicianProductsOptions';

  /*----------------LOCATIONS-------------------*/
  static readonly LOCATIONS_CREATE = 'location/Create';
  static readonly LOCATIONS_GET_BY_ID = 'location/GetById';
  static readonly LOCATIONS_GET_ALL = 'location/GetAll';
  static readonly LOCATIONS_UPDATE = 'location/Update';
  static readonly LOCATIONS_DEACTIVATE = 'location/Deactivate';
  static readonly LOCATIONS_ACTIVATE = 'location/Activate';
  static readonly LOCATIONS_CHECK_APPOINTMENTS_FOR_DEACTIVATE =
    'location/CheckLocationEntityForDeactivation';

  /*----------------SITES-------------------*/
  static readonly SITES_CREATE = 'site/Create';
  static readonly SITES_GET_BY_ID = 'site/GetById';
  static readonly SITES_GET_ALL = 'site/GetAll';
  static readonly SITES_UPDATE = 'site/Update';
  static readonly SITES_DEACTIVATE = 'site/Deactivate';
  static readonly SITES_ACTIVATE = 'site/Activate';
  static readonly SITES_DOCUMENT_DELETE = 'siteDocument/Delete';
  static readonly SITES_DOCUMENT_DOWNLOAD = 'siteDocument/GetByIdWithContent';

  /*----------------ROOMS-------------------*/
  static readonly ROOMS_CREATE = 'room/Create';
  static readonly ROOMS_GET_BY_ID = 'room/GetById';
  static readonly ROOMS_GET_ALL = 'room/GetAll';
  static readonly ROOMS_UPDATE = 'room/Update';
  static readonly ROOMS_DEACTIVATE = 'room/Deactivate';
  static readonly ROOMS_ACTIVATE = 'room/Activate';

  /*----------------CLINICS-------------------*/
  static readonly CLINICS_CREATE = 'clinic/Create';
  static readonly CLINICS_GET_BY_ID = 'clinic/GetById';
  static readonly CLINICS_GET_ALL = 'clinic/GetAll';
  static readonly CLINICS_UPDATE = 'clinic/Update';
  static readonly CLINICS_DEACTIVATE = 'clinic/Deactivate';
  static readonly CLINICS_ACTIVATE = 'clinic/Activate';
  static readonly CLINICS_GET_AVAILABLE_APPOINTMENT_TIME =
    'clinic/GetAwailableAppointmentTimesOnDate';
  static readonly CLINICS_GET_AVAILABLE_APPOINTMENT_DATES_BY_MONTH =
    'clinic/GetAwailableAppointmentDatesByMonth';
  static readonly CLINICS_GET_AVAILABLE_APPOINTMENT_DATES =
    'clinic/GetAwailableAppointmentDates';

  /*----------------APPOINTMENTS-------------------*/
  static readonly APPOINTMENTS_CREATE = 'appointment/Create';
  static readonly APPOINTMENTS_GET_BY_ID = 'appointment/GetById';
  static readonly APPOINTMENTS_GET_ALL = 'appointment/GetAll';
  static readonly APPOINTMENTS_UPDATE = 'appointment/Update';
  static readonly APPOINTMENTS_DEACTIVATE = 'appointment/Deactivate';
  static readonly APPOINTMENTS_ACTIVATE = 'appointment/Activate';
  static readonly APPOINTMENTS_CANCEL = 'appointment/Cancel';
  static readonly APPOINTMENTS_GET_PATIENT_DETAILS =
    'appointment/GetPatientDetailsByAppointmentId';
  static readonly APPOINTMENTS_GET_AUDIT_LOGS = 'appointment/GetAppointmentAuditLogs';
  static readonly APPOINTMENTS_UPDATE_DETAILS = 'appointment/UpdateAppointmentDetails';
  static readonly APPOINTMENTS_UPDATE_SETTINGS = 'appointment/UpdateAppointmentSettings';
  static readonly APPOINTMENTS_UPDATE_STATUS = 'appointment/UpdateStatus';
  static readonly APPOINTMENTS_UPDATE_REPORT = 'appointment/UpdateAppointmentReport';

  /*----------------APPOINTMENTS_DOCUMENTS-------------------*/
  static readonly APPOINTMENTS_DOCUMENT_CREATE = 'appointmentDocument/Create';
  static readonly APPOINTMENTS_DOCUMENT_GET_ALL = 'appointmentDocument/GetAll';
  static readonly APPOINTMENTS_DOCUMENT_DOWNLOAD =
    'appointmentDocument/GetByIdWithContent';
  static readonly APPOINTMENTS_DOCUMENT_UPDATE = 'appointmentDocument/Update';
  static readonly APPOINTMENTS_DOCUMENT_DELETE = 'appointmentDocument/Delete';
  static readonly APPOINTMENTS_AUDIT_LOG_GET_ALL = 'patient/GetAppointmentAuditLogs';

  /*----------------APPOINTMENT_CLINIC_NOTES-------------------*/
  static readonly APPOINTMENTS_CLINIC_NOTES_CREATE = 'appointmentClinicNotes/Create';
  static readonly APPOINTMENTS_CLINIC_NOTE_GET_BY_ID = 'appointmentClinicNotes/GetById';
  static readonly APPOINTMENTS_CLINIC_NOTES_UPDATE = 'appointmentClinicNotes/Update';

  /*----------------SETTINGS-------------------*/
  static readonly STATS_CREATE = 'appointmentSetting/Create';
  static readonly STATS_GET_BY_ID = 'appointmentSetting/GetById';
  static readonly STATS_GET_ALL = 'appointmentSetting/GetAll';
  static readonly STATS_UPDATE = 'appointmentSetting/Update';
  static readonly STATS_DEACTIVATE = 'appointmentSetting/Deactivate';
  static readonly STATS_ACTIVATE = 'appointmentSetting/Activate';

  /*----------------RADIOLOGY-------------------*/
  static readonly RADIOLOGY_CREATE = 'mriRequest/Create';
  static readonly RADIOLOGY_GET_ALL = 'mriRequest/GetAll';
  static readonly RADIOLOGY_DISMISS = 'mriRequest/Dismiss';
  static readonly RADIOLOGY_MARK_AS_PRINTED = 'mriRequest/MarkAsPrinted';
  static readonly RADIOLOGY_GET_MRI_TYPES = 'mriRequest/GetMriTypes';
  static readonly RADIOLOGY_GET_MRI_CONTENT = 'mriRequest/GetMriRequestByIdWithContent';

  /*----------------LETTERS-------------------*/
  static readonly LETTERS_GET_ALL = 'appointment/GetAppointmentReportsList';

  /*----------------CONTRACTS-------------------*/
  static readonly CONTRACTS_CREATE = 'contract/Create';
  static readonly CONTRACTS_GET_BY_ID = 'contract/GetById';
  static readonly CONTRACTS_GET_ALL = 'contract/GetAll';
  static readonly CONTRACTS_UPDATE = 'contract/Update';
  static readonly CONTRACTS_DEACTIVATE = 'contract/Deactivate';
  static readonly CONTRACTS_REACTIVATE = 'contract/Activate';
  static readonly CONTRACTS_MARK_AS_CLOSED = 'contract/MarkAsClosed';
  static readonly CONTRACTS_MARK_AS_OPEN = 'contract/MarkAsOpen';
  static readonly CONTRACTS_GET_CLINICIAN_OPTIONS =
    'contract/GetContractCliniciansOptions';
  static readonly CONTRACTS_GET_CLINICIANS_OPTIONS_BY_CONTRACT_ID =
    'contract/GetContractCliniciansOptionsByContractId';
  static readonly CONTRACTS_GET_PRODUCTS_OPTIONS = 'contract/GetContractProductsOptions';
  static readonly CONTRACTS_GET_PRODUCT_OPTIONS_BY_CONTRACT_ID =
    'contract/GetContractProductsOptionsByContractId';
  static readonly CONTRACTS_GET_OPTIONS = 'contract/GetContractOptions';
  static readonly CONTRACTS_GENERATE_SAGE_EXPORT = 'contract/GenerateSageExport';
  static readonly CONTRACTS_DOWNLOAD = 'contract/GetContractDownload';

  /*----------------INVOICE-------------------*/
  static readonly INVOICE_CREATE = 'invoice/Create';
  static readonly INVOICE_GET_BY_ID = 'invoice/GetById';
  static readonly INVOICE_GET_ALL = 'invoice/GetAll';
  static readonly INVOICE_UPDATE = 'invoice/Update';
  static readonly INVOICE_DEACTIVATE = 'invoice/Deactivate';
  static readonly INVOICE_ACTIVATE = 'invoice/Activate';
  static readonly INVOICE_GET_APPOINTMENTS = 'invoice/GetAppointmentsForInvoice';
  static readonly INVOICE_DOWNLOAD_SELECTED = 'invoice/GetAppointmentsForInvoice';
  static readonly INVOICE_DOWNLOAD = 'invoice/GetAppointmentsForInvoice';

  /*----------------SCHEDULE-------------------*/
  static readonly SCHEDULE_ADD_DATE = 'holiday/Create';
  static readonly SCHEDULE_DELETE_DATE = 'holiday/Delete';
  static readonly SCHEDULE_GET_ALL = 'holiday/GetAll';

  /*----------------HUB-------------------*/
  static readonly HUB_CONNECTION = 'notificationHub';
  // static readonly HUB_SET_CONNECTION_USER = 'setConnectionUser';
  static readonly HUB_NOTIFICATIONS_RECEIVE = 'ReceiveMessage';
  static readonly HUB_UPDATE_PERMISSIONS_RECEIVE = 'updateUserPermissions';
  static readonly HUB_WEB_HOOK_RESULT_RECEIVE = 'webHookResult';
  static readonly HUB_HANDLE_PURCHASE_EVENT_RESULT_RECEIVE = 'handlePurchaseEventsResult';
}
