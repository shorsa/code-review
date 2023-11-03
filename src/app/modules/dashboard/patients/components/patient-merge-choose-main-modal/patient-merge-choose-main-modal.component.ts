import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { NzModalRef, NZ_MODAL_DATA, NzModalService } from 'ng-zorro-antd/modal';
import { PatientModel } from 'src/app/shared/models';
import * as patientActions from '../../store/patient.actions';
import * as patientSelectors from '../../store/patient.selectors';
import { Observable } from 'rxjs';
import { selectIsLoading } from 'src/app/app-store/app-state/app-state.selectors';
import { ResponsePatientListItem } from '../../models/patients';

@Component({
  selector: 'app-patient-merge-choose-main-modal',
  templateUrl: './patient-merge-choose-main-modal.component.html',
  styleUrls: ['./patient-merge-choose-main-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatientMergeChooseMainModalComponent implements OnInit {
  readonly nzModalData: { patientData: ResponsePatientListItem[] } =
    inject(NZ_MODAL_DATA);

  mainPatientId?: string;
  isLoading$?: Observable<boolean>;

  constructor(private modal: NzModalService, private store$: Store) {}

  ngOnInit() {
    this.isLoading$ = this.store$.select(selectIsLoading);
    this.mainPatientId = this.nzModalData.patientData.at(-1)?.id;
  }

  merge(): void {
    const mainPatientId: string = this.nzModalData.patientData.find(
      (item) => item.id === this.mainPatientId
    )!.id;
    const secondaryPatientId: string = this.nzModalData.patientData.find(
      (item) => item.id !== this.mainPatientId
    )!.id;

    this.store$.dispatch(
      patientActions.patientsToMergeAction({
        payload: { mainPatientId, secondaryPatientId },
      })
    );
  }

  handleCancel(): void {
    this.modal.closeAll();
  }
}
