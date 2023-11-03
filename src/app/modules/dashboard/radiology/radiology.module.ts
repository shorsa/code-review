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
import { RadiologyListComponent } from './page/radiology-list/radiology-list.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { StaffStoreModule } from './store/radiology.store.module';
import {
  CustomDatePipeModule,
  PhoneNumberPipeModule,
} from 'src/app/shared/pipes/pipes.module';
import { SearchInputModule } from 'src/app/shared/components/search-input/search-input.module';
import { RadiologyTableComponent } from './components/radiology-table/radiology-table.component';
import { ViewRadiologyModalComponent } from './components/view-radiology-modal/view-radiology-modal.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { DismissConfirmModalComponent } from './components/dismiss-confirm-modal/dismiss-confirm-modal.component';

const routes: Routes = [
  {
    path: RoutesConstants.INDEX,
    component: RadiologyListComponent,
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
  NzToolTipModule,
];

@NgModule({
  imports: [
    MATERIAL,
    SearchInputModule,
    PhoneNumberPipeModule,
    CustomDatePipeModule,
    PdfViewerModule,
    CommonModule,
    StaffStoreModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    RadiologyListComponent,
    ViewRadiologyModalComponent,
    RadiologyTableComponent,
    DismissConfirmModalComponent,
  ],
})
export class RadiologyModule {}
