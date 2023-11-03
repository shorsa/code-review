import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzSegmentedModule } from 'ng-zorro-antd/segmented';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { RoutesConstants } from 'src/app/core/constants';
import { SearchInputModule } from 'src/app/shared/components/search-input/search-input.module';
import { InvoicingListComponent } from './page/invoicing-list/invoicing-list.component';
import { InvoicingStoreModule } from './store/invoicing.store.module';

const routes: Routes = [
  {
    path: RoutesConstants.INDEX,
    component: InvoicingListComponent,
  },
  {
    path: RoutesConstants.DASHBOARD_INVOICING_EDIT,
    loadChildren: () =>
      import(
        'src/app/modules/dashboard/invoicing/page/invoicing-management/invoicing-management.module'
      ).then((m) => m.InvoicingManagementModule),
  },
  {
    path: RoutesConstants.DASHBOARD_INVOICING_ADD,
    loadChildren: () =>
      import(
        'src/app/modules/dashboard/invoicing/page/invoicing-management/invoicing-management.module'
      ).then((m) => m.InvoicingManagementModule),
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
  NzCheckboxModule,
];

@NgModule({
  imports: [
    MATERIAL,
    CommonModule,
    SearchInputModule,
    InvoicingStoreModule,
    RouterModule.forChild(routes),
  ],
  declarations: [InvoicingListComponent],
})
export class InvoicingModule {}
