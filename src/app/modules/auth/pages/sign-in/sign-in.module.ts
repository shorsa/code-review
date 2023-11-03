import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutesConstants } from 'src/app/core/constants';
import { SignInComponent } from './sign-in.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

const routes: Routes = [
  {
    path: RoutesConstants.INDEX,
    component: SignInComponent,
  },
];

const MATERIAL = [
  NzFormModule,
  NzTypographyModule,
  NzCheckboxModule,
  NzInputModule,
  NzButtonModule,
];

@NgModule({
  imports: [
    MATERIAL,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  declarations: [SignInComponent],
})
export class SignInModule {}
