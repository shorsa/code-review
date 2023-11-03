import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutesConstants } from 'src/app/core/constants';
import { StatisticComponent } from './page/statistic.component';

const routes: Routes = [
  {
    path: RoutesConstants.INDEX,
    component: StatisticComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [StatisticComponent],
})
export class StatisticModule {}
