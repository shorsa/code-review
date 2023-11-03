import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsComponent } from './tabs.component';
import { NzTabsModule } from 'ng-zorro-antd/tabs';

const MATERIAL = [NzTabsModule];

@NgModule({
  imports: [MATERIAL, CommonModule],
  declarations: [TabsComponent],
  exports: [TabsComponent],
})
export class TabsModule {}
