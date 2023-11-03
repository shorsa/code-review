import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription, combineLatest, filter } from 'rxjs';
import { selectIsLoading } from 'src/app/app-store/app-state/app-state.selectors';
import { CommonConstants, PatternsConstants } from 'src/app/core/constants';
import { markAsDirtyForm } from 'src/app/shared/helpers/mark-as-dirty-form.helper';
import { RequestResetPasswordModel } from '../../models';
import { addNewPasswordAction, resetPasswordAction } from '../../store/auth.actions';
import { selectCodeAndEmail } from '../../store/auth.selectors';

@Component({
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewPasswordComponent implements OnInit, OnDestroy {
  private subscriptions$: Subscription = new Subscription();

  showPassword: boolean = false;

  formGroup!: FormGroup;
  wasAttemptToSubmitForm: boolean = false;

  email?: string;
  code?: string;
  isUseForAddPassword: boolean = false;

  isLoading$?: Observable<boolean>;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private store$: Store
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.initializingSelectors();
  }

  validateConfirmPassword(): void {
    setTimeout(() => this.formGroup.get('confirm')!.updateValueAndValidity());
  }

  handleSubmitForm(): void {
    this.wasAttemptToSubmitForm = true;

    markAsDirtyForm(this.formGroup);

    if (this.formGroup.invalid) return;

    const model: RequestResetPasswordModel = {
      email: this.email!,
      code: this.code!,
      password: this.formGroup.value.password,
    };

    if (this.isUseForAddPassword) {
      this.addNewPassword(model);
    } else {
      this.resetPassword(model);
    }
  }

  resetPassword(model: RequestResetPasswordModel): void {
    this.store$.dispatch(resetPasswordAction({ payload: model }));
  }

  addNewPassword(model: RequestResetPasswordModel): void {
    this.store$.dispatch(addNewPasswordAction({ payload: model }));
  }

  private confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.formGroup?.get('password')?.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  private initializingSelectors(): void {
    this.isLoading$ = this.store$.select(selectIsLoading);

    this.subscriptions$.add(
      combineLatest([
        this.activatedRoute.data,
        this.activatedRoute.queryParams,
      ]).subscribe(([data, params]) => {
        this.isUseForAddPassword = (data as { isAddPassword: boolean }).isAddPassword;
        const email = params[CommonConstants.QUERY_EMAIL];
        const code = params[CommonConstants.QUERY_CODE];
        if (email && code) {
          this.code = code;
          this.email = email;
        }
      })
    );

    this.subscriptions$.add(
      this.store$
        .select(selectCodeAndEmail)
        .pipe(filter((val) => val !== undefined))
        .subscribe(({ email, code }) => {
          if (email && code) {
            this.email = email;
            this.code = code;
            return;
          }
        })
    );
  }

  private buildForm(): void {
    this.formGroup = this.formBuilder.group({
      password: [
        '',
        [Validators.required, Validators.pattern(PatternsConstants.PATTERN_PASSWORD)],
      ],
      confirm: [
        '',
        [
          Validators.required,
          Validators.pattern(PatternsConstants.PATTERN_PASSWORD),
          this.confirmValidator,
        ],
      ],
    });

    this.subscriptionsFormChanges();
  }

  private subscriptionsFormChanges(): void {
    this.subscriptions$.add(
      this.formGroup.get('password')?.valueChanges.subscribe((res) => {
        if (res.includes(' ')) {
          this.formGroup.get('password')!.setValue(res.trim());
        }
      })
    );

    this.subscriptions$.add(
      this.formGroup.get('confirm')?.valueChanges.subscribe((res) => {
        if (res.includes(' ')) {
          this.formGroup.get('confirm')!.setValue(res.trim());
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }
}
