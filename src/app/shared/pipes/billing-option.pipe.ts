import { Pipe, PipeTransform } from '@angular/core';
import { ClinicTypeEnum } from '../enums';
import { BillingActionEnum } from 'src/app/modules/dashboard/appointments/enums';

@Pipe({
  name: 'billingOption',
})
export class BillingOptionPipe implements PipeTransform {
  transform(value: BillingActionEnum): string {
    if (!value) return '';

    const optionsList = [
      { value: BillingActionEnum.ExcludeFromBilling, label: 'Exclude from Billing' },
      { value: BillingActionEnum.SendToBilling, label: 'Send to Billing' },
    ];

    return optionsList.find((item) => item.value === value)!.label;
  }
}
