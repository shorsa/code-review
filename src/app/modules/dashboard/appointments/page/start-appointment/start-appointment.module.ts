import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { RoutesConstants } from 'src/app/core/constants';
import { SearchInputModule } from 'src/app/shared/components/search-input/search-input.module';
import { TabsModule } from 'src/app/shared/components/tabs/tabs.module';
import { UploadDocumentsModule } from 'src/app/shared/components/upload-documents/upload-documents.module';
import {
  BillingOptionPipeModule,
  CustomDatePipeModule,
  StatusPipeModule,
} from 'src/app/shared/pipes/pipes.module';
import { RadiologyManagementModalModule } from '../../../radiology/components/radiology-management-modal/radiology-management.module';
import { AppointmentUploadDocumentsComponent } from '../../components/appointment-upload-documents/appointment-upload-documents.component';
import { AppointmentAuditLogsComponent } from '../../components/appointments-history-table/appointments-history-table.component';
import { ClinicNotesComponent } from '../../components/clinic-notes/clinic-notes.component';
import { ConfirmAttendanceModalComponent } from '../../components/confirm-attendance-modal/confirm-attendance-modal.component';
import { PatientDetailsViewComponent } from '../../components/patient-details-view/patient-details-view.component';
import { StartAppointmentComponent } from './start-appointment.component';
import { RecordAudioModule } from '../../components/action-yes/record-audio/record-audio.module';
import { NgxPermissionsModule } from 'ngx-permissions';
import { AppointmentStatusDirectiveModule } from 'src/app/shared/directives/directives.module';

const routes: Routes = [
  {
    path: RoutesConstants.INDEX,
    component: StartAppointmentComponent,
  },
];

const MATERIAL = [
  NzTabsModule,
  NzIconModule,
  NzDropDownModule,
  NzTagModule,
  NzTimePickerModule,
  NzCardModule,
  NzButtonModule,
  NzFormModule,
  NzInputModule,
  NzTableModule,
  NzTypographyModule,
  NzDatePickerModule,
  NzEmptyModule,
  NzSpinModule,
  NzPaginationModule,
  NzToolTipModule,
  NzInputNumberModule,
  NzRadioModule,
  NzPopconfirmModule,
  NzButtonModule,
];

@NgModule({
  imports: [
    MATERIAL,
    StatusPipeModule,
    SearchInputModule,
    CustomDatePipeModule,
    ReactiveFormsModule,
    CustomDatePipeModule,
    NgxPermissionsModule,
    BillingOptionPipeModule,
    AppointmentStatusDirectiveModule,
    TabsModule,
    CommonModule,
    RadiologyManagementModalModule,
    UploadDocumentsModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    AppointmentUploadDocumentsComponent,
    StartAppointmentComponent,
    AppointmentAuditLogsComponent,
    PatientDetailsViewComponent,
    ClinicNotesComponent,
    ConfirmAttendanceModalComponent,
  ],
})
export class StartAppointmentModule {}
