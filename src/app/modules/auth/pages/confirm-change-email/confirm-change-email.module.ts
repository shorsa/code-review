import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzResultModule } from 'ng-zorro-antd/result';
import { RoutesConstants } from 'src/app/core/constants';
import { ConfirmChangeEmailComponent } from './confirm-change-email.component';

const routes: Routes = [
  {
    path: RoutesConstants.INDEX,
    component: ConfirmChangeEmailComponent,
  },
];

@NgModule({
  imports: [CommonModule, NzResultModule, NzButtonModule, RouterModule.forChild(routes)],
  declarations: [ConfirmChangeEmailComponent],
})
export class ConfirmChangeEmailModule {}
