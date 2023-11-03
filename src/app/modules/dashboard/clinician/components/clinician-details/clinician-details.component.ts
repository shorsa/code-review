import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, filter } from 'rxjs';
import {
  CommonConstants,
  PatternsConstants,
  RoutesConstants,
} from 'src/app/core/constants';
import { PhoneCodeEnum } from 'src/app/shared/enums';
import { markAsDirtyForm } from 'src/app/shared/helpers';
import { ClinicianModel, SelectOptionModel } from 'src/app/shared/models';
import * as clinicianActions from '../../store/clinician.actions';
import * as clinicianSelectors from '../../store/clinician.selectors';
import { RequestCreateClinicianModel, RequestUpdateClinicianModel } from '../../models';
import { selectIsLoading } from 'src/app/app-store/app-state/app-state.selectors';

@Component({
  selector: 'app-clinician-details',
  templateUrl: './clinician-details.component.html',
  styleUrls: ['./clinician-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClinicianDetailsComponent implements OnInit {
  @Input() clinicianId?: string;

  readonly phoneCodes: SelectOptionModel<PhoneCodeEnum>[] = CommonConstants.phoneCodes;
  isLoading$?: Observable<boolean>;
  formGroup!: FormGroup;
  wasAttemptToSubmitForm: boolean = false;
  clinicianDetails?: ClinicianModel;

  constructor(
    private formBuilder: FormBuilder,
    private changeDetection: ChangeDetectorRef,
    private store$: Store,
    private router: Router
  ) {
    this.buildForm();
  }

  ngOnInit() {
    if (this.clinicianId) {
      this.store$.dispatch(
        clinicianActions.clinicianGetByIdAction({ payload: { id: this.clinicianId } })
      );
    }
    this.initializationSelectors();
  }

  private initializationSelectors(): void {
    this.isLoading$ = this.store$.select(selectIsLoading);

    this.store$
      .select(clinicianSelectors.selectClinicianDetails)
      .pipe(filter((val) => val !== undefined))
      .subscribe((data) => {
        if (!data) return;
        this.clinicianDetails = data;
        this.formGroup.patchValue(this.clinicianDetails);

        this.formGroup.get('firstName')?.setValue(data.applicationUser.firstName);
        this.formGroup.get('lastName')?.setValue(data.applicationUser.lastName);
        this.formGroup.get('email')?.setValue(data.applicationUser.email);
        this.formGroup.get('phone')?.setValue(data.applicationUser.phoneNumber);
        this.formGroup.get('phoneCode')?.setValue(data.applicationUser.phoneCode);

        this.changeDetection.detectChanges();
      });
  }

  private buildForm(): void {
    this.formGroup = this.formBuilder.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [
        null,
        [Validators.required, Validators.pattern(PatternsConstants.PATTERN_EMAIL)],
      ],
      phone: [
        null,
        [
          Validators.required,
          Validators.min(100000000),
          Validators.max(9999999999),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
      phoneCode: [PhoneCodeEnum.England, [Validators.required]],
      jobTitle: [null, [Validators.required]],
      homeAddress: [null, [Validators.required]],
      gmcNumber: [ null,
        [
          Validators.required,
          Validators.min(100000000),
          Validators.max(9999999999),
          Validators.pattern('^[0-9]*$'),
        ],],
    });

    this.formGroup.get('email')?.valueChanges.subscribe((value: string) => {
      this.formGroup
        .get('email')
        ?.setValue(value?.toLocaleLowerCase(), { emitEvent: false });
    });
  }

  submitForm(): void {
    this.wasAttemptToSubmitForm = true;
    markAsDirtyForm(this.formGroup);

    if (this.formGroup.invalid) return;

    if (this.clinicianDetails) {
      this.updateClient();
    } else {
      this.createClient();
    }
  }

  private updateClient(): void {
    const model: RequestUpdateClinicianModel = {
      id: this.clinicianDetails!.id,
      firstName: this.formGroup.value.firstName,
      lastName: this.formGroup.value.lastName,
      phone: this.formGroup.value.phone,
      phoneCode: this.formGroup.value.phoneCode,
      applicationUserId: this.clinicianDetails!.applicationUserId,
      email: this.formGroup.value.email,
      homeAddress: this.formGroup.value.homeAddress,
      jobTitle: this.formGroup.value.jobTitle,
      gmcNumber: this.formGroup.value.gmcNumber,
    };

    this.store$.dispatch(clinicianActions.clinicianUpdateAction({ payload: model }));
  }

  private createClient(): void {
    const model: RequestCreateClinicianModel = {
      firstName: this.formGroup.value.firstName,
      lastName: this.formGroup.value.lastName,
      phone: this.formGroup.value.phone,
      phoneCode: this.formGroup.value.phoneCode,
      email: this.formGroup.value.email,
      homeAddress: this.formGroup.value.homeAddress,
      jobTitle: this.formGroup.value.jobTitle,
      gmcNumber: this.formGroup.value.gmcNumber,
    };

    this.store$.dispatch(clinicianActions.clinicianCreateAction({ payload: model }));
  }

  cancel(): void {
    this.router.navigate([
      RoutesConstants.DASHBOARD_INDEX,
      RoutesConstants.DASHBOARD_CLINICIAN,
    ]);
  }
}
