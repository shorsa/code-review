import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { ReducerNodesEnum } from 'src/app/app-store';
import { StaffEffects } from './staff.effect';
import { StaffReducer } from './staff.reducer';

@NgModule({
  imports: [
    CommonModule,
    NzModalModule,
    StoreModule.forFeature(ReducerNodesEnum.staff, StaffReducer),
    EffectsModule.forFeature([StaffEffects]),
  ],
})
export class StaffStoreModule {}
