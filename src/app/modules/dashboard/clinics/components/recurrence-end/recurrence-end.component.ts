import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RecurrenceTypeEnum } from 'src/app/shared/enums';
import { getDateTimeWithCurrentTimezone } from 'src/app/shared/helpers';

enum EndType {
  Never = 0,
  On = 1,
  After = 2,
}

@Component({
  selector: 'app-recurrence-end',
  templateUrl: './recurrence-end.component.html',
  styleUrls: ['./recurrence-end.component.scss'],
})
export class RecurrenceEndComponent implements OnInit {
  @Input() viewMode: boolean = false;
  @Input() wasAttemptToSubmitForm: boolean = false;

  @Input() defaultValue?: {
    endsAfterCount?: number;
    endsOnDate?: string;
  };

  @Input() set startDate(value: string | Date | undefined) {
    if (typeof value === 'string') {
      this._startDate = new Date(value);
      return;
    }
    this._startDate = value as Date | undefined;
  }

  @Output() changeValue = new EventEmitter<{
    endsAfterCount?: number;
    endsOnDate?: string;
  }>();

  readonly endTypeNever = EndType.Never;
  readonly endTypeOn = EndType.On;
  readonly endTypeAfter = EndType.After;
  private _startDate?: Date;
  formGroup!: FormGroup;
  afterValue: number = 1;
  endsValue: RecurrenceTypeEnum = RecurrenceTypeEnum.None;
  constructor(private formBuilder: FormBuilder) {
    this.formGroupInit();
  }

  get getIsDisabledEndsAfterCount(): boolean {
    if (this.viewMode) return true;
    return !!this.formGroup.get('endsAfterCount')?.disabled;
  }

  formatterPercent(value: number): string {
    return `${value} occurrences`;
  }

  parserPercent(value: string): string {
    return value.replace(' occurrences', '');
  }

  ngOnInit() {
    if (this.defaultValue?.endsAfterCount) {
      this.formGroup.get('endsAfterCount')?.setValue(this.defaultValue?.endsAfterCount);
      this.formGroup.get('endType')?.setValue(EndType.After);
    }
    if (this.defaultValue?.endsOnDate) {
      this.formGroup.get('endsOnDate')?.setValue(this.defaultValue?.endsOnDate);
      this.formGroup.get('endType')?.setValue(EndType.On);
    }

    if (this.viewMode) {
      this.formGroup.disable();
      this.formGroup.get('endsOnDate')?.disable();
    }
  }

  disabledDate(current: Date): boolean {
    if (this._startDate) {
      const isLestThanStartDate =
        current.getTime() < this._startDate.setHours(0, 0, 0, 0);
      return current.getTime() < new Date().setHours(0, 0, 0, 0) || isLestThanStartDate;
    }
    return current.getTime() < new Date().setHours(0, 0, 0, 0);
  }

  afterDateUp(): void {
    const endsAfterCountValue: number = this.formGroup.get('endsAfterCount')!.value;
    this.formGroup.get('endsAfterCount')!.setValue(endsAfterCountValue + 1);
  }

  afterDateDown(): void {
    const endsAfterCountValue: number = this.formGroup.get('endsAfterCount')!.value;
    if (endsAfterCountValue <= 0) return;
    this.formGroup.get('endsAfterCount')!.setValue(endsAfterCountValue - 1);
  }

  private formGroupInit(): void {
    this.formGroup = this.formBuilder.group({
      endsAfterCount: [{ value: '', disabled: true }],
      endsOnDate: [{ value: null, disabled: true }],
      endType: [EndType.Never],
    });

    this.subscriptionsOnFormChanges();
  }

  private subscriptionsOnFormChanges(): void {
    this.formGroup.get('endType')!.valueChanges.subscribe((endTypeValue) => {
      if (endTypeValue === EndType.On) {
        this.formGroup.get('endsOnDate')?.enable();
        this.formGroup.get('endsAfterCount')?.disable();
        this.formGroup.get('endsAfterCount')!.setValue('', { emitEvent: false });
      }

      if (endTypeValue === EndType.Never) {
        this.formGroup.get('endsOnDate')?.disable();
        this.formGroup.get('endsOnDate')?.setValue(null, { emitEvent: false });
        this.formGroup.get('endsAfterCount')?.disable();
        this.formGroup.get('endsAfterCount')!.setValue('', { emitEvent: false });
      }

      if (endTypeValue === EndType.After) {
        this.formGroup.get('endsOnDate')?.setValue(null);
        this.formGroup.get('endsOnDate')?.disable();
        this.formGroup.get('endsAfterCount')?.enable();
      }
    });

    this.formGroup.get('endsAfterCount')!.valueChanges.subscribe((value) => {
      if (Number(value) <= 0) {
        this.formGroup.get('endsAfterCount')!.setValue(Number(0), { emitEvent: false });
      }
    });

    this.formGroup.valueChanges.subscribe((value) => {
      const model = {
        endsAfterCount: value.endsAfterCount,
        endsOnDate: getDateTimeWithCurrentTimezone(value.endsOnDate) as string,
      };

      this.changeValue.emit(model);
    });
  }
}
