import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { UploadDocumentsComponent } from './upload-documents.component';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzEmptyModule } from 'ng-zorro-antd/empty';

const MATERIAL = [
  NzEmptyModule,
  NzCardModule,
  NzSelectModule,
  NzDropDownModule,
  NzButtonModule,
  NzUploadModule,
];

@NgModule({
  imports: [MATERIAL, CommonModule],
  declarations: [UploadDocumentsComponent],
  exports: [UploadDocumentsComponent],
})
export class UploadDocumentsModule {}
