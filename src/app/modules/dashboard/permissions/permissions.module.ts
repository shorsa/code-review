import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermissionsComponent } from './pages/permissions-page.component';
import { RouterModule, Routes } from '@angular/router';
import { RoutesConstants } from 'src/app/core/constants';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { PermissionsSettingComponent } from './components/permissions-setting/permissions-setting.component';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';

const routes: Routes = [
  {
    path: RoutesConstants.INDEX,
    component: PermissionsComponent,
  },
];

const MATERIAL = [
  NzPageHeaderModule,
  NzButtonModule,
  NzIconModule,
  NzCheckboxModule,
  NzInputModule,
  NzTabsModule,
];

@NgModule({
  imports: [MATERIAL, CommonModule, RouterModule.forChild(routes)],
  declarations: [PermissionsComponent, PermissionsSettingComponent],
})
export class PermissionsModule {}
