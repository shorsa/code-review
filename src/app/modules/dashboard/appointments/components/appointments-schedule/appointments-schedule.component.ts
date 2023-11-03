import { Component, ViewChild } from '@angular/core';
import {
  ActionEventArgs,
  DayService,
  EventRenderedArgs,
  EventSettingsModel,
  GroupModel,
  PopupOpenEventArgs,
  RenderCellEventArgs,
  ResizeService,
  ScheduleComponent,
  TimeScaleModel,
  TimelineMonthService,
  TimelineViewsService,
  TimelineYearService,
  View,
  WeekService,
  WorkHoursModel,
} from '@syncfusion/ej2-angular-schedule';
import { extend } from 'lodash';
import { roomData } from './moc-data';

@Component({
  selector: 'app-appointments-schedule',
  templateUrl: './appointments-schedule.component.html',
  styleUrls: ['./appointments-schedule.component.scss'],
  providers: [
    TimelineViewsService,
    TimelineYearService,
    TimelineMonthService,
    WeekService,
    DayService,
    ResizeService,
  ],
})
export class AppointmentsScheduleComponent {
  public selectedDate: Date = new Date(2021, 7, 2);
  public timeScale: TimeScaleModel = { interval: 60, slotCount: 1 };
  public workHours: WorkHoursModel = { start: '08:00', end: '18:00' };
  public currentView: View = 'Day';
  public group: GroupModel = {
    enableCompactView: false,
    resources: ['MeetingRoom'],
  };
  public resourceDataSource: Record<string, any>[] = [
    {
      text: 'cons. room 1',
      id: 1,
      color: '#A6E0C4',
    },
    {
      text: 'cons. room 2',
      id: 2,
      color: '#A6E0C4',
    },
    {
      text: 'cons. room 3',
      id: 3,
      color: '#A6E0C4',
    },
    {
      text: 'cons. room 4',
      id: 4,
      color: '#A6E0C4',
    },
    {
      text: 'cons. room 5',
      id: 5,
      color: '#A6E0C4',
    },
    {
      text: 'cons. room 6',
      id: 6,
      color: '#A6E0C4',
    },
    {
      text: 'Ultrasound',
      id: 7,
      color: '#A6E0C4',
    },
    {
      text: 'Ultrasound',
      id: 8,
      color: '#A6E0C4',
    },
    {
      text: 'Ultrasound',
      id: 9,
      color: '#A6E0C4',
    },
    {
      text: 'Ultrasound',
      id: 10,
      color: '#A6E0C4',
    },
    {
      text: 'MRI',
      id: 11,
      color: '#A6E0C4',
    },
    {
      text: 'MRI',
      id: 12,
      color: '#A6E0C4',
    },
    {
      text: 'MRI',
      id: 13,
      color: '#A6E0C4',
    },
    {
      text: 'MRI',
      id: 14,
      color: '#A6E0C4',
    },
    {
      text: 'X-Ray',
      id: 15,
      color: '#A6E0C4',
    },
    {
      text: 'X-Ray',
      id: 16,
      color: '#A6E0C4',
    },
    {
      text: 'X-Ray',
      id: 17,
      color: '#A6E0C4',
    },
    {
      text: 'X-Ray',
      id: 18,
      color: '#A6E0C4',
    },
    {
      text: 'X-Ray',
      id: 1,
      color: '#A6E0C4',
    },
  ];
  public allowMultiple = true;
  public eventSettings: EventSettingsModel = {
    dataSource: extend([], roomData, null, true) as Record<string, any>[],
    fields: {
      id: 'Id',
      subject: { title: 'Summary', name: 'Subject' },
      location: { title: 'Location', name: 'Location' },
      description: { title: 'Comments', name: 'Description' },
      startTime: { title: 'From', name: 'StartTime' },
      endTime: { title: 'To', name: 'EndTime' },
    },
  };

  @ViewChild('scheduleObj') public scheduleObj!: ScheduleComponent;

  constructor() {}

  public isReadOnly(endDate: Date): boolean {
    return endDate < new Date(2021, 6, 31, 0, 0);
  }

  public onPopupOpen(args: PopupOpenEventArgs): void {
    const data: Record<string, any> = args.data as Record<string, any>;
    if (
      args.type === 'QuickInfo' ||
      args.type === 'Editor' ||
      args.type === 'RecurrenceAlert' ||
      args.type === 'DeleteAlert'
    ) {
    }
  }

  public onActionBegin(args: ActionEventArgs): void {
    if (args.requestType === 'eventCreate' || args.requestType === 'eventChange') {
      let data: Record<string, any>;
    }
  }

  public onRenderCell(args: RenderCellEventArgs): void {
    if (args.element.classList.contains('e-work-cells')) {
    }
    if (
      args.elementType === 'emptyCells' &&
      args.element.classList.contains('e-resource-left-td')
    ) {
      const target: HTMLElement = args.element.querySelector(
        '.e-resource-text'
      ) as HTMLElement;
    }
  }

  public onEventRendered(args: EventRenderedArgs): void {
    const data: Record<string, any> = args.data;
  }
}
