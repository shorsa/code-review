import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ReducerNodesEnum } from 'src/app/app-store';
import { LocationEffects } from './locations.effect';
import { LocationReducer } from './locations.reducer';
import { SitesEffects } from './sites.effect';
import { RoomsEffects } from './rooms.effect';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(ReducerNodesEnum.location, LocationReducer),
    EffectsModule.forFeature([LocationEffects, SitesEffects, RoomsEffects]),
  ],
})
export class LocationsStoreModule {}
