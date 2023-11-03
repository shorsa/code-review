import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription, filter } from 'rxjs';
import { errorAction } from 'src/app/app-store/app-state/app-state.actions';
import { selectIsLoading } from 'src/app/app-store/app-state/app-state.selectors';
import { CommonConstants, RoutesConstants } from 'src/app/core/constants';
import { ClientService } from 'src/app/core/services/client.service';
import { InvoiceTypeEnum } from 'src/app/shared/enums';
import { markAsDirtyForm } from 'src/app/shared/helpers';
import { SelectOptionModel } from 'src/app/shared/models';
import {
  RequestGetClientOptionsModel,
  ResponseGetClientOptionsModelItem,
} from '../../../client/models';
import { RequestCreateContractModel, RequestUpdateContractModel } from '../../models';
import * as contractsActions from '../../store/contracts.actions';
import * as contractsSelectors from '../../store/contracts.selectors';

@Component({
  selector: 'app-contracts-general-info',
  templateUrl: './contracts-general-info.component.html',
  styleUrls: ['./contracts-general-info.component.scss'],
})
export class ContractsGeneralInfoComponent implements OnInit, OnDestroy {
  @Input() contractId?: string;
  @Output() handleNextTab = new EventEmitter();

  readonly invoiceTypes: SelectOptionModel<InvoiceTypeEnum>[] = [
    {
      value: InvoiceTypeEnum.Weekly,
      label: 'Weekly closed cases',
    },
    {
      value: InvoiceTypeEnum.Monthly,
      label: 'End of Month',
    },
  ];
  private subscriptions$: Subscription = new Subscription();

  isLoading$?: Observable<boolean>;
  clientListOptions: ResponseGetClientOptionsModelItem[] = [];
  formGroup!: FormGroup;
  wasAttemptToSubmitForm?: boolean;
  contractDetails?: RequestUpdateContractModel;

  constructor(
    private formBuilder: FormBuilder,
    private changeDetection: ChangeDetectorRef,
    private store$: Store,
    private router: Router,
    private readonly clientService: ClientService
  ) {
    this.buildForm();
  }

  ngOnInit() {
    if (this.contractId) {
      this.getContractDetails();
    }

    this.initializingSelectors();
  }

  navigateToContractsTable(): void {
    this.router.navigate([
      RoutesConstants.DASHBOARD_INDEX,
      RoutesConstants.DASHBOARD_CONTRACTS,
    ]);
  }

  onSearchClient(value: string): void {
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

  handleNext(): void {
    this.wasAttemptToSubmitForm = true;
    markAsDirtyForm(this.formGroup);

    if (this.formGroup.invalid) return;

    this.saveContract();
  }

  private saveContract(): void {
    const model: RequestCreateContractModel = {
      clientId: this.formGroup.value.clientId,
      clientAddress: this.formGroup.value.clientAddress,
      paymentTimeFrame: this.formGroup.value.paymentTimeFrame,
      invoiceType: this.formGroup.value.invoiceType,
    };

    this.store$.dispatch(
      contractsActions.saveContractDataToStoreAction({ payload: model })
    );

    this.handleNextTab.emit();
  }

  private buildForm(): void {
    this.formGroup = this.formBuilder.group({
      customId: [null],
      clientId: [null, [Validators.required]],
      clientCode: [null],
      clientAddress: [null, [Validators.required]],
      paymentTimeFrame: [null, [Validators.required]],
      invoiceType: [InvoiceTypeEnum.Weekly, [Validators.required]],
    });

    this.subscriptionsOnChangesForm();
  }

  private subscriptionsOnChangesForm(): void {
    this.subscriptions$.add(
      this.formGroup.get('clientId')?.valueChanges.subscribe((clientId) => {
        if (clientId) {
          const client = this.clientListOptions.find((client) => client.id === clientId);
          if (client) {
            this.formGroup.get('clientCode')?.setValue(client.code);
            this.formGroup.get('invoiceType')?.setValue(client.invoiceType);
          }
        }
      })
    );
  }

  private getContractDetails(): void {
    this.store$.dispatch(
      contractsActions.getContractByIdAction({ payload: { id: this.contractId! } })
    );
  }

  private initializingSelectors(): void {
    this.isLoading$ = this.store$.select(selectIsLoading);

    this.subscriptions$.add(
      this.store$
        .select(contractsSelectors.selectContractTemporaryDetails)
        .pipe(filter((val) => !!val))
        .subscribe((res) => {
          this.contractDetails = res!;
          this.pathFormValue(res!);

          if (res?.client) {
            this.formGroup.get('clientCode')?.setValue(res.client.code);
            this.formGroup.get('customId')?.setValue(res.customId);
          }

          if (res?.client && res.clientId !== this.contractDetails.clientId) {
            this.onSearchClient(res.client.fullName);
          } else if (!this.clientListOptions.length) {
            this.onSearchClient('');
          }
        })
    );
  }

  private pathFormValue(data: RequestUpdateContractModel): void {
    this.formGroup.patchValue(data);
    this.changeDetection.detectChanges();
  }

  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }
}
