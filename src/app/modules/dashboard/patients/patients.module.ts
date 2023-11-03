import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSegmentedModule } from 'ng-zorro-antd/segmented';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NgxPermissionsModule } from 'ngx-permissions';
import { RoutesConstants } from 'src/app/core/constants';
import { SearchInputModule } from 'src/app/shared/components/search-input/search-input.module';
import {
  CustomDatePipeModule,
  PhoneNumberPipeModule,
} from 'src/app/shared/pipes/pipes.module';
import { ChangePreDeleteDateModalComponent } from './components/change-pre-delete-date-modal/change-pre-delete-date-modal.component';
import { ConfirmDeletePreDeletePatientModalComponent } from './components/confirm-delete-pre-delete-patient/confirm-delete-pre-delete-patient.component';
import { PatientDeactivateModalComponent } from './components/patient-deactivate-modal/patient-deactivate-modal.component';
import { PatientMergeChooseMainModalComponent } from './components/patient-merge-choose-main-modal/patient-merge-choose-main-modal.component';
import { PatientMergeModalComponent } from './components/patient-merge-modal/patient-merge-modal.component';
import { PatientPreDeleteStageListComponent } from './components/patient-pre-delete-stage-list/patient-pre-delete-stage-list.component';
import { TransferToDepartmentModalComponent } from './components/transfer-to-department-modal/transfer-to-department-modal.component';
import { PatientsListPageComponent } from './page/patients-list-page/patients-list-page.component';
import { PatientStoreModule } from './store/patient.store.module';

const routes: Routes = [
  {
    path: RoutesConstants.INDEX,
    component: PatientsListPageComponent,
  },
  {
    path: RoutesConstants.DASHBOARD_PATIENT_EDIT,
    loadChildren: () =>
      import(
        'src/app/modules/dashboard/patients/page/patient-management-page/patient-management.module'
      ).then((m) => m.PatientManagementModule),
  },
  {
    path: RoutesConstants.DASHBOARD_PATIENT_ADD,
    loadChildren: () =>
      import(
        'src/app/modules/dashboard/patients/page/patient-management-page/patient-management.module'
      ).then((m) => m.PatientManagementModule),
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
  NzFormModule,
  NzCardModule,
  NzSelectModule,
  NzInputNumberModule,
  NzDatePickerModule,
  NzModalModule,
  NzPopconfirmModule,
  NzCheckboxModule,
  NzRadioModule,
  NzNotificationModule,
];

@NgModule({
  imports: [
    MATERIAL,
    CommonModule,
    SearchInputModule,
    FormsModule,
    PhoneNumberPipeModule,
    ReactiveFormsModule,
    PatientStoreModule,
    CustomDatePipeModule,
    NgxPermissionsModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    PatientMergeModalComponent,
    PatientDeactivateModalComponent,
    TransferToDepartmentModalComponent,
    PatientsListPageComponent,
    PatientMergeChooseMainModalComponent,
    PatientPreDeleteStageListComponent,
    ChangePreDeleteDateModalComponent,
    ConfirmDeletePreDeletePatientModalComponent,
  ],
})
export class PatientsModule {}
