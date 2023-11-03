import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzSegmentedModule } from 'ng-zorro-antd/segmented';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NgxPermissionsModule } from 'ngx-permissions';
import { RoutesConstants } from 'src/app/core/constants';
import { SearchInputModule } from 'src/app/shared/components/search-input/search-input.module';
import { TabsModule } from 'src/app/shared/components/tabs/tabs.module';
import { UploadDocumentsModule } from 'src/app/shared/components/upload-documents/upload-documents.module';
import { ReferralStatusDirectiveModule } from 'src/app/shared/directives/directives.module';
import { CustomDatePipeModule } from 'src/app/shared/pipes/pipes.module';
import { ClientDetailsModule } from '../../../shared/components/client-details/client-details.module';
import { ReferralDetailsModule } from '../../../shared/components/referral-general-details/referral-details.module';
import { ReasonRejectModalComponent } from './components/reason-reject-modal/reason-reject-modal.component';
import { ReferralTableComponent } from './components/referral-table/referral-table.component';
import { ReferralListComponent } from './page/referral-list/referral-list.component';
import { ReferralStoreModule } from './state/referral.store.module';

const routes: Routes = [
  {
    path: RoutesConstants.INDEX,
    component: ReferralListComponent,
  },
  {
    path: RoutesConstants.DASHBOARD_REFERRAL_ADD,
    loadChildren: () =>
      import(
        'src/app/modules/dashboard/referral/page/referral-management/referral-management.module'
      ).then((m) => m.ReferralManagementModule),
  },
  {
    path: RoutesConstants.DASHBOARD_REFERRAL_EDIT,
    loadChildren: () =>
      import(
        'src/app/modules/dashboard/referral/page/referral-management/referral-management.module'
      ).then((m) => m.ReferralManagementModule),
  },
];

const MATERIAL = [
  NzEmptyModule,
  NzCardModule,
  NzTabsModule,
  NzPageHeaderModule,
  NzIconModule,
  NzSpaceModule,
  NzButtonModule,
  NzTableModule,
  NzTagModule,
  NzUploadModule,
  NzDropDownModule,
  NzSegmentedModule,
  NzToolTipModule,
  NzInputModule,
  NzPopconfirmModule,
  NzFormModule,
];

@NgModule({
  imports: [
    MATERIAL,
    SearchInputModule,
    ReactiveFormsModule,
    ReferralStoreModule,
    ClientDetailsModule,
    ReferralDetailsModule,
    NgxPermissionsModule,
    CommonModule,
    CustomDatePipeModule,
    TabsModule,
    ReferralStatusDirectiveModule,
    UploadDocumentsModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    ReasonRejectModalComponent,
    ReferralListComponent,
    ReferralTableComponent,
  ],
})
export class ReferralModule {}
