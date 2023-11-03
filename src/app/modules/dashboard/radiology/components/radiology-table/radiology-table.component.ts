import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewContainerRef,
} from '@angular/core';
import { Store } from '@ngrx/store';

import { Router } from '@angular/router';
import { clone } from 'lodash';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { Observable, Subscription, filter, of } from 'rxjs';
import { selectIsLoading } from 'src/app/app-store/app-state/app-state.selectors';
import { CommonConstants } from 'src/app/core/constants';
import { MriRequestOrderByOptionsEnum } from '../../enums';
import {
  RequestGetMriRequestListModel,
  ResponseGetMriRequestListModelItem,
} from '../../models';
import * as staffActions from '../../store/radiology.actions';
import * as staffSelectors from '../../store/radiology.selectors';
import {
  ViewRadiologyModalComponent,
  ViewRadiologyModalModel,
} from '../view-radiology-modal/view-radiology-modal.component';

@Component({
  selector: 'app-radiology-table',
  templateUrl: './radiology-table.component.html',
  styleUrls: ['./radiology-table.component.scss'],
})
export class RadiologyTableComponent implements OnInit, OnDestroy {
  readonly pageSizeOptions: number[] = CommonConstants.PAGE_SIZE_OPTIONS;

  private _searchParams: RequestGetMriRequestListModel = {
    pageSize: this.pageSizeOptions[0],
    pageIndex: 0,
  };
  private subscription: Subscription = new Subscription();

  isLoading$?: Observable<boolean>;
  totalCount?: number;
  radiologyData: ResponseGetMriRequestListModelItem[] = [];

  constructor(
    private store$: Store,
    private router: Router,
    private changeDetection: ChangeDetectorRef,
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef
  ) {}

  set searchParams(value: RequestGetMriRequestListModel) {
    this._searchParams = { ...clone(value) };
  }

  get searchParams(): RequestGetMriRequestListModel {
    return this._searchParams;
  }

  ngOnInit(): void {
    this.initializingSelectors();
  }

  handleView(data: ResponseGetMriRequestListModelItem): void {
    this.modal.create<ViewRadiologyModalComponent, ViewRadiologyModalModel>({
      nzWidth: '80%',
      nzMaskClosable: false,
      nzContent: ViewRadiologyModalComponent,
      nzClassName: 'pdf-modal',
      nzData: {
        mriId: data.id,
        isPrinted: data.isPrinted,
      },
      nzViewContainerRef: this.viewContainerRef,
      nzFooter: null,
    });
  }

  onQueryParamsChange(event: NzTableQueryParams): void {
    const sortColumn = event.sort.find((item) => item.value !== null);

    this.searchParams = {
      ...this.searchParams,
      pageSize: event.pageSize,
      pageIndex: event.pageIndex - 1,
    };

    type ColumnSort = keyof typeof MriRequestOrderByOptionsEnum;

    if (sortColumn) {
      const sortColumnName: MriRequestOrderByOptionsEnum =
        MriRequestOrderByOptionsEnum[sortColumn.key as ColumnSort];
      const orderByAsc: boolean = sortColumn.value === 'ascend';

      this.searchParams.isOrderByAsc = orderByAsc;
      this.searchParams.orderByOptions = sortColumnName;
    } else {
      this.searchParams.isOrderByAsc = undefined;
      this.searchParams.orderByOptions = undefined;
    }

    this.store$.dispatch(
      staffActions.setMriSearchParamsAction({
        payload: this.searchParams,
      })
    );
  }

  private initializingSelectors(): void {
    this.isLoading$ = this.store$.select(selectIsLoading);

    this.store$
      .select(staffSelectors.selectRadiologyList)
      .pipe(filter((val) => val !== undefined))
      .subscribe((res) => {
        if (!res) return;
        this.radiologyData = res.requests;
        this.totalCount = res.totalCount;
        this.changeDetection.detectChanges();
      });

    this.subscription.add(
      this.store$
        .select(staffSelectors.selectRadiologySearchParams)
        .pipe(filter((val) => !!val))
        .subscribe((res) => {
          if (!res) return;
          this.searchParams = clone(res);
        })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
