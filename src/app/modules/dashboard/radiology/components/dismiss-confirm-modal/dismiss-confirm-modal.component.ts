import { Component, OnInit, inject } from '@angular/core';
import * as radiologyActions from '../../store/radiology.actions';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { Store } from '@ngrx/store';

export interface DismissConfirmModalModel {
  mriId: string;
}

@Component({
  selector: 'app-dismiss-confirm-modal',
  templateUrl: './dismiss-confirm-modal.component.html',
  styleUrls: ['./dismiss-confirm-modal.component.scss'],
})
export class DismissConfirmModalComponent {
  readonly #modal = inject(NzModalRef);
  readonly nzModalData: DismissConfirmModalModel = inject(NZ_MODAL_DATA);
  constructor(private store$: Store) {}

  onOk(): void {
    this.store$.dispatch(
      radiologyActions.mriDismissAction({ payload: { id: this.nzModalData.mriId } })
    );
  }

  onCancel(): void {
    this.#modal.close();
  }
}
