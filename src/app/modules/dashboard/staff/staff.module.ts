import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzSegmentedModule } from 'ng-zorro-antd/segmented';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { RoutesConstants } from 'src/app/core/constants';
import { StaffUsersTableComponent } from './components/staff-users-table/staff-users-table.component';
import { StaffUserListComponent } from './page/staff-user-list/staff-user-list.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { StaffStoreModule } from './store/staff.store.module';
import { PhoneNumberPipeModule } from 'src/app/shared/pipes/pipes.module';
import { SearchInputModule } from 'src/app/shared/components/search-input/search-input.module';

const routes: Routes = [
  {
    path: RoutesConstants.INDEX,
    component: StaffUserListComponent,
  },
  {
    path: RoutesConstants.DASHBOARD_STAFF_ADD,
    loadChildren: () =>
      import(
        'src/app/modules/dashboard/staff/page/staff-management/staff-management.module'
      ).then((m) => m.StaffManagementModule),
  },
  {
    path: RoutesConstants.DASHBOARD_CLIENT_EDIT,
    loadChildren: () =>
      import(
        'src/app/modules/dashboard/staff/page/staff-management/staff-management.module'
      ).then((m) => m.StaffManagementModule),
  },
];

const MATERIAL = [
  NzPageHeaderModule,
  NzSegmentedModule,
  NzSpaceModule,
  NzTableModule,
  NzDropDownModule,
  NzButtonModule,
  NzToolTipModule,
  NzPopconfirmModule,
  NzIconModule,
  NzToolTipModule,
  NzTagModule,
  NzInputModule,
];

@NgModule({
  imports: [
    MATERIAL,
    SearchInputModule,
    PhoneNumberPipeModule,
    CommonModule,
    StaffStoreModule,
    RouterModule.forChild(routes),
  ],
  declarations: [StaffUserListComponent, StaffUsersTableComponent],
})
export class StaffModule {}
