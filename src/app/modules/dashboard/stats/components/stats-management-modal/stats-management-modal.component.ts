import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import {
  RequestCreateAppointmentStatModel,
  RequestGetAppointmentStatsListModel,
  RequestUpdateAppointmentStatModel,
} from '../../models';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { NzModalRef, NZ_MODAL_DATA, NzModalService } from 'ng-zorro-antd/modal';
import { Observable, Subscription, filter } from 'rxjs';
import { selectIsLoading } from 'src/app/app-store/app-state/app-state.selectors';
import { AppointmentStatTypeEnum } from '../../enums';
import * as settingSelectors from '../../store/stats.selectors';
import * as settingActions from '../../store/stats.actions';

@Component({
  selector: 'app-stats-management-modal',
  templateUrl: './stats-management-modal.component.html',
  styleUrls: ['./stats-management-modal.component.scss'],
})
export class StatsManagementModalComponent implements OnInit, OnDestroy {
  private subscriptions$: Subscription = new Subscription();

  readonly #modal = inject(NzModalRef);
  readonly nzModalData: {
    settingId?: string;
    action: any;
    appointmentSettingsType: AppointmentStatTypeEnum;
    searchParams: RequestGetAppointmentStatsListModel;
  } = inject(NZ_MODAL_DATA);

  nameControl: FormControl = new FormControl('', [Validators.required]);
  wasAttemptToSubmitForm?: boolean;
  isLoading$?: Observable<boolean>;

  constructor(private modal: NzModalService, private store$: Store) {}

  ngOnInit() {
    this.isLoading$ = this.store$.select(selectIsLoading);

    if (this.nzModalData?.settingId) {
      this.store$.dispatch(
        settingActions.statsGetByIdAction({
          payload: { id: this.nzModalData.settingId },
        })
      );
      this.subscriptions$.add(
        this.store$
          .select(settingSelectors.selectStatsDetails)
          .pipe(filter((val) => !!val))
          .subscribe((details) => {
            this.nameControl.setValue(details?.name);
          })
      );
    }
  }

  handleSubmitForm(): void {
    this.nameControl.markAsDirty();
    this.nameControl.updateValueAndValidity({ onlySelf: true });
    this.wasAttemptToSubmitForm = true;

    if (this.nameControl.invalid) return;

    if (this.nzModalData?.settingId) {
      this.update();
    } else {
      this.create();
    }
  }

  private update(): void {
    const model: RequestUpdateAppointmentStatModel = {
      id: this.nzModalData.settingId!,
      appointmentSettingsType: this.nzModalData.appointmentSettingsType,
      name: this.nameControl.value,
    };

    this.store$.dispatch(
      this.nzModalData.action({
        payload: model,
        searchParams: this.nzModalData.searchParams,
      })
    );
  }

  private create(): void {
    const model: RequestCreateAppointmentStatModel = {
      name: this.nameControl.value,
      appointmentSettingsType: this.nzModalData.appointmentSettingsType,
    };

    this.store$.dispatch(
      this.nzModalData.action({
        payload: model,
        searchParams: this.nzModalData.searchParams,
      })
    );
  }

  handleCancel(): void {
    this.#modal.close();
  }

  ngOnDestroy(): void {
    this.store$.dispatch(settingActions.clearStatsDetailsDataAction());
    this.subscriptions$.unsubscribe();
  }
}
