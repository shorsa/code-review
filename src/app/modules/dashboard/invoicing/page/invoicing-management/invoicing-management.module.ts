import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoicingManagementPageComponent } from './invoicing-management.component';
import { Routes, RouterModule } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { RoutesConstants } from 'src/app/core/constants';
import { ReactiveFormsModule } from '@angular/forms';
import { InvoicingManagementComponent } from '../../components/invoicing-management/invoicing-management.component';
import { ChooseWorkModalComponent } from '../../components/choose-work-modal/choose-work-modal.component';
import { SearchInputModule } from 'src/app/shared/components/search-input/search-input.module';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzTagModule } from 'ng-zorro-antd/tag';

const routes: Routes = [
  {
    path: RoutesConstants.INDEX,
    component: InvoicingManagementPageComponent,
  },
];

const MATERIAL = [
  NzCardModule,
  NzFormModule,
  NzSelectModule,
  NzPageHeaderModule,
  NzDatePickerModule,
  NzCheckboxModule,
  NzButtonModule,
  NzInputModule,
  NzIconModule,
  NzInputNumberModule,
  NzTableModule,
  NzDropDownModule,
  NzNotificationModule,
  NzTagModule,
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SearchInputModule,
    MATERIAL,
    RouterModule.forChild(routes),
  ],
  declarations: [
    InvoicingManagementPageComponent,
    InvoicingManagementComponent,
    ChooseWorkModalComponent,
  ],
})
export class InvoicingManagementModule {}
