import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { ReferralStatusEnum } from '../enums';
import { CommonConstants } from 'src/app/core/constants';

@Directive({
  selector: '[appReferralStatus]',
  standalone: true,
})
export class ReferralStatusDirective implements OnInit {
  @Input() status!: ReferralStatusEnum;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    const tagText = this.getTagText(this.status);
    const tagColor = this.getTagColor(this.status);

    const tagElement: HTMLElement = this.renderer.createElement('nz-tag');
    tagElement.setAttribute('nzColor', tagColor);
    tagElement.style.background = tagColor;
    tagElement.classList.add('ant-tag');
    tagElement.classList.add('ant-tag-has-color');
    this.renderer.appendChild(tagElement, this.renderer.createText(tagText));

    const parent = this.el.nativeElement;
    this.renderer.appendChild(parent, tagElement);
  }

  private getTagText(status: ReferralStatusEnum): string {
    const currentOption = CommonConstants.referralStatusFilterList.find(
      (item) => item.value === status
    );

    return currentOption?.label ?? '';

    // switch (status) {
    //   case ReferralStatusEnum.AwaitingTriage:
    //     return 'Awaiting Triage';
    //   case ReferralStatusEnum.AwaitingClient:
    //     return 'Awaiting Client';
    //   case ReferralStatusEnum.BookedForScreening:
    //     return 'Booked For Screening';
    //   case ReferralStatusEnum.BookedForAppointment:
    //     return 'Booked For Appointment';
    //   case ReferralStatusEnum.AttendedReportPending:
    //     return 'Attended Report Pending';
    //   case ReferralStatusEnum.ReportWaitingToBeSend:
    //     return 'Report Waiting To Be Send';
    //   case ReferralStatusEnum.Completed:
    //     return 'Completed';
    //   case ReferralStatusEnum.Rejected:
    //     return 'Rejected';
    //   case ReferralStatusEnum.Cancelled:
    //     return 'Cancelled';
    //   case ReferralStatusEnum.DidNotAttend:
    //     return 'Did Not Attend';
    //   default:
    //     return '';
    //     break;
    // }
  }

  private getTagColor(status: ReferralStatusEnum): string {
    switch (status) {
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

      case ReferralStatusEnum.WaitingForBooking:
        return '#ffcf34';

      case ReferralStatusEnum.AwaitingSubmit:
        return '#dddddd';

      case ReferralStatusEnum.Rejected:
        return '#df000066';

      case ReferralStatusEnum.AttendedReportPending:
        return '#b7b7ff';

      default:
        return 'blue';
        break;
    }
  }
}
