import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewContainerRef,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { Observable, Subscription, filter } from 'rxjs';
import { selectIsLoading } from 'src/app/app-store/app-state/app-state.selectors';
import { CommonConstants } from 'src/app/core/constants';
import { SearchHelper } from 'src/app/shared/helpers';
import { ResponseClientUserDepartmentListItem } from '../../../client/models';
import { PatientOrderByOptionsEnum } from '../../enums';
import {
  RequestGetPreDeleteListModel,
  ResponsePatientListItem,
  ResponsePatientPreDeleteItemModel,
} from '../../models/patients';
import * as patientActions from '../../store/patient.actions';
import * as patientSelectors from '../../store/patient.selectors';
import { ChangePreDeleteDateModalComponent } from '../change-pre-delete-date-modal/change-pre-delete-date-modal.component';
import { ConfirmDeletePreDeletePatientModalComponent } from '../confirm-delete-pre-delete-patient/confirm-delete-pre-delete-patient.component';

@Component({
  selector: 'app-patient-pre-delete-stage-list',
  templateUrl: './patient-pre-delete-stage-list.component.html',
  styleUrls: ['./patient-pre-delete-stage-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatientPreDeleteStageListComponent implements OnInit, OnDestroy {
  private searchParams!: RequestGetPreDeleteListModel;
  private subscriptions$: Subscription = new Subscription();

  readonly pageSizeOptions: number[] = CommonConstants.PAGE_SIZE_OPTIONS;

  patientsUsersData: ResponsePatientListItem[] = [];
  totalCount: number = 0;
  isLoading$?: Observable<boolean>;

  constructor(
    private store$: Store,
    private changeDetection: ChangeDetectorRef,
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef,
    private readonly searchHelper: SearchHelper
  ) {}

  ngOnInit(): void {
    this.initializingSelectors();
    this.searchPatients(this.searchParams);
  }

  showNameOfDepartments(patient: ResponsePatientListItem): string {
    const departmentString = patient.clientUser.clientUserDepartments
      ?.map((item: ResponseClientUserDepartmentListItem) => item.departmentName)
      .join(', ');

    return departmentString ?? '';
  }

  onQueryParamsChange(event: NzTableQueryParams): void {
    const sortColumn = event.sort.find((item) => item.value !== null);

    this.searchParams = {
      ...this.searchParams,
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

  handleChangeDeletionDate(patient: ResponsePatientListItem): void {
    this.modal.create<
      ChangePreDeleteDateModalComponent,
      { patient: ResponsePatientListItem }
    >({
      nzTitle: 'Delaying date',
      nzWidth: '484px',
      nzMaskClosable: false,
      nzContent: ChangePreDeleteDateModalComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzData: {
        patient,
      },
      nzFooter: null,
    });
  }

  handleDeletePatient(patient: ResponsePatientPreDeleteItemModel): void {
    this.modal.create<
      ConfirmDeletePreDeletePatientModalComponent,
      { patient: ResponsePatientPreDeleteItemModel }
    >({
      nzTitle: 'Confirm deletion',
      nzWidth: '484px',
      nzMaskClosable: false,
      nzContent: ConfirmDeletePreDeletePatientModalComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzData: {
        patient,
      },
      nzFooter: null,
    });
  }

  private initializingSelectors(): void {
    this.isLoading$ = this.store$.select(selectIsLoading);

    this.subscriptions$.add(
      this.store$
        .select(patientSelectors.selectPatientPreDeleteData)
        .pipe(filter((val) => !!val))
        .subscribe((res) => {
          const { patients, totalCount } = res!;

          this.patientsUsersData = patients;
          this.totalCount = totalCount;

          this.changeDetection.detectChanges();
        })
    );

    this.subscriptions$.add(
      this.searchHelper
        .setSearchSubscription()
        .pipe(filter((val) => !!val))
        .subscribe((searchText) => {
          this.searchParams = { ...this.searchParams, searchText, pageIndex: 0 };
          this.searchPatients(this.searchParams);
        })
    );
  }

  private searchPatients(searchData?: RequestGetPreDeleteListModel): void {
    if (!searchData) return;
    this.store$.dispatch(
      patientActions.preDeletePatientsSearchAction({
        payload: searchData,
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }
}
