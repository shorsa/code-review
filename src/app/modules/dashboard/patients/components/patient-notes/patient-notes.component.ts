import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewContainerRef,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { clone } from 'lodash';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { Observable, Subscription, filter } from 'rxjs';
import { SearchHelper } from 'src/app/shared/helpers';
import { NotesOrderByOptionsEnum } from '../../enums';
import {
  RequestGetNoteListByPatientIdModel,
  ResponseNoteListItem,
} from '../../models/notes';
import * as patientNoteActions from '../../store/patient-notes.actions';
import * as patientSelectors from '../../store/patient.selectors';
import {
  PatientNoteManagementModalComponent,
  PatientNoteManagementModalModel,
} from '../patient-note-management-modal/patient-note-management-modal.component';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CommonConstants } from 'src/app/core/constants';

@Component({
  selector: 'app-patient-notes',
  templateUrl: './patient-notes.component.html',
  styleUrls: ['./patient-notes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatientNotesComponent implements OnInit, OnDestroy {
  @Input() patientId!: string;
  readonly pageSizeOptions: number[] = CommonConstants.PAGE_SIZE_OPTIONS;

  private _searchParams: RequestGetNoteListByPatientIdModel = {
    pageIndex: 0,
    pageSize: this.pageSizeOptions[0],
    patientId: this.patientId,
  };

  private subscriptions$: Subscription = new Subscription();

  isLoading$?: Observable<boolean>;
  nodesData: ResponseNoteListItem[] = [];
  totalCount: number = 0;

  constructor(
    private store$: Store,
    private changeDetector: ChangeDetectorRef,
    private viewContainerRef: ViewContainerRef,
    private modal: NzModalService
  ) {}

  ngOnInit() {
    this.initializingSelectors();
  }

  set searchParams(value: RequestGetNoteListByPatientIdModel) {
    this._searchParams = { ...clone(value), patientId: this.patientId };
  }

  get searchParams(): RequestGetNoteListByPatientIdModel {
    return this._searchParams;
  }

  handleAddNew(): void {
    this.modal.create<
      PatientNoteManagementModalComponent,
      PatientNoteManagementModalModel
    >({
      nzTitle: 'Add Note',
      nzWidth: '484px',
      nzMaskClosable: false,
      nzContent: PatientNoteManagementModalComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzData: {
        searchParams: this.searchParams,
        patientId: this.patientId,
      },
      nzFooter: null,
    });
  }

  handleEditNote(noteData: ResponseNoteListItem): void {
    this.modal.create<
      PatientNoteManagementModalComponent,
      PatientNoteManagementModalModel
    >({
      nzTitle: 'Edit Note',
      nzWidth: '484px',
      nzMaskClosable: false,
      nzContent: PatientNoteManagementModalComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzData: {
        noteData,
        searchParams: this.searchParams,
        patientId: this.patientId,
      },
      nzFooter: null,
    });
  }

  handleDeleteNote(id: string): void {
    this.store$.dispatch(
      patientNoteActions.patientDeleteNoteAction({
        payload: { data: { id }, searchParams: this.searchParams },
      })
    );
  }

  onQueryParamsChange(event: NzTableQueryParams): void {
    const sortColumn = event.sort.find((item) => item.value !== null);

    this.searchParams = {
      ...this.searchParams,
      pageSize: event.pageSize,
      pageIndex: event.pageIndex - 1,
    };

    type ColumnSort = keyof typeof NotesOrderByOptionsEnum;

    if (sortColumn) {
      const sortColumnName: NotesOrderByOptionsEnum =
        NotesOrderByOptionsEnum[sortColumn.key as ColumnSort];
      const orderByAsc: boolean = sortColumn.value === 'ascend';

      this.searchParams.isOrderByAsc = orderByAsc;
      this.searchParams.confidentialNotesOrderByOptions = sortColumnName;
    } else {
      this.searchParams.isOrderByAsc = undefined;
      this.searchParams.confidentialNotesOrderByOptions = undefined;
    }

    this.searchNotes(this.searchParams);
  }

  handleSearchByText(searchText?: string): void {
    this.searchParams = { ...this.searchParams, searchText, pageIndex: 0 };
    this.searchNotes(this.searchParams);
  }

  private searchNotes(searchData?: RequestGetNoteListByPatientIdModel): void {
    if (!searchData) return;
    this.store$.dispatch(
      patientNoteActions.patientsNoteListSearchAction({
        payload: searchData,
      })
    );
  }

  private initializingSelectors(): void {
    this.subscriptions$.add(
      this.store$
        .select(patientSelectors.selectPatientNoteListData)
        .pipe(filter((val) => val !== undefined))
        .subscribe((res) => {
          if (!res) return;
          this.nodesData = res.confidentialNotes;
          this.totalCount = res.totalCount;
          this.changeDetector.detectChanges();
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }
}
