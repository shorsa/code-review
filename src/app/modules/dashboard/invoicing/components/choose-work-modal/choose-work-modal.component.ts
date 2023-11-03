import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { NzModalRef, NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { Observable, Subscription } from 'rxjs';
import { errorAction } from 'src/app/app-store/app-state/app-state.actions';
import { CommonConstants } from 'src/app/core/constants';
import { ContractsService } from 'src/app/core/services/contracts.service';
import { InvoiceService } from 'src/app/core/services/invoice.service';
import { ResponseInvoiceAppointmentListItemModel } from '../../models/response/response-get-invoice-appointments.model';
import { RequestGetAppointmentsForInvoiceModel } from '../../models';
import { selectIsLoading } from 'src/app/app-store/app-state/app-state.selectors';
export interface ChooseWorkModalModel {
  appointmentIdsToExclude: string[];
}

@Component({
  selector: 'app-choose-work-modal',
  templateUrl: './choose-work-modal.component.html',
  styleUrls: ['./choose-work-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChooseWorkModalComponent implements OnInit, OnDestroy {
  readonly #modal = inject(NzModalRef);
  readonly nzModalData: ChooseWorkModalModel = inject(NZ_MODAL_DATA);
  private subscriptions$: Subscription = new Subscription();
  appointmentsData: ResponseInvoiceAppointmentListItemModel[] = [];
  totalCount: number = 0;
  isLoading$?: Observable<boolean>;

  checked: boolean = false;
  indeterminateCheckbox: boolean = false;
  selectedAppointments: ResponseInvoiceAppointmentListItemModel[] = [];

  private searchParams: RequestGetAppointmentsForInvoiceModel = {
    pageIndex: 0,
    pageSize: CommonConstants.PAGE_SIZE_OPTIONS[0],
    appointmentIdsToExclude: this.nzModalData.appointmentIdsToExclude,
  };

  constructor(
    private store$: Store,
    private readonly invoiceService: InvoiceService,
    private changeDetection: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.searchAppointments();

    this.isLoading$ = this.store$.select(selectIsLoading);
  }

  onItemCheckedChange(clinician: any, checked: boolean): void {
    this.updateCheckedSet(clinician, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(checked: boolean): void {
    this.appointmentsData.forEach((clinician) =>
      this.updateCheckedSet(clinician, checked)
    );
    this.refreshCheckedStatus();
  }

  updateCheckedSet(
    item: ResponseInvoiceAppointmentListItemModel,
    checked: boolean
  ): void {
    const hasItem = this.hasAppointment(item);

    if (!hasItem && checked) {
      this.selectedAppointments.push(item);
    }

    if (hasItem && !checked) {
      const currentItemIndex = this.selectedAppointments.findIndex(
        (clinician) => clinician.id === item.id
      );

      this.selectedAppointments.splice(currentItemIndex, 1);
    }
  }

  hasAppointment(appointment: ResponseInvoiceAppointmentListItemModel): boolean {
    return !!this.selectedAppointments.find((item) => item.id === appointment.id);
  }

  refreshCheckedStatus(): void {
    this.checked = this.appointmentsData.every((item) => this.hasAppointment(item));
    this.indeterminateCheckbox =
      this.appointmentsData.some((clinician) => this.hasAppointment(clinician)) &&
      !this.checked;
  }

  handleSearchByText(searchText?: string): void {
    this.searchParams = { ...this.searchParams, searchText, pageIndex: 0 };
    this.searchAppointments();
  }

  changeActiveFilter(selectedIndex: number): void {
    if (!this.searchParams) return;

    this.searchParams = {
      ...this.searchParams,
      pageIndex: 0,
    };

    this.searchAppointments();
  }

  onQueryParamsChange(event: NzTableQueryParams): void {
    this.searchParams = {
      ...this.searchParams,
      pageSize: event.pageSize,
      pageIndex: event.pageIndex - 1,
    };

    this.searchAppointments();
  }

  handleCancel(): void {
    this.#modal.close();
  }

  addAppointments(): void {
    this.#modal.close(this.selectedAppointments);
  }

  private searchAppointments(): void {
    this.invoiceService.getAppointmentsForInvoice(this.searchParams).subscribe({
      next: (val) => {
        this.appointmentsData = val.appointments;
        this.totalCount = val.totalCount;
        this.changeDetection.detectChanges();
      },
      error: (error) => {
        this.store$.dispatch(errorAction({ payload: { error, isApiError: true } }));
      },
    });
  }

  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }
}
