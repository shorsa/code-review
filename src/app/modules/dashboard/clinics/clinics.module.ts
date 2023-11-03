import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutesConstants } from 'src/app/core/constants';
import { ClinicsListPageComponent } from './page/clinics-list-page/clinics-list-page.component';
import { NzSegmentedModule } from 'ng-zorro-antd/segmented';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ClinicsTableComponent } from './components/clinics-table/clinics-table.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { ClinicsStoreModule } from './store/clinics.store.module';
import {
  ClinicTypePipeModule,
  CustomDatePipeModule,
} from 'src/app/shared/pipes/pipes.module';
import { SearchInputModule } from 'src/app/shared/components/search-input/search-input.module';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { FormsModule } from '@angular/forms';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NgxPermissionsModule } from 'ngx-permissions';
import { AppointmentsTableModule } from '../appointments/components/appointments-table/appointments-table.module';
import { DatePickerModule } from 'src/app/shared/components/date-picker/date-picker.module';

const routes: Routes = [
  {
    path: RoutesConstants.INDEX,
    component: ClinicsListPageComponent,
  },
  {
    path: RoutesConstants.DASHBOARD_CLINICS_APPOINTMENTS,
    loadChildren: () =>
      import(
        'src/app/modules/dashboard/clinics/page/clinic-appointment-list-page/clinic-appointment-list-page.module'
      ).then((m) => m.ClinicAppointmentListPageModule),
  },
  {
    path: RoutesConstants.DASHBOARD_CLINICS_ADD,
    loadChildren: () =>
      import(
        'src/app/modules/dashboard/clinics/page/clinic-management-page/clinic-management-page.module'
      ).then((m) => m.ClinicManagementPageModule),
  },
  {
    path: RoutesConstants.DASHBOARD_CLINICS_EDIT,
    loadChildren: () =>
      import(
        'src/app/modules/dashboard/clinics/page/clinic-management-page/clinic-management-page.module'
      ).then((m) => m.ClinicManagementPageModule),
  },
];

const MATERIAL = [
  NzSegmentedModule,
  NzPageHeaderModule,
  NzSpaceModule,
  NzIconModule,
  NzButtonModule,
  NzTableModule,
  NzDropDownModule,
  NzPopconfirmModule,
  NzDatePickerModule,
  NzToolTipModule,
];

@NgModule({
  imports: [
    MATERIAL,
    SearchInputModule,
    FormsModule,
    DatePickerModule,
    CommonModule,
    AppointmentsTableModule,
    NgxPermissionsModule,
    CustomDatePipeModule,
    ClinicTypePipeModule,
    ClinicsStoreModule,
    RouterModule.forChild(routes),
  ],
  declarations: [ClinicsListPageComponent, ClinicsTableComponent],
})
export class ClinicsModule {}
