import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ReducerNodesEnum } from 'src/app/app-store';
import { ClientEffects } from './client.effect';
import { ClientReducer } from './client.reducer';
import { ClientUsersEffects } from './client-users.effect';
import { ClientDocumentEffects } from './client-documents.effect';
import { TermsAndConditionsEffects } from './terms-and-conditions.effect';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(ReducerNodesEnum.client, ClientReducer),
    EffectsModule.forFeature([
      ClientEffects,
      ClientUsersEffects,
      ClientDocumentEffects,
      TermsAndConditionsEffects,
    ]),
  ],
})
export class ClientStoreModule {}
