import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NgxPermissionsService } from 'ngx-permissions';
import { Observable, Subscription, filter } from 'rxjs';
import { selectIsLoading } from 'src/app/app-store/app-state/app-state.selectors';
import {
  CommonConstants,
  PatternsConstants,
  RoutesConstants,
} from 'src/app/core/constants';
import { GenderEnum, PermissionClaimsEnum, PhoneCodeEnum } from 'src/app/shared/enums';
import { markAsDirtyForm } from 'src/app/shared/helpers';
import { PatientJobModel, SelectOptionModel } from 'src/app/shared/models';
import { UserPermissionsProvider } from 'src/app/shared/providers/user-permissions.provider';
import {
  RequestCreatePatientModel,
  RequestUpdatePatientModal,
  ResponsePatientDetails,
  UpsertPatientJobModel,
} from '../../models/patients';
import * as patientActions from '../../store/patient.actions';
import * as patientSelectors from '../../store/patient.selectors';
import { fadeDownInput } from 'src/app/shared/animation/animated-ngif-fade-down-input';

@Component({
  selector: 'app-patient-personal-details',
  templateUrl: './patient-personal-details.component.html',
  styleUrls: ['./patient-personal-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeDownInput],
})
export class PatientPersonalDetailsComponent implements OnInit, OnDestroy {
  @Input() patientId?: string;

  private subscriptions$: Subscription = new Subscription();

  readonly phoneCodes: SelectOptionModel<PhoneCodeEnum>[] = CommonConstants.phoneCodes;
  readonly genderList: SelectOptionModel<GenderEnum>[] = CommonConstants.genderList;

  readonly patientViewDetailsPermission = PermissionClaimsEnum.PatientViewDetails;
  readonly patientCreatePermission = PermissionClaimsEnum.PatientCreate;
  readonly patientUpdatePermission = PermissionClaimsEnum.PatientUpdate;
  readonly patientUnlockPermission = PermissionClaimsEnum.PatientUnlock;
  readonly patientDeactivatePermission = PermissionClaimsEnum.PatientDeactivate;
  readonly patientActivatePermission = PermissionClaimsEnum.PatientActivate;
  readonly patientMergePermission = PermissionClaimsEnum.PatientMerge;
  readonly patientTransferPermission = PermissionClaimsEnum.PatientUpdateDepartment;
  readonly permittedFileTypes: string[] = ['', 'pdf', 'doc', 'docx'];

  isLoading$?: Observable<boolean>;
  formGroup!: FormGroup;
  wasAttemptToSubmitForm: boolean = false;
  patientDetails?: ResponsePatientDetails;
  departmentListOptions?: SelectOptionModel[];
  clientListOptions?: SelectOptionModel[];

  constructor(
    private formBuilder: FormBuilder,
    private changeDetection: ChangeDetectorRef,
    private store$: Store,
    private router: Router,
    private ngxPermissionsService: NgxPermissionsService,
    private readonly userPermissionsProvider: UserPermissionsProvider
  ) {
    this.buildForm();
  }

  ngOnInit() {
    this.store$.dispatch(
      patientActions.getClientOptionsAction({
        payload: { pageIndex: 0, pageSize: CommonConstants.PAGE_SIZE_OPTIONS[1] },
      })
    );
    this.initializationSelects();
  }

  get getCannotViewEmail(): boolean {
    return (
      this.userPermissionsProvider.isClientAdministrator ||
      this.userPermissionsProvider.isClientSuperuser
    );
  }

  get getIsClinician(): boolean {
    return this.userPermissionsProvider.isClinician;
  }

  get getJobsFormArray(): FormArray {
    return this.formGroup.get('patientJobs') as FormArray;
  }

  get getOccupationalHistories(): FormArray {
    return this.formGroup.get('occupationalHistories') as FormArray;
  }

  get getCanUpdatePermission(): boolean {
    return !!this.ngxPermissionsService.getPermission(this.patientCreatePermission);
  }

  getJobFormGroup(i: number): FormGroup {
    return this.getJobsFormArray.controls[i] as FormGroup;
  }

  getOccupationalHistoryFormGroup(i: number): FormGroup {
    return this.getOccupationalHistories.controls[i] as FormGroup;
  }

  handleUpload(event: Event, index: number): void {
    const inputEl = event.target as HTMLInputElement;
    if (!inputEl.files?.length) return;

    const file: File = inputEl.files[0];

    const currentControl: FormGroup = this.getJobsFormArray
      .at(index)
      .get('patientJobDocuments') as FormGroup;
    if (currentControl.value) {
      currentControl.setValue([
        ...currentControl.value,
        { id: null, file: file, name: file.name },
      ]);
      return;
    }
    currentControl.setValue([{ id: null, file: file, name: file.name }]);
  }

  getJobFiles(index: number): { id?: string; file: File; name: string }[] {
    const currentControl: FormGroup = this.getJobsFormArray
      .at(index)
      .get('patientJobDocuments') as FormGroup;

    return currentControl.value;
  }

  handleDeleteLocalFile(groupIndex: number, fileIndex: number): void {
    const filesDataArray = this.getJobsFormArray
      .at(groupIndex)
      .get('patientJobDocuments')!.value as {
      id?: string;
      file: File;
    }[];

    filesDataArray.splice(fileIndex, 1);
  }

  get getFilesTypesForInputAccept(): string {
    return this.permittedFileTypes.join(', .');
  }

  handleAddHistory(index: number, historyValue?: string): void {
    if (!historyValue) {
      markAsDirtyForm(this.getOccupationalHistories.at(index) as FormGroup);
    }

    const firstControl = this.getOccupationalHistories.at(0).get('occupationalHistory');

    if (!firstControl?.value) {
      if (historyValue) {
        firstControl?.setValue(historyValue);
      }
      firstControl!.setValidators(Validators.required);
      firstControl!.updateValueAndValidity();
      markAsDirtyForm(this.getOccupationalHistories.at(0) as FormGroup);
      return;
    }

    if (this.getOccupationalHistories.valid) {
      this.getOccupationalHistories.push(
        this.formBuilder.group({
          occupationalHistory: [historyValue ?? null, Validators.required],
        })
      );
    }
  }

  handleAddJob(index: number, value?: PatientJobModel): void {
    if (!value) {
      markAsDirtyForm(this.getJobsFormArray.at(index) as FormGroup);
    }
    const firstGroupControlTitle = this.getJobsFormArray.at(0).get('title');

    if (
      !firstGroupControlTitle?.value &&
      !this.getJobsFormArray.at(0).get('notAvailable')?.value
    ) {
      firstGroupControlTitle!.setValidators(Validators.required);
      firstGroupControlTitle!.updateValueAndValidity();
      markAsDirtyForm(this.getJobsFormArray.at(0) as FormGroup);
      return;
    }
    if (value && !index) {
      this.getJobsFormArray.at(0).enable({ emitEvent: false });
      this.getJobsFormArray.at(0)?.setValue(
        {
          id: value?.id ?? null,
          title: value?.title ?? null,
          startDate: value?.startDate ? new Date(value?.startDate) : null,
          description: value?.description ?? null,
          notAvailable: value?.notAvailable ?? false,
          patientJobDocuments:
            value?.patientJobDocuments.map((item) => ({
              name: item.name,
              id: item.id,
            })) ?? [],
        },
        { emitEvent: false }
      );
      if (value.title || value.startDate || value.description) {
        this.getJobsFormArray
          .at(0)
          .get('notAvailable')
          ?.setValue(false, { emitEvent: false });
      } else {
        this.getJobsFormArray.at(0).get('title')?.disable({ emitEvent: false });
        this.getJobsFormArray.at(0).get('startDate')?.disable({ emitEvent: false });
        this.getJobsFormArray.at(0).get('description')?.disable({ emitEvent: false });
      }

      if (this.getIsClinician) {
        Array.from(this.getJobsFormArray.controls).forEach((element) => {
          (element as FormGroup).disable();
        });
      }
      return;
    }

    if (this.getJobsFormArray.valid) {
      this.getJobsFormArray.push(
        this.formBuilder.group(
          {
            id: [value?.id ?? null],
            title: [
              { value: value?.title ?? null, disabled: value?.notAvailable },
              [Validators.required],
            ],
            notAvailable: [value?.notAvailable ?? false],
            startDate: [
              {
                value: value?.startDate ? new Date(value?.startDate) : null,
                disabled: value?.notAvailable,
              },
              Validators.required,
            ],
            description: [
              { value: value?.description ?? null, disabled: value?.notAvailable },
            ],
            patientJobDocuments:
              value?.patientJobDocuments.map((item) => ({
                name: item.name,
                id: item.id,
              })) ?? [],
          },
          { emitEvent: false }
        )
      );
    }
    if (this.getIsClinician) {
      Array.from(this.getJobsFormArray.controls).forEach((element) => {
        (element as FormGroup).disable();
      });
    }
  }

  changeSwitchPatientJob(enable: boolean, formGroup: FormGroup): void {
    if (enable) {
      formGroup.get('title')?.disable({ emitEvent: false });
      formGroup.get('title')?.setValue(null, { emitEvent: false });

      formGroup.get('startDate')?.setValue(null, { emitEvent: false });
      formGroup.get('startDate')?.disable({ emitEvent: false });

      formGroup.get('description')?.disable({ emitEvent: false });
      formGroup.get('description')?.setValue(null, { emitEvent: false });
    } else {
      formGroup.get('title')?.enable({ emitEvent: false });
      formGroup.get('startDate')?.enable({ emitEvent: false });
      formGroup.get('description')?.enable({ emitEvent: false });
    }
  }

  onSearchClient(value: string): void {
    this.store$.dispatch(
      patientActions.getClientOptionsAction({
        payload: {
          searchText: value,
          pageIndex: 0,
          pageSize: CommonConstants.PAGE_SIZE_OPTIONS[1],
        },
      })
    );
  }

  handleDeleteHistory(index: number): void {
    this.getOccupationalHistories.removeAt(index);
  }

  handleDeleteJob(index: number): void {
    this.getJobsFormArray.removeAt(index);
  }

  // setNA(index: number): void {
  //   const currentJobTitle = this.getJobsFormArray.at(index).get('title');
  //   currentJobTitle?.setValue('N/A');
  //   currentJobTitle?.updateValueAndValidity();
  // }

  handleDeleteJobDocument(id: string): void {
    this.store$.dispatch(
      patientActions.deletePatientJobDocumentAction({
        payload: { id },
        patientId: this.patientId!,
      })
    );
  }

  handleSubmitForm(): void {
    this.wasAttemptToSubmitForm = true;

    Array.from(this.getJobsFormArray.controls).forEach((element) => {
      markAsDirtyForm(element as FormGroup);
    });

    markAsDirtyForm(this.formGroup);

    if (this.formGroup.invalid) return;

    if (this.patientDetails) {
      this.updatePatient();
    } else {
      this.createPatient();
    }
  }

  private updatePatient(): void {
    const patientJobs: UpsertPatientJobModel[] = this.getJobsFormArray.value
      .filter((val: UpsertPatientJobModel) => val.title || val.notAvailable)
      .map((item: UpsertPatientJobModel) => {
        const patientJobDocuments = item.patientJobDocuments?.length
          ? item.patientJobDocuments.map((document) => ({
              ...document,
              name: document.name,
              patientJobId: item.id,
            }))
          : [];

        if (item.id) {
          return { ...item, patientId: this.patientDetails!.id, patientJobDocuments };
        }
        return {
          title: item.title,
          startDate: item.startDate,
          notAvailable: item.notAvailable,
          description: item.description,
          patientId: this.patientDetails!.id,
          patientJobDocuments,
        };
      });

    const occupationalHistory = this.getOccupationalHistories.value?.map(
      (item: { occupationalHistory: FormGroup }) => item.occupationalHistory
    );

    const model: RequestUpdatePatientModal = {
      id: this.patientDetails!.id,
      firstName: this.formGroup.value.firstName,
      lastName: this.formGroup.value.lastName,
      dateOfBirth: this.formGroup.value.dateOfBirth,
      pin: this.patientDetails?.pin,
      homeAddress: this.formGroup.value.homeAddress,
      email: this.formGroup.value.email,
      phoneNumber: this.formGroup.value.phoneNumber,
      phoneCode: this.formGroup.value.phoneCode,
      gender: this.formGroup.value.gender,
      confidentialInfo: this.formGroup.value.confidentialInfo,
      patientJobs: patientJobs,
      departmentIds: this.formGroup.value.departmentIds,
      clientUserId: this.patientDetails!.clientUserId,
      occupationalHistory: occupationalHistory,
      clientId: this.formGroup.value.clientId,
      purchaseOrderNumber: this.formGroup.value.purchaseOrderNumber,
    };

    this.store$.dispatch(patientActions.patientUpdateAction({ payload: model }));
  }

  private createPatient(): void {
    const patientJobs: UpsertPatientJobModel[] = this.getJobsFormArray.value
      .filter((val: UpsertPatientJobModel) => val.title || val.notAvailable)
      .map((item: UpsertPatientJobModel) => {
        const patientJobDocuments = item.patientJobDocuments?.length
          ? item.patientJobDocuments.map((document) => ({
              ...document,
              name: document.name,
              patientJobId: item.id,
            }))
          : [];

        if (item.id) {
          return { ...item, patientId: this.patientDetails?.id, patientJobDocuments };
        }
        return {
          title: item.title,
          startDate: item.startDate,
          notAvailable: item.notAvailable,
          description: item.description,
          patientJobDocuments,
        };
      });

    const occupationalHistory = this.getOccupationalHistories.value?.map(
      (item: { occupationalHistory: FormGroup }) => item.occupationalHistory
    );

    const model: RequestCreatePatientModel = {
      firstName: this.formGroup.value.firstName,
      lastName: this.formGroup.value.lastName,
      dateOfBirth: this.formGroup.value.dateOfBirth,
      pin: this.patientDetails?.pin,
      homeAddress: this.formGroup.value.homeAddress,
      email: this.formGroup.value.email,
      phoneNumber: this.formGroup.value.phoneNumber,
      phoneCode: this.formGroup.value.phoneCode,
      gender: this.formGroup.value.gender,
      confidentialInfo: this.formGroup.value.confidentialInfo,
      patientJobs: patientJobs,
      departmentIds: this.formGroup.value.departmentIds,
      occupationalHistory: occupationalHistory,
      clientId: this.formGroup.value.clientId,
      purchaseOrderNumber: this.formGroup.value.purchaseOrderNumber,
    };

    this.store$.dispatch(patientActions.patientCreateAction({ payload: model }));
  }

  cancel(): void {
    this.router.navigate([
      RoutesConstants.DASHBOARD_INDEX,
      RoutesConstants.DASHBOARD_PATIENT,
    ]);
  }

  private initializationSelects(): void {
    this.isLoading$ = this.store$.select(selectIsLoading);

    this.subscriptions$.add(
      this.store$
        .select(patientSelectors.selectClientOptions)
        .pipe(filter((val) => !!val))
        .subscribe((clientOptions) => {
          this.clientListOptions = clientOptions?.map((item) => ({
            label: item.name,
            value: item.id,
          }));
          this.changeDetection.detectChanges();
        })
    );

    this.subscriptions$.add(
      this.store$
        .select(patientSelectors.selectPatientDetails)
        .pipe(filter((val) => val !== undefined))
        .subscribe((data) => {
          if (!data) return;
          this.patientDetails = data;
          this.setPathValue(data);

          this.changeDetection.detectChanges();
        })
    );

    this.subscriptions$.add(
      this.store$
        .select(patientSelectors.selectDepartmentOptions)
        .pipe(filter((val) => !!val))
        .subscribe((departmentOptions) => {
          if (departmentOptions) {
            const clientId = Object.keys(departmentOptions)[0];

            if (!clientId) return;

            this.departmentListOptions = departmentOptions[clientId].map((item) => ({
              label: item.name,
              value: item.id,
            }));
            this.changeDetection.detectChanges();
          }
        })
    );
  }

  private setPathValue(data: ResponsePatientDetails) {
    this.formGroup.get('customPatientId')?.setValue(data.customPatientId);
    this.formGroup.get('identifier')?.setValue(data.identifier);
    this.formGroup.get('firstName')?.setValue(data.clientUser.applicationUser.firstName);
    this.formGroup.get('lastName')?.setValue(data.clientUser.applicationUser.lastName);
    this.formGroup.get('dateOfBirth')?.setValue(data.dateOfBirth);
    this.formGroup.get('homeAddress')?.setValue(data.homeAddress);
    this.formGroup.get('gender')?.setValue(data.gender);
    this.formGroup.get('pin')?.setValue(data.pin);
    this.formGroup.get('phoneCode')?.setValue(data.clientUser.applicationUser.phoneCode);
    this.formGroup
      .get('phoneNumber')
      ?.setValue(data.clientUser.applicationUser.phoneNumber);
    this.formGroup.get('email')?.setValue(data.clientUser.applicationUser.email);
    this.onSearchClient(data.clientUser.client.fullName);
    this.formGroup.get('clientId')?.setValue(data.clientUser.client.id);
    this.formGroup
      .get('departmentIds')
      ?.setValue(data.clientUser.clientUserDepartments?.map((item) => item.departmentId));

    if (data.purchaseOrderNumber) {
      this.formGroup.get('purchaseOrderRequired')?.setValue(true);
      this.formGroup.get('purchaseOrderNumber')?.setValue(data.purchaseOrderNumber);
    }

    data.occupationalHistory?.forEach((value, index) => {
      this.handleAddHistory(index, value);
    });

    data.patientJobs?.forEach((item, index) => {
      this.handleAddJob(index, item);
    });
  }

  private buildForm(): void {
    this.formGroup = this.formBuilder.group({
      customPatientId: [{ value: null, disabled: true }, [Validators.required]],
      identifier: [{ value: null, disabled: true }, [Validators.required]],
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      dateOfBirth: [null, [Validators.required]],
      homeAddress: [null, [Validators.required]],
      email: [null, [Validators.pattern(PatternsConstants.PATTERN_EMAIL)]],
      departmentIds: [null],
      clientId: [null, [Validators.required]],
      purchaseOrderRequired: [false, [Validators.required]],
      purchaseOrderNumber: [null],
      pin: [{ value: null, disabled: true }, [Validators.required]],
      phoneNumber: [
        null,
        [
          Validators.required,
          Validators.min(100000000),
          Validators.max(9999999999),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
      phoneCode: [PhoneCodeEnum.England, [Validators.required]],
      gender: [null],
      patientJobs: this.formBuilder.array([
        this.formBuilder.group({
          id: [{ value: null, disabled: true }],
          title: [{ value: null, disabled: true }, Validators.required],
          notAvailable: [true],
          startDate: [{ value: null, disabled: true }, Validators.required],
          description: [{ value: null, disabled: true }],
          patientJobDocuments: [[]],
        }),
      ]),
      occupationalHistories: this.formBuilder.array([
        this.formBuilder.group({
          occupationalHistory: [null],
        }),
      ]),
    });

    this.subscriptionsFormChanges();
  }

  private subscriptionsFormChanges(): void {
    if (this.getIsClinician) {
      this.formGroup.disable();
      this.formGroup.get('firstName')?.enable();
      this.formGroup.get('lastName')?.enable();
      this.formGroup.get('email')?.enable();
      this.formGroup.get('dateOfBirth')?.enable();
      this.formGroup.get('homeAddress')?.enable();

      Array.from(this.getJobsFormArray.controls).forEach((element) => {
        (element as FormGroup).disable();
      });
    }

    this.subscriptions$.add(
      this.formGroup.get('email')?.valueChanges.subscribe((value: string) => {
        this.formGroup
          .get('email')
          ?.setValue(value?.toLocaleLowerCase(), { emitEvent: false });
      })
    );

    this.subscriptions$.add(
      this.formGroup.get('clientId')?.valueChanges.subscribe((value: string) => {
        if (value) {
          this.store$.dispatch(
            patientActions.getDepartmentOptionsAction({
              payload: {
                clientIds: [value],
                pageIndex: 0,
                pageSize: 500,
              },
            })
          );
          if (this.getIsClinician) return;
          this.formGroup.get('departmentIds')?.enable();
          this.formGroup.get('departmentIds')?.updateValueAndValidity();
        } else {
          this.formGroup.get('departmentIds')?.setValue(null);
          this.formGroup.get('departmentIds')?.disable();
          this.formGroup.get('departmentIds')?.updateValueAndValidity();
          this.store$.dispatch(patientActions.clearDepartmentOptionsSuccessAction());
        }
      })
    );

    this.subscriptions$.add(
      this.formGroup
        .get('purchaseOrderRequired')
        ?.valueChanges.subscribe((value: boolean) => {
          if (value) {
            this.formGroup.get('purchaseOrderNumber')?.enable();
            this.formGroup.get('purchaseOrderNumber')?.updateValueAndValidity();
          } else {
            this.formGroup.get('purchaseOrderNumber')?.setValue(null);
            this.formGroup.get('purchaseOrderNumber')?.disable();
            this.formGroup.get('purchaseOrderNumber')?.updateValueAndValidity();
          }
        })
    );

    // this.subscriptions$.add(
    //   this.formGroup.get('patientJobs')?.valueChanges.subscribe((valueArray) => {
    //     valueArray.forEach((groupValue: PatientJobModel, index: number) => {
    //       const currentGroup = this.getJobsFormArray.at(index);
    //       if (currentGroup.get('title')?.disabled && !groupValue.notAvailable) {
    //         currentGroup.enable({ emitEvent: false });
    //       }
    //       if (currentGroup.enabled && groupValue.notAvailable && groupValue.title) {
    //         currentGroup.disable({ emitEvent: false });
    //         currentGroup.patchValue(
    //           {
    //             id: null,
    //             title: null,
    //             startDate: null,
    //             description: null,
    //             patientJobDocuments: null,
    //           },
    //           { emitEvent: false }
    //         );
    //         currentGroup.get('notAvailable')?.enable({ emitEvent: false });
    //       }
    //     });
    //   })
    // );
  }

  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }
}
