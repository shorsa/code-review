import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ReducerNodesEnum } from 'src/app/app-store';
import { StatsEffects } from './stats.effect';
import { StatsReducer } from './stats.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(ReducerNodesEnum.stats, StatsReducer),
    EffectsModule.forFeature([StatsEffects]),
  ],
})
export class StatsStoreModule {}
