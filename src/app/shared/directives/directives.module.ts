import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReferralStatusDirective } from './referral-status.directive';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { AppointmentStatusDirective } from './appointment-status.directive';

@NgModule({
  imports: [CommonModule, ReferralStatusDirective, NzTagModule],
  exports: [ReferralStatusDirective],
})
export class ReferralStatusDirectiveModule {}

@NgModule({
  imports: [CommonModule, AppointmentStatusDirective, NzTagModule],
  exports: [AppointmentStatusDirective],
})
export class AppointmentStatusDirectiveModule {}
