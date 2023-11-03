import { Component, OnInit, ViewContainerRef, inject } from '@angular/core';
import { RequestUpdateAppointmentReportModel } from '../../../models';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NZ_MODAL_DATA, NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { RoutesConstants } from 'src/app/core/constants';
import { AppointmentStatusEnum } from '../../../enums';
import * as appointmentActions from '../../../store/appointments.actions';

export interface ToSignModalModel {
  data: RequestUpdateAppointmentReportModel;
}

@Component({
  selector: 'app-to-sign-modal',
  templateUrl: './to-sign-modal.component.html',
  styleUrls: ['./to-sign-modal.component.scss'],
})
export class ToSignModalComponent {
  readonly nzModalData: ToSignModalModel = inject(NZ_MODAL_DATA);
  readonly #modal = inject(NzModalRef);

  constructor(private router: Router, private store$: Store) {}

  onNo(): void {
    this.#modal.close();
  }

  onYes(): void {
    this.store$.dispatch(
      appointmentActions.appointmentUpdateReportAction({
        payload: this.nzModalData.data,
      })
    );

    this.router.navigate([
      RoutesConstants.DASHBOARD_INDEX,
      RoutesConstants.DASHBOARD_APPOINTMENTS,
    ]);
  }
}
