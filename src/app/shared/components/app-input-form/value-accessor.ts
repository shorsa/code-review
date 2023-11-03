import { ControlValueAccessor } from '@angular/forms';

export abstract class ValueAccessorBase<T> implements ControlValueAccessor {
  protected innerValue!: T;

  // eslint-disable-next-line no-array-constructor
  private changed = new Array<(value: T) => void>();

  // eslint-disable-next-line no-array-constructor
  private touched = new Array<() => void>();

  get value(): T {
    return this.innerValue;
  }

  set value(value: T) {
    if (this.innerValue !== value) {
      this.innerValue = value;
      this.changedValue(value);
    }
  }

  changedValue(value: T): void {
    this.changed.forEach((f) => f(value));
  }

  writeValue(value: T): void {
    this.innerValue = value;
  }

  registerOnChange(fn: (value: T) => void): void {
    this.changed.push(fn);
  }

  registerOnTouched(fn: () => void): void {
    this.touched.push(fn);
  }

  touch(): void {
    this.touched.forEach((f) => f());
  }
}
