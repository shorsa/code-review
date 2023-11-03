import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NgxPermissionsModule } from 'ngx-permissions';
import { AppointmentStatusDirectiveModule } from 'src/app/shared/directives/directives.module';
import { CustomDatePipeModule } from 'src/app/shared/pipes/pipes.module';
import { AppointmentsTableComponent } from './appointments-table.component';

const MATERIAL = [
  NzPageHeaderModule,
  NzButtonModule,
  NzTypographyModule,
  NzTableModule,
  NzToolTipModule,
  NzDropDownModule,
  NzIconModule,
];

@NgModule({
  imports: [
    MATERIAL,
    CommonModule,
    CustomDatePipeModule,
    ReactiveFormsModule,
    NgxPermissionsModule,
    AppointmentStatusDirectiveModule,
  ],
  declarations: [AppointmentsTableComponent],
  exports: [AppointmentsTableComponent],
})
export class AppointmentsTableModule {}
