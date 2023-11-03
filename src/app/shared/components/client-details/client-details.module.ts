import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ClientDetailsComponent } from './client-details.component';

const MATERIAL = [NzCardModule, NzSelectModule];

@NgModule({
  imports: [MATERIAL, CommonModule],
  declarations: [ClientDetailsComponent],
  exports: [ClientDetailsComponent],
})
export class ClientDetailsModule {}
