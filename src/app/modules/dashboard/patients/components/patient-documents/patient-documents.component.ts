import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { clone } from 'lodash';
import { Observable, Subscription, filter } from 'rxjs';
import { selectIsLoading } from 'src/app/app-store/app-state/app-state.selectors';
import { CommonConstants } from 'src/app/core/constants';
import { SearchHelper } from 'src/app/shared/helpers';
import { UserPermissionsProvider } from 'src/app/shared/providers/user-permissions.provider';
import {
  RequestCreatePatientDocumentModel,
  RequestGetPatientDocumentListByPatientIdModel,
  ResponsePatientDocumentListItem,
} from '../../models/documents';
import * as patientDocumentsActions from '../../store/patient-documents.actions';
import {
  selectPatientDocumentsListData,
  selectPatientName,
} from '../../store/patient.selectors';
export * as patientSelectors from '../../store/patient.selectors';

@Component({
  selector: 'app-patient-documents',
  templateUrl: './patient-documents.component.html',
  styleUrls: ['./patient-documents.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatientDocumentsComponent implements OnInit, OnDestroy {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  @Input() patientId!: string;

  private readonly pageSizeOptions: number[] = CommonConstants.PAGE_SIZE_OPTIONS;
  private readonly permittedFileTypes: string[] = ['', 'pdf', 'doc', 'docx'];
  private subscriptions$: Subscription = new Subscription();
  private _searchParams: RequestGetPatientDocumentListByPatientIdModel = {
    pageIndex: 0,
    pageSize: this.pageSizeOptions[0],
    patientId: this.patientId,
    searchText: '',
  };

  isLoading$?: Observable<boolean>;

  allChecked = false;
  indeterminate = false;
  patientName?: string;

  fileList: (ResponsePatientDocumentListItem & { checked: boolean })[] = [];
  documentsTotal?: number;

  constructor(
    private store$: Store,
    private changeDetector: ChangeDetectorRef,
    private readonly searchHelper: SearchHelper<string>,
    private readonly userPermissionProvider: UserPermissionsProvider
  ) {}

  ngOnInit(): void {
    this.initializingSelectors();
    this.searchDocumentsDocuments(this.searchParams);
  }

  get getIsOHRDRole(): boolean {
    const { isOHRDAdministrator, isOHRDSuperuser } = this.userPermissionProvider;
    return isOHRDAdministrator || isOHRDSuperuser;
  }

  get isClinicianRole(): boolean {
    return this.userPermissionProvider.isClinician;
  }

  get getFilesTypesForInputAccept(): string {
    return this.permittedFileTypes.join(', .');
  }

  set searchParams(value: RequestGetPatientDocumentListByPatientIdModel) {
    this._searchParams = {
      ...clone(value),
      patientId: this.patientId,
    };
  }

  get searchParams(): RequestGetPatientDocumentListByPatientIdModel {
    return { ...this._searchParams, patientId: this.patientId };
  }

  get isLoadingDocument(): boolean {
    return !this.fileList.every((item) => item.id);
  }

  handleChangeAllChecked(): void {
    this.indeterminate = false;
    if (this.allChecked) {
      this.fileList = this.fileList.map((item) => ({
        ...item,
        checked: true,
      }));
    } else {
      this.fileList = this.fileList.map((item) => ({
        ...item,
        checked: false,
      }));
    }
  }

  handleUpdateSingleChecked(): void {
    if (this.fileList.every((item) => !item.checked)) {
      this.allChecked = false;
      this.indeterminate = false;
    } else if (this.fileList.every((item) => item.checked)) {
      this.allChecked = true;
      this.indeterminate = false;
    } else {
      this.indeterminate = true;
    }
  }

  handlePaginationChange(event: number, prop: 'pageSize' | 'pageIndex'): void {
    this.searchParams = { ...this.searchParams, [prop]: event };
    this.searchDocumentsDocuments(this.searchParams);
  }

  handleDownloadAll(includePassword: boolean = false): void {
    const documentIds = this.fileList
      .filter((item) => item.checked)
      ?.map((item) => item.id);

    this.store$.dispatch(
      patientDocumentsActions.downloadPatientDocumentAction({
        payload: {
          patientId: this.patientId,
          documentIds: documentIds && documentIds.length ? documentIds : undefined,
          includePassword: includePassword,
          fileName: this.patientName ?? '',
        },
      })
    );
  }

  handleDownloadDocument(
    file: ResponsePatientDocumentListItem,
    includePassword: boolean = false
  ): void {
    this.store$.dispatch(
      patientDocumentsActions.downloadPatientDocumentAction({
        payload: {
          patientId: this.patientId,
          documentIds: [file.id],
          includePassword,
          fileName: file.name,
        },
      })
    );
  }

  handleDeleteDocument(id: string): void {
    this.store$.dispatch(
      patientDocumentsActions.patientDocumentDeleteAction({
        payload: { data: { id }, searchParams: this.searchParams },
      })
    );
  }

  handleSearchByText(event: KeyboardEvent): void {
    const target: HTMLInputElement = event.target as HTMLInputElement;
    this.searchHelper.searchNext(target.value);
  }

  getFileIsValid(filename: string): boolean {
    const fileNameSplitted = filename.split('.');
    const fileType = fileNameSplitted[fileNameSplitted.length - 1];
    return this.permittedFileTypes.includes(fileType);
  }

  handleUpload(event: Event): void {
    const inputEl = event.target as HTMLInputElement;
    if (!inputEl.files?.length) return;

    const file: File = inputEl.files[0];

    const model: RequestCreatePatientDocumentModel = {
      patientId: this.patientId!,
      content: file,
      name: file.name,
    };

    this.fileList = [
      {
        name: file.name,
      } as any,
      ...this.fileList,
    ];

    this.fileInput.nativeElement.value = '';

    this.store$.dispatch(
      patientDocumentsActions.patientDocumentCreateAction({
        payload: { data: model, searchParams: this.searchParams },
      })
    );
  }

  private initializingSelectors(): void {
    this.isLoading$ = this.store$.select(selectIsLoading);

    this.subscriptions$.add(
      this.store$
        .select(selectPatientName)
        .pipe(filter((val) => !!val))
        .subscribe((name) => {
          this.patientName = name;
        })
    );

    this.subscriptions$.add(
      this.store$
        .select(selectPatientDocumentsListData)
        .pipe(filter((val) => val !== undefined))
        .subscribe((res) => {
          if (!res) return;
          this.fileList = res.documents.map((item) => ({ ...item, checked: false }));
          this.documentsTotal = res.totalCount;
          this.changeDetector.detectChanges();
        })
    );

    this.subscriptions$.add(
      this.searchHelper
        .setSearchSubscription()
        .pipe(filter((val) => val !== undefined))
        .subscribe((searchValue) => {
          this.searchParams = {
            ...this.searchParams,
            searchText: searchValue,
          };

          this.searchDocumentsDocuments(this.searchParams);
        })
    );
  }

  private searchDocumentsDocuments(
    searchData?: RequestGetPatientDocumentListByPatientIdModel
  ): void {
    if (!searchData) return;
    this.store$.dispatch(
      patientDocumentsActions.patientDocumentsSearchAction({
        payload: searchData,
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }
}
