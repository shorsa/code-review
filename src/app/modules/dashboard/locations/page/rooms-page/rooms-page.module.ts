import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomsPageComponent } from './rooms-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzSegmentedModule } from 'ng-zorro-antd/segmented';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { RoutesConstants } from 'src/app/core/constants';
import { RoomManagementModalComponent } from '../../components/room-management-modal/room-management-modal.component';
import { SearchInputModule } from 'src/app/shared/components/search-input/search-input.module';

const routes: Routes = [
  {
    path: RoutesConstants.INDEX,
    component: RoomsPageComponent,
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
];

@NgModule({
  imports: [
    CommonModule,
    SearchInputModule,
    ReactiveFormsModule,
    MATERIAL,
    RouterModule.forChild(routes),
  ],

  declarations: [RoomsPageComponent, RoomManagementModalComponent],
})
export class RoomsPageModule {}
