import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSegmentedModule } from 'ng-zorro-antd/segmented';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { RoutesConstants } from 'src/app/core/constants';
import { ClinicianManagementPageComponent } from './clinician-management-page.component';
import { ClinicianDetailsComponent } from '../../components/clinician-details/clinician-details.component';
import { ClinicianProductsComponent } from '../../components/clinician-products/clinician-products.component';
import { ClinicianAddProductModalComponent } from '../../components/clinician-add-product-modal/clinician-add-product-modal.component';
import { SearchInputModule } from 'src/app/shared/components/search-input/search-input.module';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';

const routes: Routes = [
  {
    path: RoutesConstants.INDEX,
    component: ClinicianManagementPageComponent,
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
  NzButtonModule,
  NzPaginationModule,
];

@NgModule({
  imports: [
    MATERIAL,
    SearchInputModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    ClinicianDetailsComponent,
    ClinicianProductsComponent,
    ClinicianAddProductModalComponent,
    ClinicianManagementPageComponent,
  ],
})
export class ClinicianManagementPageModule {}
