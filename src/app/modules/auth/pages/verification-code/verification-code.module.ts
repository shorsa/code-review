import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CodeInputModule } from 'angular-code-input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { RoutesConstants } from 'src/app/core/constants';
import { FormatTimePipeModule } from 'src/app/shared/pipes/pipes.module';
import { VerificationCodeComponent } from './verification-code.component';

const routes: Routes = [
  {
    path: RoutesConstants.INDEX,
    component: VerificationCodeComponent,
  },
];

const MATERIAL = [NzButtonModule];

@NgModule({
  imports: [
    MATERIAL,
    CommonModule,
    FormatTimePipeModule,
    CodeInputModule.forRoot({
      codeLength: 6,
      isCodeHidden: true,
    }),
    RouterModule.forChild(routes),
  ],
  declarations: [VerificationCodeComponent],
})
export class VerificationCodeModule {}
