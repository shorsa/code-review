import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { CommonConstants } from 'src/app/core/constants';
import * as appointmentsActions from '../../store/appointments.actions';
import { Store } from '@ngrx/store';
import { PermissionClaimsEnum } from 'src/app/shared/enums';

@Component({
  selector: 'app-start-appointment',
  templateUrl: './start-appointment.component.html',
  styleUrls: ['./start-appointment.component.scss'],
})
export class StartAppointmentComponent implements OnInit, OnDestroy {
  readonly appointmentClinicNotesUpdatePermission =
    PermissionClaimsEnum.AppointmentConfidentialNotesUpdate;

  private subscriptions$: Subscription = new Subscription();
  isViewMode?: boolean;
  appointmentId!: string;

  constructor(private activatedRoute: ActivatedRoute, private store$: Store) {}

  ngOnInit(): void {
    this.getParamsActivateRoute();
    this.store$.dispatch(
      appointmentsActions.appointmentsGetPatientDetailsAction({
        payload: { appointmentId: this.appointmentId },
      })
    );
  }

  private getParamsActivateRoute(): void {
    this.subscriptions$.add(
      this.activatedRoute.queryParams.pipe(filter((val) => !!val)).subscribe((params) => {
        this.appointmentId = params[CommonConstants.QUERY_ID];
      })
    );
    this.activatedRoute.data.pipe(filter((val) => !!val)).subscribe((data) => {
      if (data && !data['isView']) return;
      this.isViewMode = true;
    });

    this.store$.dispatch(
      appointmentsActions.appointmentGetByIdAction({
        payload: { id: this.appointmentId },
      })
    );
  }

  ngOnDestroy(): void {
    // eslint-disable-next-line ngrx/avoid-dispatching-multiple-actions-sequentially
    this.store$.dispatch(appointmentsActions.clearAppointmentDetailsDataAction());
    // eslint-disable-next-line ngrx/avoid-dispatching-multiple-actions-sequentially
    this.store$.dispatch(appointmentsActions.clearAppointmentPatientDetails());
    this.subscriptions$.unsubscribe();
  }
}
