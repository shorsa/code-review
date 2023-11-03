import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { AuthLayoutComponent } from './auth-layout.component';

const MATERIAL = [
  NzLayoutModule,
];

@NgModule({
  imports: [MATERIAL, CommonModule, RouterModule],
  declarations: [AuthLayoutComponent],
})
export class AuthLayoutModule {}
