import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSegmentedModule } from 'ng-zorro-antd/segmented';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTableModule } from 'ng-zorro-antd/table';
import { RoutesConstants } from 'src/app/core/constants';
import { SearchInputModule } from 'src/app/shared/components/search-input/search-input.module';
import { ContractsListComponent } from './page/contracts-list/contracts-list.component';
import {
  CustomDatePipeModule,
  InvoiceTypePipeModule,
  OpenClosedStatusPipeModule,
} from 'src/app/shared/pipes/pipes.module';
import { ContractsStoreModule } from './store/contracts.store.module';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';

const routes: Routes = [
  {
    path: RoutesConstants.INDEX,
    component: ContractsListComponent,
  },
  {
    path: RoutesConstants.DASHBOARD_CONTRACTS_ADD,
    loadChildren: () =>
      import(
        'src/app/modules/dashboard/contracts/page/contracts-management/contracts-management.module'
      ).then((m) => m.ContractsManagementModule),
  },
  {
    path: RoutesConstants.DASHBOARD_CONTRACTS_EDIT,
    loadChildren: () =>
      import(
        'src/app/modules/dashboard/contracts/page/contracts-management/contracts-management.module'
      ).then((m) => m.ContractsManagementModule),
  },
];

const MATERIAL = [
  NzPageHeaderModule,
  NzSpaceModule,
  NzSegmentedModule,
  NzTableModule,
  NzDropDownModule,
  NzButtonModule,
  NzIconModule,
  NzTagModule,
  NzPopconfirmModule,
];

@NgModule({
  imports: [
    CommonModule,
    CustomDatePipeModule,
    ContractsStoreModule,
    InvoiceTypePipeModule,
    OpenClosedStatusPipeModule,
    MATERIAL,
    SearchInputModule,
    RouterModule.forChild(routes),
  ],
  declarations: [ContractsListComponent],
})
export class ContractsModule {}
