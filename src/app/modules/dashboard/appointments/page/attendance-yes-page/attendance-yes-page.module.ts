import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { RoutesConstants } from 'src/app/core/constants';
import { AttendanceYesDetailsComponent } from '../../components/action-yes/attendance-yes-details/attendance-yes-details.component';
import { AttendanceYesReportComponent } from '../../components/action-yes/attendance-yes-report/attendance-yes-report.component';
import { AttendanceYesStatsComponent } from '../../components/action-yes/attendance-yes-stats/attendance-yes-stats.component';
import { AttendanceYesPageComponent } from './attendance-yes-page.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NgxEditorModule } from 'ngx-editor';
import { RecordAudioModule } from '../../components/action-yes/record-audio/record-audio.module';
import { CustomDatePipeModule } from 'src/app/shared/pipes/pipes.module';
import { AttendanceActionOtherModalComponent } from '../../components/attendance-avtion-other-modal/attendance-action-other-modal.component';
import { ToSignModalComponent } from '../../components/action-yes/to-sign-modal/to-sign-modal.component';

const routes: Routes = [
  {
    path: RoutesConstants.INDEX,
    component: AttendanceYesPageComponent,
  },
];

const MATERIAL = [
  NzTabsModule,
  NzIconModule,
  NzInputNumberModule,
  NzTagModule,
  NzCardModule,
  NzFormModule,
  NzInputModule,
  NzSelectModule,
  NzRadioModule,
  NzButtonModule,
];

@NgModule({
  imports: [
    CommonModule,
    CustomDatePipeModule,
    RecordAudioModule,
    FormsModule,
    NgxEditorModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MATERIAL,
  ],

  declarations: [
    AttendanceYesReportComponent,
    ToSignModalComponent,
    AttendanceYesPageComponent,
    AttendanceYesDetailsComponent,
    AttendanceYesStatsComponent,
    AttendanceActionOtherModalComponent,
  ],
})
export class AttendanceYesModule {}
