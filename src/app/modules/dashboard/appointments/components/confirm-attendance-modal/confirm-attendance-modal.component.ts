import { Component, OnInit, ViewContainerRef, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NZ_MODAL_DATA, NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { RoutesConstants } from 'src/app/core/constants';
import { AttendanceActionOtherModalComponent } from '../attendance-avtion-other-modal/attendance-action-other-modal.component';
import { Store } from '@ngrx/store';
import * as appointmentActions from '../../store/appointments.actions';
import { AppointmentStatusEnum } from '../../enums';

@Component({
  selector: 'app-confirm-attendance-modal',
  templateUrl: './confirm-attendance-modal.component.html',
  styleUrls: ['./confirm-attendance-modal.component.scss'],
})
export class ConfirmAttendanceModalComponent {
  readonly nzModalData: {
    appointmentId: string;
  } = inject(NZ_MODAL_DATA);

  constructor(
    private router: Router,
    private store$: Store,
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef
  ) {}

  onYes(): void {
    this.store$.dispatch(
      appointmentActions.appointmentChangeStatusAction({
        payload: {
          id: this.nzModalData.appointmentId,
          status: AppointmentStatusEnum.Attended,
        },
      })
    );

    this.router.navigate(
      [
        RoutesConstants.DASHBOARD_INDEX,
        RoutesConstants.DASHBOARD_APPOINTMENTS,
        RoutesConstants.DASHBOARD_APPOINTMENTS_ACTION_YES,
      ],
      {
        queryParams: {
          id: this.nzModalData.appointmentId,
        },
      }
    );
  }

  onOther(): void {
    this.modal.create<AttendanceActionOtherModalComponent, any>({
      nzTitle: 'Description',
      nzWidth: '482px',
      nzMaskClosable: false,
      nzContent: AttendanceActionOtherModalComponent,
      nzData: {
        appointmentId: this.nzModalData.appointmentId,
      },
      nzViewContainerRef: this.viewContainerRef,
      nzFooter: null,
    });
  }

  onNo() {
    this.store$.dispatch(
      appointmentActions.appointmentChangeStatusAction({
        payload: {
          id: this.nzModalData.appointmentId,
          status: AppointmentStatusEnum.DNA,
        },
      })
    );

    this.router.navigate([
      RoutesConstants.DASHBOARD_INDEX,
      RoutesConstants.DASHBOARD_APPOINTMENTS,
    ]);
  }
}
