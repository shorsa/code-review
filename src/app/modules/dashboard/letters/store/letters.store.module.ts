import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ReducerNodesEnum } from 'src/app/app-store';
import { LettersEffects } from './letters.effect';
import { LetterReducer } from './letters.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(ReducerNodesEnum.letters, LetterReducer),
    EffectsModule.forFeature([LettersEffects]),
  ],
})
export class LettersStoreModule {}
