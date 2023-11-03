import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { RoutesConstants } from 'src/app/core/constants';
import { CustomDatePipeModule } from 'src/app/shared/pipes/pipes.module';
import { CreateNewAppointmentsComponent } from '../../components/create-new-appointments/create-new-appointments.component';
import { CreateNewAppointmentsPageComponent } from './create-new-appointments-page.component';
import { DatePickerModule } from 'src/app/shared/components/date-picker/date-picker.module';

const routes: Routes = [
  {
    path: RoutesConstants.INDEX,
    component: CreateNewAppointmentsPageComponent,
  },
];

const MATERIAL = [
  NzPageHeaderModule,
  NzTimePickerModule,
  NzCardModule,
  NzSelectModule,
  NzButtonModule,
  NzFormModule,
  NzInputModule,
  NzTypographyModule,
  NzDatePickerModule,
];

@NgModule({
  imports: [
    MATERIAL,
    CommonModule,
    DatePickerModule,
    CustomDatePipeModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  declarations: [CreateNewAppointmentsComponent, CreateNewAppointmentsPageComponent],
})
export class CreateNewAppointmentsPageModule {}
