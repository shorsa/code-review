import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { ReducerNodesEnum } from 'src/app/app-store';
import { ProductEffects } from './products.effect';
import { ProductReducer } from './products.reducer';

@NgModule({
  imports: [
    CommonModule,
    NzModalModule,
    StoreModule.forFeature(ReducerNodesEnum.product, ProductReducer),
    EffectsModule.forFeature([ProductEffects]),
  ],
})
export class ProductStoreModule {}
