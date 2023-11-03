import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ReducerNodesEnum } from 'src/app/app-store';
import { ClinicsEffects } from './clinics.effect';
import { ClinicReducer } from './clinics.reducer';
import { ClinicAppointmentsEffects } from './clinic-appointments.effect';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(ReducerNodesEnum.clinics, ClinicReducer),
    EffectsModule.forFeature([ClinicsEffects, ClinicAppointmentsEffects]),
  ],
})
export class ClinicsStoreModule {}
