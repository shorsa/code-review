import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DaysOfWeekEnum } from 'src/app/shared/enums';

@Component({
  selector: 'app-recurrence-days',
  templateUrl: './recurrence-days.component.html',
  styleUrls: ['./recurrence-days.component.scss'],
})
export class RecurrenceDaysComponent implements OnInit {
  @Output() changeDays: EventEmitter<DaysOfWeekEnum[]> = new EventEmitter();
  @Input() set defaultValue(days: DaysOfWeekEnum[]) {
    days?.forEach((item) => {
      this.checkDayOptionsOne.forEach((dayOption) => {
        if (dayOption.value === item) {
          dayOption.checked = true;
        }
      });
    });
  }

  @Input() viewMode: boolean = false;

  checkDayOptionsOne = [
    { label: 'M', value: DaysOfWeekEnum.Monday, checked: false },
    { label: 'T', value: DaysOfWeekEnum.Tuesday, checked: false },
    { label: 'W', value: DaysOfWeekEnum.Wednesday, checked: false },
    { label: 'T', value: DaysOfWeekEnum.Thursday, checked: false },
    { label: 'F', value: DaysOfWeekEnum.Friday, checked: false },
    { label: 'S', value: DaysOfWeekEnum.Saturday, checked: false, disabled: true },
    { label: 'S', value: DaysOfWeekEnum.Sunday, checked: false, disabled: true },
  ];

  constructor() {}

  ngOnInit() {}

  updateDaySingleChecked() {
    const checkedDays = this.checkDayOptionsOne
      .filter((item) => item.checked)
      .map((item) => item.value);
    this.changeDays.emit(checkedDays);
  }
}
