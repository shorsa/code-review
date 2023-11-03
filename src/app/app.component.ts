import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NzConfigService } from 'ng-zorro-antd/core/config';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable, Subscription, filter } from 'rxjs';
import { AppStoreState } from './app-store/app-state';
import * as errorActions from './app-store/app-state/app-state.actions';
import * as errorSelectors from './app-store/app-state/app-state.selectors';
import { AuthenticationProvider } from './shared/helpers';
import { SignalRProvider } from './shared/providers/signal-r.provider';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'horizon';
  tokenIsRefreshing$?: Observable<boolean | undefined>;

  constructor(
    private store$: Store,
    private readonly signalRProvider: SignalRProvider,
    private readonly authProvider: AuthenticationProvider,
    private nzConfigService: NzConfigService,
    private notification: NzNotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.tokenIsRefreshing$ = this.store$.select(errorSelectors.selectIsTokenRefreshing);

    this.store$
      .select(errorSelectors.selectAppState)
      .pipe(filter((val) => val !== undefined))
      .subscribe((res: AppStoreState) => {
        if (!res.error) return;
        if (!res.isApiError && res.isControlError) return;
        this.notification.error('Error', res.error);
        this.store$.dispatch(errorActions.clearErrorAction());
      });

    this.signalRConnection();
    this.nzSetConfig();
  }

  private signalRConnection(): void {
    this.authProvider.loginSuccesses.subscribe((res: boolean) => {
      if (res && this.authProvider.getAccessToken()) {
        this.signalRProvider.connect();
      }

      if (!res && !this.authProvider.getAccessToken()) {
        this.signalRProvider.disconnect();
      }
    });

    if (this.authProvider.getAccessToken()) {
      this.signalRProvider.connect();
    }
  }

  private nzSetConfig(): void {
    this.nzConfigService.set('notification', { nzDuration: 6000 });
  }
}
