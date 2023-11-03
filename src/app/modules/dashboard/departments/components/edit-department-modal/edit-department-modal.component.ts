import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, filter } from 'rxjs';
import { selectIsLoading } from 'src/app/app-store/app-state/app-state.selectors';
import { CommonConstants, PatternsConstants } from 'src/app/core/constants';
import { markAsDirtyForm } from 'src/app/shared/helpers';
import { ComponentChanges, DepartmentModel } from 'src/app/shared/models';
import { RequestCreateDepartmentModel, RequestUpdateDepartmentModel } from '../../models';
import * as departmentActions from '../../store/department.actions';
import * as departmentSelectors from '../../store/department.selectors';
import { PermissionClaimsEnum } from 'src/app/shared/enums';
import { UserPermissionsProvider } from 'src/app/shared/providers/user-permissions.provider';

@Component({
  selector: 'app-edit-department-modal',
  templateUrl: './edit-department-modal.component.html',
  styleUrls: ['./edit-department-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DepartmentEditModalComponent implements OnInit, OnChanges, OnDestroy {
  @Output() isVisibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  set isVisible(val: boolean) {
    this.modalState = val;
    this.isVisibleChange.emit(this.modalState);
  }

  @Input()
  get isVisible(): boolean {
    return this.modalState;
  }

  @Output() handleClose: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() editDepartmentId?: string;
  @Input() width: string = 'auto';
  @Input() title: string = '';
  @Input() viewOnly?: boolean;

  readonly patientTimeFrameInHoursListOptions =
    CommonConstants.patientTimeFrameListOptions;
  readonly departmentUpdatePermission = PermissionClaimsEnum.DepartmentUpdate;

  _viewOnly: boolean = false;
  selectedTabIndex: number = 0;
  modalState: boolean = false;
  wasAttemptToSubmitForm: boolean = false;
  isLoading$?: Observable<boolean>;
  clientId?: string;
  formGroup!: FormGroup;
  departmentInitDetails?: DepartmentModel;

  constructor(
    private readonly userPermissionsProvider: UserPermissionsProvider,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private changeDetection: ChangeDetectorRef,
    private store$: Store
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.initializationVariables();
    this.initializingSelectors();
  }

  ngOnChanges(changes: ComponentChanges<DepartmentEditModalComponent>): void {
    if (
      changes?.editDepartmentId?.currentValue !== changes?.editDepartmentId?.previousValue
    ) {
      this.getDepartmentDetails();
    }
    if (changes?.viewOnly?.currentValue !== changes?.viewOnly?.previousValue) {
      this._viewOnly = changes?.viewOnly?.currentValue ?? false;
      if (this._viewOnly) {
        this.formGroup.get('name')?.disable();
        this.formGroup.get('alertsEmail')?.disable();
      } else {
        this.formGroup.get('name')?.enable();
        this.formGroup.get('alertsEmail')?.enable();
      }
    }
  }

  get getIsClientRole(): boolean {
    return (
      this.userPermissionsProvider.isClientSuperuser ||
      this.userPermissionsProvider.isClientAdministrator
    );
  }

  private initializingSelectors(): void {
    this.isLoading$ = this.store$.select(selectIsLoading);

    this.store$
      .select(departmentSelectors.selectDepartmentDetails)
      .pipe(filter((val) => val !== undefined))
      .subscribe((data) => {
        this.departmentInitDetails = data;

        this.formGroup.patchValue(data!);
        this.changeDetection.detectChanges();
      });
  }

  private getDepartmentDetails(): void {
    if (!this.editDepartmentId) return;
    this.store$.dispatch(
      departmentActions.departmentGetByIdAction({
        payload: { id: this.editDepartmentId! },
      })
    );
  }

  selectedIndexChange(tabIndex: number): void {
    this.selectedTabIndex = tabIndex;
  }

  private buildForm(): void {
    this.formGroup = this.formBuilder.group({
      name: [{ value: null, disabled: this._viewOnly }, [Validators.required]],
      alertsEmail: [
        { value: null, disabled: this._viewOnly },
        [Validators.required, Validators.pattern(PatternsConstants.PATTERN_EMAIL)],
      ],
      patientTimeFrameInHours: [
        { value: null, disabled: this._viewOnly },
        [Validators.required],
      ],
    });
  }

  private initializationVariables(): void {
    this.route.queryParams.pipe(filter((val) => !!val)).subscribe((params) => {
      this.clientId = params[CommonConstants.QUERY_ID];
    });
  }

  handleCancel() {
    if (this.editDepartmentId) {
      this.handleClose.emit();
    }
    this.isVisible = false;
  }

  submitForm(): void {
    this.wasAttemptToSubmitForm = true;
    markAsDirtyForm(this.formGroup);

    if (this.formGroup.invalid) return;

    if (this.departmentInitDetails) {
      this.handleUpdate();
    } else {
      this.handleAddNew();
    }
  }

  handleUpdate(): void {
    const model: RequestUpdateDepartmentModel = {
      id: this.departmentInitDetails!.id,
      name: this.formGroup.value.name,
      email: this.formGroup.value.alertsEmail,
      alertsEmail: this.formGroup.value.alertsEmail,
      clientId: this.clientId!,
      patientTimeFrameInHours: this.formGroup.value.patientTimeFrameInHours,
    };

    this.store$.dispatch(departmentActions.departmentUpdateAction({ payload: model }));
  }

  handleAddNew(): void {
    const model: RequestCreateDepartmentModel = {
      name: this.formGroup.value.name,
      email: this.formGroup.value.alertsEmail,
      alertsEmail: this.formGroup.value.alertsEmail,
      clientId: this.clientId!,
      patientTimeFrameInHours: this.formGroup.value.patientTimeFrameInHours,
    };

    this.store$.dispatch(departmentActions.departmentCreateAction({ payload: model }));
  }

  ngOnDestroy(): void {
    this.store$.dispatch(departmentActions.clearDepartmentDetailsDataAction());
  }
}
