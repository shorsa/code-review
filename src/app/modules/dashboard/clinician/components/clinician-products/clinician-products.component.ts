import {
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
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
import { ClinicianModel, SelectOptionModel } from 'src/app/shared/models';
import {
  RequestGetClinicianProductsOptionsByClinicianIdModel,
  ResponseClinicianProductItemModel,
} from '../../models';
import * as clinicianActions from '../../store/clinician.actions';
import * as clinicianSelectors from '../../store/clinician.selectors';
import {
  ClinicianAddProductModalComponent,
  ClinicianAddProductModalModel,
} from '../clinician-add-product-modal/clinician-add-product-modal.component';

@Component({
  selector: 'app-clinician-products',
  templateUrl: './clinician-products.component.html',
  styleUrls: ['./clinician-products.component.scss'],
})
export class ClinicianProductsComponent implements OnInit, OnDestroy {
  @Input() clinicianId!: string;

  private subscriptions$: Subscription = new Subscription();
  private searchParams: RequestGetClinicianProductsOptionsByClinicianIdModel = {
    pageIndex: 0,
    pageSize: CommonConstants.PAGE_SIZE_OPTIONS[0],
    clinicianId: this.clinicianId,
  };

  readonly pageSizeOptions: number[] = CommonConstants.PAGE_SIZE_OPTIONS;
  readonly activeFilterOptions: SelectOptionModel<IsActiveFilterEnum>[] =
    CommonConstants.activeFilterOptions;

  productsData: ResponseClinicianProductItemModel[] = [];
  currentProductsIds: string[] = [];
  clinicianDetails?: ClinicianModel;
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
    this.searchParams.clinicianId = this.clinicianId;
  }

  onQueryParamsChange(event: NzTableQueryParams): void {
    this.searchParams = {
      ...this.searchParams,
      pageSize: event.pageSize,
      pageIndex: event.pageIndex - 1,
    };

    this.searchProducts();
  }

  private initializingSelectors(): void {
    this.isLoading$ = this.store$.select(selectIsLoading);

    this.subscriptions$.add(
      this.store$
        .select(clinicianSelectors.selectClinicianProductsList)
        .pipe(filter((val) => val !== undefined))
        .subscribe((res) => {
          this.productsData = res!.clinicianProducts;
          this.currentProductsIds = res!.productIds;
          this.totalCount = res!.totalCount;
          this.changeDetection.detectChanges();
        })
    );

    this.subscriptions$.add(
      this.store$
        .select(clinicianSelectors.selectClinicianDetails)
        .pipe(filter((val) => !!val))
        .subscribe((res) => {
          this.clinicianDetails = res!;
          this.changeDetection.detectChanges();
        })
    );
  }

  handleSearchByText(searchText?: string): void {
    this.searchParams = { ...this.searchParams, searchText, pageIndex: 0 };
    this.searchProducts();
  }

  private searchProducts(): void {
    if (!this.searchParams.clinicianId) return;

    this.store$.dispatch(
      clinicianActions.getClinicianProductsAction({ payload: this.searchParams })
    );
  }

  handleAddNew(): void {
    this.modal.create<ClinicianAddProductModalComponent, ClinicianAddProductModalModel>({
      nzTitle: 'Products',
      nzWidth: '900px',
      nzMaskClosable: false,
      nzData: {
        productIds: this.currentProductsIds,
        clinicianId: this.clinicianId,
        searchParams: this.searchParams,
      },
      nzContent: ClinicianAddProductModalComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzFooter: null,
    });
  }

  removeProduct(productId: string): void {
    this.store$.dispatch(
      clinicianActions.clinicianDeleteProductAction({
        payload: { id: productId },
        searchParams: this.searchParams,
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }
}
