import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientManagementComponent } from './patient-management.component';
import { Routes, RouterModule } from '@angular/router';
import { RoutesConstants } from 'src/app/core/constants';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { PatientPersonalDetailsComponent } from '../../components/patient-personal-details/patient-personal-details.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { PatientReferralTableComponent } from '../../components/patient-referral-table/patient-referral-table.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzSegmentedModule } from 'ng-zorro-antd/segmented';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { PatientDocumentsComponent } from '../../components/patient-documents/patient-documents.component';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { PatientNotesComponent } from '../../components/patient-notes/patient-notes.component';
import { PatientNoteManagementModalComponent } from '../../components/patient-note-management-modal/patient-note-management-modal.component';
import { PatientAuditLogsComponent } from '../../components/patient-audit-logs/patient-audit-logs.component';
import { NgxPermissionsModule } from 'ngx-permissions';
import { ReferralStatusDirectiveModule } from 'src/app/shared/directives/directives.module';
import { CustomDatePipeModule } from 'src/app/shared/pipes/pipes.module';
import { SearchInputModule } from 'src/app/shared/components/search-input/search-input.module';
import { NzSwitchModule } from 'ng-zorro-antd/switch';

const routes: Routes = [
  {
    path: RoutesConstants.INDEX,
    component: PatientManagementComponent,
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
  NzEmptyModule,
  NzSpinModule,
  NzPaginationModule,
  CustomDatePipeModule,
  NzPopconfirmModule,
  NzCheckboxModule,
  NzSwitchModule,
];

@NgModule({
  imports: [
    MATERIAL,
    FormsModule,
    SearchInputModule,
    ReactiveFormsModule,
    ReferralStatusDirectiveModule,
    NgxPermissionsModule,
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    PatientNotesComponent,
    PatientManagementComponent,

    PatientPersonalDetailsComponent,
    PatientReferralTableComponent,
    PatientDocumentsComponent,
    PatientNoteManagementModalComponent,
    PatientAuditLogsComponent,
  ],
  exports: [
    PatientManagementComponent,
    PatientPersonalDetailsComponent,
    PatientReferralTableComponent,
  ],
})
export class PatientManagementModule {}
