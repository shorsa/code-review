import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { RoutesConstants } from 'src/app/core/constants';
import { ContractProductTypesComponent } from '../../components/contract-product-types/contract-product-types.component';
import { ContractsGeneralInfoComponent } from '../../components/contracts-general-info/contracts-general-info.component';
import { ContractsManagementComponent } from './contracts-management.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSegmentedModule } from 'ng-zorro-antd/segmented';
import { SearchInputModule } from 'src/app/shared/components/search-input/search-input.module';
import { ProductTypesModalComponent } from '../../components/product-types-modal/product-types-modal.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ContractClinicianComponent } from '../../components/contract-clinicians/contract-clinicians.component';
import { ContractClinicianModalComponent } from '../../components/contract-clinician-modal/contract-clinician-modal.component';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { InvoiceTypePipeModule } from 'src/app/shared/pipes/pipes.module';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';

const routes: Routes = [
  {
    path: RoutesConstants.INDEX,
    component: ContractsManagementComponent,
  },
];

const MATERIAL = [
  NzTabsModule,
  NzDropDownModule,
  NzButtonModule,
  NzCardModule,
  NzFormModule,
  NzCheckboxModule,
  NzDatePickerModule,
  NzSelectModule,
  NzInputModule,
  NzStepsModule,
  NzPageHeaderModule,
  NzSpaceModule,
  NzTableModule,
  NzSegmentedModule,
  NzIconModule,
  NzNotificationModule,
  NzInputNumberModule,
];

@NgModule({
  imports: [
    CommonModule,
    SearchInputModule,
    ReactiveFormsModule,
    FormsModule,
    MATERIAL,
    RouterModule.forChild(routes),
  ],

  declarations: [
    ContractsManagementComponent,
    ContractsGeneralInfoComponent,
    ContractProductTypesComponent,
    ProductTypesModalComponent,
    ContractClinicianComponent,
    ContractClinicianModalComponent,
  ],
})
export class ContractsManagementModule {}
