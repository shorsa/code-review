import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription, combineLatest, filter, timer } from 'rxjs';
import {
  selectAppState,
  selectIsLoading,
} from 'src/app/app-store/app-state/app-state.selectors';
import { RequestTwoStepSignInModel } from '../../models';
import * as authActions from '../../store/auth.actions';
import * as authSelectors from '../../store/auth.selectors';

@Component({
  templateUrl: './reset-password-code.component.html',
  styleUrls: ['./reset-password-code.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetPasswordCodeComponent implements OnInit, OnDestroy {
  private subscriptions$: Subscription = new Subscription();

  showTimer: boolean = false;
  wasAttemptToSubmitForm: boolean = false;

  counter: number = 60;
  tick: number = 1000;
  countDown?: Subscription;

  email?: string;
  errorMessage?: string;
  codeControl!: FormControl;
  isLoading$?: Observable<boolean>;

  constructor(private changeDetector: ChangeDetectorRef, private store$: Store) {
    this.initControl();
  }

  ngOnInit(): void {
    this.initializingSelectors();
  }

  handleResendCode(): void {
    this.showTimer = true;

    this.countDown = timer(0, this.tick).subscribe(() => {
      --this.counter;
      this.changeDetector.detectChanges();
      if (this.counter <= 0) {
        this.resetCode();
        this.changeDetector.detectChanges();
      }
    });

    this.store$.dispatch(
      authActions.forgotPasswordAction({ payload: { email: this.email! } })
    );
  }

  handleSubmitForm(): void {
    this.wasAttemptToSubmitForm = true;
    this.codeControl.markAsTouched();
    this.codeControl.markAsDirty();
    this.changeDetector.detectChanges();
    if (this.codeControl.invalid) return;

    const model: RequestTwoStepSignInModel = {
      email: this.email!,
      code: this.codeControl.value,
    };

    this.store$.dispatch(authActions.resetPasswordCodeAction({ payload: model }));
  }

  onCodeChanged(code: string): void {
    this.codeControl.setValue(code);
  }

  private initControl(): void {
    this.codeControl = new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]);
  }

  private initializingSelectors(): void {
    this.isLoading$ = this.store$.select(selectIsLoading);

    this.subscriptions$.add(
      combineLatest([
        this.store$.select(authSelectors.selectUserEmail),
        this.store$.select(authSelectors.selectSendCodeState),
      ]).subscribe(([email, codeIsSended]) => {
        if (email && codeIsSended) {
          this.email = email;
          return;
        }
      })
    );

    this.subscriptions$.add(
      this.store$
        .select(selectAppState)
        .pipe(filter((val) => val !== undefined))
        .subscribe((res) => {
          if (res.isControlError) {
            this.errorMessage = res.error;
            this.changeDetector.detectChanges();
          }
        })
    );
  }

  private resetCode(): void {
    this.showTimer = false;
    this.countDown?.unsubscribe();
    this.counter = 60;
  }

  ngOnDestroy(): void {
    this.countDown?.unsubscribe();
    this.subscriptions$.unsubscribe();
  }
}
