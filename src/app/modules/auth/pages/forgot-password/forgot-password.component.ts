import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { selectIsLoading } from 'src/app/app-store/app-state/app-state.selectors';
import { PatternsConstants, RoutesConstants } from 'src/app/core/constants';
import { markAsDirtyForm } from 'src/app/shared/helpers/mark-as-dirty-form.helper';
import { forgotPasswordAction } from '../../store/auth.actions';

@Component({
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  private subscriptions$: Subscription = new Subscription();

  wasAttemptToSubmitForm: boolean = false;
  formGroup!: FormGroup;
  isLoading$?: Observable<boolean>;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private store$: Store
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.initializingSelectors();
  }

  navigateToSignIn(): void {
    this.router.navigate([RoutesConstants.AUTH_INDEX, RoutesConstants.AUTH_SIGN_IN]);
  }

  handleSubmitForm(): void {
    this.wasAttemptToSubmitForm = true;

    markAsDirtyForm(this.formGroup);

    if (this.formGroup.invalid) return;

    const email = this.formGroup.value.email;
    this.store$.dispatch(forgotPasswordAction({ payload: { email } }));
  }

  private initializingSelectors(): void {
    this.isLoading$ = this.store$.select(selectIsLoading);
  }

  private buildForm(): void {
    this.formGroup = this.formBuilder.group({
      email: [
        '',
        [Validators.required, Validators.pattern(PatternsConstants.PATTERN_EMAIL)],
      ],
    });

    this.subscriptionsFormChanges();
  }

  private subscriptionsFormChanges(): void {
    this.subscriptions$.add(
      this.formGroup.get('email')?.valueChanges.subscribe((value: string) => {
        this.formGroup
          .get('email')
          ?.setValue(value?.toLocaleLowerCase(), { emitEvent: false });
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }
}
