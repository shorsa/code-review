import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewContainerRef,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { clone } from 'lodash';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable, Subscription, filter } from 'rxjs';
import { errorAction } from 'src/app/app-store/app-state/app-state.actions';
import { selectIsLoading } from 'src/app/app-store/app-state/app-state.selectors';
import { CommonConstants, RoutesConstants } from 'src/app/core/constants';
import { ClientService } from 'src/app/core/services/client.service';
import { ContractsService } from 'src/app/core/services/contracts.service';
import { markAsDirtyForm } from 'src/app/shared/helpers';
import {
  RequestGetClientOptionsModel,
  ResponseGetClientOptionsModelItem,
} from '../../../client/models';
import {
  RequestGetContractOptionsModel,
  ResponseContractOptionItemModel,
} from '../../../contracts/models';
import {
  RequestCreateInvoiceModel,
  RequestUpdateInvoiceModel,
  ResponseGetInvoiceByIdModel,
} from '../../models';
import { ResponseInvoiceAppointmentListItemModel } from '../../models/response/response-get-invoice-appointments.model';
import * as invoicingActions from '../../store/invoicing.actions';
import * as invoicingSelectors from '../../store/invoicing.selectors';
import {
  ChooseWorkModalComponent,
  ChooseWorkModalModel,
} from '../choose-work-modal/choose-work-modal.component';

