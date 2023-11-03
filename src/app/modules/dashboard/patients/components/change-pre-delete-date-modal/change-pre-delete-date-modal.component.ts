import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { Observable } from 'rxjs';
import { selectIsLoading } from 'src/app/app-store/app-state/app-state.selectors';
import { ResponsePatientListItem } from '../../models/patients';
import * as patientActions from '../../store/patient.actions';

@Component({
  selector: 'app-change-pre-delete-date-modal',
  templateUrl: './change-pre-delete-date-modal.component.html',
  styleUrls: ['./change-pre-delete-date-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangePreDeleteDateModalComponent implements OnInit {
  readonly #modal = inject(NzModalRef);
  readonly nzModalData: { patient: ResponsePatientListItem } = inject(NZ_MODAL_DATA);

  date!: FormControl;
  isLoading$?: Observable<boolean>;
  wasAttemptToSubmitForm: boolean = false;

  constructor(private store$: Store) {
    this.date = new FormControl(null, [Validators.required]);
  }

  ngOnInit() {
    this.isLoading$ = this.store$.select(selectIsLoading);
  }

  cancel(): void {
    this.#modal.close();
  }

  handleSubmit(): void {
    this.date.markAsDirty();
    this.date.updateValueAndValidity({ onlySelf: true });
    this.wasAttemptToSubmitForm = true;
    if (this.date.invalid) return;

    this.store$.dispatch(
      patientActions.changePreDeleteDateAction({
        payload: {
          id: this.nzModalData.patient.id,
          date: this.date.value,
        },
      })
    );
  }
}
