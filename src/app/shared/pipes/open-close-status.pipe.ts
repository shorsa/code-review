import { Pipe, PipeTransform } from '@angular/core';
import { ReferralStatusEnum } from '../enums';

@Pipe({
  name: 'openCloseStatusColor',
})
export class OpenClosedStatusColorPipe implements PipeTransform {
  transform(value: boolean): any {
    if (value) {
      return '#E0C2A6';
    } else {
      return '#D1E0A6';
    }
  }
}
