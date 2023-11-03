import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { RoutesConstants } from 'src/app/core/constants';
import { StaffManagementComponent } from './staff-management.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { ReactiveFormsModule } from '@angular/forms';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';

const routes: Routes = [
  {
    path: RoutesConstants.INDEX,
    component: StaffManagementComponent,
  },
];

const MATERIAL = [
  NzPageHeaderModule,
  NzDropDownModule,
  NzButtonModule,
  NzIconModule,
  NzFormModule,
  NzSelectModule,
  NzInputModule,
  NzInputNumberModule,
  NzCardModule,
  NzCheckboxModule,
  NzSkeletonModule,
];

@NgModule({
  imports: [MATERIAL, ReactiveFormsModule, CommonModule, RouterModule.forChild(routes)],
  declarations: [StaffManagementComponent],
})
export class StaffManagementModule {}
