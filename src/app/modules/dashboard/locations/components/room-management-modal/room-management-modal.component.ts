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
  RequestCreateRoomModel,
  RequestGetRoomListModel,
  RequestUpdateLocationModel,
  RequestUpdateRoomModel,
} from '../../models';
import { Store } from '@ngrx/store';
import * as roomSelectors from '../../store/rooms.selectors';
import * as roomActions from '../../store/rooms.actions';
import { Observable, filter } from 'rxjs';
import { selectIsLoading } from 'src/app/app-store/app-state/app-state.selectors';

@Component({
  selector: 'app-room-management-modal',
  templateUrl: './room-management-modal.component.html',
  styleUrls: ['./room-management-modal.component.scss'],
})
export class RoomManagementModalComponent implements OnInit {
  nameControl: FormControl = new FormControl('', [Validators.required]);
  wasAttemptToSubmitForm?: boolean;
  isLoading$?: Observable<boolean>;
  readonly #modal = inject(NzModalRef);
  readonly nzModalData: {
    roomId?: string;
    siteId: string;
    searchParams: RequestGetRoomListModel;
  } = inject(NZ_MODAL_DATA);

  constructor(private modal: NzModalService, private store$: Store) {}

  ngOnInit() {
    this.isLoading$ = this.store$.select(selectIsLoading);

    if (this.nzModalData?.roomId) {
      this.store$.dispatch(
        roomActions.roomGetByIdAction({
          payload: { id: this.nzModalData.roomId },
        })
      );

      this.store$
        .select(roomSelectors.selectRoomDetails)
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

    if (this.nzModalData?.roomId) {
      this.update();
    } else {
      this.create();
    }
  }

  private update(): void {
    const model: RequestUpdateRoomModel = {
      id: this.nzModalData.roomId!,
      name: this.nameControl.value,
    };

    this.store$.dispatch(roomActions.roomUpdateAction({ payload: model,searchParams: this.nzModalData.searchParams }));
  }

  private create(): void {
    const model: RequestCreateRoomModel = {
      name: this.nameControl.value,
      siteId: this.nzModalData.siteId,
    };

    this.store$.dispatch(roomActions.roomCreateAction({ payload: model, searchParams: this.nzModalData.searchParams }));
  }

  handleCancel(): void {
    this.#modal.close();
  }
}
