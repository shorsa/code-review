import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormatTimePipe } from './format-time.pipe';
import { StatusColorPipe } from './status.pipe';
import { PhoneNumberPipe } from './phone-number.pipe';
import { CustomDatePipe } from './custom-date.pipe';
import { ClinicTypePipe } from './clinic-type.pipe';
import { InvoiceTypePipe } from './invoice-type.pipe';
import { OpenClosedStatusColorPipe } from './open-close-status.pipe';
import { BillingOptionPipe } from './billing-option.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [FormatTimePipe],
  exports: [FormatTimePipe],
})
export class FormatTimePipeModule {}

@NgModule({
  imports: [CommonModule],
  declarations: [StatusColorPipe],
  exports: [StatusColorPipe],
})
export class StatusPipeModule {}

@NgModule({
  imports: [CommonModule],
  declarations: [PhoneNumberPipe],
  exports: [PhoneNumberPipe],
})
export class PhoneNumberPipeModule {}

@NgModule({
  imports: [CommonModule],
  declarations: [CustomDatePipe],
  exports: [CustomDatePipe],
})
export class CustomDatePipeModule {}

@NgModule({
  imports: [CommonModule],
  declarations: [ClinicTypePipe],
  exports: [ClinicTypePipe],
})
export class ClinicTypePipeModule {}

@NgModule({
  imports: [CommonModule],
  declarations: [InvoiceTypePipe],
  exports: [InvoiceTypePipe],
})
export class InvoiceTypePipeModule {}

@NgModule({
  imports: [CommonModule],
  declarations: [OpenClosedStatusColorPipe],
  exports: [OpenClosedStatusColorPipe],
})
export class OpenClosedStatusPipeModule {}

@NgModule({
  imports: [CommonModule],
  declarations: [BillingOptionPipe],
  exports: [BillingOptionPipe],
})
export class BillingOptionPipeModule {}
