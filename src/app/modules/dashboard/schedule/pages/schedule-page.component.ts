import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { AppointmentStatTypeEnum } from '../enums';
import { Store } from '@ngrx/store';
import * as scheduleActions from '../store/schedule.actions';
import * as scheduleSelectors from '../store/schedule.selectors';
import { Observable, filter } from 'rxjs';
import { selectIsLoading } from 'src/app/app-store/app-state/app-state.selectors';
import {
  RequestGetNonWorkingDaysListModel,
  ResponseNonWorkingDayListItemModel,
} from '../models';
import { clone } from 'lodash';
import { CommonConstants } from 'src/app/core/constants';
@Component({
  templateUrl: './schedule-page.component.html',
  styleUrls: ['./schedule-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SchedulePageComponent implements OnInit {
  currentDates: ResponseNonWorkingDayListItemModel[] = [];
  searchParams: RequestGetNonWorkingDaysListModel = {
    pageIndex: 0,
    pageSize: CommonConstants.PAGE_SIZE_OPTIONS[0],
  };
  currentDate?: Date;
  isLoading$?: Observable<boolean>;

  constructor(private store$: Store, private changeDetector: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.isLoading$ = this.store$.select(selectIsLoading);

    this.store$.dispatch(
      scheduleActions.getScheduleAction({
        payload: this.searchParams,
      })
    );

    this.store$
      .select(scheduleSelectors.selectScheduleDatesList)
      .pipe(filter((val) => !!val))
      .subscribe((res) => {
        this.currentDates = res!.days;
        this.changeDetector.detectChanges();
      });
  }

  addDate(date: Date): void {
    this.currentDate = clone(date);
    date.setUTCHours(0, 0, 0, 0);
    const isExist = this.isCurrent(date);

    if (!isExist) {
      this.currentDates = [...this.currentDates, { date: date.toString() }];

      this.store$.dispatch(
        scheduleActions.scheduleAddDateAction({
          payload: { date: date!.toISOString() },
          searchParams: this.searchParams,
        })
      );

      this.currentDate = undefined;
    } else {
      this.handleRemoveDate({ date: date.toISOString() });
    }

    if (!this.currentDates.length) {
      this.currentDate = undefined;
    }
  }

  changeCalendar(event: any): void {
    console.log(event);
  }

  handleRemoveDate(value: ResponseNonWorkingDayListItemModel): void {
    const getDateIndex = () => {
      return this.currentDates.findIndex((item) => {
        const dateItem = new Date(item.date);
        const valueDate = new Date(value.date);
        const dayIsSame = dateItem.getDate() === valueDate.getDate();
        const monthIsSame = dateItem.getMonth() === valueDate.getMonth();
        const yearIsSame = dateItem.getFullYear() === valueDate.getFullYear();
        return dayIsSame && monthIsSame && yearIsSame;
      });
    };

    const currentDates = clone(this.currentDates);

    const dateIndex = getDateIndex();
    if (currentDates[dateIndex]?.id) {
      this.store$.dispatch(
        scheduleActions.scheduleDeleteDateAction({
          payload: { id: currentDates[dateIndex].id! },
          searchParams: this.searchParams,
        })
      );
      return;
    }
    currentDates.splice(dateIndex, 1);
    this.currentDates = currentDates;
    this.currentDate = undefined;
  }

  isCurrent(event: Date): boolean {
    return !!this.currentDates?.find((item) => {
      const dateItem = new Date(item.date);

      const dayIsSame = dateItem.getDate() === event.getDate();
      const monthIsSame = dateItem.getMonth() === event.getMonth();
      const yearIsSame = dateItem.getFullYear() === event.getFullYear();

      return dayIsSame && monthIsSame && yearIsSame;
    });
  }

  disabledDate(current: Date): boolean {
    return current.getTime() < new Date().setHours(0, 0, 0, 0);
  }
}
