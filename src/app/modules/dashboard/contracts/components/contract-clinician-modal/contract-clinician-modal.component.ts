import { ChangeDetectorRef, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { Observable, Subscription } from 'rxjs';
import { errorAction } from 'src/app/app-store/app-state/app-state.actions';
import { CommonConstants } from 'src/app/core/constants';
import { ContractsService } from 'src/app/core/services/contracts.service';
import { IsActiveFilterEnum } from 'src/app/shared/enums';
import { SelectOptionModel } from 'src/app/shared/models';
import {
  RequestGetContractCliniciansOptionsModel,
  ResponseContractClinicianItemModel,
} from '../../models';
import { NzTableQueryParams } from 'ng-zorro-antd/table';

export interface ContractClinicianModalModel {
  clinicianIds: string[];
  productIds: string[];
}

@Component({
  selector: 'app-contract-clinician-modal',
  templateUrl: './contract-clinician-modal.component.html',
  styleUrls: ['./contract-clinician-modal.component.scss'],
})
export class ContractClinicianModalComponent implements OnInit, OnDestroy {

  readonly #modal = inject(NzModalRef);
  readonly nzModalData: ContractClinicianModalModel = inject(NZ_MODAL_DATA);

  private searchParams: RequestGetContractCliniciansOptionsModel = {
    pageIndex: 0,
    pageSize: CommonConstants.PAGE_SIZE_OPTIONS[0],
    productIds: this.nzModalData.productIds,
    clinicianIds: this.nzModalData.clinicianIds,
  };

  private subscription: Subscription = new Subscription();

  cliniciansData: ResponseContractClinicianItemModel[] = [];
  totalCount: number = 0;
  isLoading$?: Observable<boolean>;

  checked: boolean = false;
  indeterminateCheckbox: boolean = false;
  selectedClinicians: ResponseContractClinicianItemModel[] = [];

  constructor(
    private store$: Store,
    private readonly contractsService: ContractsService,
    private changeDetection: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.searchClinicians();
  }

  onItemCheckedChange(
    clinician: ResponseContractClinicianItemModel,
    checked: boolean
  ): void {
    this.updateCheckedSet(clinician, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(checked: boolean): void {
    this.cliniciansData.forEach((clinician) => this.updateCheckedSet(clinician, checked));
    this.refreshCheckedStatus();
  }

  updateCheckedSet(item: ResponseContractClinicianItemModel, checked: boolean): void {
    const hasItem = this.hasClinician(item);

    if (!hasItem && checked) {
      this.selectedClinicians.push(item);
    }

    if (hasItem && !checked) {
      const currentItemIndex = this.selectedClinicians.findIndex(
        (clinician) => clinician.clinicianId === item.clinicianId
      );

      this.selectedClinicians.splice(currentItemIndex, 1);
    }
  }

  hasClinician(clinician: ResponseContractClinicianItemModel): boolean {
    return !!this.selectedClinicians.find(
      (item) => item.clinicianId === clinician.clinicianId
    );
  }

  refreshCheckedStatus(): void {
    this.checked = this.cliniciansData.every((item) => this.hasClinician(item));
    this.indeterminateCheckbox =
      this.cliniciansData.some((clinician) => this.hasClinician(clinician)) &&
      !this.checked;
  }

  handleSearchByText(searchText?: string): void {
    this.searchParams = { ...this.searchParams, searchText, pageIndex: 0 };
    this.searchClinicians();
  }

  changeActiveFilter(selectedIndex: number): void {
    if (!this.searchParams) return;

    this.searchParams = {
      ...this.searchParams,
      pageIndex: 0,
    };

    this.searchClinicians();
  }

  onQueryParamsChange(event: NzTableQueryParams): void {
    this.searchParams = {
      ...this.searchParams,
      pageSize: event.pageSize,
      pageIndex: event.pageIndex - 1,
    };

    this.searchClinicians();
  }

  handleCancel(): void {
    this.#modal.close();
  }

  addClinicians(): void {
    this.#modal.close(this.selectedClinicians);
  }

  private searchClinicians(): void {
    this.contractsService.getContractCliniciansOptions(this.searchParams).subscribe({
      next: (val) => {
        this.cliniciansData = val.contractClinicians;

        this.changeDetection.detectChanges();
      },
      error: (error) => {
        this.store$.dispatch(errorAction({ payload: { error, isApiError: true } }));
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
