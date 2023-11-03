import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { RoutesConstants } from 'src/app/core/constants';
import { NewPasswordComponent } from './new-password.component';

const routes: Routes = [
  {
    path: RoutesConstants.INDEX,
    component: NewPasswordComponent,
  },
];

const MATERIAL = [NzFormModule, NzInputModule, NzButtonModule, NzIconModule];

@NgModule({
  imports: [MATERIAL, CommonModule, ReactiveFormsModule, RouterModule.forChild(routes)],
  declarations: [NewPasswordComponent],
})
export class NewPasswordModule {}
