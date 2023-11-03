import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import * as appointmentActions from '../../store/appointments.actions';
import { AppointmentStatusEnum } from '../../enums';

@Component({
  selector: 'app-attendance-action-other-modal',
  templateUrl: './attendance-action-other-modal.component.html',
  styleUrls: ['./attendance-action-other-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AttendanceActionOtherModalComponent {
  readonly nzModalData: {
    appointmentId: string;
  } = inject(NZ_MODAL_DATA);
  readonly #modal = inject(NzModalRef);

  descriptionControl!: FormControl;
  wasAttemptToSubmitForm: boolean = false;

  constructor(private store$: Store, private changeDetector: ChangeDetectorRef) {
    this.descriptionControl = new FormControl('', [Validators.required]);
  }

  onSubmit(): void {
    this.wasAttemptToSubmitForm = true;
    this.descriptionControl.markAsDirty();
    this.descriptionControl.updateValueAndValidity({ onlySelf: true });
    this.changeDetector.detectChanges();
    if (this.descriptionControl.invalid) return;

    this.store$.dispatch(
      appointmentActions.appointmentChangeStatusAction({
        payload: {
          id: this.nzModalData.appointmentId,
          statusReason: this.descriptionControl.value,
          status: AppointmentStatusEnum.AttentionRequired,
        },
      })
    );
  }

  onCancel(): void {
    this.#modal.close();
  }
}
