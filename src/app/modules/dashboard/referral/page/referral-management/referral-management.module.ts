import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSegmentedModule } from 'ng-zorro-antd/segmented';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NgxPermissionsModule } from 'ngx-permissions';
import { RoutesConstants } from 'src/app/core/constants';
import { InputFormModule } from 'src/app/shared/components/app-input-form/input-form.module';
import { SearchInputModule } from 'src/app/shared/components/search-input/search-input.module';
import {
  CustomDatePipeModule,
  PhoneNumberPipeModule,
} from 'src/app/shared/pipes/pipes.module';
import { ManagementReferralDetailsComponent } from '../../components/management-referral-details/management-referral-details.component';
import { OccupationalHealthGeneralComponent } from '../../components/occupational-health-general/occupational-health-general.component';
import { ReferralAppointmentsComponent } from '../../components/referral-appointments/referral-appointments.component';
import { ReferralAuditLogsComponent } from '../../components/referral-audit-logs/referral-audit-logs.component';
import { ReferralGeneralDetailsComponent } from '../../components/referral-general-details/referral-general-details.component';
import { ReferralUploadDocumentsComponent } from '../../components/referral-upload-documents/referral-upload-documents.component';
import { ReferralManagementComponent } from './referral-management.component';

const routes: Routes = [
  {
    path: RoutesConstants.INDEX,
    component: ReferralManagementComponent,
  },
];

const MATERIAL = [
  NzGridModule,
  NzTabsModule,
  NzFormModule,
  NzInputModule,
  NzSwitchModule,
  NzCardModule,
  NzCheckboxModule,
  NzSelectModule,
  NzRadioModule,
  NzButtonModule,
  CustomDatePipeModule,
  NzPageHeaderModule,
  NzSpaceModule,
  NzTableModule,
  NzDropDownModule,
  NzModalModule,
  NzIconModule,
  NzInputNumberModule,
  NzToolTipModule,
  NzSkeletonModule,
  NzSegmentedModule,
  NzPopconfirmModule,
  NzEmptyModule,
  NzUploadModule,
  NzPaginationModule,
  NzSpinModule,
  NzToolTipModule,
  NzDatePickerModule,
];

@NgModule({
  imports: [
    MATERIAL,
    CommonModule,
    ReactiveFormsModule,
    SearchInputModule,
    FormsModule,
    PhoneNumberPipeModule,
    InputFormModule,
    RouterModule.forChild(routes),
    NgxPermissionsModule,
  ],
  declarations: [
    ReferralManagementComponent,
    ReferralAuditLogsComponent,
    OccupationalHealthGeneralComponent,
    ReferralGeneralDetailsComponent,
    ManagementReferralDetailsComponent,
    ReferralUploadDocumentsComponent,
    ReferralAppointmentsComponent,
  ],
})
export class ReferralManagementModule {}
