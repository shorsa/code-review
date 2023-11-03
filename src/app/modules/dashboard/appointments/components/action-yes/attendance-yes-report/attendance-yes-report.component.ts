import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewContainerRef,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Editor, Toolbar } from 'ngx-editor';
import { Observable, Subscription, filter } from 'rxjs';
import { selectIsLoading } from 'src/app/app-store/app-state/app-state.selectors';
import { RoutesConstants } from 'src/app/core/constants';
import { ProductService } from 'src/app/core/services/product.service';
import { markAsDirtyForm } from 'src/app/shared/helpers';
import {
  RequestUpdateAppointmentReportModel,
  ResponseGetAppointmentByIdModel,
} from '../../../models';
import * as appointmentActions from '../../../store/appointments.actions';
import * as appointmentSelectors from '../../../store/appointments.selectors';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ConfirmAttendanceModalComponent } from '../../confirm-attendance-modal/confirm-attendance-modal.component';
import {
  ToSignModalComponent,
  ToSignModalModel,
} from '../to-sign-modal/to-sign-modal.component';

@Component({
  selector: 'app-attendance-yes-report',
  templateUrl: './attendance-yes-report.component.html',
  styleUrls: ['./attendance-yes-report.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AttendanceYesReportComponent implements OnInit, OnDestroy {
  @Input() appointmentId!: string;

  @Output() handleNextTab = new EventEmitter();
  @Output() handlePrevTab = new EventEmitter();
  
  private subscriptions$: Subscription = new Subscription();
  voiceFiles?: Blob[];

  editor?: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['ordered_list', 'bullet_list'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];
  errorMessage?: string;
  wasAttemptToSubmitForm: boolean = false;
  isLoading$?: Observable<boolean>;
  formGroup!: FormGroup;
  userName?: string;
  userDob?: string;
  appointmentDetails?: ResponseGetAppointmentByIdModel;
  isShowRecord: boolean = false;
  clientTemplateHeading?: string;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private changeDetection: ChangeDetectorRef,
    private store$: Store,
    private readonly productService: ProductService,
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef
  ) {
    this.editor = new Editor();
    this.buildForm();
  }

  ngOnInit(): void {
    this.initializationSelects();
    this.getClientTemplateHeading();
  }

  navigateToAppointmentsTable(): void {
    this.router.navigate([
      RoutesConstants.DASHBOARD_INDEX,
      RoutesConstants.DASHBOARD_APPOINTMENTS,
    ]);
  }

  handleSubmitForm(isSubmit: boolean = false): void {
    this.wasAttemptToSubmitForm = true;
    markAsDirtyForm(this.formGroup);

    if (this.formGroup.invalid) return;

    this.singAppointmentReport(isSubmit);
  }

  onChangeRedFlag(value: boolean): void {
    this.formGroup.get('isRedFlag')?.setValue(value);
  }

  onChangeIsUrgent(value: boolean): void {
    this.formGroup.get('isUrgent')?.setValue(value);
  }

  onChangeVoiceFiles(voiceFiles: Blob[]): void {
    this.voiceFiles = voiceFiles;
  }

  private buildForm(): void {
    this.formGroup = this.formBuilder.group({
      report: [null],
      isUrgent: [false],
      isRedFlag: [false],
    });
  }

  private singAppointmentReport(isSubmit: boolean): void {
    const model: RequestUpdateAppointmentReportModel = {
      appointmentId: this.appointmentId,
      report: this.formGroup.value.report,
      isSubmit,
      isRedFlag: this.formGroup.value.isRedFlag,
      isUrgent: this.formGroup.value.isUrgent,
      voiceFiles: this.voiceFiles,
    };

    if (!isSubmit) {
      this.store$.dispatch(
        appointmentActions.appointmentUpdateReportAction({
          payload: model,
        })
      );
      return;
    }

    this.modal.create<ToSignModalComponent, ToSignModalModel>({
      nzTitle: 'Do you want to sign the report?',
      nzWidth: '484px',
      nzMaskClosable: false,
      nzContent: ToSignModalComponent,
      nzData: {
        data: model,
      },
      nzViewContainerRef: this.viewContainerRef,
      nzFooter: null,
    });
  }

  private initializationSelects(): void {
    this.isLoading$ = this.store$.select(selectIsLoading);

    this.subscriptions$.add(
      this.store$
        .select(appointmentSelectors.selectAppointmentDetails)
        .pipe(filter((val) => !!val))
        .subscribe((data) => {
          this.appointmentDetails = data!;
          if (data!.voiceTranscryptionMessage) {
            this.isShowRecord = !!data!.voiceTranscryptionMessage;
            this.formGroup.get('isRedFlag')?.setValue(this.appointmentDetails.isRedFlag);
            this.formGroup.get('isUrgent')?.setValue(this.appointmentDetails.isUrgent);
            this.formGroup.get('report')?.setValue(this.appointmentDetails.report);
          }
        })
    );

    this.subscriptions$.add(
      this.store$
        .select(appointmentSelectors.selectPatientDetails)
        .pipe(filter((val) => !!val))
        .subscribe((data) => {
          this.userDob = data?.dateOfBirth;
          this.userName = data?.name;
        })
    );
  }

  private getClientTemplateHeading(): void {
    this.productService
      .getTemplateHeadingByAppointmentId(this.appointmentId)
      .pipe(filter((val) => !!val))
      .subscribe((templateHeading) => {
        this.clientTemplateHeading = templateHeading.templateHeading;
        this.changeDetection.detectChanges();
      });
  }

  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }
}
