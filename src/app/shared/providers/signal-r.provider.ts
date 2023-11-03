//Vendors
import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { IHttpConnectionOptions } from '@microsoft/signalr';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

//Helpers
import { ApiEndpointHelper } from '../helpers/api-endpoint.helper';

//Constants

//Models
import { AuthenticationProvider } from './authentication.provider';
import { ApiEndpointsConstants } from 'src/app/core/constants';
import { ReferralStatusEnum } from '../enums';

const CONNECTION_STARTED = 'Hub connection started';
const CONNECTION_STOPPED = 'Hub connection stopped';
const CONNECTION_ERROR = 'Error while starting connection: ';
const CONNECTION_SET_CONNECTION_USER = 'Error set connection to user: ';

export interface NotificationModel {
  notifications: NotificationModelItem[];
  unread: number;
}

export interface NotificationModelItem {
  message: string;
  date: string;
  clientId?: string;
  referralId?: string;
  referralStatus?: ReferralStatusEnum;
  patientId?: string;
  clinicianId?: string;
}

@Injectable({
  providedIn: 'root',
})
export class SignalRProvider {
  private _hubConnection?: signalR.HubConnection;
  private connectionEstablished$: BehaviorSubject<boolean>;
  notificationData$: BehaviorSubject<NotificationModel | null>;

  constructor(private authProvider: AuthenticationProvider) {
    this.notificationData$ = new BehaviorSubject<NotificationModel | null>(null);
    this.connectionEstablished$ = new BehaviorSubject<boolean>(false);
  }
  connect() {
    if (this.isConnection) {
      return;
    }
    this.createConnection();
    this.startConnection();
  }

  disconnect(): void {
    this._hubConnection?.stop();
    console.log(CONNECTION_STOPPED);
    this.connectionEstablished$.next(false);
  }

  // get getNotificationData(): Observable<NotificationModel> {
  //   return this.notificationData$.asObservable();
  // }

  // set setNotificationData(data: NotificationModel) {
  //   this.notificationData$.next(data);
  // }

  get isDisconnect(): boolean {
    return this._hubConnection?.state === signalR.HubConnectionState.Disconnected;
  }
  get isConnection(): boolean {
    return this._hubConnection?.state === signalR.HubConnectionState.Connected;
  }

  private createConnection(): void {
    const url: string = ApiEndpointHelper.getHub(ApiEndpointsConstants.HUB_CONNECTION);
    const options: IHttpConnectionOptions = {
      accessTokenFactory: () => this.authProvider.getAccessToken()!,
      transport: signalR.HttpTransportType.WebSockets,
      timeout: 100000,
    };

    console.log(options);
    console.log(this.authProvider.getAccessToken());

    this._hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(url, options)
      .withAutomaticReconnect()
      .build();
  }

  private startConnection(): void {
    const url: string = ApiEndpointsConstants.HUB_NOTIFICATIONS_RECEIVE;
    this._hubConnection!.start()
      .then(
        (data) => {
          console.log(CONNECTION_STARTED);
          this.connectionEstablished$.next(true);
          console.log(data);
        },
        (error) => console.log(CONNECTION_ERROR, error)
      )
      .then(
        (data) => {
          // this._hubConnection?.invoke('onConnectedAsync');
          console.log(data);
        },
        (error) => console.log(CONNECTION_SET_CONNECTION_USER, error)
      );
    this.registerOnServerEvents();

    // this.notificationData$.next({
    //   notifications: [
    //     {
    //       message: 'RF-12545474 is rejected by Mary Smith',
    //       date: new Date().toString(),
    //       referralId: 'e8210ae9-3695-4daf-b1a1-08dba2529272',
    //     },
    //   ],
    //   unread: 25,
    // });
  }

  private registerOnServerEvents(): void {
    this._hubConnection?.on('receiveMessage', (res: any) => {
      console.log('receiveMessage >>> ', res);
      // res.subscribe((res: string) => console.log(res));

      // this.setNotificationData = res;
    });
  }
}
