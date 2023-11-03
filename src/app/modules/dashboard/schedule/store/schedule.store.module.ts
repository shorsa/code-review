import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ReducerNodesEnum } from 'src/app/app-store';
import { ScheduleEffects } from './schedule.effect';
import { ScheduleReducer } from './schedule.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(ReducerNodesEnum.schedule, ScheduleReducer),
    EffectsModule.forFeature([ScheduleEffects]),
  ],
})
export class ScheduleStoreModule {}
