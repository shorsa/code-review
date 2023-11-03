import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClinicManagementPageComponent } from './clinic-management-page.component';
import { RouterModule, Routes } from '@angular/router';
import { RoutesConstants } from 'src/app/core/constants';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CustomDatePipeModule } from 'src/app/shared/pipes/pipes.module';
import { CustomRecurrenceComponent } from '../../components/custom-recurrence/custom-recurrence.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { RecurrenceEndComponent } from '../../components/recurrence-end/recurrence-end.component';
import { RecurrenceDaysComponent } from '../../components/recurrence-days/recurrence-days.component';

const routes: Routes = [
  {
    path: RoutesConstants.INDEX,
    component: ClinicManagementPageComponent,
  },
];

const MATERIAL = [
  NzCardModule,
  NzFormModule,
  NzSelectModule,
  NzPageHeaderModule,
  NzDatePickerModule,
  NzTimePickerModule,
  NzCheckboxModule,
  NzButtonModule,
  NzInputModule,
  NzIconModule,
  NzInputNumberModule,
  NzRadioModule,
];

@NgModule({
  imports: [
    MATERIAL,
    ReactiveFormsModule,
    FormsModule,
    CustomDatePipeModule,
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    ClinicManagementPageComponent,
    RecurrenceEndComponent,
    RecurrenceDaysComponent,
    CustomRecurrenceComponent,
  ],
})
export class ClinicManagementPageModule {}
