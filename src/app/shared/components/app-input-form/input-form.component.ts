import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Injector,
  Input,
  OnChanges,
  TemplateRef,
  forwardRef,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  NG_VALUE_ACCESSOR,
  NgControl,
  NgModel,
} from '@angular/forms';
import { ValueAccessorBase } from './value-accessor';
import { ComponentChanges } from '../../models';
import { NzDatePickerComponent } from 'ng-zorro-antd/date-picker';

export type InputType = 'email' | 'text' | 'password' | 'phone';

export type ComponentChange<T, P extends keyof T> = {
  previousValue: T[P];
  currentValue: T[P];
  firstChange: boolean;
};

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputFormComponent),
      multi: true,
    },
  ],
})
export class InputFormComponent
  extends ValueAccessorBase<string>
  implements AfterViewInit, OnChanges
{
  @Input() control: FormControl<any> | null | undefined;
  @Input() submit?: boolean;
  @Input() styleClass?: string;
  @Input() type: InputType = 'text';
  @Input() placeholder?: string;
  @Input() actionIcon?: string;
  @Input() label?: string;
  @Input() disabled?: boolean;
  @Input() decoration?: 'white';

  private ngControl?: NgControl | AbstractControl;

  stateViewPassword?: boolean;

  constructor(private injector: Injector, private cdr: ChangeDetectorRef) {
    super();
  }

  ngOnChanges(changes: ComponentChanges<InputFormComponent>): void {
    if (changes?.disabled?.currentValue && !changes?.disabled?.previousValue) {
      this.control?.disable();
    }
    if (!changes?.disabled?.currentValue && changes?.disabled?.previousValue) {
      this.control?.enable();
    }
  }

  ngAfterViewInit(): void {
    if (this.control) {
      const model: NgControl = this.injector.get(NgControl, null)!;
      if (model && model.control) {
        this.ngControl = model.control;
      } else if (model) {
        this.ngControl = model;
      } else if (this.control) {
        this.ngControl = this.control;
      }

      this.control.valueChanges.subscribe((value) => {
        if (typeof value === 'string') {
          if (!value.split(' ')[0]) {
            value = value.split(' ').splice(0, 1).join(' ');
          }
          if (this.type === 'phone') {
            // const reg = value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
            // value = !reg[2] ? reg[1] : '(' + reg[1] + ') ' + reg[2] + (reg[3] ? '-' + reg[3] : '');
            value = value.replace(/\D/g, '');
          }
          this.control?.setValue(value, { emitEvent: false });
        }
      });
      this.cdr.detectChanges();
    }
  }

  get isPassword(): boolean {
    return this.type === 'password';
  }

  get typeInput(): InputType {
    return this.type === 'password'
      ? this.stateViewPassword
        ? 'text'
        : this.type
      : this.type;
  }

  showPassword(): void {
    this.stateViewPassword = !this.stateViewPassword;
  }
}
