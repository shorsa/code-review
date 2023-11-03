import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutesConstants } from 'src/app/core/constants';
import { DashboardLayoutComponent } from 'src/app/shared/layouts/dashboard-layout/dashboard-layout.component';

const routes: Routes = [
  {
    path: RoutesConstants.INDEX,
    component: DashboardLayoutComponent,
    children: [
      {
        path: RoutesConstants.DASHBOARD_STATISTIC,
        loadChildren: () =>
          import('./statistic/statistic.module').then((m) => m.StatisticModule),
      },
      {
        path: RoutesConstants.DASHBOARD_PROCESSING_REPORT,
        loadChildren: () =>
          import('./processing-report/processing-report.module').then(
            (m) => m.ProcessingReportModule
          ),
      },
      {
        path: RoutesConstants.DASHBOARD_REFERRAL,
        loadChildren: () =>
          import('./referral/referral.module').then((m) => m.ReferralModule),
      },
      {
        path: RoutesConstants.DASHBOARD_APPOINTMENTS,
        loadChildren: () =>
          import('./appointments/appointments.module').then((m) => m.AppointmentsModule),
      },
      {
        path: RoutesConstants.DASHBOARD_CLIENT,
        loadChildren: () => import('./client/client.module').then((m) => m.ClientModule),
      },
      {
        path: RoutesConstants.DASHBOARD_PATIENT,
        loadChildren: () =>
          import('./patients/patients.module').then((m) => m.PatientsModule),
      },
      {
        path: RoutesConstants.DASHBOARD_CLINICIAN,
        loadChildren: () =>
          import('./clinician/clinician.module').then((m) => m.ClinicianModule),
      },
      {
        path: RoutesConstants.DASHBOARD_CLINICS,
        loadChildren: () =>
          import('./clinics/clinics.module').then((m) => m.ClinicsModule),
      },
      {
        path: RoutesConstants.DASHBOARD_STAFF,
        loadChildren: () => import('./staff/staff.module').then((m) => m.StaffModule),
      },
      {
        path: RoutesConstants.DASHBOARD_CONTRACTS,
        loadChildren: () =>
          import('./contracts/contracts.module').then((m) => m.ContractsModule),
      },
      // {
      //   path: RoutesConstants.DASHBOARD_INVOICING,
      //   loadChildren: () =>
      //     import('./invoicing/invoicing.module').then((m) => m.InvoicingModule),
      // },
      {
        path: RoutesConstants.DASHBOARD_PRODUCTS,
        loadChildren: () =>
          import('./products/products.module').then((m) => m.ProductsModule),
      },
      {
        path: RoutesConstants.DASHBOARD_DOCUMENTS,
        loadChildren: () =>
          import('./documents/documents.module').then((m) => m.DocumentsModule),
      },
      {
        path: RoutesConstants.DASHBOARD_LOCATIONS,
        loadChildren: () =>
          import('./locations/locations.module').then((m) => m.LocationsModule),
      },
      {
        path: RoutesConstants.DASHBOARD_PERMISSION,
        loadChildren: () =>
          import('./permissions/permissions.module').then((m) => m.PermissionsModule),
      },
      {
        path: RoutesConstants.DASHBOARD_STATS,
        loadChildren: () => import('./stats/stats.module').then((m) => m.StatsModule),
      },
      {
        path: RoutesConstants.DASHBOARD_RADIOLOGY,
        loadChildren: () =>
          import('./radiology/radiology.module').then((m) => m.RadiologyModule),
      },
      {
        path: RoutesConstants.DASHBOARD_LETTERS,
        loadChildren: () =>
          import('./letters/letters.module').then((m) => m.LettersModule),
      },
      {
        path: RoutesConstants.DASHBOARD_SCHEDULE,
        loadChildren: () =>
          import('./schedule/schedule.module').then((m) => m.ScheduleModule),
      },

      {
        path: RoutesConstants.INDEX,
        redirectTo: RoutesConstants.DASHBOARD_STATISTIC,
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
