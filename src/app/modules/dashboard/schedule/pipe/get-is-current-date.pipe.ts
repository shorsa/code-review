import { Pipe, PipeTransform } from '@angular/core';
import { ResponseNonWorkingDayListItemModel } from '../models';

@Pipe({
  name: 'getIsCurrentDate',
})
export class GetIsCurrentDatePipe implements PipeTransform {
  transform(value: Date, currentDates: ResponseNonWorkingDayListItemModel[]): any {
    return !!currentDates?.find((item) => {
      const dateItem = new Date(item.date);

      const dayIsSame = dateItem.getDate() === value.getDate();
      const monthIsSame = dateItem.getMonth() === value.getMonth();
      const yearIsSame = dateItem.getFullYear() === value.getFullYear();

      return dayIsSame && monthIsSame && yearIsSame;
    });
  }
}
