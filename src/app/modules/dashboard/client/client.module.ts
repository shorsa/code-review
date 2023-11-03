import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzSegmentedModule } from 'ng-zorro-antd/segmented';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { RoutesConstants } from 'src/app/core/constants';
import { ClientsTableComponent } from './components/clients-table/clients-table.component';
import { ClientListPageComponent } from './page/client-list-page/client-list-page.component';
import { ClientStoreModule } from './store/client.store.module';
import { NgxPermissionsModule } from 'ngx-permissions';
import { SearchInputModule } from 'src/app/shared/components/search-input/search-input.module';

const routes: Routes = [
  {
    path: RoutesConstants.INDEX,
    component: ClientListPageComponent,
  },
  {
    path: RoutesConstants.DASHBOARD_CLIENT_ADD,
    loadChildren: () =>
      import(
        'src/app/modules/dashboard/client/page/client-management-page/client-management-page.module'
      ).then((m) => m.ClientManagementPageModule),
  },
  {
    path: RoutesConstants.DASHBOARD_CLIENT_EDIT,
    loadChildren: () =>
      import(
        'src/app/modules/dashboard/client/page/client-management-page/client-management-page.module'
      ).then((m) => m.ClientManagementPageModule),
  },
];

const MATERIAL = [
  NzTableModule,
  NzPageHeaderModule,
  NzSpaceModule,
  NzButtonModule,
  NzDropDownModule,
  NzIconModule,
  NzInputModule,
  NzModalModule,
  NzFormModule,
  NzInputModule,
  NzToolTipModule,
  NzPopconfirmModule,
  NzSegmentedModule,
];

@NgModule({
  imports: [
    NgxPermissionsModule,
    CommonModule,
    SearchInputModule,
    MATERIAL,
    ClientStoreModule,
    RouterModule.forChild(routes),
  ],
  declarations: [ClientsTableComponent, ClientListPageComponent],
})
export class ClientModule {}
