import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductManagementComponent } from './product-management.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzSegmentedModule } from 'ng-zorro-antd/segmented';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { RoutesConstants } from 'src/app/core/constants';
import { ProductTypeDetailsComponent } from '../../components/product-type-details/product-type-details.component';
import { ProductFormComponent } from '../../components/product-form/product-form.component';
import { ProductFormModule } from '../../components/product-form/product-form.module';

const routes: Routes = [
  {
    path: RoutesConstants.INDEX,
    component: ProductManagementComponent,
  },
];

const MATERIAL = [
  NzTabsModule,
  NzFormModule,
  NzSkeletonModule,
  NzSelectModule,
  NzIconModule,
  NzCardModule,
  NzButtonModule,
  NzInputModule,
  NzInputNumberModule,
  NzDatePickerModule,
  NzTableModule,
  NzPageHeaderModule,
  NzSpaceModule,
  NzSegmentedModule,
  NzDropDownModule,
  NzToolTipModule,
  NzEmptyModule,
  NzSpinModule,
  NzPaginationModule,
  NzPopconfirmModule,
  NzCheckboxModule,
];

@NgModule({
  imports: [
    MATERIAL,
    FormsModule,
    ReactiveFormsModule,
    ProductFormModule,
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [ProductManagementComponent, ProductTypeDetailsComponent],
})
export class ProductManagementModule {}
