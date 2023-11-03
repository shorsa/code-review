import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { RequestGetAppointmentListModel } from '../../../appointments/models';
import { CommonConstants } from 'src/app/core/constants';
import { filter } from 'rxjs';
import { clearAppointmentSearchParamsAction } from '../../../referral/state/referral-appointments.actions';
import { getDateTimeWithCurrentTimezone } from 'src/app/shared/helpers';

@Component({
  selector: 'app-clinic-appointment-list-page',
  templateUrl: './clinic-appointment-list-page.component.html',
  styleUrls: ['./clinic-appointment-list-page.component.scss'],
})
export class ClinicAppointmentListPageComponent implements OnDestroy {
  private _searchParams!: RequestGetAppointmentListModel;
  clinicId!: string;
  date!: string;
  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private store$: Store
  ) {
    this.activatedRoute.queryParams.pipe(filter((val) => !!val)).subscribe((params) => {
      this.clinicId = params[CommonConstants.QUERY_ID];
      const date = params[CommonConstants.QUERY_DATE];
      if (date) {
        this.date = new Date(getDateTimeWithCurrentTimezone(date, true)!).toISOString();
      }
    });
  }

  navigateToBack(): void {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.store$.dispatch(clearAppointmentSearchParamsAction());
  }
}
