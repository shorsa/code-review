export class RoutesConstants {
  static readonly INDEX = '';

  /*----------------AUTH-------------------*/
  static readonly AUTH_INDEX = 'auth';
  static readonly AUTH_SIGN_IN = 'sign-in';
  static readonly AUTH_FORGOT_PASSWORD = 'forgot-password';
  static readonly AUTH_RESET_PASSWORD = 'reset-password';
  static readonly AUTH_ADD_PASSWORD = 'set-password';
  static readonly AUTH_RESET_PASSWORD_CODE = 'code';
  static readonly AUTH_CONFIRM_CHANGE_EMAIL = 'change-email';
  static readonly AUTH_VERIFICATION_CODE = 'verification-code';

  /*----------------DASHBOARD-------------------*/
  static readonly DASHBOARD_INDEX = 'dashboard';
  static readonly DASHBOARD_STATISTIC = 'statistic';
  static readonly DASHBOARD_PROCESSING_REPORT = 'processing-report';

  /*----------------DASHBOARD-------------------*/

  //REFERRAL
  static readonly DASHBOARD_REFERRAL = 'referral';
  static readonly DASHBOARD_REFERRAL_ADD = 'add';
  static readonly DASHBOARD_REFERRAL_EDIT = 'edit';

  //APPOINTMENTS
  static readonly DASHBOARD_APPOINTMENTS = 'appointment';
  static readonly DASHBOARD_APPOINTMENTS_ADD = 'add';
  static readonly DASHBOARD_APPOINTMENTS_VIEW = 'view';
  static readonly DASHBOARD_APPOINTMENTS_START = 'start';
  static readonly DASHBOARD_APPOINTMENTS_ACTION_YES = 'action-yes';

  //CLIENTS
  static readonly DASHBOARD_CLIENT = 'client';
  static readonly DASHBOARD_CLIENT_ADD = 'add';
  static readonly DASHBOARD_CLIENT_EDIT = 'edit';

  //STAFF
  static readonly DASHBOARD_STAFF = 'staff';
  static readonly DASHBOARD_STAFF_ADD = 'add';
  static readonly DASHBOARD_STAFF_EDIT = 'edit';

  //PATIENT
  static readonly DASHBOARD_PATIENT = 'patient';
  static readonly DASHBOARD_PATIENT_EDIT = 'edit';
  static readonly DASHBOARD_PATIENT_ADD = 'add';

  //CLINICIAN
  static readonly DASHBOARD_CLINICIAN = 'clinician';
  static readonly DASHBOARD_CLINICIAN_ADD = 'add';
  static readonly DASHBOARD_CLINICIAN_EDIT = 'edit';

  //CLINICIAN
  static readonly USER_TERMS_AND_CONDITION = 'user-terms-and-condition';

  //PRODUCTS
  static readonly DASHBOARD_PRODUCTS = 'products';
  static readonly DASHBOARD_PRODUCTS_EDIT = 'edit';

  //LOCATIONS
  static readonly DASHBOARD_LOCATIONS = 'locations';
  static readonly DASHBOARD_SITES = 'sites';
  static readonly DASHBOARD_ROOMS = 'rooms';

  //CLINICS
  static readonly DASHBOARD_CLINICS = 'clinics';
  static readonly DASHBOARD_CLINICS_ADD = 'add';
  static readonly DASHBOARD_CLINICS_EDIT = 'edit';
  static readonly DASHBOARD_CLINICS_APPOINTMENTS = 'clinics-appointments';

  //STATS
  static readonly DASHBOARD_STATS = 'stats';

  //SCHEDULE
  static readonly DASHBOARD_SCHEDULE = 'schedule';

  //LETTERS
  static readonly DASHBOARD_LETTERS = 'letters';

  //RADIOLOGY
  static readonly DASHBOARD_RADIOLOGY = 'radiology';
  static readonly DASHBOARD_RADIOLOGY_ADD = 'add';

  //CONTRACTS
  static readonly DASHBOARD_CONTRACTS = 'contracts';
  static readonly DASHBOARD_CONTRACTS_ADD = 'add';
  static readonly DASHBOARD_CONTRACTS_EDIT = 'edit';

  //INVOICING
  static readonly DASHBOARD_INVOICING = 'invoicing';
  static readonly DASHBOARD_INVOICING_ADD = 'add';
  static readonly DASHBOARD_INVOICING_EDIT = 'edit';

  static readonly DASHBOARD_DOCUMENTS = 'documents';
  static readonly DASHBOARD_PERMISSION = 'permission';
}
