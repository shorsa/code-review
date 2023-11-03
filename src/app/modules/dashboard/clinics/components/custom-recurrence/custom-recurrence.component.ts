import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { NzSelectOptionInterface } from 'ng-zorro-antd/select';
import { ReferralTypeEnum } from '../../../referral/enums';
import { DaysOfWeekEnum, RecurrenceTypeEnum } from 'src/app/shared/enums';

@Component({
  selector: 'app-custom-recurrence',
  templateUrl: './custom-recurrence.component.html',
  styleUrls: ['./custom-recurrence.component.scss'],
})
export class CustomRecurrenceComponent {
  @Input() viewMode: boolean = false;

  @Input() set customDates(value: Date[]) {
    if (!value) return;
    if (Array.isArray(value) && typeof value?.at(0) === 'string') {
      this.currentDates = [...value.map((item) => new Date(item))];
    } else if (Array.isArray(value)) {
      this.currentDates = [...value];
    }
  }
  @Input() wasAttemptToSubmitForm?: boolean;
  @Output() changeDates: EventEmitter<Date[]> = new EventEmitter();

  currentDate?: Date;
  currentDates: Date[] = [];
  isOpen: boolean = false;

  constructor() {}

  addDate(date: Date): void {
    date.setUTCHours(0, 0, 0, 0);

    const isExist = this.isCurrent(date);
    if (!isExist) {
      this.currentDates.push(date);
      this.currentDate = undefined;
    } else {
      const dateIndex = this.currentDates.findIndex(
        (item) => item.toISOString() === date.toISOString()
      );
      this.currentDates.splice(dateIndex, 1);
    }

    if (!this.currentDates.length) {
      this.currentDate = undefined;
    }

    this.changeDates.emit(this.currentDates);
  }

  isCurrent(event: Date): boolean {
    const dayEvent = event.getDate();
    const monthEvent = event.getMonth();
    const yearEvent = event.getFullYear();
    return !!this.currentDates?.find(
      (item) =>
        item?.getDate() === dayEvent &&
        item?.getMonth() === monthEvent &&
        item?.getFullYear() === yearEvent
    );
  }

  disabledDate(current: Date): boolean {
    const isBeforeToday = current.getTime() < new Date().setHours(0, 0, 0, 0);
    const isWeekend = current.getDay() === 6 || current.getDay() === 0;

    return isBeforeToday || isWeekend;
  }

  onOk(): void {
    this.changeDates.emit(this.currentDates);
    this.isOpen = false;
  }
}
