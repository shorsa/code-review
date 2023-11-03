import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { SearchInputComponent } from './search-input.component';

const MATERIAL = [NzInputModule, NzIconModule, NzButtonModule];

@NgModule({
  imports: [MATERIAL, FormsModule, CommonModule],
  declarations: [SearchInputComponent],
  exports: [SearchInputComponent],
})
export class SearchInputModule {}
