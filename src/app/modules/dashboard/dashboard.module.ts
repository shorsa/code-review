import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DashboardLayoutModule } from 'src/app/shared/layouts/dashboard-layout/dashboard-layout.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { UserPermissionsProvider } from 'src/app/shared/providers/user-permissions.provider';
import { NgxPermissionsModule } from 'ngx-permissions';

@NgModule({
  declarations: [],
  imports: [
    DashboardLayoutModule,
    CommonModule,
    DashboardRoutingModule,
    NgxPermissionsModule,
  ],
})
export class DashboardModule {}
