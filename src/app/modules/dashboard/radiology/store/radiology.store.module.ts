import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { ReducerNodesEnum } from 'src/app/app-store';
import { RadiologyEffects } from './radiology.effect';
import { RadiologyReducer } from './radiology.reducer';

@NgModule({
  imports: [
    CommonModule,
    NzModalModule,
    StoreModule.forFeature(ReducerNodesEnum.radiology, RadiologyReducer),
    EffectsModule.forFeature([RadiologyEffects]),
  ],
})
export class StaffStoreModule {}
