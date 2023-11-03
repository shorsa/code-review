import { NgModule } from '@angular/core';
import { AuthLayoutModule } from 'src/app/shared/layouts/auth-layout/auth-layout.module';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthStoreModule } from './store/auth.store.module';

@NgModule({
  imports: [AuthRoutingModule, AuthLayoutModule, AuthStoreModule],
  declarations: [],
})
export class AuthModule {}
