import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { InputFormComponent } from './input-form.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { ReactiveFormsModule } from '@angular/forms';

const MATERIAL = [NzInputModule, NzFormModule];

@NgModule({
  imports: [MATERIAL, CommonModule, ReactiveFormsModule],
  declarations: [InputFormComponent],
  exports: [InputFormComponent],
})
export class InputFormModule {}
