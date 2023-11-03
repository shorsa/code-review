import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  templateUrl: './verification-code.component.html',
  styleUrls: ['./verification-code.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerificationCodeComponent implements OnInit, OnDestroy {
  private subscriptions$: Subscription = new Subscription();

  isTimerShow: boolean = false;
  wasAttemptToSubmitForm: boolean = false;

  countDown?: Subscription;
  counter: number = 60;
  tick: number = 1000;

  email?: string;
  errorMessage?: string;
  codeControl: FormControl;
  isLoading$?: Observable<boolean>;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private router: Router,
    private store$: Store
  ) {
    this.codeControl = new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]);
  }

  ngOnInit(): void {
    this.initializingSelectors();
  }

  handleResendCode(): void {
    this.isTimerShow = true;

    this.countDown = timer(0, this.tick).subscribe(() => {
      --this.counter;
      this.changeDetector.detectChanges();
      if (this.counter <= 0) {
        this.resetCode();
        this.changeDetector.detectChanges();
      }
    });
    this.store$.dispatch(
      authActions.resendVerificationCodeAction({ payload: { email: this.email! } })
    );
  }

  resetCode() {
    this.isTimerShow = false;
    this.countDown?.unsubscribe();
    this.counter = 60;
  }

  handleSubmit(): void {
    this.wasAttemptToSubmitForm = true;
    this.codeControl.markAsTouched();
    this.codeControl.markAsDirty();
    this.changeDetector.detectChanges();
    if (this.codeControl.invalid) return;

    const model: RequestTwoStepSignInModel = {
      email: this.email!,
      code: this.codeControl.value,
    };

    this.store$.dispatch(authActions.sendVerificationCodeAction({ payload: model }));
  }

  onCodeChanged(code: string): void {
    this.codeControl.setValue(code);
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

  ngOnDestroy(): void {
    this.countDown?.unsubscribe();
    this.subscriptions$.unsubscribe();
  }
}
