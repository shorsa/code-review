import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClinicAppointmentListPageComponent } from './clinic-appointment-list-page.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzSegmentedModule } from 'ng-zorro-antd/segmented';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTableModule } from 'ng-zorro-antd/table';
import { RouterModule, Routes } from '@angular/router';
import { RoutesConstants } from 'src/app/core/constants';
import { CustomDatePipeModule } from 'src/app/shared/pipes/pipes.module';
import { AppointmentsTableModule } from '../../../appointments/components/appointments-table/appointments-table.module';

const routes: Routes = [
  {
    path: RoutesConstants.INDEX,
    component: ClinicAppointmentListPageComponent,
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
  CustomDatePipeModule,
];

@NgModule({
  imports: [
    MATERIAL,
    AppointmentsTableModule,
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [ClinicAppointmentListPageComponent],
})
export class ClinicAppointmentListPageModule {}
