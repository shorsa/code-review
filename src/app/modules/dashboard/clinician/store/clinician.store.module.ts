import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ReducerNodesEnum } from 'src/app/app-store';
import { ClinicianEffects } from './clinician.effect';
import { ClinicianReducer } from './clinician.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(ReducerNodesEnum.clinician, ClinicianReducer),
    EffectsModule.forFeature([ClinicianEffects]),
  ],
})
export class ClinicianStoreModule {}
