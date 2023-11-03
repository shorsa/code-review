import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSegmentedModule } from 'ng-zorro-antd/segmented';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { RoutesConstants } from 'src/app/core/constants';
import { CustomDatePipeModule } from 'src/app/shared/pipes/pipes.module';
import { SchedulePageComponent } from './pages/schedule-page.component';
import { ScheduleStoreModule } from './store/schedule.store.module';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { GetIsCurrentDatePipe } from './pipe/get-is-current-date.pipe';

const routes: Routes = [
  {
    path: RoutesConstants.INDEX,
    component: SchedulePageComponent,
  },
];

const MATERIAL = [
  NzInputModule,
  NzButtonModule,
  NzDatePickerModule,
  NzPageHeaderModule,
  NzSpaceModule,
  NzSegmentedModule,
  NzDropDownModule,
  NzIconModule,
  NzTabsModule,
  NzCardModule,
  NzListModule,
  NzMessageModule,
  NzSpinModule,
];

@NgModule({
  imports: [
    MATERIAL,
    FormsModule,
    CustomDatePipeModule,
    ScheduleStoreModule,
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [SchedulePageComponent,GetIsCurrentDatePipe],
})
export class ScheduleModule {}
