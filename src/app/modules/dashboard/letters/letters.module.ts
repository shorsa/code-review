import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  RecurrenceEditorAllModule,
  ScheduleAllModule,
} from '@syncfusion/ej2-angular-schedule';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSegmentedModule } from 'ng-zorro-antd/segmented';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { RoutesConstants } from 'src/app/core/constants';
import { SearchInputModule } from 'src/app/shared/components/search-input/search-input.module';
import {
  CustomDatePipeModule,
  StatusPipeModule,
} from 'src/app/shared/pipes/pipes.module';
import { LettersTableComponent } from './components/letters-table/letters-table.component';
import { LettersPageComponent } from './page/letters-list/letters-list-page.component';
import { LettersStoreModule } from './store/letters.store.module';

const routes: Routes = [
  {
    path: RoutesConstants.INDEX,
    component: LettersPageComponent,
  },
];

const MATERIAL = [
  NzEmptyModule,
  NzSelectModule,
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
];

@NgModule({
  imports: [
    MATERIAL,
    SearchInputModule,
    LettersStoreModule,
    ScheduleAllModule,
    CustomDatePipeModule,
    StatusPipeModule,
    RecurrenceEditorAllModule,
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [LettersTableComponent, LettersPageComponent],
})
export class LettersModule {}
