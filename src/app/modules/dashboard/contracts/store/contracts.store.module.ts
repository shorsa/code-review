import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ReducerNodesEnum } from 'src/app/app-store';
import { ContractsEffects } from './contracts.effect';
import { ContractsReducer } from './contracts.reducer';
import { NzNotificationModule } from 'ng-zorro-antd/notification';

@NgModule({
  imports: [
    CommonModule,
    NzNotificationModule,
    StoreModule.forFeature(ReducerNodesEnum.contracts, ContractsReducer),
    EffectsModule.forFeature([ContractsEffects]),
  ],
})
export class ContractsStoreModule {}
