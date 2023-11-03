import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import * as patientActions from '../../store/patient.actions';
import { NzModalRef, NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
import { Observable } from 'rxjs';
import { selectIsLoading } from 'src/app/app-store/app-state/app-state.selectors';
import { ResponsePatientPreDeleteItemModel } from '../../models/patients';

@Component({
  selector: 'app-confirm-delete-pre-delete-patient',
  templateUrl: './confirm-delete-pre-delete-patient.component.html',
  styleUrls: ['./confirm-delete-pre-delete-patient.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmDeletePreDeletePatientModalComponent {
  readonly #modal = inject(NzModalRef);
  readonly nzModalData: { patient: ResponsePatientPreDeleteItemModel } =
    inject(NZ_MODAL_DATA);
  isLoading$?: Observable<boolean>;

  constructor(private store$: Store) {
    this.isLoading$ = this.store$.select(selectIsLoading);
  }

  deletePatient(): void {
    this.store$.dispatch(
      patientActions.deletePreDeleteAction({
        payload: { id: this.nzModalData.patient.id },
      })
    );
  }

  handleCancel(): void {
    this.#modal.close();
  }
}
