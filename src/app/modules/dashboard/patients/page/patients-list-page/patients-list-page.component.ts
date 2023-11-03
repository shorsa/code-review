import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewContainerRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { clone, isEqual } from 'lodash';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { Observable, Subscription, filter } from 'rxjs';
import { selectIsLoading } from 'src/app/app-store/app-state/app-state.selectors';
import { CommonConstants, RoutesConstants } from 'src/app/core/constants';
import { fadeLeftButton } from 'src/app/shared/animation/animated-ngif-fade-left-button';
import { IsActiveFilterEnum, PermissionClaimsEnum } from 'src/app/shared/enums';
import { SelectOptionModel } from 'src/app/shared/models';
import { UserPermissionsProvider } from 'src/app/shared/providers/user-permissions.provider';
import { ResponseClientUserDepartmentListItem } from '../../../client/models';
import {
  PatientDeactivateModalComponent,
  PatientDeactivateModalModel,
} from '../../components/patient-deactivate-modal/patient-deactivate-modal.component';
import {
  PatientMergeModalComponent,
  PatientMergeModalModel,
} from '../../components/patient-merge-modal/patient-merge-modal.component';
import { TransferToDepartmentModalComponent } from '../../components/transfer-to-department-modal/transfer-to-department-modal.component';
import { PatientOrderByOptionsEnum } from '../../enums';
import {
  RequestGetPatientListModel,
  ResponsePatientListItem,
} from '../../models/patients';
import * as patientActions from '../../store/patient.actions';
import * as patientSelectors from '../../store/patient.selectors';

