import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ReducerNodesEnum } from 'src/app/app-store';
import { DepartmentEffects } from './department.effect';
import { DepartmentReducer } from './department.reducer';
import { NzModalModule } from 'ng-zorro-antd/modal';

@NgModule({
  imports: [
    CommonModule,
    NzModalModule,
    StoreModule.forFeature(ReducerNodesEnum.department, DepartmentReducer),
    EffectsModule.forFeature([DepartmentEffects]),
  ],
})
export class DepartmentStoreModule {}
