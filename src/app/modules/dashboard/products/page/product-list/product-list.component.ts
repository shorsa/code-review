import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewContainerRef,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { clone } from 'lodash';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { Observable, Subscription, filter } from 'rxjs';
import { selectIsLoading } from 'src/app/app-store/app-state/app-state.selectors';
import { CommonConstants, RoutesConstants } from 'src/app/core/constants';
import { IsActiveFilterEnum } from 'src/app/shared/enums';
import { SearchHelper } from 'src/app/shared/helpers';
import { ProductModel, SelectOptionModel } from 'src/app/shared/models';
import { ProductOrderByOptionsEnum } from '../../enums';
import { RequestGetProductListModel } from '../../models';
import * as productActions from '../../store/products.actions';
import * as productSelectors from '../../store/products.selectors';
import { ProductCreateModalComponent } from '../../components/product-create-modal/product-create-modal.component';
import { Router } from '@angular/router';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent implements OnInit, OnDestroy {
  readonly pageSizeOptions: number[] = CommonConstants.PAGE_SIZE_OPTIONS;
  private _searchParams!: RequestGetProductListModel;
  private subscription: Subscription = new Subscription();
  readonly activeFilterOptions: SelectOptionModel<IsActiveFilterEnum>[] =
    CommonConstants.activeFilterOptions;

  productsData: ProductModel[] = [];
  totalCount: number = 0;
  isLoading$?: Observable<boolean>;

  constructor(
    private store$: Store,
    private changeDetection: ChangeDetectorRef,
    private router: Router,
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef
  ) {}

  ngOnInit(): void {
    this.initializingSelectors();
  }

  set searchParams(value: RequestGetProductListModel) {
    this._searchParams = { ...clone(value) };
  }

  get searchParams(): RequestGetProductListModel {
    return this._searchParams;
  }

  getIsInvalidDefaultProduct(data: ProductModel): boolean {
    if (!data.isDefaultProduct) return false;
    return !data.defaultPrice || !data.referralType;
  }

  onQueryParamsChange(event: NzTableQueryParams): void {
    const sortColumn = event.sort.find((item) => item.value !== null);

    this.searchParams = {
      ...this.searchParams,
      pageSize: event.pageSize,
      pageIndex: event.pageIndex - 1,
    };

    type ColumnSort = keyof typeof ProductOrderByOptionsEnum;

    if (sortColumn) {
      const sortColumnName: ProductOrderByOptionsEnum =
        ProductOrderByOptionsEnum[sortColumn.key as ColumnSort];
      const orderByAsc: boolean = sortColumn.value === 'ascend';

      this.searchParams.isOrderByAsc = orderByAsc;
      this.searchParams.productOrderByOptions = sortColumnName;
    } else {
      this.searchParams.isOrderByAsc = undefined;
      this.searchParams.productOrderByOptions = undefined;
    }

    this.searchProducts(this.searchParams);
  }

  private initializingSelectors(): void {
    this.isLoading$ = this.store$.select(selectIsLoading);

    this.store$
      .select(productSelectors.selectProductList)
      .pipe(filter((val) => val !== undefined))
      .subscribe((res) => {
        this.productsData = res!.products;
        this.totalCount = res!.totalCount;
        this.changeDetection.detectChanges();
      });

    this.store$
      .select(productSelectors.selectProductSearchParams)
      .pipe(filter((val) => val !== undefined))
      .subscribe((res) => {
        if (!res) return;
        this.searchParams = clone(res);
      });
  }

  handleSearchByText(searchText?: string): void {
    this.searchParams = { ...this.searchParams, searchText, pageIndex: 0 };
    this.searchProducts(this.searchParams);
  }

  changeActiveFilter(selectedIndex: number): void {
    if (!this.searchParams) return;

    const currentActiveFilter = this.activeFilterOptions[selectedIndex].value;
    this.searchParams = {
      ...this.searchParams,
      pageIndex: 0,
      isActiveFilter: currentActiveFilter,
    };
    this.searchProducts(this.searchParams);
  }

  private searchProducts(searchData?: RequestGetProductListModel): void {
    if (!searchData) return;
    this.store$.dispatch(
      productActions.setProductSearchParamsAction({
        payload: searchData,
      })
    );
  }

  handleAddNew(): void {
    this.modal.create<ProductCreateModalComponent, any>({
      nzTitle: 'Product type',
      nzWidth: '704px',
      nzMaskClosable: false,
      nzContent: ProductCreateModalComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzFooter: null,
    });
  }

  edit(id: string): void {
    this.router.navigate(
      [
        RoutesConstants.DASHBOARD_INDEX,
        RoutesConstants.DASHBOARD_PRODUCTS,
        RoutesConstants.DASHBOARD_PRODUCTS_EDIT,
      ],
      { queryParams: { id } }
    );
  }

  deactivate(id: string): void {
    this.store$.dispatch(productActions.productDeactivateAction({ payload: { id } }));
  }

  reactivate(id: string): void {
    this.store$.dispatch(productActions.productActivateAction({ payload: { id } }));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
