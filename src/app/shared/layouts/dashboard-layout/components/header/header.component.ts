import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RoutesConstants } from 'src/app/core/constants';
import { AuthenticationProvider } from 'src/app/shared/helpers';
import {
  NotificationModel,
  NotificationModelItem,
  SignalRProvider,
} from 'src/app/shared/providers/signal-r.provider';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  userName?: string;

  notificationData$?: Observable<NotificationModel | null>;

  constructor(
    private router: Router,
    private readonly authProvider: AuthenticationProvider,
    private readonly signalRProvider: SignalRProvider
  ) {
    this.userName = this.authProvider.getUserName();
    this.notificationData$ = this.signalRProvider.notificationData$;

    this.signalRProvider.notificationData$.subscribe((res) => console.log(res));
  }

  navigateToHome(): void {
    this.router.navigate([RoutesConstants.DASHBOARD_INDEX]);
  }

  redirect(data: NotificationModelItem): void {
    if (data.referralId) {
      this.router.navigate(
        [
          RoutesConstants.DASHBOARD_INDEX,
          RoutesConstants.DASHBOARD_REFERRAL,
          RoutesConstants.DASHBOARD_REFERRAL_EDIT,
        ],
        { queryParams: { id: data.referralId } }
      );
    }
  }

  logOut(): void {
    this.authProvider.signOut();
  }
}
