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
import {
  AppointmentDocumentModel,
  RequestCreateAppointmentDocumentModel,
  RequestGetAppointmentDocumentListByAppointmentIdModel,
} from '../../models';
import * as appointmentDocumentActions from '../../store/appointment-documents.actions';
import * as appointmentSelectors from '../../store/appointments.selectors';
import { UserPermissionsProvider } from 'src/app/shared/providers/user-permissions.provider';

@Component({
  selector: 'app-appointment-upload-documents',
  templateUrl: './appointment-upload-documents.component.html',
  styleUrls: ['./appointment-upload-documents.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppointmentUploadDocumentsComponent implements OnInit, OnDestroy {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  @Input() appointmentId!: string;

  private _searchParams: RequestGetAppointmentDocumentListByAppointmentIdModel = {
    appointmentId: this.appointmentId,
    pageIndex: 0,
    pageSize: CommonConstants.PAGE_SIZE_OPTIONS[0],
    searchText: '',
  };
  private subscriptions$: Subscription = new Subscription();

  readonly pageSizeOptions: number[] = CommonConstants.PAGE_SIZE_OPTIONS;
  readonly permittedFileTypes: string[] = ['', 'pdf', 'doc', 'docx'];

  fileList: AppointmentDocumentModel[] = [];
  isLoading$?: Observable<boolean>;
  documentsTotal?: number;

  constructor(
    private store$: Store,
    private changeDetector: ChangeDetectorRef,
    private readonly searchHelper: SearchHelper<string>,
    private readonly userPermissionsProvider: UserPermissionsProvider
  ) {}

  ngOnInit(): void {
    this.initializingSelectors();
    this.searchAppointmentDocuments(this.searchParams);
  }

  get getFilesTypesForInputAccept(): string {
    return this.permittedFileTypes.join(', .');
  }

  set searchParams(value: RequestGetAppointmentDocumentListByAppointmentIdModel) {
    this._searchParams = {
      ...this.searchParams,
      ...clone(value),
      appointmentId: this.appointmentId!,
    };
  }

  get searchParams(): RequestGetAppointmentDocumentListByAppointmentIdModel {
    return { ...this._searchParams, appointmentId: this.appointmentId! };
  }

  get isLoadingDocument(): boolean {
    return !this.fileList.every((item) => item.id);
  }

  get isClinicianRole(): boolean {
    return this.userPermissionsProvider.isClinician;
  }

  downloadDocument(file: AppointmentDocumentModel): void {
    this.store$.dispatch(
      appointmentDocumentActions.downloadAppointmentDocumentAction({
        payload: { id: file.id, fileName: file.name },
      })
    );
  }

  handleDeleteDocument(id: string): void {
    this.store$.dispatch(
      appointmentDocumentActions.appointmentDocumentDeleteAction({
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

    const model: RequestCreateAppointmentDocumentModel = {
      appointmentId: this.appointmentId!,
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
      appointmentDocumentActions.appointmentDocumentCreateAction({
        payload: { data: model, searchParams: this.searchParams },
      })
    );
  }

  onPaginationChange(event: number, prop: 'pageSize' | 'pageIndex'): void {
    this.searchParams = { ...this.searchParams, [prop]: event };
    this.searchAppointmentDocuments(this.searchParams);
  }

  private initializingSelectors(): void {
    this.isLoading$ = this.store$.select(selectIsLoading);

    this.subscriptions$.add(
      this.store$
        .select(appointmentSelectors.selectAppointmentDocuments)
        .pipe(filter((val) => val !== undefined))
        .subscribe((res) => {
          if (!res) return;
          this.fileList = res.documents;
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
            appointmentId: this.appointmentId!,
          };

          this.searchAppointmentDocuments(this.searchParams);
        })
    );
  }

  private searchAppointmentDocuments(
    searchData?: RequestGetAppointmentDocumentListByAppointmentIdModel
  ): void {
    if (!searchData) return;
    this.store$.dispatch(
      appointmentDocumentActions.appointmentDocumentsSearchAction({
        payload: searchData,
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }
}
