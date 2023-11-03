import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewContainerRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { Observable, Subscription, filter } from 'rxjs';
import { selectIsLoading } from 'src/app/app-store/app-state/app-state.selectors';
import { CommonConstants } from 'src/app/core/constants';
import { IsActiveFilterEnum } from 'src/app/shared/enums';
import { SelectOptionModel } from 'src/app/shared/models';
import {
  RequestCreateContractModel,
  RequestGetContractCliniciansOptionsByContractIdModel,
  RequestUpdateContractModel,
  ResponseContractClinicianItemModel,
  ResponseGetContractByIdModel,
} from '../../models';
import * as contractActions from '../../store/contracts.actions';
import * as contractSelectors from '../../store/contracts.selectors';
import {
  ContractClinicianModalComponent,
  ContractClinicianModalModel,
} from '../contract-clinician-modal/contract-clinician-modal.component';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ContractTemporaryDataStoreModel } from '../../store';
import { clone } from 'lodash';

@Component({
  selector: 'app-contract-clinicians',
  templateUrl: './contract-clinicians.component.html',
  styleUrls: ['./contract-clinicians.component.scss'],
})
export class ContractClinicianComponent implements OnInit, OnDestroy {
  @Input() contractId?: string;

  @Output() handleNextTab = new EventEmitter();
  @Output() handlePrevTab = new EventEmitter();

  private subscriptions$: Subscription = new Subscription();
  private searchParams: RequestGetContractCliniciansOptionsByContractIdModel = {
    pageIndex: 0,
    pageSize: CommonConstants.PAGE_SIZE_OPTIONS[0],
    productIds: [],
  };

  readonly pageSizeOptions: number[] = CommonConstants.PAGE_SIZE_OPTIONS;
  readonly activeFilterOptions: SelectOptionModel<IsActiveFilterEnum>[] =
    CommonConstants.activeFilterOptions;

  cliniciansDataList: ResponseContractClinicianItemModel[] = [];
  contractTemporaryDetails?: ContractTemporaryDataStoreModel;
  temporary?: ResponseGetContractByIdModel;
  isLoading$?: Observable<boolean>;

  constructor(
    private store$: Store,
    private changeDetection: ChangeDetectorRef,
    private router: Router,
    private nzNotificationService: NzNotificationService,
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef
  ) {}

  ngOnInit(): void {
    this.initializingSelectors();
    this.searchParams.contractId = this.contractId;
    this.searchClinicians();
  }

  private initializingSelectors(): void {
    this.isLoading$ = this.store$.select(selectIsLoading);

    this.subscriptions$.add(
      this.store$
        .select(contractSelectors.selectContractClinicianList)
        .pipe(filter((val) => val !== undefined))
        .subscribe((res) => {
          this.cliniciansDataList = clone(res!);
          this.changeDetection.detectChanges();
        })
    );

    this.subscriptions$.add(
      this.store$
        .select(contractSelectors.selectContractProductsList)
        .pipe(filter((val) => !!val))
        .subscribe((res) => {
          if (res?.length) {
            this.searchParams = {
              ...this.searchParams,
              productIds: res?.map((item) => item.productId),
            };
          }
          // this.searchClinicians();
          this.changeDetection.detectChanges();
        })
    );

    this.subscriptions$.add(
      this.store$
        .select(contractSelectors.selectContractTemporaryDetails)!
        .subscribe((res) => {
          this.contractTemporaryDetails = res;
        })
    );
  }

  handleSearchByText(searchText?: string): void {
    this.searchParams = { ...this.searchParams, searchText, pageIndex: 0 };
    // this.searchClinicians();
  }

  private searchClinicians(): void {
    if (!this.searchParams.contractId) return;

    this.store$.dispatch(
      contractActions.getContractCliniciansAction({ payload: this.searchParams })
    );
  }

  private saveClinicians(): void {
    const clinicians = this.cliniciansDataList;

    this.store$.dispatch(
      contractActions.addCliniciansItemsAction({ payload: { clinicians } })
    );
  }

  handlePrev(): void {
    this.saveClinicians();
    this.handlePrevTab.emit();
  }

  onSubmit(): void {
    if (!this.cliniciansDataList.length) {
      this.nzNotificationService.warning(
        'Please add clinician',
        'In order to create a contract you need at least 1 clinician'
      );
      return;
    }

    if (this.contractId) {
      this.updateContract();
    } else {
      this.createContract();
    }
  }

  private updateContract(): void {
    const clinicianIds = this.cliniciansDataList.map((item) => item.clinicianId);
    const { paymentTimeFrame, clientId, clientAddress, invoiceType } =
      this.contractTemporaryDetails!;
    const model: RequestUpdateContractModel = {
      clientId,
      clientAddress,
      invoiceType,
      paymentTimeFrame,
      clinicianIds,
      products: this.contractTemporaryDetails?.contractProducts,
      id: this.contractId,
    };

    this.store$.dispatch(contractActions.updateContractAction({ payload: model }));
  }

  private createContract(): void {
    const clinicianIds = this.cliniciansDataList.map((item) => item.clinicianId);
    const { paymentTimeFrame, clientId, clientAddress, invoiceType } =
      this.contractTemporaryDetails!;

    const model: RequestCreateContractModel = {
      clientId,
      clientAddress,
      invoiceType,
      paymentTimeFrame,
      clinicianIds,
      products: this.contractTemporaryDetails?.contractProducts,
    };

    this.store$.dispatch(contractActions.createContractAction({ payload: model }));
  }

  handleAddNew(): void {
    const clinicianIds = this.cliniciansDataList.map((item) => item.clinicianId);

    const modal = this.modal.create<
      ContractClinicianModalComponent,
      ContractClinicianModalModel
    >({
      nzTitle: 'Clinicians',
      nzWidth: '900px',
      nzMaskClosable: false,
      nzData: {
        clinicianIds: clinicianIds,
        productIds: this.searchParams.productIds,
      },
      nzContent: ContractClinicianModalComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzFooter: null,
    });

    modal.afterClose.subscribe((res) => {
      if (!res?.length) return;
      this.cliniciansDataList = [...this.cliniciansDataList, ...res];
      this.saveClinicians();
    });
  }

  removeClinician(id: string): void {
    const clinicianIndexToRemove = this.cliniciansDataList.findIndex(
      (item) => item.clinicianId === id
    )!;
    this.cliniciansDataList.splice(clinicianIndexToRemove, 1);
    this.store$.dispatch(
      contractActions.deleteClinicianItemAction({
        payload: { clinicianId: id },
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
    this.store$.dispatch(contractActions.clearContractCliniciansAction());
  }
}
