import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { Observable, Subscription } from 'rxjs';
import { selectIsLoading } from 'src/app/app-store/app-state/app-state.selectors';
import { patientDeactivateAction } from '../../store/patient.actions';

export interface PatientDeactivateModalModel {
  patientId: string;
}

@Component({
  selector: 'app-patient-deactivate-modal',
  templateUrl: './patient-deactivate-modal.component.html',
  styleUrls: ['./patient-deactivate-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatientDeactivateModalComponent implements OnInit, OnDestroy {
  private subscriptions$: Subscription = new Subscription();

  leavingDate!: FormControl;
  didNotStart!: FormControl;

  readonly #modal = inject(NzModalRef);
  readonly nzModalData: PatientDeactivateModalModel = inject(NZ_MODAL_DATA);

  wasAttemptToSubmitForm: boolean = false;
  isLoading$?: Observable<boolean>;

  constructor(private store$: Store) {
    this.leavingDate = new FormControl(null, [Validators.required]);
    this.didNotStart = new FormControl(false, [Validators.required]);

    this.subscriptionsFormChanges();
  }

  ngOnInit() {
    this.isLoading$ = this.store$.select(selectIsLoading);
  }

  private subscriptionsFormChanges(): void {
    this.subscriptions$.add(
      this.didNotStart.valueChanges.subscribe((notStart) => {
        if (notStart) {
          this.leavingDate.disable();
          this.leavingDate.setValue(null);
          this.leavingDate.updateValueAndValidity();
        } else {
          this.leavingDate.enable();
        }
      })
    );
  }

  handleCancel(): void {
    this.#modal.close();
  }

  handleSubmitForm(): void {
    this.leavingDate.markAsDirty();
    this.leavingDate.updateValueAndValidity({ onlySelf: true });
    this.wasAttemptToSubmitForm = true;
    if (this.leavingDate.invalid) return;

    this.store$.dispatch(
      patientDeactivateAction({
        payload: {
          id: this.nzModalData.patientId,
          leavingDate: this.leavingDate.value,
        },
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }
}
