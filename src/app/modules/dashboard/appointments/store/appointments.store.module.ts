import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ReducerNodesEnum } from 'src/app/app-store';
import { AppointmentEffects } from './appointments.effect';
import { AppointmentReducer } from './appointments.reducer';
import { AppointmentDocumentEffects } from './appointment-documents.effect';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(ReducerNodesEnum.appointments, AppointmentReducer),
    EffectsModule.forFeature([
      AppointmentEffects,
      AppointmentDocumentEffects,
      AppointmentDocumentEffects,
    ]),
  ],
})
export class AppointmentsStoreModule {}
