import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import * as siteSelectors from '../../store/sites.selectors';
import * as siteActions from '../../store/sites.actions';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { NzModalRef, NZ_MODAL_DATA, NzModalService } from 'ng-zorro-antd/modal';
import { Observable, filter } from 'rxjs';
import { selectIsLoading } from 'src/app/app-store/app-state/app-state.selectors';
import {
  RequestUpdateSiteModel,
  RequestCreateSiteModel,
  RequestGetSiteDocumentWithContentModel,
  RequestGetSiteListModel,
} from '../../models';
import { SiteDocumentModel } from 'src/app/shared/models';

@Component({
  selector: 'app-site-management-modal',
  templateUrl: './site-management-modal.component.html',
  styleUrls: ['./site-management-modal.component.scss'],
})
export class SiteManagementModalComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  readonly permittedFileTypes: string[] = ['', 'pdf'];
  readonly #modal = inject(NzModalRef);
  readonly nzModalData: {
    siteId?: string;
    locationId: string;
    searchParams: RequestGetSiteListModel;
  } = inject(NZ_MODAL_DATA);
  filesToUpload: Set<{ fileName: string; file: File; id: number }> = new Set();
  fileList: SiteDocumentModel[] = [];

  private siteId?: string;

  nameControl: FormControl = new FormControl('', [Validators.required]);
  wasAttemptToSubmitForm?: boolean;
  isLoading$?: Observable<boolean>;

  constructor(private modal: NzModalService, private store$: Store) {}

  ngOnInit() {
    this.isLoading$ = this.store$.select(selectIsLoading);

    if (this.nzModalData?.siteId) {
      this.store$.dispatch(
        siteActions.siteGetByIdAction({
          payload: { id: this.nzModalData.siteId },
        })
      );

      this.store$
        .select(siteSelectors.selectSiteDetails)
        .pipe(filter((val) => !!val))
        .subscribe((details) => {
          this.siteId = details!.id;
          this.fileList = details!.documents;
          this.nameControl.setValue(details?.name);
        });
    }
  }

  get getFilesTypesForInputAccept(): string {
    return this.permittedFileTypes.join(', .');
  }

  handleUpload(event: Event): void {
    const inputEl = event.target as HTMLInputElement;
    if (!inputEl.files?.length) return;

    const file: File = inputEl.files[0];

    this.filesToUpload.add({
      fileName: file.name,
      file: file,
      id: this.filesToUpload.size,
    });
    this.fileInput.nativeElement.value = '';
  }

  submitForm(): void {
    this.nameControl.markAsDirty();
    this.nameControl.updateValueAndValidity({ onlySelf: true });
    this.wasAttemptToSubmitForm = true;

    if (this.nameControl.invalid) return;

    if (this.nzModalData?.siteId) {
      this.update();
    } else {
      this.create();
    }
  }

  private update(): void {
    const model: RequestUpdateSiteModel = {
      id: this.siteId!,
      name: this.nameControl.value,
      newDocuments: Array.from(this.filesToUpload).map((item) => item.file),
    };

    this.store$.dispatch(
      siteActions.siteUpdateAction({
        payload: model,
        searchParams: this.nzModalData.searchParams,
      })
    );
  }

  deleteUploadFile(file: { fileName: string; file: File; id: number }): void {
    this.filesToUpload.delete(file);
  }

  private create(): void {
    const model: RequestCreateSiteModel = {
      locationId: this.nzModalData.locationId!,
      name: this.nameControl.value,
      documents: Array.from(this.filesToUpload).map((item) => item.file),
    };

    this.store$.dispatch(
      siteActions.siteCreateAction({
        payload: model,
        searchParams: this.nzModalData.searchParams,
      })
    );
  }

  downloadDocument(file: SiteDocumentModel): void {
    this.store$.dispatch(
      siteActions.downloadSiteDocumentAction({
        payload: { documentId: file.id, fileName: file.name },
      })
    );
  }

  deleteDocument(id: string): void {
    this.store$.dispatch(
      siteActions.siteDocumentDeleteAction({
        payload: { data: { documentId: id }, siteId: this.nzModalData.siteId! },
      })
    );
  }

  handleCancel(): void {
    this.#modal.close();
  }
}