@Component({
  templateUrl: './patients-list-page.component.html',
  styleUrls: ['./patients-list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeLeftButton],
})
export class PatientsListPageComponent implements OnInit, OnDestroy {
  private searchParams!: RequestGetPatientListModel;
  private subscriptions$: Subscription = new Subscription();

  readonly pageSizeOptions: number[] = CommonConstants.PAGE_SIZE_OPTIONS;
  readonly activeFilterOptions: SelectOptionModel<IsActiveFilterEnum>[] = [
    ...CommonConstants.activeFilterOptions,
    { label: 'Pre-Delete Stage', value: IsActiveFilterEnum.PreDelete },
  ];

  readonly patientViewDetailsPermission = PermissionClaimsEnum.PatientViewDetails;
  readonly patientCreatePermission = PermissionClaimsEnum.PatientCreate;
  readonly patientUpdatePermission = PermissionClaimsEnum.PatientUpdate;
  readonly patientUnlockPermission = PermissionClaimsEnum.PatientUnlock;
  readonly patientDeactivatePermission = PermissionClaimsEnum.PatientDeactivate;
  readonly patientActivatePermission = PermissionClaimsEnum.PatientActivate;
  readonly patientMergePermission = PermissionClaimsEnum.PatientMerge;
  readonly patientTransferPermission = PermissionClaimsEnum.PatientUpdateDepartment;

  checked: boolean = false;
  indeterminateCheckbox: boolean = false;
  setOfCheckedId = new Set<string>();

  patientsUsersData: ResponsePatientListItem[] = [];
  totalCount: number = 0;
  isLoading$?: Observable<boolean>;
  departmentListOptions?: { text: string; value: string }[];

  showTransferBtn: boolean = false;
  isShowPreDeleteTable?: boolean;

  constructor(
    private store$: Store,
    private changeDetection: ChangeDetectorRef,
    private router: Router,
    private readonly userPermissionProvider: UserPermissionsProvider,
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef,
  ) {}

  ngOnInit(): void {
    this.initializingSelectors();
  }

  get getIsCanDeactivateOrReactivate() : boolean {
    return this.userPermissionProvider.isOHRDRoles
  }


  get getIsClientAdminOrSuperuser(): boolean {
    return (
      this.userPermissionProvider.isClientRoles || this.userPermissionProvider.isClinician
    );
  }

  get getIsDeactivateFilter(): boolean {
    return this.searchParams.isActiveFilter === IsActiveFilterEnum.Inactive;
  }

  get getIsPreDeleteFilter(): boolean {
    return !!this.isShowPreDeleteTable;
  }

  showNameOfDepartments(patient: ResponsePatientListItem): string {
    const departmentString = patient.clientUser.clientUserDepartments
      ?.map((item: ResponseClientUserDepartmentListItem) => item.departmentName)
      .join(', ');

    return departmentString ?? '';
  }

  onQueryParamsChange(event: NzTableQueryParams): void {
    const sortColumn = event.sort.find((item) => item.value !== null);

    const { pageIndex, pageSize } = event;

    this.searchParams = {
      ...this.searchParams,
      pageSize: pageSize,
      pageIndex: pageIndex - 1,
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

  handleChangePatientsStateFilter(selectedIndex: number): void {
    if (!this.searchParams) return;
    if (selectedIndex == 2) {
      this.isShowPreDeleteTable = true;
      return;
    } else {
      this.isShowPreDeleteTable = false;
    }
    const currentActiveFilter = this.activeFilterOptions[selectedIndex].value;
    this.searchParams = {
      ...this.searchParams,
      isActiveFilter: currentActiveFilter,
    };

    this.searchPatients(this.searchParams);
  }

  handleSearchByText(searchText?: string): void {
    this.searchParams = { ...this.searchParams, searchText, pageIndex: 0 };
    this.searchPatients(this.searchParams);
  }

  onItemCheckedChange(id: string, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(checked: boolean): void {
    this.patientsUsersData.forEach(({ id }) => this.updateCheckedSet(id, checked));
    this.refreshCheckedStatus();
  }

  updateCheckedSet(id: string, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  refreshCheckedStatus(): void {
    this.checked = this.patientsUsersData.every(({ id }) => this.setOfCheckedId.has(id));
    this.indeterminateCheckbox =
      this.patientsUsersData.some(({ id }) => this.setOfCheckedId.has(id)) &&
      !this.checked;

    this.showTransferBtn = this.setOfCheckedId.size >= 2;
  }

  handleTransferToDepartment(): void {
    const patientsToTransfer = this.patientsUsersData.filter((item) =>
      this.setOfCheckedId.has(item.id)
    );

    this.modal.create<
      TransferToDepartmentModalComponent,
      { patientsToTransfer: ResponsePatientListItem[] }
    >({
      nzTitle: 'Select New Department',
      nzWidth: '900px',
      nzMaskClosable: false,
      nzContent: TransferToDepartmentModalComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzData: {
        patientsToTransfer,
      },
      nzFooter: null,
    });
  }

  navigateToEdit(id: string): void {
    this.router.navigate(
      [
        RoutesConstants.DASHBOARD_INDEX,
        RoutesConstants.DASHBOARD_PATIENT,
        RoutesConstants.DASHBOARD_PATIENT_EDIT,
      ],
      { queryParams: { id } }
    );
  }

  navigateToAddNewPatient(): void {
    this.router.navigate([
      RoutesConstants.DASHBOARD_INDEX,
      RoutesConstants.DASHBOARD_PATIENT,
      RoutesConstants.DASHBOARD_PATIENT_ADD,
    ]);
  }

  handleDeactivate(id: string): void {
    this.modal.create<PatientDeactivateModalComponent, PatientDeactivateModalModel>({
      nzTitle: 'Deactivate',
      nzMaskClosable: false,
      nzContent: PatientDeactivateModalComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzData: {
        patientId: id,
      },
      nzFooter: null,
    });
  }

  handleMerge(patient: ResponsePatientListItem): void {
    this.modal.create<PatientMergeModalComponent, PatientMergeModalModel>({
      nzTitle: 'Please, select the patient record to merge into ',
      nzContent: PatientMergeModalComponent,
      nzMaskClosable: false,
      nzViewContainerRef: this.viewContainerRef,
      nzWidth: '900px',
      nzData: {
        patientData: patient,
      },
      nzFooter: null,
    });
  }

  handleReactivate(id: string): void {
    this.store$.dispatch(
      patientActions.patientActivateAction({
        payload: { id },
      })
    );
  }

  handleUnlock(applicationUserId: string): void {
    this.store$.dispatch(
      patientActions.patientUnlockAction({
        payload: { id: applicationUserId },
      })
    );
  }

  private initializingSelectors(): void {
    this.isLoading$ = this.store$.select(selectIsLoading);

    this.subscriptions$.add(
      this.store$
        .select(patientSelectors.selectPatientsList)
        .pipe(filter((val) => val !== undefined))
        .subscribe((res) => {
          this.patientsUsersData = res!.patients;
          this.totalCount = res!.totalCount;
          this.setOfCheckedId = new Set<string>();
          this.refreshCheckedStatus();
          this.changeDetection.detectChanges();
        })
    );

    this.subscriptions$.add(
      this.store$
        .select(patientSelectors.selectPatientsSearchParams)
        .pipe(filter((val) => val !== undefined))
        .subscribe((res) => {
          if (!res) return;
          if (isEqual(this.searchParams, res)) return;
          this.searchParams = clone(res);
        })
    );
  }

  private searchPatients(searchData?: RequestGetPatientListModel): void {
    if (!searchData) return;
    this.store$.dispatch(
      patientActions.patientsSearchAction({
        payload: searchData,
      })
    );
  }

  ngOnDestroy(): void {
    this.store$.dispatch(patientActions.clearPatientSearchParamsAction());
    this.subscriptions$.unsubscribe();
  }
}
