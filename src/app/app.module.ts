import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NgxPermissionsModule } from 'ngx-permissions';
import { AppRoutingModule } from './app-routing.module';
import { metaReducers, reducers } from './app-store/app-meta.reducer';
import { AppStoreModule } from './app-store/app-state/app-state.store.module';
import { AppComponent } from './app.component';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { JwtInterceptor } from './core/interceptors/jwt.interceptor';
import { LoaderInterceptor } from './core/interceptors/loader.interceptor';
import { AuthEffects } from './modules/auth/store/auth.effect';
import { ClientEffects } from './modules/dashboard/client/store/client.effect';
import { DepartmentStoreModule } from './modules/dashboard/departments/store/department.store.module';
import { PermissionsStoreModule } from './modules/dashboard/permissions/store/permissions.store.module';
import { SignalRProvider } from './shared/providers/signal-r.provider';
import { UserPermissionsProvider } from './shared/providers/user-permissions.provider';
import { NZ_CONFIG } from 'ng-zorro-antd/core/config';
registerLocaleData(en);

const STORE = [
  AppStoreModule,
  DepartmentStoreModule,
  PermissionsStoreModule,

  StoreModule.forRoot(reducers, { metaReducers }),
  StoreDevtoolsModule.instrument({ maxAge: 25 }),
  EffectsModule.forRoot([AuthEffects, ClientEffects]),
  StoreRouterConnectingModule.forRoot(),
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    STORE,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NzSpinModule,
    NzIconModule,
    NzNotificationModule,
    FormsModule,
    NgxPermissionsModule.forRoot(),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    { provide: NZ_I18N, useValue: en_US },
    UserPermissionsProvider,
    SignalRProvider,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
