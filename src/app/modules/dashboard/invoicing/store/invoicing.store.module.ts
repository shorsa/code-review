import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { ReducerNodesEnum } from 'src/app/app-store';
import { InvoicingReducer } from './invoicing.reducer';
import { InvoicingEffects } from './invoicing.effect';

@NgModule({
  imports: [
    CommonModule,
    NzModalModule,
    StoreModule.forFeature(ReducerNodesEnum.invoicing, InvoicingReducer),
    EffectsModule.forFeature([InvoicingEffects]),
  ],
})
export class InvoicingStoreModule {}
