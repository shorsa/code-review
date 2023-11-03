import { Pipe, PipeTransform } from '@angular/core';
import { InvoiceTypeEnum } from '../enums';
import { CommonConstants } from 'src/app/core/constants';

@Pipe({
  name: 'invoiceType',
})
export class InvoiceTypePipe implements PipeTransform {
  transform(value?: InvoiceTypeEnum): string {
    if (!value) return '';
    return CommonConstants.invoiceTypes.find((item) => item.value === value)!.label;
  }
}
