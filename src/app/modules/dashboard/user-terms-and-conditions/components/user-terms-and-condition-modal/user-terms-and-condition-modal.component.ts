import { Component, OnInit, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
import { Observable, catchError, of, switchMap, throwError } from 'rxjs';
import { selectIsLoading } from 'src/app/app-store/app-state/app-state.selectors';
import { RoutesConstants } from 'src/app/core/constants';
import { AuthService } from 'src/app/core/services/auth.service';
import { TermsAndConditionsService } from 'src/app/core/services/terms-and-conditions.service';
import { ResponseSignInModel } from 'src/app/modules/auth/models';
import { RequestRefreshAccessTokenModel } from 'src/app/modules/auth/models/request/request-refresh-access-token.model';
import { AuthenticationProvider } from 'src/app/shared/helpers';

@Component({
  selector: 'app-user-terms-and-condition-modal',
  templateUrl: './user-terms-and-condition-modal.component.html',
  styleUrls: ['./user-terms-and-condition-modal.component.scss'],
})
export class UserTermsAndConditionModalComponent implements OnInit {
  isLoading$?: Observable<boolean>;

  termsContent?: SafeHtml;

  readonly nzModalData: { content: string } = inject(NZ_MODAL_DATA);
  constructor(
    private store$: Store,
    private router: Router,
    private authService: AuthService,
    private termsAndConditionsService: TermsAndConditionsService,
    private authProvider: AuthenticationProvider,
    private sanitizer: DomSanitizer
  ) {
    this.termsContent = this.sanitizer.bypassSecurityTrustHtml(this.nzModalData.content);
  }

  ngOnInit() {
    this.isLoading$ = this.store$.select(selectIsLoading);
  }

  get geTermsIsEmpty(): boolean {
    return !this.nzModalData?.content || this.nzModalData?.content?.length < 60;
  }

  accept(): void {
    this.termsAndConditionsService
      .acceptTermsAndConditions({ acceptedTime: new Date().toDateString() })
      .subscribe((res) => {
        if (res.success) {
          this.refreshToken();
        }
      });
  }

  private refreshToken(): void {
    const model: RequestRefreshAccessTokenModel = {
      userId: this.authProvider.getUserId()!,
      refreshToken: this.authProvider.getRefreshToken(),
    };
    this.authService
      .refreshToken(model)
      .subscribe((responseModel: ResponseSignInModel) => {
        if (!responseModel?.refreshToken && !responseModel.accessToken) {
          this.authProvider.signOut();
        }

        this.authProvider.setTokens({
          accessToken: responseModel.accessToken!,
          refreshToken: responseModel.refreshToken!,
        });

        this.router.navigate([RoutesConstants.DASHBOARD_INDEX]);
      });
  }

  cancel(): void {
    this.router.navigate([RoutesConstants.AUTH_INDEX]);
  }
}
