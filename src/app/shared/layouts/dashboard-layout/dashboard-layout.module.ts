import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { DashboardLayoutComponent } from './dashboard-layout.component';
import { HeaderComponent } from './components/header/header.component';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NgxPermissionsModule } from 'ngx-permissions';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { CustomDatePipeModule } from '../../pipes/pipes.module';

const MATERIAL = [
  NzLayoutModule,
  NzAvatarModule,
  NzMenuModule,
  NzButtonModule,
  NzIconModule,
  NzDropDownModule,
  NzBadgeModule,
];

@NgModule({
  imports: [MATERIAL, CommonModule, RouterModule, NgxPermissionsModule, CustomDatePipeModule],
  declarations: [DashboardLayoutComponent, HeaderComponent],
})
export class DashboardLayoutModule {}
