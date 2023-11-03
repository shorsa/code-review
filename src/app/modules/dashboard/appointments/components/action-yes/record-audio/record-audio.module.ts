import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecordAudioComponent } from './record-audio.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';

const MATERIAL = [NzButtonModule, NzIconModule, NzFormModule, NzCheckboxModule];

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MATERIAL],
  declarations: [RecordAudioComponent],
  exports: [RecordAudioComponent],
})
export class RecordAudioModule {}
