import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutesConstants } from 'src/app/core/constants';
import { SitesPageComponent } from './sites-page.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzSegmentedModule } from 'ng-zorro-antd/segmented';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { SiteManagementModalComponent } from '../../components/site-management-modal/site-management-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { SearchInputModule } from 'src/app/shared/components/search-input/search-input.module';

const routes: Routes = [
  {
    path: RoutesConstants.INDEX,
    component: SitesPageComponent,
  },
];

const MATERIAL = [
  NzPageHeaderModule,
  NzSpaceModule,
  NzSegmentedModule,
  NzTableModule,
  NzButtonModule,
  NzFormModule,
  NzInputModule,
  NzInputNumberModule,
  NzIconModule,
  NzPopconfirmModule,
  NzToolTipModule,
  NzDropDownModule,
  NzSpinModule,
  NzEmptyModule,
];

@NgModule({
  imports: [
    CommonModule,
    SearchInputModule,
    ReactiveFormsModule,
    MATERIAL,
    RouterModule.forChild(routes),
  ],

  declarations: [SitesPageComponent, SiteManagementModalComponent],
})
export class SitesPageModule {}
