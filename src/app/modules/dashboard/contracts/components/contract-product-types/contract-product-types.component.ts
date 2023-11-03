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
  RequestGetContractProductsOptionsByContractIdModel,
  RequestUpdateContractModel,
  RequestUpdateContractProductModel,
  ResponseContractProductItemModel,
  ResponseGetContractByIdModel,
} from '../../models';
import * as contractActions from '../../store/contracts.actions';
import * as contractSelectors from '../../store/contracts.selectors';
import {
  ProductTypesModalComponent,
  ProductTypesModalModel,
} from '../product-types-modal/product-types-modal.component';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { clone } from 'lodash';

@Component({
  selector: 'app-contract-product-types',
  templateUrl: './contract-product-types.component.html',
  styleUrls: ['./contract-product-types.component.scss'],
})
export class ContractProductTypesComponent implements OnInit, OnDestroy {
  @Input() contractId?: string;
  @Output() handleNextTab = new EventEmitter();
  @Output() handlePrevTab = new EventEmitter();

  private subscriptions$: Subscription = new Subscription();
  private searchParams: RequestGetContractProductsOptionsByContractIdModel = {
    pageIndex: 0,
    pageSize: CommonConstants.PAGE_SIZE_OPTIONS[0],
  };

  readonly pageSizeOptions: number[] = CommonConstants.PAGE_SIZE_OPTIONS;
  readonly activeFilterOptions: SelectOptionModel<IsActiveFilterEnum>[] =
    CommonConstants.activeFilterOptions;

  productsData: ResponseContractProductItemModel[] = [];
  contractDetails?: RequestUpdateContractModel;
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

  parserPoundSterling = (value: number): string => `£ ${value}`;

  private initializingSelectors(): void {
    this.isLoading$ = this.store$.select(selectIsLoading);

    this.subscriptions$.add(
      this.store$
        .select(contractSelectors.selectContractProductsList)
        .pipe(filter((val) => val !== undefined))
        .subscribe((res) => {
          this.productsData = clone(res!);
          this.changeDetection.detectChanges();
        })
    );

    this.subscriptions$.add(
      this.store$
        .select(contractSelectors.selectContractTemporaryDetails)
        .pipe(filter((val) => !!val))
        .subscribe((res) => {
          this.contractDetails = res!;
          this.changeDetection.detectChanges();
        })
    );

    this.subscriptions$.add(
      this.store$
        .select(contractSelectors.selectNotificationMessage)
        .pipe(filter((val) => !!val))
        .subscribe((res) => {
          this.nzNotificationService.warning('Please pay attention', res!);
          this.store$.dispatch(contractActions.clearNotificationAction());
          this.changeDetection.detectChanges();
        })
    );
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

  changeItemPrice(productId: string, value: number): void {
    const currentItemIndex = this.productsData.findIndex(
      (item) => item.productId === productId
    );
    this.productsData[currentItemIndex] = {
      ...this.productsData[currentItemIndex],
      price: value,
    };
  }

  private searchProducts(): void {
    if (!this.searchParams.contractId) return;
    this.store$.dispatch(
      contractActions.getContractProductsAction({ payload: this.searchParams })
    );
  }

  private saveProducts(): void {
    const products: ResponseContractProductItemModel[] = this.productsData;
    this.store$.dispatch(contractActions.addProductsItemsAction({ payload: products }));
  }

  handlePrev(): void {
    this.saveProducts();
    this.handlePrevTab.emit();
  }

  handleNext(): void {
    if (!this.productsData.length) {
      this.nzNotificationService.warning(
        'Please add product',
        'In order to create a contract you need at least 1 product'
      );
      return;
    }

    this.saveProducts();
    this.handleNextTab.emit();
  }

  handleAddNew(): void {
    const productIds = this.productsData.map((item) => item.productId);

    const modal = this.modal.create<ProductTypesModalComponent, ProductTypesModalModel>({
      nzTitle: 'Product types',
      nzWidth: '900px',
      nzMaskClosable: false,
      nzData: {
        productIds: productIds,
      },
      nzContent: ProductTypesModalComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzFooter: null,
    });

    modal.afterClose.subscribe((res) => {
      if (!res?.length) return;

      this.productsData = [...this.productsData, ...res];
      this.saveProducts();
    });
  }

  removeProduct(id: string): void {
    // const productIndexToRemove = this.productsData.findIndex(
    //   (item) => item.productId === id
    // )!;
    // this.productsData.splice(productIndexToRemove, 1);
    this.store$.dispatch(
      contractActions.deleteProductItemAction({ payload: { productId: id } })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
    this.store$.dispatch(contractActions.clearProductTypesAction());
  }
}
