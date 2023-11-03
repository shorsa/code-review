import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ProductFormComponent } from './product-form.component';
import { NgxEditorModule } from 'ngx-editor';

const MATERIAL = [
  NzFormModule,
  NzSelectModule,
  NzButtonModule,
  NzInputModule,
  NzInputNumberModule,
  NzDropDownModule,
  NzCheckboxModule,
];

@NgModule({
  imports: [MATERIAL, FormsModule,NgxEditorModule, ReactiveFormsModule, CommonModule],
  exports: [ProductFormComponent],
  declarations: [ProductFormComponent],
})
export class ProductFormModule {}
