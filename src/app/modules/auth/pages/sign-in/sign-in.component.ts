import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription, filter } from 'rxjs';
import { selectIsLoading } from 'src/app/app-store/app-state/app-state.selectors';
import { PatternsConstants, RoutesConstants } from 'src/app/core/constants';
import { AuthFailedStatus } from 'src/app/shared/enums';
import { LocalStorageHelper } from 'src/app/shared/helpers';
import { markAsDirtyForm } from 'src/app/shared/helpers/mark-as-dirty-form.helper';
import { RequestSignInModel } from '../../models';
import { loginAction, loginAttemptErrorClearAction } from '../../store/auth.actions';
import { selectLoginError } from '../../store/auth.selectors';

@Component({
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent implements OnInit, OnDestroy, AfterViewInit {
  private subscriptions$: Subscription = new Subscription();

  wasAttemptToSubmitForm: boolean = false;
  accountIsLocked: boolean = false;
  hasApiError: boolean = false;

  formGroup!: FormGroup;
  remainingAttempts?: number;
  isLoading$?: Observable<boolean>;

  constructor(
    private formBuilder: FormBuilder,
    private store$: Store,
    private router: Router,
    private changeDetector: ChangeDetectorRef,
    private readonly localStorageHelper: LocalStorageHelper
  ) {
    this.buildForm();
  }

  private set setRememberedEmail(email: string) {
    if (!email) return;
    this.formGroup.get('email')?.setValue(email);
    this.formGroup.get('remember')?.setValue(true);
  }

  ngOnInit(): void {
    this.initializingSelectors();
  }

  ngAfterViewInit(): void {
    this.setRememberedEmail = this.localStorageHelper.rememberedEmail;
  }

  navigateToForgotPassword(): void {
    this.router.navigate([
      RoutesConstants.AUTH_INDEX,
      RoutesConstants.AUTH_FORGOT_PASSWORD,
    ]);
  }

  handleSubmitForm(): void {
    this.hasApiError = false;
    this.wasAttemptToSubmitForm = true;

    markAsDirtyForm(this.formGroup);

    this.changeDetector.detectChanges();

    if (this.formGroup.invalid) return;

    this.writeDownMemorizedEmail();

    const model: RequestSignInModel = {
      email: this.formGroup.value.email,
      password: this.formGroup.value.password,
    };

    this.store$.dispatch(loginAction({ payload: model }));
  }

  private initializingSelectors(): void {
    this.isLoading$ = this.store$.select(selectIsLoading);
    this.subscriptions$.add(
      this.store$
        .select(selectLoginError)
        .pipe(filter((val) => val !== undefined))
        .subscribe((res) => {
          if (res.status === AuthFailedStatus.UserIsLockedOut) {
            this.accountIsLocked = true;
          }
          if (res.status === AuthFailedStatus.FailedLoginAttempt) {
            this.remainingAttempts = res.remainingAttempts;
          }
          this.hasApiError = true;
          this.changeDetector.detectChanges();
        })
    );
  }

  private buildForm(): void {
    this.formGroup = this.formBuilder.group({
      email: [
        '',
        [Validators.required, Validators.pattern(PatternsConstants.PATTERN_EMAIL)],
      ],
      password: [
        '',
        [Validators.required, Validators.pattern(PatternsConstants.PATTERN_PASSWORD)],
      ],
      remember: [false],
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
      this.formGroup.get('email')?.valueChanges.subscribe((value: string) => {
        this.formGroup
          .get('email')
          ?.setValue(value?.toLocaleLowerCase(), { emitEvent: false });
      })
    );
  }

  private writeDownMemorizedEmail(): void {
    const isRemember = this.formGroup.get('remember')?.value;
    if (!isRemember) return;
    this.localStorageHelper.rememberEmail = this.formGroup.get('email')?.value;
  }

  ngOnDestroy(): void {
    this.store$.dispatch(loginAttemptErrorClearAction());
    this.subscriptions$.unsubscribe();
  }
}
