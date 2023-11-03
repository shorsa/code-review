import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SelectOptionModel } from '../../models';

@Component({
  selector: 'app-referral-details',
  templateUrl: './referral-details.component.html',
  styleUrls: ['./referral-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReferralDetailsComponent {
  @Input() selectOptionsData?: SelectOptionModel[];
  @Input() withCreate?: boolean;
  @Input() referralData?: SelectOptionModel[];

  get getIsLoading(): boolean {
    return !this.selectOptionsData?.length && !this.referralData?.length;
  }
}
