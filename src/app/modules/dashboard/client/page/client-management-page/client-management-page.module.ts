import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSegmentedModule } from 'ng-zorro-antd/segmented';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { RoutesConstants } from 'src/app/core/constants';
import { InputFormModule } from 'src/app/shared/components/app-input-form/input-form.module';
import { UploadDocumentsModule } from 'src/app/shared/components/upload-documents/upload-documents.module';
import { DepartmentsModule } from '../../../departments/departments.module';
import { AddNewClientUserModalComponent } from '../../components/add-new-client-user-modal/add-new-client-user-modal.component';
import { ClientGeneralDetailsComponent } from '../../components/client-general-details/client-general-details.component';
import { ClientUploadDocumentsComponent } from '../../components/client-upload-documents/client-upload-documents.component';
import { ClientUsersTableComponent } from '../../components/client-users-table/client-users-table.component';
import { ClientManagementPageComponent } from './client-management-page.component';
import { TermsAndConditionsEditorComponent } from '../../components/terms-and-conditions-editor/terms-and-conditions-editor.component';
import { NgxEditorModule } from 'ngx-editor';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NgxPermissionsModule } from 'ngx-permissions';
import {
  CustomDatePipeModule,
  PhoneNumberPipeModule,
} from 'src/app/shared/pipes/pipes.module';
import { SearchInputModule } from 'src/app/shared/components/search-input/search-input.module';

const routes: Routes = [
  {
    path: RoutesConstants.INDEX,
    component: ClientManagementPageComponent,
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
];

@NgModule({
  imports: [
    MATERIAL,
    CommonModule,
    SearchInputModule,
    NgxEditorModule,
    ReactiveFormsModule,
    PhoneNumberPipeModule,
    FormsModule,
    InputFormModule,
    DepartmentsModule,
    UploadDocumentsModule,
    NgxPermissionsModule,
    CustomDatePipeModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    ClientManagementPageComponent,
    AddNewClientUserModalComponent,
    ClientGeneralDetailsComponent,
    ClientUsersTableComponent,
    TermsAndConditionsEditorComponent,
    ClientUploadDocumentsComponent,
  ],
})
export class ClientManagementPageModule {}
