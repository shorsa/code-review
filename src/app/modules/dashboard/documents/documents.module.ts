import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutesConstants } from 'src/app/core/constants';
import { DocumentsPageComponent } from './page/documents.component';

const routes: Routes = [
  {
    path: RoutesConstants.INDEX,
    component: DocumentsPageComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [DocumentsPageComponent],
})
export class DocumentsModule {}
