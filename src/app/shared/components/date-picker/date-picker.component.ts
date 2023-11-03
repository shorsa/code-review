import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Injector,
  Input,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';
import { AbstractControl, FormControl, NgControl } from '@angular/forms';
import { Observable } from 'rxjs';

export type ComponentChange<T, P extends keyof T> = {
  previousValue: T[P];
  currentValue: T[P];
  firstChange: boolean;
};

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatePickerComponent implements AfterViewInit, OnDestroy {
  @ViewChild('datePickerRef', { read: ElementRef }) datePickerRef!: any;

  @Input() isLoading$?: Observable<boolean>;
  @Input() iconOnly: boolean = false;
  @Input() disabled: boolean = false;
  @Input() isDisablePast: boolean = false;
  @Input() availableDates?: Date[];
  @Input() control: FormControl<any> | null | undefined;
  @Input() submit?: boolean;
  @Input() date?: Date;
  @Output() dateChange: EventEmitter<Date> = new EventEmitter<Date>();
  @Output() periodChange: EventEmitter<{ month: number; year: number }> =
    new EventEmitter<{ month: number; year: number }>();

  @Output() handleOpen = new EventEmitter();

  private observer?: MutationObserver;

  currentDateFilterMonth: number = new Date().getMonth() + 1;
  currentDateFilterYear: number = new Date().getFullYear();

  calendarOpen: boolean = false;

  private ngControl?: NgControl | AbstractControl;

  constructor(private injector: Injector, private changeDetector: ChangeDetectorRef) {}

  ngAfterViewInit() {
    if (this.control) {
      const model: NgControl = this.injector.get(NgControl, null)!;
      if (model && model.control) {
        this.ngControl = model.control;
      } else if (model) {
        this.ngControl = model;
      } else if (this.control) {
        this.ngControl = this.control;
        // this.subscribeOnControlChanges();
      }

      this.changeDetector.detectChanges();
    }
  }

  private subscribeOnControlChanges(): void {
    if (!this.ngControl) return;
    this.ngControl.valueChanges?.subscribe((res) => {
      if (res && !this.date) {
        debugger;
        this.date = res;
      }
      if (!res && this.date) {
        debugger;
        this.date = undefined;
      }
    });
  }

  handleDateOpenChange(isOpen: boolean): void {
    this.periodChange?.emit({
      month: this.currentDateFilterMonth,
      year: this.currentDateFilterYear,
    });

    if (isOpen) {
      setTimeout(() => {
        const headerElement = document.querySelector('.ant-picker-header');

        if (headerElement) {
          this.observer = new MutationObserver((mutations) => {
            mutations.forEach(() => {
              this.getCurrentDateValues();
            });
          });

          this.observer.observe(headerElement, { childList: true, subtree: true });
        }
      }, 500);
    }
  }

  getCurrentDateValues(): void {
    const yearButton = document.querySelector('.ant-picker-header-year-btn');
    const currentYear = yearButton ? Number(yearButton.textContent) : null;

    const monthButton = document.querySelector('.ant-picker-header-month-btn');
    const currentMonth = monthButton
      ? this.monthNameToNumber(monthButton.textContent!)
      : null;

    if (
      currentYear !== this.currentDateFilterYear ||
      currentMonth !== this.currentDateFilterMonth
    ) {
      this.currentDateFilterMonth = currentMonth!;
      this.currentDateFilterYear = currentYear!;

      this.periodChange?.emit({
        month: this.currentDateFilterMonth,
        year: this.currentDateFilterYear,
      });
    }
  }

  monthNameToNumber(monthName: string): number {
    const months = [
      'JAN',
      'FEB',
      'MAR',
      'APR',
      'MAY',
      'JUN',
      'JUL',
      'AUG',
      'SEP',
      'OCT',
      'NOV',
      'DEC',
    ];
    const index = months.indexOf(monthName.trim().toLocaleUpperCase());
    return index >= 0 ? index + 1 : -1;
  }

  handleChangeDate(value: any): void {
    // if (this.control) {
    //   this.control.setValue(value);
    //   this.date = value;
    //   return;
    // }
    // this.date = value;
    // if (this.ngControl) {
    //   // this.ngControl.value = this.date;
    // }
    this.dateChange?.emit(value);
  }

  getDisabledDate(current: Date): boolean {
    if (this.availableDates) {
      const currentDateIsAvailable = this.availableDates?.find((item) => {
        item.setHours(0, 0, 0, 0);
        current.setHours(0, 0, 0, 0);
        return current.getTime() === item.getTime();
      });
      return !currentDateIsAvailable;
    }

    if (this.isDisablePast) {
      return current.getTime() < new Date().setHours(0, 0, 0, 0);
    }

    return false;
  }

  ngOnDestroy(): void {
    // Остановите наблюдение, когда компонент уничтожается
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
