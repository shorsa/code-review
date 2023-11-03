import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NzModalRef, NZ_MODAL_DATA, NzModalService } from 'ng-zorro-antd/modal';
import {
  RequestCreateLocationModel,
  RequestGetLocationListModel,
  RequestUpdateLocationModel,
} from '../../models';
import { Store } from '@ngrx/store';
import * as locationSelectors from '../../store/locations.selectors';
import * as locationActions from '../../store/locations.actions';
import { Observable, filter } from 'rxjs';
import { selectIsLoading } from 'src/app/app-store/app-state/app-state.selectors';

@Component({
  selector: 'app-locations-management-modal',
  templateUrl: './locations-management-modal.component.html',
  styleUrls: ['./locations-management-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationsManagementModalComponent implements OnInit {
  nameControl: FormControl = new FormControl('', [Validators.required]);
  wasAttemptToSubmitForm?: boolean;
  isLoading$?: Observable<boolean>;
  readonly #modal = inject(NzModalRef);
  readonly nzModalData: {
    locationId?: string;
    searchParams: RequestGetLocationListModel;
  } = inject(NZ_MODAL_DATA);

  constructor(private modal: NzModalService, private store$: Store) {}

  ngOnInit() {
    this.isLoading$ = this.store$.select(selectIsLoading);

    if (this.nzModalData?.locationId) {
      this.store$.dispatch(
        locationActions.locationGetByIdAction({
          payload: { id: this.nzModalData.locationId },
        })
      );

      this.store$
        .select(locationSelectors.selectLocationDetails)
        .pipe(filter((val) => !!val))
        .subscribe((details) => {
          this.nameControl.setValue(details?.name);
        });
    }
  }

  submitForm(): void {
    this.nameControl.markAsDirty();
    this.nameControl.updateValueAndValidity({ onlySelf: true });
    this.wasAttemptToSubmitForm = true;

    if (this.nameControl.invalid) return;

    if (this.nzModalData?.locationId) {
      this.update();
    } else {
      this.create();
    }
  }

  private update(): void {
    const model: RequestUpdateLocationModel = {
      id: this.nzModalData.locationId!,
      name: this.nameControl.value,
    };

    this.store$.dispatch(
      locationActions.locationUpdateAction({
        payload: model,
        searchParams: this.nzModalData.searchParams,
      })
    );
  }

  private create(): void {
    const model: RequestCreateLocationModel = {
      name: this.nameControl.value,
    };

    this.store$.dispatch(
      locationActions.locationCreateAction({
        payload: model,
        searchParams: this.nzModalData.searchParams,
      })
    );
  }

  handleCancel(): void {
    this.#modal.close();
  }
}
