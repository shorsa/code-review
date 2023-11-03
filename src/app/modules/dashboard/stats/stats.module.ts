import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { RoutesConstants } from 'src/app/core/constants';
import { PrimaryMedicalConditionComponent } from './components/settings-table/settings-table.component';
import { StatsPageComponent } from './pages/stats-page.component';
import { StatsStoreModule } from './store/stats.store.module';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { SearchInputModule } from 'src/app/shared/components/search-input/search-input.module';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzSegmentedModule } from 'ng-zorro-antd/segmented';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { StatsManagementModalComponent } from './components/stats-management-modal/stats-management-modal.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { ReactiveFormsModule } from '@angular/forms';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';

const routes: Routes = [
  {
    path: RoutesConstants.INDEX,
    component: StatsPageComponent,
  },
];

const MATERIAL = [
  NzTabsModule,
  NzInputModule,
  NzButtonModule,
  NzTableModule,
  NzPageHeaderModule,
  NzSpaceModule,
  NzSegmentedModule,
  NzDropDownModule,
  NzIconModule,
  NzFormModule,
  NzPopconfirmModule,
];

@NgModule({
  imports: [
    MATERIAL,
    ReactiveFormsModule,
    StatsStoreModule,
    SearchInputModule,
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    StatsPageComponent,
    PrimaryMedicalConditionComponent,
    StatsManagementModalComponent,
  ],
})
export class StatsModule {}
