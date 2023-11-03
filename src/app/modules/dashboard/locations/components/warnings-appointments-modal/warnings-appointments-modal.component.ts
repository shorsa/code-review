import { Component, OnInit, inject } from '@angular/core';
import {
  RequestCheckLocationForDeactivationModel,
  ResponseCheckLocationEntityForDeactivationAppointmentModel,
} from '../../models';
import { Observable } from 'rxjs';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-warnings-appointments-modal',
  templateUrl: './warnings-appointments-modal.component.html',
  styleUrls: ['./warnings-appointments-modal.component.scss'],
})
export class WarningsAppointmentsModalComponent {
  readonly nzModalData: {
    list: ResponseCheckLocationEntityForDeactivationAppointmentModel[];
  } = inject(NZ_MODAL_DATA);
  readonly #modal = inject(NzModalRef);

  isLoading$?: Observable<boolean>;

  constructor() {}

  close(): void {
    this.#modal.close();
  }
}
