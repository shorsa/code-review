import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'customDate',
})
export class CustomDatePipe extends DatePipe implements PipeTransform {
  override transform(value: any, format?: 'dateTime' | 'time' | 'timeDate'): any {
    const time = super.transform(value, 'H:mm');
    const date = super.transform(value, 'd MMM yyyy');

    if (format === 'dateTime') {
      return `${date} ${time}`;
    }

    if (format === 'timeDate') {
      return `${time} ${date}`;
    }

    if (format === 'time') {
      return time;
    }
    return date;
  }
}
