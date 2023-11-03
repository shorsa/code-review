import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { RoutesConstants } from 'src/app/core/constants';
import { RadiologyManagementModalComponent } from './radiology-management-modal.component';

const MATERIAL = [
  NzPageHeaderModule,
  NzCardModule,
  NzFormModule,
  NzButtonModule,
  NzCheckboxModule,
  NzSelectModule,
  NzInputModule,
  NzDatePickerModule,
  NzIconModule,
];

@NgModule({
  imports: [MATERIAL, CommonModule, ReactiveFormsModule],
  declarations: [RadiologyManagementModalComponent],
  exports: [RadiologyManagementModalComponent],
})
export class RadiologyManagementModalModule {}
