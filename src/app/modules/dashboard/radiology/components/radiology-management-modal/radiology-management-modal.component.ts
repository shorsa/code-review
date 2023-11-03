import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { Observable, Subscription, combineLatest, startWith } from 'rxjs';
import { selectIsLoading } from 'src/app/app-store/app-state/app-state.selectors';
import { RadiologyService } from 'src/app/core/services/radiology.service';
import { fadeDownInput } from 'src/app/shared/animation/animated-ngif-fade-down-input';
import {
  AuthenticationProvider,
  getDateTimeWithCurrentTimezone,
  markAsDirtyForm,
} from 'src/app/shared/helpers';
import { RequestCreateMriRequestModel } from '../../models';
import * as radiologyActions from '../../store/radiology.actions';

export interface RadiologyManagementModalModel {
  appointmentId: string;
  dateOfBirth?: string;
}

@Component({
  selector: 'app-radiology-management-modal',
  templateUrl: './radiology-management-modal.component.html',
  styleUrls: ['./radiology-management-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeDownInput],
})
export class RadiologyManagementModalComponent implements OnInit, OnDestroy {
  private subscriptions$: Subscription = new Subscription();

  readonly #modal = inject(NzModalRef);
  readonly nzModalData: RadiologyManagementModalModel = inject(NZ_MODAL_DATA);

  isLoading$?: Observable<boolean>;
  formGroup!: FormGroup;
  wasAttemptToSubmitForm: boolean = false;
  scanTypeListOption?: string[];

  constructor(
    private formBuilder: FormBuilder,
    private authenticationProvider: AuthenticationProvider,
    private store$: Store,
    private readonly radiologyService: RadiologyService
  ) {
    this.buildForm();
  }

  get getIsShowContractsStudies(): boolean {
    const formGroupValue = this.formGroup.value;
    return (
      formGroupValue.isPatientOlderThan65 ||
      formGroupValue.hypertension ||
      formGroupValue.diabetes ||
      formGroupValue.gout ||
      formGroupValue.renalDiseaseOrSurgery ||
      formGroupValue.liverDiseaseOrTransplant
    );
  }

  private get userIsOlderThan65(): boolean {
    if (!this.nzModalData.dateOfBirth) return false;
    const birthDate = new Date(this.nzModalData.dateOfBirth);
    const currentTime = new Date();
    const age = currentTime.getFullYear() - birthDate.getFullYear();
    const isOlderThan65 =
      age > 65 ||
      (age === 65 && currentTime.getMonth() > birthDate.getMonth()) ||
      (age === 65 &&
        currentTime.getMonth() === birthDate.getMonth() &&
        currentTime.getDate() >= birthDate.getDate());

    return isOlderThan65;
  }

  ngOnInit() {
    this.initializationSelects();
    this.getMriTypeList();
    this.formGroup.get('isPatientOlderThan65')?.setValue(this.userIsOlderThan65);
    this.subscriptionsFormChanges();
  }

  handleSubmitForm(): void {
    this.wasAttemptToSubmitForm = true;

    markAsDirtyForm(this.formGroup);

    if (this.formGroup.invalid) return;

    this.create();
  }

  private create(): void {
    const model: RequestCreateMriRequestModel = {
      appointmentId: this.nzModalData.appointmentId,
      ...this.formGroup.value,
      dateChecked: getDateTimeWithCurrentTimezone(
        this.formGroup.get('dateChecked')?.value
      ),
      referralDate: getDateTimeWithCurrentTimezone(
        this.formGroup.get('referralDate')?.value
      ),
    };

    this.store$.dispatch(radiologyActions.mriCreateAction({ payload: model }));
    this.#modal.close(true)
  }

  handleCancel(): void {
    this.#modal.close();
  }

  private initializationSelects(): void {
    this.isLoading$ = this.store$.select(selectIsLoading);
  }

  getMriTypeList(): void {
    this.radiologyService.getMriTypes().subscribe({
      next: (res) => {
        this.scanTypeListOption = res.mriTypes;
      },
    });
  }

  private buildForm(): void {
    const userName = this.authenticationProvider.getUserName();

    this.formGroup = this.formBuilder.group({
      mriTypes: [null, Validators.required],
      details: [null, Validators.required],
      isPatientOlderThan65: [false],
      hypertension: [false],
      diabetes: [false],
      gout: [false],
      renalDiseaseOrSurgery: [false],
      liverDiseaseOrTransplant: [false],
      serumCreatinine: [null],
      eGFR: [null],
      dateChecked: [null],
      referrerName: [{ value: userName, disabled: true }],
      referralDate: [{ value: new Date(), disabled: true }],
    });
  }

  private subscriptionsFormChanges(): void {
    combineLatest([
      this.formGroup
        .get('isPatientOlderThan65')!
        .valueChanges.pipe(startWith(this.formGroup.get('isPatientOlderThan65')!.value)),
      this.formGroup
        .get('hypertension')!
        .valueChanges.pipe(startWith(this.formGroup.get('hypertension')!.value)),
      this.formGroup
        .get('diabetes')!
        .valueChanges.pipe(startWith(this.formGroup.get('diabetes')!.value)),
      this.formGroup
        .get('gout')!
        .valueChanges.pipe(startWith(this.formGroup.get('gout')!.value)),
      this.formGroup
        .get('renalDiseaseOrSurgery')!
        .valueChanges.pipe(startWith(this.formGroup.get('renalDiseaseOrSurgery')!.value)),
      this.formGroup
        .get('liverDiseaseOrTransplant')!
        .valueChanges.pipe(
          startWith(this.formGroup.get('liverDiseaseOrTransplant')!.value)
        ),
    ]).subscribe(
      ([
        isPatientOlderThan65Value,
        hypertensionValue,
        diabetesValue,
        goutValue,
        renalDiseaseOrSurgeryValue,
        liverDiseaseOrTransplantValue,
      ]) => {
        const serumCreatinineControl = this.formGroup.get('serumCreatinine');
        const eGFRControl = this.formGroup.get('eGFR');
        const dateCheckedControl = this.formGroup.get('dateChecked');

        const isShowAdditionalFields =
          isPatientOlderThan65Value ||
          hypertensionValue ||
          diabetesValue ||
          goutValue ||
          renalDiseaseOrSurgeryValue ||
          liverDiseaseOrTransplantValue;

        if (isShowAdditionalFields) {
          serumCreatinineControl?.setValidators(Validators.required);
          eGFRControl?.setValidators(Validators.required);
          dateCheckedControl?.setValidators(Validators.required);
        } else {
          serumCreatinineControl?.setValidators(null);
          serumCreatinineControl?.setValue(null);
          eGFRControl?.setValidators(null);
          eGFRControl?.setValue(null);
          dateCheckedControl?.setValidators(null);
          dateCheckedControl?.setValue(null);
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }
}
