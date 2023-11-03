import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { clone } from 'lodash';
import { NZ_MODAL_DATA, NzModalService } from 'ng-zorro-antd/modal';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { Observable, Subscription, filter } from 'rxjs';
import { selectIsLoading } from 'src/app/app-store/app-state/app-state.selectors';
import { IsActiveFilterEnum } from 'src/app/shared/enums';
import { SearchHelper } from 'src/app/shared/helpers';
import { PatientOrderByOptionsEnum } from '../../enums';
import {
  RequestGetPatientListModel,
  ResponsePatientListItem,
} from '../../models/patients';
import * as patientActions from '../../store/patient.actions';
import * as patientSelectors from '../../store/patient.selectors';
import { PatientMergeChooseMainModalComponent } from '../patient-merge-choose-main-modal/patient-merge-choose-main-modal.component';
import { CommonConstants } from 'src/app/core/constants';

export interface PatientMergeModalModel {
  patientData: ResponsePatientListItem;
}

@Component({
  selector: 'app-patient-merge-modal',
  templateUrl: './patient-merge-modal.component.html',
  styleUrls: ['./patient-merge-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SearchHelper],
})
export class PatientMergeModalComponent implements OnInit, OnDestroy {
  private _searchParams: RequestGetPatientListModel = {
    pageSize: CommonConstants.PAGE_SIZE_OPTIONS[0],
    pageIndex: 0,
    searchText: undefined,
    patientOrderByOptions: PatientOrderByOptionsEnum.None,
    isOrderByAsc: undefined,
    isActiveFilter: IsActiveFilterEnum.Active,
  };
  private subscriptions$: Subscription = new Subscription();

  readonly nzModalData: PatientMergeModalModel = inject(NZ_MODAL_DATA);

  totalCount: number = 0;
  patientsUsersData: ResponsePatientListItem[] = [];
  departmentListOptions?: { text: string; value: string }[];
  isLoading$?: Observable<boolean>;

  constructor(
    private store$: Store,
    private modal: NzModalService,
    private changeDetection: ChangeDetectorRef,
    private readonly searchHelper: SearchHelper,
    private viewContainerRef: ViewContainerRef
  ) {}

  ngOnInit(): void {
    this.initializingSelectors();
  }

  showNameOfDepartments(item: ResponsePatientListItem): string {
    const departmentsNames = item.clientUser.clientUserDepartments?.map(
      (item) => item.departmentName
    );
    return departmentsNames?.join(', ') ?? '';
  }

  set searchParams(value: RequestGetPatientListModel) {
    this._searchParams = { ...clone(value) };
  }

  get searchParams(): RequestGetPatientListModel {
    return this._searchParams;
  }

  onQueryParamsChange(event: NzTableQueryParams): void {
    const sortColumn = event.sort.find((item) => item.value !== null);
    const departmentsFilter = event.filter.find((item) => item.key === 'Department');

    this.searchParams = {
      ...this.searchParams,
      departments: departmentsFilter?.value,
      pageSize: event.pageSize,
      pageIndex: event.pageIndex - 1,
    };

    type ColumnSort = keyof typeof PatientOrderByOptionsEnum;

    if (sortColumn) {
      const sortColumnName: PatientOrderByOptionsEnum =
        PatientOrderByOptionsEnum[sortColumn.key as ColumnSort];
      const orderByAsc: boolean = sortColumn.value === 'ascend';

      this.searchParams.isOrderByAsc = orderByAsc;
      this.searchParams.patientOrderByOptions = sortColumnName;
    } else {
      this.searchParams.isOrderByAsc = undefined;
      this.searchParams.patientOrderByOptions = undefined;
    }

    this.searchPatients(this.searchParams);
  }

  handleSearchByText(event: KeyboardEvent): void {
    const targetEl: HTMLInputElement = event.target as HTMLInputElement;
    this.searchHelper.searchNext(targetEl.value);
  }

  handleSelectMerge(data: ResponsePatientListItem): void {
    this.modal.create<
      PatientMergeChooseMainModalComponent,
      { patientData: ResponsePatientListItem[] }
    >({
      nzTitle: 'Are you sure that you want to merge these patient records ?',
      nzMaskClosable: false,
      nzContent: PatientMergeChooseMainModalComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzWidth: '484px',
      nzData: {
        patientData: [data, this.nzModalData.patientData],
      },
      nzFooter: null,
    });
  }

  private initializingSelectors(): void {
    this.isLoading$ = this.store$.select(selectIsLoading);

    this.subscriptions$.add(
      this.store$
        .select(patientSelectors.selectPatientsForMergeList)
        .pipe(filter((val) => val !== undefined))
        .subscribe((res) => {
          this.patientsUsersData = res!.patients;
          this.totalCount = res!.totalCount;
          this.changeDetection.detectChanges();
        })
    );

    this.subscriptions$.add(
      this.searchHelper
        .setSearchSubscription()
        .pipe(filter((val) => !!val))
        .subscribe((searchText) => {
          this.searchParams = { ...this.searchParams, searchText, pageIndex: 1 };
          this.searchPatients(this.searchParams);
        })
    );
  }

  private searchPatients(searchData?: RequestGetPatientListModel): void {
    if (!searchData) return;
    this.store$.dispatch(
      patientActions.patientsSearchForMergeAction({
        payload: searchData,
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }
}
