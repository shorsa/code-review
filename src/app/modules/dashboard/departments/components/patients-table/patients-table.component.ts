import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { clone } from 'lodash';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { Observable, filter } from 'rxjs';
import { selectIsLoading } from 'src/app/app-store/app-state/app-state.selectors';
import { IsActiveFilterEnum } from 'src/app/shared/enums';
import { PatientModel } from 'src/app/shared/models';
import { PatientOrderByOptionsEnum } from '../../../patients/enums';
import {
  RequestGetPatientListModel,
  ResponsePatientListItem,
} from '../../../patients/models/patients';
import { getPatientsByDepartmentIdAction } from '../../store/department.actions';
import { selectPatientsList } from '../../store/department.selectors';

@Component({
  selector: 'app-patients-table',
  templateUrl: './patients-table.component.html',
  styleUrls: ['./patients-table.component.scss'],
})
export class PatientsTableComponent implements OnInit {
  @Input() departmentId!: string;

  private _searchParams: RequestGetPatientListModel = {
    pageIndex: 0,
    pageSize: 5,
    departments: [this.departmentId],
    isActiveFilter: IsActiveFilterEnum.Active,
  };
  isLoading$?: Observable<boolean>;
  patientsData?: ResponsePatientListItem[];
  totalCount: number = 0;
  constructor(private store$: Store) {}

  ngOnInit(): void {
    this.initializingSelectors();
  }

  set searchParams(value: RequestGetPatientListModel) {
    this._searchParams = { ...clone(value), departments: [this.departmentId] };
  }

  get searchParams(): RequestGetPatientListModel {
    return this._searchParams;
  }

  private searchPatients(searchData?: RequestGetPatientListModel): void {
    if (!searchData) return;
    this.store$.dispatch(
      getPatientsByDepartmentIdAction({
        payload: searchData,
      })
    );
  }

  private initializingSelectors(): void {
    this.isLoading$ = this.store$.select(selectIsLoading);

    this.store$
      .select(selectPatientsList)
      .pipe(filter((val) => !!val))
      .subscribe((res) => {
        if (!res) return;
        this.patientsData = res.patients;
        this.totalCount = res.totalCount;
      });
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
}
