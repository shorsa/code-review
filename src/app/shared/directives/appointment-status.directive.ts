import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { CommonConstants } from 'src/app/core/constants';
import { AppointmentStatusEnum } from 'src/app/modules/dashboard/appointments/enums';

@Directive({
  selector: '[appAppointmentStatus]',
  standalone: true,
})
export class AppointmentStatusDirective implements OnInit {
  @Input() status!: AppointmentStatusEnum;

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

  private getTagText(status: AppointmentStatusEnum): string {
    const currentOption = CommonConstants.appointmentStatusFilterList.find(
      (item) => item.value === status
    );

    return currentOption?.label ?? '';

    // switch (status) {
    //   case AppointmentStatusEnum.AwaitingTriage:
    //     return 'Awaiting Triage';
    //   case AppointmentStatusEnum.AwaitingClient:
    //     return 'Awaiting Client';
    //   case AppointmentStatusEnum.BookedForScreening:
    //     return 'Booked For Screening';
    //   case AppointmentStatusEnum.BookedForAppointment:
    //     return 'Booked For Appointment';
    //   case AppointmentStatusEnum.AttendedReportPending:
    //     return 'Attended Report Pending';
    //   case AppointmentStatusEnum.ReportWaitingToBeSend:
    //     return 'Report Waiting To Be Send';
    //   case AppointmentStatusEnum.Completed:
    //     return 'Completed';
    //   case AppointmentStatusEnum.Rejected:
    //     return 'Rejected';
    //   case AppointmentStatusEnum.Cancelled:
    //     return 'Cancelled';
    //   case AppointmentStatusEnum.DidNotAttend:
    //     return 'Did Not Attend';
    //   default:
    //     return '';
    //     break;
    // }
  }

  private getTagColor(status: AppointmentStatusEnum): string {
    switch (status) {
      case AppointmentStatusEnum.Canceled:
        return '#E0A6C5';

      case AppointmentStatusEnum.Attended:
        return '#B3D5E4';

      case AppointmentStatusEnum.AttentionRequired:
        return '#E0C2A6';

      case AppointmentStatusEnum.Booked:
        return '#D1E0A6';

      case AppointmentStatusEnum.Completed:
        return '#A6E0C4';

      case AppointmentStatusEnum.DNA:
        return '#dddddd';

      default:
        return 'transparent';
        break;
    }
  }
}
