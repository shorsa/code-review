import { ChangeDetectorRef, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { Observable, Subscription } from 'rxjs';
import { errorAction } from 'src/app/app-store/app-state/app-state.actions';
import { CommonConstants } from 'src/app/core/constants';
import { ClinicianService } from 'src/app/core/services/clinician.service';
import {
  RequestGetClinicianProductsOptionsByClinicianIdModel,
  RequestGetClinicianProductsOptionsModel,
  ResponseClinicianProductItemModel,
} from '../../models';
import * as clinicianActions from '../../store/clinician.actions';

export interface ClinicianAddProductModalModel {
  productIds: string[];
  clinicianId: string;
  searchParams: RequestGetClinicianProductsOptionsByClinicianIdModel;
}

@Component({
  selector: 'app-clinician-add-product-modal',
  templateUrl: './clinician-add-product-modal.component.html',
  styleUrls: ['./clinician-add-product-modal.component.scss'],
})
export class ClinicianAddProductModalComponent implements OnInit, OnDestroy {
  readonly #modal = inject(NzModalRef);
  readonly nzModalData: ClinicianAddProductModalModel = inject(NZ_MODAL_DATA);

  private searchParams: RequestGetClinicianProductsOptionsModel = {
    pageIndex: 0,
    pageSize: CommonConstants.PAGE_SIZE_OPTIONS[0],
    productIds: this.nzModalData.productIds,
  };

  private subscription: Subscription = new Subscription();

  productsData: ResponseClinicianProductItemModel[] = [];
  totalCount: number = 0;
  isLoading$?: Observable<boolean>;

  checked: boolean = false;
  indeterminateCheckbox: boolean = false;
  selectedProducts: ResponseClinicianProductItemModel[] = [];

  constructor(
    private store$: Store,
    private readonly clinicianService: ClinicianService,
    private changeDetection: ChangeDetectorRef
  ) {}

  ngOnInit() {}

  onItemCheckedChange(
    product: ResponseClinicianProductItemModel,
    checked: boolean
  ): void {
    this.updateCheckedSet(product, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(checked: boolean): void {
    this.productsData.forEach((product) => this.updateCheckedSet(product, checked));
    this.refreshCheckedStatus();
  }

  updateCheckedSet(item: ResponseClinicianProductItemModel, checked: boolean): void {
    const hasItem = this.hasProduct(item);

    if (!hasItem && checked) {
      this.selectedProducts.push(item);
    }

    if (hasItem && !checked) {
      const currentItemIndex = this.selectedProducts.findIndex(
        (product) => product.productId === item.productId
      );

      this.selectedProducts.splice(currentItemIndex, 1);
    }
  }

  hasProduct(product: ResponseClinicianProductItemModel): boolean {
    return !!this.selectedProducts.find((item) => item.productId === product.productId);
  }

  refreshCheckedStatus(): void {
    this.checked = this.productsData.every((item) => this.hasProduct(item));
    this.indeterminateCheckbox =
      this.productsData.some((product) => this.hasProduct(product)) && !this.checked;
  }

  handleSearchByText(searchText?: string): void {
    this.searchParams = { ...this.searchParams, searchText, pageIndex: 0 };
    this.searchProducts();
  }

  changeActiveFilter(selectedIndex: number): void {
    if (!this.searchParams) return;

    this.searchParams = {
      ...this.searchParams,
      pageIndex: 0,
    };

    this.searchProducts();
  }

  onQueryParamsChange(event: NzTableQueryParams): void {
    this.searchParams = {
      ...this.searchParams,
      pageSize: event.pageSize,
      pageIndex: event.pageIndex - 1,
    };

    this.searchProducts();
  }

  handleCancel(): void {
    this.#modal.close();
  }

  addProducts(): void {
    const productIds = this.selectedProducts.map((item) => item.productId);
    this.store$.dispatch(
      clinicianActions.clinicianAddProductsAction({
        payload: { clinicianId: this.nzModalData.clinicianId, productIds },
        searchParams: this.nzModalData.searchParams,
      })
    );
  }

  private searchProducts(): void {
    this.clinicianService.getClinicianProductsOptions(this.searchParams).subscribe({
      next: (val) => {
        this.productsData = val.clinicianProducts;
        this.totalCount = val.totalCount;

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
