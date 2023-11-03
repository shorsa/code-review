import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ReducerNodesEnum } from 'src/app/app-store';
import { ReferralAppointmentEffects } from './referral-appointments.effect';
import { ReferralDetailsEffects } from './referral-details.effect';
import { ReferralDocumentEffects } from './referral-documents.effect';
import { ReferralEffects } from './referral.effect';
import { ReferralReducer } from './referral.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(ReducerNodesEnum.referral, ReferralReducer),
    EffectsModule.forFeature([
      ReferralEffects,
      ReferralDetailsEffects,
      ReferralAppointmentEffects,
      ReferralDocumentEffects,
    ]),
  ],
})
export class ReferralStoreModule {}
