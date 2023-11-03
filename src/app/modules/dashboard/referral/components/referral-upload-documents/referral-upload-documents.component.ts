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
  ReferralDocumentModel,
  RequestCreateReferralDocumentModel,
  RequestGetReferralDocumentListByReferralIdModel,
} from '../../models';
import * as referralDocumentActions from '../../state/referral-documents.actions';
import * as referralSelectors from '../../state/referral.selectors';
import { PermissionClaimsEnum } from 'src/app/shared/enums';
import { CommonConstants } from 'src/app/core/constants';
import { UserPermissionsProvider } from 'src/app/shared/providers/user-permissions.provider';

@Component({
  selector: 'app-referral-upload-documents',
  templateUrl: './referral-upload-documents.component.html',
  styleUrls: ['./referral-upload-documents.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReferralUploadDocumentsComponent implements OnInit, OnDestroy {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  @Input() referralId!: string;

  private _searchParams: RequestGetReferralDocumentListByReferralIdModel = {
    pageIndex: 0,
    pageSize: CommonConstants.PAGE_SIZE_OPTIONS[0],
    searchText: '',
  };
  private subscription: Subscription = new Subscription();

  readonly pageSizeOptions: number[] = CommonConstants.PAGE_SIZE_OPTIONS;
  readonly permittedFileTypes: string[] = ['', 'pdf', 'doc', 'docx'];

  fileList: ReferralDocumentModel[] = [];
  isLoading$?: Observable<boolean>;
  documentsTotal?: number;
  constructor(
    private store$: Store,
    private changeDetector: ChangeDetectorRef,
    private readonly searchHelper: SearchHelper<string>,
    private readonly userPermissionsProvider: UserPermissionsProvider
  ) {}

  get getFilesTypesForInputAccept(): string {
    return this.permittedFileTypes.join(', .');
  }

  set searchParams(value: RequestGetReferralDocumentListByReferralIdModel) {
    this._searchParams = {
      ...this.searchParams,
      ...clone(value),
      referralId: this.referralId!,
    };
  }

  get getIsClinicianRole(): boolean {
    return this.userPermissionsProvider.isClinician;
  }

  get searchParams(): RequestGetReferralDocumentListByReferralIdModel {
    return { ...this._searchParams, referralId: this.referralId! };
  }

  get isLoadingDocument(): boolean {
    return !this.fileList.every((item) => item.id);
  }

  ngOnInit(): void {
    this.initializingSelectors();
    this.searchReferralDocuments(this.searchParams);
  }

  onPaginationChange(event: number, prop: 'pageSize' | 'pageIndex'): void {
    this.searchParams = { ...this.searchParams, [prop]: event };
    this.searchReferralDocuments(this.searchParams);
  }

  handleDownloadDocument(file: ReferralDocumentModel): void {
    this.store$.dispatch(
      referralDocumentActions.downloadReferralDocumentAction({
        payload: { id: file.id, fileName: file.name },
      })
    );
  }

  handleDeleteDocument(id: string): void {
    this.store$.dispatch(
      referralDocumentActions.referralDocumentDeleteAction({
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

    const model: RequestCreateReferralDocumentModel = {
      referralId: this.referralId!,
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
      referralDocumentActions.referralDocumentCreateAction({
        payload: { data: model, searchParams: this.searchParams },
      })
    );
  }

  private initializingSelectors(): void {
    this.isLoading$ = this.store$.select(selectIsLoading);

    this.subscription.add(
      this.store$
        .select(referralSelectors.selectReferralDocumentsList)
        .pipe(filter((val) => val !== undefined))
        .subscribe((res) => {
          if (!res) return;

          this.fileList = res.documents;
          this.documentsTotal = res.totalCount;

          this.changeDetector.detectChanges();
        })
    );

    this.subscription.add(
      this.searchHelper
        .setSearchSubscription()
        .pipe(filter((val) => val !== undefined))
        .subscribe((searchValue) => {
          this.searchParams = {
            ...this.searchParams,
            searchText: searchValue,
            referralId: this.referralId!,
          };

          this.searchReferralDocuments(this.searchParams);
        })
    );
  }

  private searchReferralDocuments(
    searchData?: RequestGetReferralDocumentListByReferralIdModel
  ): void {
    if (!searchData) return;
    this.store$.dispatch(
      referralDocumentActions.referralDocumentsSearchAction({
        payload: searchData,
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
