import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecordAudioComponent } from './record-audio.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';

const MATERIAL = [NzButtonModule, NzIconModule];

@NgModule({
  imports: [CommonModule, MATERIAL],
  declarations: [RecordAudioComponent],
  exports: [RecordAudioComponent],
})
export class RecordAudioModuleOld {}
