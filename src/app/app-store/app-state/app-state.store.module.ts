import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { ReducerNodesEnum } from '..';
import { AppStateReducer } from './app-state.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(ReducerNodesEnum.appState, AppStateReducer),
  ],
})
export class AppStoreModule {}
