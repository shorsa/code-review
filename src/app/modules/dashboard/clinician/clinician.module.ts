import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzSegmentedModule } from 'ng-zorro-antd/segmented';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { RoutesConstants } from 'src/app/core/constants';
import { SearchInputModule } from 'src/app/shared/components/search-input/search-input.module';
import { CliniciansTableComponent } from './components/clinicians-table/clinicians-table.component';
import { ClinicianListPageComponent } from './page/clinician-list-page/clinician-list-page.component';
import { ClinicianStoreModule } from './store/clinician.store.module';

const routes: Routes = [
  {
    path: RoutesConstants.INDEX,
    component: ClinicianListPageComponent,
  },
  {
    path: RoutesConstants.DASHBOARD_CLINICIAN_ADD,
    loadChildren: () =>
      import(
        'src/app/modules/dashboard/clinician/page/clinician-management-page/clinician-management-page.module'
      ).then((m) => m.ClinicianManagementPageModule),
  },
  {
    path: RoutesConstants.DASHBOARD_CLINICIAN_EDIT,
    loadChildren: () =>
      import(
        'src/app/modules/dashboard/clinician/page/clinician-management-page/clinician-management-page.module'
      ).then((m) => m.ClinicianManagementPageModule),
  },
];

const MATERIAL = [
  NzTableModule,
  NzSpaceModule,
  NzPageHeaderModule,
  NzSegmentedModule,
  NzInputModule,
  NzIconModule,
  NzButtonModule,
  NzDropDownModule,
  NzToolTipModule,
  NzPopconfirmModule,
];

@NgModule({
  imports: [
    MATERIAL,
    SearchInputModule,
    CommonModule,

    ClinicianStoreModule,
    RouterModule.forChild(routes),
  ],
  declarations: [ClinicianListPageComponent, CliniciansTableComponent],
})
export class ClinicianModule {}
