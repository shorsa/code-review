import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { ReducerNodesEnum } from 'src/app/app-store';
import { PermissionsEffects } from './permissions.effect';
import { PermissionsReducer } from './permissions.reducer';

@NgModule({
  imports: [
    CommonModule,
    NzModalModule,
    StoreModule.forFeature(ReducerNodesEnum.permissions, PermissionsReducer),
    EffectsModule.forFeature([PermissionsEffects]),
  ],
})
export class PermissionsStoreModule {}
