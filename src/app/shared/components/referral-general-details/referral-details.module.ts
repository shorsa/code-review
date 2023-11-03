import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ReferralDetailsComponent } from './referral-details.component';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzSpaceModule } from 'ng-zorro-antd/space';

const MATERIAL = [NzCardModule, NzSelectModule, NzSpaceModule, NzSkeletonModule];

@NgModule({
  imports: [MATERIAL, CommonModule],
  declarations: [ReferralDetailsComponent],
  exports: [ReferralDetailsComponent],
})
export class ReferralDetailsModule {}
