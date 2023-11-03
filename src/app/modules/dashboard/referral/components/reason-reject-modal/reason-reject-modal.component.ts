import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { NZ_MODAL_DATA, NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Observable } from 'rxjs';
import { selectIsLoading } from 'src/app/app-store/app-state/app-state.selectors';
import { ReferralStatusEnum } from 'src/app/shared/enums';
import { referralChangeStatusAction } from '../../state/referral.actions';

export interface ReasonRejectModalModel {
  id: string;
  status: ReferralStatusEnum;
}

@Component({
  selector: 'app-reason-reject-modal',
  templateUrl: './reason-reject-modal.component.html',
  styleUrls: ['./reason-reject-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReasonRejectModalComponent {
  readonly #modal = inject(NzModalRef);
  readonly nzModalData: ReasonRejectModalModel = inject(NZ_MODAL_DATA);

  isLoading$?: Observable<boolean>;
  wasAttemptToSubmitForm: boolean = false;

  reasonControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);

  constructor(
    private changeDetector: ChangeDetectorRef,
    private store$: Store,
    private modal: NzModalService
  ) {
    this.isLoading$ = this.store$.select(selectIsLoading);
  }

  handleCancel(): void {
    this.modal.closeAll();
  }

  handleSend(): void {
    this.wasAttemptToSubmitForm = true;
    this.reasonControl.markAsTouched();
    this.reasonControl.markAsDirty();
    this.reasonControl.updateValueAndValidity({ onlySelf: true });
    this.changeDetector.detectChanges();

    if (this.reasonControl.invalid) return;

    this.store$.dispatch(
      referralChangeStatusAction({
        payload: {
          id: this.nzModalData.id,
          reason: this.reasonControl.value,
          status: this.nzModalData.status,
        },
      })
    );
  }
}
