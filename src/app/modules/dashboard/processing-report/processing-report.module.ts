import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutesConstants } from 'src/app/core/constants';
import { ProcessingReportComponent } from './page/processing-report.component';

const routes: Routes = [
  {
    path: RoutesConstants.INDEX,
    component: ProcessingReportComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [ProcessingReportComponent],
})
export class ProcessingReportModule {}
