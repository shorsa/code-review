import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription, filter } from 'rxjs';
import { CommonConstants } from 'src/app/core/constants';
import * as appointmentActions from '../../store/appointments.actions';

@Component({
  selector: 'app-attendance-yes-page',
  templateUrl: './attendance-yes-page.component.html',
  styleUrls: ['./attendance-yes-page.component.scss'],
})
export class AttendanceYesPageComponent implements OnInit, OnDestroy {
  private subscriptions$: Subscription = new Subscription();
  
  currentTabIndex = 0;
  appointmentId!: string;

  constructor(private activatedRoute: ActivatedRoute, private store$: Store) {}

  ngOnInit(): void {
    this.getParamsActivateRoute();
  }

  nexTab(): void {
    this.currentTabIndex++;
  }

  prevTab(): void {
    this.currentTabIndex--;
  }

  private getParamsActivateRoute(): void {
    this.subscriptions$.add(
      this.activatedRoute.queryParams.pipe(filter((val) => !!val)).subscribe((params) => {
        this.appointmentId = params[CommonConstants.QUERY_ID];
      })
    );

    // eslint-disable-next-line ngrx/avoid-dispatching-multiple-actions-sequentially
    this.store$.dispatch(
      appointmentActions.appointmentsGetPatientDetailsAction({
        payload: { appointmentId: this.appointmentId },
      })
    );

    // eslint-disable-next-line ngrx/avoid-dispatching-multiple-actions-sequentially
    this.store$.dispatch(
      appointmentActions.appointmentGetByIdAction({
        payload: { id: this.appointmentId },
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }
}
