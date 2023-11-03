import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NzSegmentedOption } from 'ng-zorro-antd/segmented';
import { filter } from 'rxjs';
import { RequestGetAppointmentReportsListModel } from '../../models';
import * as lettersActions from '../../store/letters.actions';
import * as lettersSelectors from '../../store/letters.selectors';
import { AppointmentReportStatusEnum } from '../../enums';

@Component({
  templateUrl: './letters-list-page.component.html',
  styleUrls: ['./letters-list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LettersPageComponent implements OnInit, OnDestroy {
  isTableView: boolean = true;
  readonly lettersFilterListOptions: NzSegmentedOption[] = [
    {
      value: AppointmentReportStatusEnum.None,
      className: 'all',
      label: 'All',
    },
    {
      value: AppointmentReportStatusEnum.AwaitingApproval,
      className: 'awaiting-approval',
      label: 'Awaiting Approval',
    },
    {
      value: AppointmentReportStatusEnum.SentBack,
      className: 'sent-back',
      label: 'Sent Back',
    },
    {
      value: AppointmentReportStatusEnum.Approved,
      className: 'approved',
      label: 'Approved',
    },
  ];
  searchParams?: RequestGetAppointmentReportsListModel;

  constructor(private store$: Store) {}

  ngOnInit(): void {
    this.initializingSelectors();
  }

  handleSearchByText(searchText?: string): void {
    if (!this.searchParams) return;
    this.searchParams = { ...this.searchParams, searchText, pageIndex: 0 };
    this.search(this.searchParams);
  }

  changeLetterStatusFilter(selectedIndex: number): void {
    if (!this.searchParams) return;

    const currentActiveFilter = this.lettersFilterListOptions[selectedIndex]
      .value as AppointmentReportStatusEnum;
    this.searchParams = {
      ...this.searchParams,
      pageIndex: 0,
      status: currentActiveFilter,
    };

    this.search(this.searchParams);
  }

  private search(searchParams: RequestGetAppointmentReportsListModel): void {
    this.store$.dispatch(
      lettersActions.setLettersSearchParamsAction({
        payload: searchParams,
      })
    );
  }

  private initializingSelectors(): void {
    this.store$
      .select(lettersSelectors.selectLettersSearchParams)
      .pipe(filter((val) => val !== undefined))
      .subscribe((searchParams) => {
        this.searchParams = searchParams;
      });
  }

  ngOnDestroy(): void {
    this.store$.dispatch(lettersActions.clearLettersSearchParamsAction());
  }
}