@Component({
  selector: 'app-invoicing-management',
  templateUrl: './invoicing-management.component.html',
  styleUrls: ['./invoicing-management.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoicingManagementComponent implements OnInit {
  private subscriptions$: Subscription = new Subscription();
  private invoiceId?: string;

  wasAttemptToSubmitForm: boolean = false;
  formGroup!: FormGroup;
  invoiceDetails?: ResponseGetInvoiceByIdModel;
  isLoading$?: Observable<boolean>;
  clientListOptions: ResponseGetClientOptionsModelItem[] = [];
  contractListOptions: ResponseContractOptionItemModel[] = [];
  appointmentsData: ResponseInvoiceAppointmentListItemModel[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private store$: Store,
    private readonly clientService: ClientService,
    private readonly contractsService: ContractsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private modal: NzModalService,
    private changeDetection: ChangeDetectorRef,
    private nzNotificationService: NzNotificationService,
    private viewContainerRef: ViewContainerRef
  ) {
    this.buildForm();
  }

  ngOnInit() {
    this.initializingSelectors();

    this.activatedRoute.queryParams.pipe(filter((val) => !!val)).subscribe((params) => {
      this.invoiceId = params[CommonConstants.QUERY_ID];

      if (this.invoiceId) {
        this.getInvoiceById();
      }
    });
  }

  navigateToInvoiceList(): void {
    this.router.navigate([
      RoutesConstants.DASHBOARD_INDEX,
      RoutesConstants.DASHBOARD_INVOICING,
    ]);
  }

  handleSearchClient(value?: string): void {
    const model: RequestGetClientOptionsModel = {
      searchText: value,
      pageIndex: 0,
      pageSize: CommonConstants.PAGE_SIZE_OPTIONS[2],
    };
    this.clientService.getClientOptions(model).subscribe({
      next: (value) => {
        this.clientListOptions = value.clients;
        this.changeDetection.detectChanges();
      },
      error: (error) => {
        this.store$.dispatch(errorAction({ payload: { error, isApiError: true } }));
      },
    });
  }

  handleSearchContracts(value?: string): void {
    const clientId = this.formGroup.get('clientId')?.value;
    const model: RequestGetContractOptionsModel = {
      clientId: clientId,
    };
    this.contractsService.getContractOptions(model).subscribe({
      next: (value) => {
        this.contractListOptions = value.contracts;
        this.changeDetection.detectChanges();
      },
      error: (error) => {
        this.store$.dispatch(errorAction({ payload: { error, isApiError: true } }));
      },
    });
  }

  parserPoundSterling(value: number): string {
    return `£ ${value}`;
  }

  deleteAppointment(id: string): void {
    const appointments = clone(this.appointmentsData);
    const itemIndex = appointments.findIndex((item) => item.id === id);
    appointments.splice(itemIndex, 1);
    this.appointmentsData = appointments;
    this.calculateTotalPrice();
  }

  handleAddWork(): void {
    const appointmentIds = this.appointmentsData?.map((item) => item.id);

    const modal = this.modal.create<ChooseWorkModalComponent, ChooseWorkModalModel>({
      nzTitle: 'Clinicians',
      nzWidth: '1000px',
      nzMaskClosable: false,
      nzData: {
        appointmentIdsToExclude: appointmentIds ?? [],
      },
      nzContent: ChooseWorkModalComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzFooter: null,
    });

    modal.afterClose.subscribe((res) => {
      if (!res) return;
      this.appointmentsData = [...this.appointmentsData!, ...res];
      this.calculateTotalPrice();
    });
  }

  onSubmit(): void {
    if (!this.appointmentsData.length) {
      this.nzNotificationService.warning(
        'Please add clinician',
        'In order to create a contract you need at least 1 clinician'
      );
      return;
    }

    this.wasAttemptToSubmitForm = true;
    markAsDirtyForm(this.formGroup);

    if (this.formGroup.invalid) return;

    if (this.invoiceId) {
      this.updateInvoice();
    } else {
      this.createInvoice();
    }
  }

  updateInvoice(): void {
    const appointmentIds = this.appointmentsData.map((item) => item.id);

    const model: RequestUpdateInvoiceModel = {
      id: this.invoiceId!,
      contractId: this.formGroup.get('contractId')!.value,
      appointmentIds,
    };

    this.store$.dispatch(invoicingActions.invoicingUpdateAction({ payload: model }));
  }

  createInvoice(): void {
    const appointmentIds = this.appointmentsData.map((item) => item.id);

    const model: RequestCreateInvoiceModel = {
      contractId: this.formGroup.get('contractId')!.value,
      appointmentIds,
    };

    this.store$.dispatch(invoicingActions.invoicingCreateAction({ payload: model }));
  }

  private getInvoiceById(): void {
    this.store$.dispatch(
      invoicingActions.invoicingGetByIdAction({ payload: { id: this.invoiceId! } })
    );
  }

  private calculateTotalPrice(): void {
    const totalSum = this.appointmentsData.reduce((sum, appointment) => {
      return sum + (appointment.price || 0);
    }, 0);

    this.formGroup.get('totalAmount')?.setValue(totalSum);
    this.changeDetection.detectChanges();
  }

  private buildForm(): void {
    this.formGroup = this.formBuilder.group({
      clientId: [null, [Validators.required]],
      contractId: [{ value: null, disabled: true }, [Validators.required]],
      totalAmount: [{ value: 0, disabled: true }, , [Validators.required]],
    });
    this.subscriptionsFormChanges();
  }

  private subscriptionsFormChanges(): void {
    this.subscriptions$.add(
      this.formGroup.get('clientId')?.valueChanges.subscribe((clientId) => {
        if (clientId) {
          this.formGroup.get('contractId')!.enable();
          this.handleSearchContracts();
        }
      })
    );
  }

  private initializingSelectors(): void {
    this.isLoading$ = this.store$.select(selectIsLoading);

    this.subscriptions$.add(
      this.store$
        .select(invoicingSelectors.selectInvoicingDetails)
        .pipe(filter((val) => val !== undefined))
        .subscribe((res) => {
          if (!res) return;
          this.invoiceDetails = res;

          this.appointmentsData = res.appointments;
          this.calculateTotalPrice();
          this.formGroup.get('clientId')?.setValue(res.clientId);
          this.formGroup.get('contractId')?.setValue(res.contractId);
          this.handleSearchClient();
        })
    );
  }
}
