import { FormArray, FormGroup } from '@angular/forms';

export function markAsDirtyForm(formGroup: FormGroup | FormArray) {
  Object.values(formGroup.controls).forEach((control) => {
    if (control.invalid) {
      control.markAsDirty();
      control.updateValueAndValidity({ onlySelf: true });
    }
  });
}
