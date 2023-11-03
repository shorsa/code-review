import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { clearInvoicingDetailsDataAction } from '../../store/invoicing.actions';

@Component({
  templateUrl: './invoicing-management.component.html',
  styleUrls: ['./invoicing-management.component.scss'],
})
export class InvoicingManagementPageComponent implements OnDestroy {
  constructor(private location: Location, private store$: Store) {}

  navigateToBack(): void {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.store$.dispatch(clearInvoicingDetailsDataAction());
  }
}
