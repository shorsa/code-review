import { RoutesConstants } from 'src/app/core/constants';
import { PermissionClaimsEnum, UserRoleEnum } from '../../enums';

export interface DashboardMenuItem {
  label: string;
  icon?: string;
  isOpen?: boolean;
  url?: string;
  roles?: UserRoleEnum[];
  permissions?: string[];
  items?: DashboardMenuItem[];
}

export const DASHBOARD_MENU_ITEM: DashboardMenuItem[] = [
  {
    label: 'Dashboard',
    icon: 'bar-chart',
    items: [
      {
        label: 'Statistic',
        url: RoutesConstants.DASHBOARD_STATISTIC,
      },
      {
        label: 'Processing Report',
        url: RoutesConstants.DASHBOARD_PROCESSING_REPORT,
      },
    ],
  },
  {
    label: 'Referral',
    icon: 'number',
    url: RoutesConstants.DASHBOARD_REFERRAL,
    permissions: [PermissionClaimsEnum.ReferralViewAll],
  },
  {
    label: 'Appointments',
    icon: 'calendar',
    url: RoutesConstants.DASHBOARD_APPOINTMENTS,
    permissions: [
      PermissionClaimsEnum.AppointmentViewAll,
      PermissionClaimsEnum.CanBookOnline,
    ],
  },
  {
    label: 'Client',
    icon: 'user',
    url: RoutesConstants.DASHBOARD_CLIENT,
    permissions: [
      PermissionClaimsEnum.ClientViewAll,
      PermissionClaimsEnum.ClientViewDetails,
      PermissionClaimsEnum.ClientUserViewAll,
      PermissionClaimsEnum.ClientDocumentView,
    ],
  },
  {
    label: 'Patients',
    icon: 'contacts',
    url: RoutesConstants.DASHBOARD_PATIENT,
    permissions: [PermissionClaimsEnum.PatientViewAll],
  },
  {
    label: 'Clinician',
    icon: 'schedule',
    url: RoutesConstants.DASHBOARD_CLINICIAN,
    permissions: [PermissionClaimsEnum.ClinicianViewAll],
  },
  {
    label: 'Clinics',
    icon: 'home',
    url: RoutesConstants.DASHBOARD_CLINICS,
    permissions: [PermissionClaimsEnum.ClinicViewAll, PermissionClaimsEnum.CanBookOnline],
  },
  {
    label: 'Staff',
    icon: 'team',
    url: RoutesConstants.DASHBOARD_STAFF,
    roles: [UserRoleEnum.OHRDAdministrator, UserRoleEnum.OHRDSuperuser],
  },
  {
    label: 'Contracts',
    icon: 'solution',
    url: RoutesConstants.DASHBOARD_CONTRACTS,
    permissions: [PermissionClaimsEnum.ContractViewAll],
  },
  // {
  //   label: 'Invoicing',
  //   icon: 'wallet',
  //   url: RoutesConstants.DASHBOARD_INVOICING,
  //   roles: [UserRoleEnum.OHRDSuperuser],
  // },
  {
    label: 'Products',
    icon: 'group',
    url: RoutesConstants.DASHBOARD_PRODUCTS,
    permissions: [PermissionClaimsEnum.ProductViewAll],
  },
  {
    label: 'Documents',
    icon: 'file',
    url: RoutesConstants.DASHBOARD_DOCUMENTS,
    permissions: [PermissionClaimsEnum.DocumentView],
  },
  {
    label: 'Locations',
    icon: 'aim',
    url: RoutesConstants.DASHBOARD_LOCATIONS,
    permissions: [PermissionClaimsEnum.LocationViewAll],
  },
  {
    label: 'Permission',
    icon: 'audit',
    url: RoutesConstants.DASHBOARD_PERMISSION,
    roles: [UserRoleEnum.OHRDAdministrator],
  },
  {
    label: 'Stats',
    icon: 'appstore-add',
    url: RoutesConstants.DASHBOARD_STATS,
    roles: [UserRoleEnum.OHRDAdministrator, UserRoleEnum.OHRDSuperuser],
  },
  {
    label: 'Radiology',
    icon: 'medicine-box',
    url: RoutesConstants.DASHBOARD_RADIOLOGY,
    roles: [UserRoleEnum.OHRDAdministrator, UserRoleEnum.OHRDSuperuser],
  },
  {
    label: 'Letters',
    icon: 'mail',
    url: RoutesConstants.DASHBOARD_LETTERS,
  },
  {
    label: 'Schedule',
    icon: 'schedule',
    url: RoutesConstants.DASHBOARD_SCHEDULE,
    roles: [UserRoleEnum.OHRDAdministrator, UserRoleEnum.OHRDSuperuser],
  },
];
