import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable, Subscription } from 'rxjs';
import { selectIsLoading } from 'src/app/app-store/app-state/app-state.selectors';
import { CommonMessagesConstants } from 'src/app/core/constants';
import { ResponseGetDepartmentOptionsModelIdem } from '../../../departments/models';
import {
  RequestTransferPatientsToDepartmentModel,
  ResponsePatientListItem,
  TransferPatientRequestModel,
} from '../../models/patients';
import * as patientActions from '../../store/patient.actions';
import * as patientSelectors from '../../store/patient.selectors';

@Component({
  selector: 'app-transfer-to-department-modal',
  templateUrl: './transfer-to-department-modal.component.html',
  styleUrls: ['./transfer-to-department-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransferToDepartmentModalComponent implements OnInit, OnDestroy {
  private subscriptions$: Subscription = new Subscription();

  readonly #modal = inject(NzModalRef);
  readonly nzModalData: { patientsToTransfer: ResponsePatientListItem[] } =
    inject(NZ_MODAL_DATA);
  wasAttemptToSubmitForm: boolean = false;
  isLoading$?: Observable<boolean>;
  departmentListOptions$?: Observable<
    { [key: string]: ResponseGetDepartmentOptionsModelIdem[] } | undefined
  >;

  formGroup!: FormGroup;

  constructor(
    private store$: Store,
    private formBuilder: FormBuilder,
    private notification: NzNotificationService
  ) {
    this.buildForm();
  }

  ngOnInit() {
    this.store$.dispatch(
      patientActions.getDepartmentOptionsAction({
        payload: {
          pageIndex: 0,
          pageSize: 500,
          clientIds: this.nzModalData.patientsToTransfer.map(
            (item) => item.clientUser.clientId
          ),
        },
      })
    );

    this.initializingSelectors();

    this.nzModalData.patientsToTransfer.forEach((item) => {
      const formGroupArrayItemData = {
        patientId: [item.id],
        name: [
          `${item.clientUser.applicationUser.firstName} ${item.clientUser.applicationUser.lastName}`,
        ],
        departmentName: [
          item.clientUser?.clientUserDepartments?.map(
            (department) => department.departmentName
          ),
        ],
        departmentIds:
          [item.clientUser?.clientUserDepartments?.map((item) => item.departmentId)] ||
          [],
        clientId: [item.clientUser.client.id],
        clientName: [item.clientUser.client.fullName],
      };

      const patientFormGroup = this.formBuilder.group(formGroupArrayItemData);
      this.getPatientsFormArray.push(patientFormGroup);
    });
  }

  get getPatientsFormArray(): FormArray {
    return this.formGroup.get('patients') as FormArray;
  }

  handleResetNewDepartment(): void {
    const patientsArray = this.formGroup.get('patients') as FormArray;
    const firstDepartmentIds = patientsArray.at(0)?.get('departmentIds')?.value;

    const isSame = patientsArray.controls.every(
      (control) => control.get('departmentIds')?.value === firstDepartmentIds
    );
    if (!isSame) {
      this.formGroup.get('departmentIds')?.setValue(null);
    }
  }

  handleCancel(): void {
    this.#modal.close();
  }

  handleTransfer(): void {
    const isEmpty = this.getPatientsFormArray.controls.every(
      (control) => !!control.value.departmentIds == false
    );

    if (isEmpty) {
      this.notification.blank(
        CommonMessagesConstants.NOTIFICATION_DEPARTMENT_EMPTY,
        CommonMessagesConstants.NOTIFICATION_DEPARTMENT_EMPTY_MESSAGE
      );
      return;
    }

    const patientDepartments: TransferPatientRequestModel[] =
      this.getPatientsFormArray.controls
        .filter((item) => item.value.departmentIds)
        .map((item) => ({
          patientId: item.value.patientId,
          departmentIds: item.value.departmentIds,
        }));

    const model: RequestTransferPatientsToDepartmentModel = {
      patientDepartments,
    };

    this.store$.dispatch(patientActions.transferToDepartmentAction({ payload: model }));
  }

  private buildForm(): void {
    this.formGroup = this.formBuilder.group({
      departmentIds: [null],
      patients: this.formBuilder.array([]),
    });

    this.subscriptions$.add(
      this.formGroup.get('departmentIds')?.valueChanges.subscribe((value) => {
        if (!value) return;
        this.getPatientsFormArray.controls.forEach((item) => {
          item.get('departmentIds')?.setValue(value);
        });
      })
    );
  }

  private initializingSelectors(): void {
    this.isLoading$ = this.store$.select(selectIsLoading);

    this.departmentListOptions$ = this.store$.select(
      patientSelectors.selectDepartmentOptions
    );
  }

  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }
}
