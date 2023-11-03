import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs';
import { CommonConstants } from 'src/app/core/constants';
import * as clinicianActions from '../../store/clinician.actions';
import * as clinicianSelectors from '../../store/clinician.selectors';

@Component({
  selector: 'app-clinician-management-page',
  templateUrl: './clinician-management-page.component.html',
  styleUrls: ['./clinician-management-page.component.scss'],
})
export class ClinicianManagementPageComponent implements OnInit, OnDestroy {
  clinicianId?: string;
  selectedIndex: number = 0;
  clinicianName?: string;

  constructor(private activatedRoute: ActivatedRoute, private store$: Store) {}

  ngOnInit() {
    this.initializationVariables();

    this.store$
      .select(clinicianSelectors.selectClinicianName)
      .pipe(filter((val) => !!val))
      .subscribe((name) => (this.clinicianName = name));
  }

  private initializationVariables(): void {
    this.activatedRoute.queryParams.pipe(filter((val) => !!val)).subscribe((params) => {
      this.clinicianId = params[CommonConstants.QUERY_ID];
    });
  }

  ngOnDestroy(): void {
    this.store$.dispatch(clinicianActions.clearClinicianDetailsDataAction());
  }
}
