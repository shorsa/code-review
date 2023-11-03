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
import { SearchHelper } from 'src/app/shared/helpers';
import { SelectOptionModel } from 'src/app/shared/models';
import {
  ClientDocumentModel,
  RequestCreateClientDocumentModel,
  RequestGetClientDocumentListByClientIdModel,
} from '../../models';
import * as clientDocumentActions from '../../store/client-documents.actions';
import * as clientSelectors from '../../store/client.selectors';
import { PermissionClaimsEnum } from 'src/app/shared/enums';
import { CommonConstants } from 'src/app/core/constants';

@Component({
  selector: 'app-client-upload-documents',
  templateUrl: './client-upload-documents.component.html',
  styleUrls: ['./client-upload-documents.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientUploadDocumentsComponent implements OnInit, OnDestroy {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  @Input() clientId!: string;

  readonly pageSizeOptions: number[] = CommonConstants.PAGE_SIZE_OPTIONS;
  readonly uploadDocumentsPermission = PermissionClaimsEnum.ClientDocumentUpload;
  readonly deleteDocumentsPermission = PermissionClaimsEnum.ClientDocumentDelete;

  readonly permittedFileTypes: string[] = ['', 'pdf', 'doc', 'docx'];

  private _searchParams: RequestGetClientDocumentListByClientIdModel = {
    pageIndex: 0,
    pageSize: this.pageSizeOptions[0],
    searchText: '',
  };
  private subscription: Subscription = new Subscription();

  fileList: ClientDocumentModel[] = [];
  isLoading$?: Observable<boolean>;
  documentsTotal?: number;
  constructor(
    private store$: Store,
    private changeDetector: ChangeDetectorRef,
    private readonly searchHelper: SearchHelper<string>
  ) {}

  ngOnInit(): void {
    this.initializingSelectors();
    this.searchClientDocuments(this.searchParams);
  }

  get getFilesTypesForInputAccept(): string {
    return this.permittedFileTypes.join(', .');
  }

  set searchParams(value: RequestGetClientDocumentListByClientIdModel) {
    this._searchParams = {
      ...this.searchParams,
      ...clone(value),
      clientId: this.clientId!,
    };
  }

  get searchParams(): RequestGetClientDocumentListByClientIdModel {
    return { ...this._searchParams, clientId: this.clientId! };
  }

  get isLoadingDocument(): boolean {
    return !this.fileList.every((item) => item.id);
  }

  paginationChange(event: number, prop: 'pageSize' | 'pageIndex'): void {
    this.searchParams = { ...this.searchParams, [prop]: event };
    this.searchClientDocuments(this.searchParams);
  }

  private initializingSelectors(): void {
    this.isLoading$ = this.store$.select(selectIsLoading);

    this.store$
      .select(clientSelectors.selectClientDocumentsList)
      .pipe(filter((val) => val !== undefined))
      .subscribe((res) => {
        if (!res) return;

        this.fileList = res.documents;
        this.documentsTotal = res.totalCount;

        this.changeDetector.detectChanges();
      });

    this.subscription.add(
      this.searchHelper
        .setSearchSubscription()
        .pipe(filter((val) => val !== undefined))
        .subscribe((searchValue) => {
          this.searchParams = {
            ...this.searchParams,
            searchText: searchValue,
            clientId: this.clientId!,
          };

          this.searchClientDocuments(this.searchParams);
        })
    );
  }

  private searchClientDocuments(
    searchData?: RequestGetClientDocumentListByClientIdModel
  ): void {
    if (!searchData) return;
    this.store$.dispatch(
      clientDocumentActions.clientDocumentsSearchAction({
        payload: searchData,
      })
    );
  }

  downloadDocument(file: ClientDocumentModel): void {
    this.store$.dispatch(
      clientDocumentActions.downloadClientDocumentAction({
        payload: { id: file.id, fileName: file.name },
      })
    );
  }

  deleteDocument(id: string): void {
    this.store$.dispatch(
      clientDocumentActions.clientDocumentDeleteAction({
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

    const model: RequestCreateClientDocumentModel = {
      clientId: this.clientId!,
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
      clientDocumentActions.clientDocumentCreateAction({
        payload: { data: model, searchParams: this.searchParams },
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
