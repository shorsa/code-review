import { Pipe, PipeTransform } from '@angular/core';
import { ReferralStatusEnum } from '../enums';

@Pipe({
  name: 'status',
})
export class StatusColorPipe implements PipeTransform {
  transform(value: ReferralStatusEnum): any {
    switch (value) {
      case ReferralStatusEnum.Cancelled:
        return '#E0A6C5';

      case ReferralStatusEnum.BookedForAppointment:
        return '#B3D5E4';

      case ReferralStatusEnum.AwaitingClient:
        return '#E0C2A6';

      case ReferralStatusEnum.AwaitingTriage:
        return '#D1E0A6';

      case ReferralStatusEnum.BookedForScreening:
        return '#A6E0C4';

      case ReferralStatusEnum.Completed:
        return '#A6E0C4';

      default:
        return 'blue';
        break;
    }
  }
}
