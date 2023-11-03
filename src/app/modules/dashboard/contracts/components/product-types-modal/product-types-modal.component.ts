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
  RequestGetContractProductsOptionsModel,
  ResponseContractProductItemModel,
} from '../../models';
import { NzTableQueryParams } from 'ng-zorro-antd/table';

export interface ProductTypesModalModel {
  productIds: string[];
}

@Component({
  selector: 'app-product-types-modal',
  templateUrl: './product-types-modal.component.html',
  styleUrls: ['./product-types-modal.component.scss'],
})
export class ProductTypesModalComponent implements OnInit, OnDestroy {
  readonly #modal = inject(NzModalRef);
  readonly nzModalData: ProductTypesModalModel = inject(NZ_MODAL_DATA);

  private searchParams: RequestGetContractProductsOptionsModel = {
    pageIndex: 0,
    pageSize: CommonConstants.PAGE_SIZE_OPTIONS[0],
    productIds: this.nzModalData.productIds,
  };

  private subscription: Subscription = new Subscription();

  productsData: ResponseContractProductItemModel[] = [];
  totalCount: number = 0;
  isLoading$?: Observable<boolean>;

  checked: boolean = false;
  indeterminateCheckbox: boolean = false;
  selectedProducts: ResponseContractProductItemModel[] = [];

  constructor(
    private store$: Store,
    private readonly contractsService: ContractsService,
    private changeDetection: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.searchProducts();
  }

  onItemCheckedChange(product: ResponseContractProductItemModel, checked: boolean): void {
    this.updateCheckedSet(product, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(checked: boolean): void {
    this.productsData.forEach((product) => this.updateCheckedSet(product, checked));
    this.refreshCheckedStatus();
  }

  updateCheckedSet(item: ResponseContractProductItemModel, checked: boolean): void {
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

  hasProduct(product: ResponseContractProductItemModel): boolean {
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
    this.#modal.close(this.selectedProducts);
  }

  private searchProducts(): void {
    this.contractsService.getContractProductsOptions(this.searchParams).subscribe({
      next: (val) => {
        this.productsData = val.contractProducts;

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
