import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ReducerNodesEnum } from 'src/app/app-store';
import { PatientAuditLogsEffects } from './patient-audit-logs.effect';
import { PatientDocumentEffects } from './patient-documets.effect';
import { PatientNotesEffects } from './patient-notes.effect';
import { PatientReferralEffects } from './patient-referral.effect';
import { PatientEffects } from './patient.effect';
import { PatientReducer } from './patient.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(ReducerNodesEnum.patient, PatientReducer),
    EffectsModule.forFeature([
      PatientEffects,
      PatientReferralEffects,
      PatientDocumentEffects,
      PatientNotesEffects,
      PatientAuditLogsEffects,
    ]),
  ],
})
export class PatientStoreModule {}
