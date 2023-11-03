import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonConstants, RoutesConstants } from 'src/app/core/constants';
import { AuthService } from 'src/app/core/services/auth.service';
import { RequestConfirmEmailModel } from '../../models';

@Component({
  selector: 'app-confirm-change-email',
  templateUrl: './confirm-change-email.component.html',
  styleUrls: ['./confirm-change-email.component.scss'],
})
export class ConfirmChangeEmailComponent implements OnInit {
  isLoading?: boolean;
  confirmationState: 'success' | 'error' | 'info' | 'warning' | '404' | '403' | '500' =
    'success';

  private userId?: string;
  private code?: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private readonly authService: AuthService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.isLoading = true;

    this.activatedRoute.queryParams.subscribe((params) => {
      const userId = params[CommonConstants.QUERY_USER_ID];
      const code = params[CommonConstants.QUERY_CODE];
      if (userId && code) {
        this.code = code;
        this.userId = userId;
        this.confirm();
      }
    });
  }

  navigateToSignIn(): void {
    this.router.navigate([RoutesConstants.AUTH_INDEX, RoutesConstants.AUTH_SIGN_IN]);
  }

  private confirm(): void {
    const model: RequestConfirmEmailModel = {
      id: this.userId!,
      code: this.code!,
    };

    this.authService.confirmEmail(model).subscribe({
      next: ({ success }) => {
        if (success) {
          this.isLoading = false;
          this.confirmationState = 'success';
        }
        if (!success) {
          this.confirmationState = 'error';
          this.isLoading = false;
        }

        this.changeDetector.detectChanges();
      },
      error: () => {
        this.confirmationState = 'error';
        this.isLoading = false;
        this.changeDetector.detectChanges();
      },
    });
  }
}
