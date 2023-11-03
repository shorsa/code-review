import {
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { NZ_MODAL_DATA, NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Observable } from 'rxjs';
import { selectIsLoading } from 'src/app/app-store/app-state/app-state.selectors';
import { RadiologyService } from 'src/app/core/services/radiology.service';
import * as radiologyActions from '../../store/radiology.actions';
import {
  DismissConfirmModalComponent,
  DismissConfirmModalModel,
} from '../dismiss-confirm-modal/dismiss-confirm-modal.component';

export interface ViewRadiologyModalModel {
  mriId: string;
  isPrinted: boolean;
}

@Component({
  selector: 'app-view-radiology-modal',
  templateUrl: './view-radiology-modal.component.html',
  styleUrls: ['./view-radiology-modal.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewRadiologyModalComponent implements OnInit {
  readonly #modal = inject(NzModalRef);
  readonly nzModalData: ViewRadiologyModalModel = inject(NZ_MODAL_DATA);

  isLoading$?: Observable<boolean>;
  pdfUrl?: string;
  safeUrl?: SafeResourceUrl;
  isPrinted?: boolean;

  constructor(
    private store$: Store,
    private radiologyService: RadiologyService,
    private changeDetector: ChangeDetectorRef,
    private sanitizer: DomSanitizer,
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef
  ) {
    this.isPrinted = this.nzModalData.isPrinted;
  }

  ngOnInit() {
    this.isLoading$ = this.store$.select(selectIsLoading);

    this.getRadiologyContent();
  }

  onPrint(iframe: any): void {
    iframe.contentWindow.print();
    this.markAsPrinted();
  }

  onShowDismissModal(): void {
    this.modal.create<DismissConfirmModalComponent, DismissConfirmModalModel>({
      nzWidth: '484px',
      nzMaskClosable: false,
      nzContent: DismissConfirmModalComponent,
      nzData: {
        mriId: this.nzModalData.mriId,
      },
      nzViewContainerRef: this.viewContainerRef,
      nzFooter: null,
    });
  }

  private markAsPrinted(): void {
    this.store$.dispatch(
      radiologyActions.mriMarkAsPrintedAction({
        payload: { id: this.nzModalData.mriId },
      })
    );

    this.isPrinted = true;
  }

  private getRadiologyContent(): void {
    this.radiologyService.getMriRequestByIdWithContent(this.nzModalData.mriId).subscribe({
      next: (val) => {
        this.pdfUrl = URL.createObjectURL(val);
        this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.pdfUrl);

        this.changeDetector.detectChanges();
      },
    });
  }
}
