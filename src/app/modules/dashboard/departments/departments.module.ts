import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzSegmentedModule } from 'ng-zorro-antd/segmented';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { AddNewDepartmentModalComponent } from './components/add-new-department-modal/add-new-department-modal.component';
import { ClientDepartmentComponent } from './components/client-department-table/client-department-table.component';
import { DepartmentEditModalComponent } from './components/edit-department-modal/edit-department-modal.component';
import { PatientsTableComponent } from './components/patients-table/patients-table.component';
import { NgxPermissionsModule } from 'ngx-permissions';
import { PhoneNumberPipeModule } from 'src/app/shared/pipes/pipes.module';
import { SearchInputModule } from 'src/app/shared/components/search-input/search-input.module';
import { NzSelectModule } from 'ng-zorro-antd/select';

const MATERIAL = [
  NzTableModule,
  NzButtonModule,
  NzDropDownModule,
  NzIconModule,
  NzInputModule,
  NzFormModule,
  NzModalModule,
  NzToolTipModule,
  NzCheckboxModule,
  NzPageHeaderModule,
  NzSpaceModule,
  NzSegmentedModule,
  NzPopconfirmModule,
  NzSkeletonModule,
  NzTabsModule,
  NzSelectModule,
];

@NgModule({
  imports: [
    CommonModule,
    SearchInputModule,
    MATERIAL,
    ReactiveFormsModule,
    PhoneNumberPipeModule,
    NgxPermissionsModule,
  ],
  declarations: [
    DepartmentEditModalComponent,
    AddNewDepartmentModalComponent,
    ClientDepartmentComponent,
    PatientsTableComponent,
  ],
  exports: [
    AddNewDepartmentModalComponent,
    ClientDepartmentComponent,
    DepartmentEditModalComponent,
    PatientsTableComponent,
  ],
})
export class DepartmentsModule {}
