import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserTermsAndConditionsComponent } from './pages/user-terms-and-conditions.component';
import { RouterModule, Routes } from '@angular/router';
import { RoutesConstants } from 'src/app/core/constants';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonComponent, NzButtonModule } from 'ng-zorro-antd/button';
import { UserTermsAndConditionModalComponent } from './components/user-terms-and-condition-modal/user-terms-and-condition-modal.component';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';

const routes: Routes = [
  {
    path: RoutesConstants.INDEX,
    component: UserTermsAndConditionsComponent,
  },
];

const MATERIAL = [
  NzSpinModule,
  NzModalModule,
  NzButtonModule,
  NzLayoutModule,
  NzAvatarModule,
  NzDropDownModule,
  NzIconModule,
];

@NgModule({
  imports: [MATERIAL, RouterModule.forChild(routes), CommonModule],
  declarations: [UserTermsAndConditionsComponent, UserTermsAndConditionModalComponent],
})
export class UserTermsAndConditionsModule {}
