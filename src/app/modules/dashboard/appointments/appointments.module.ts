import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  RecurrenceEditorAllModule,
  ScheduleAllModule,
} from '@syncfusion/ej2-angular-schedule';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSegmentedModule } from 'ng-zorro-antd/segmented';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NgxPermissionsModule } from 'ngx-permissions';
import { RoutesConstants } from 'src/app/core/constants';
import { SearchInputModule } from 'src/app/shared/components/search-input/search-input.module';
import {
  CustomDatePipeModule,
  StatusPipeModule,
} from 'src/app/shared/pipes/pipes.module';
import { AppointmentsScheduleComponent } from './components/appointments-schedule/appointments-schedule.component';
import { AppointmentsTableModule } from './components/appointments-table/appointments-table.module';
import { AppointmentsPageComponent } from './page/appointment-list/appointment-list-page.component';
import { AppointmentsStoreModule } from './store/appointments.store.module';

const routes: Routes = [
  {
    path: RoutesConstants.INDEX,
    component: AppointmentsPageComponent,
  },
  {
    path: RoutesConstants.DASHBOARD_APPOINTMENTS_ADD,
    loadChildren: () =>
      import(
        'src/app/modules/dashboard/appointments/page/create-new-appointments-page/create-new-appointments-page.module'
      ).then((m) => m.CreateNewAppointmentsPageModule),
  },
  {
    path: RoutesConstants.DASHBOARD_APPOINTMENTS_VIEW,
    loadChildren: () =>
      import(
        'src/app/modules/dashboard/appointments/page/start-appointment/start-appointment.module'
      ).then((m) => m.StartAppointmentModule),
    data: { isView: true },
  },
  {
    path: RoutesConstants.DASHBOARD_APPOINTMENTS_START,
    loadChildren: () =>
      import(
        'src/app/modules/dashboard/appointments/page/start-appointment/start-appointment.module'
      ).then((m) => m.StartAppointmentModule),
  },
  {
    path: RoutesConstants.DASHBOARD_APPOINTMENTS_ACTION_YES,
    loadChildren: () =>
      import(
        'src/app/modules/dashboard/appointments/page/attendance-yes-page/attendance-yes-page.module'
      ).then((m) => m.AttendanceYesModule),
  },
];

const MATERIAL = [
  NzEmptyModule,
  NzSelectModule,
  NzCardModule,
  NzTabsModule,
  NzPageHeaderModule,
  NzIconModule,
  NzSpaceModule,
  NzButtonModule,
  NzTableModule,
  NzTagModule,
  NzUploadModule,
  NzDropDownModule,
  NzSegmentedModule,
  NzToolTipModule,
];

@NgModule({
  imports: [
    MATERIAL,
    SearchInputModule,
    AppointmentsStoreModule,
    NgxPermissionsModule,
    ScheduleAllModule,
    CustomDatePipeModule,
    AppointmentsTableModule,
    StatusPipeModule,
    RecurrenceEditorAllModule,
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [AppointmentsScheduleComponent, AppointmentsPageComponent],
})
export class AppointmentsModule {}
