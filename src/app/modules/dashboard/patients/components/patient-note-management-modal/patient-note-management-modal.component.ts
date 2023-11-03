import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  RequestCreatePatientNoteModel,
  RequestGetNoteListByPatientIdModel,
  RequestUpdatePatientNoteModel,
  ResponseNoteListItem,
} from '../../models/notes';
import { NZ_MODAL_DATA, NzModalService } from 'ng-zorro-antd/modal';
import { Store } from '@ngrx/store';
import { markAsDirtyForm } from 'src/app/shared/helpers';
import * as patientNoteActions from '../../store/patient-notes.actions';
import { selectIsLoading } from 'src/app/app-store/app-state/app-state.selectors';
import { Observable } from 'rxjs';

export interface PatientNoteManagementModalModel {
  noteData?: ResponseNoteListItem;
  patientId: string;
  searchParams: RequestGetNoteListByPatientIdModel;
}

@Component({
  selector: 'app-patient-note-management-modal',
  templateUrl: './patient-note-management-modal.component.html',
  styleUrls: ['./patient-note-management-modal.component.scss'],
})
export class PatientNoteManagementModalComponent implements OnInit {
  readonly nzModalData: {
    noteData?: ResponseNoteListItem;
    patientId: string;
    searchParams: RequestGetNoteListByPatientIdModel;
  } = inject(NZ_MODAL_DATA);

  isLoading$?: Observable<boolean>;
  formGroup!: FormGroup;
  wasAttemptToSubmitForm: boolean = false;

  constructor(
    private store$: Store,
    private modal: NzModalService,
    private formBuilder: FormBuilder
  ) {
    this.buildForm();
  }

  ngOnInit() {
    this.isLoading$ = this.store$.select(selectIsLoading);

    if (this.nzModalData.noteData) {
      this.formGroup.get('note')?.setValue(this.nzModalData.noteData.description);
    }
  }

  private buildForm(): void {
    this.formGroup = this.formBuilder.group({
      note: [null, [Validators.required, Validators.minLength(10)]],
    });
  }

  handleCancel(): void {
    this.modal.closeAll();
  }

  handleSubmit(): void {
    this.wasAttemptToSubmitForm = true;
    markAsDirtyForm(this.formGroup);
    if (this.formGroup.invalid) return;

    if (this.nzModalData.noteData) {
      this.updateNote();
    } else {
      this.createNote();
    }
  }

  private createNote(): void {
    const model: RequestCreatePatientNoteModel = {
      description: this.formGroup.value.note,
      patientId: this.nzModalData.patientId,
    };
    this.store$.dispatch(
      patientNoteActions.patientCreateNoteAction({
        payload: { data: model, searchParams: this.nzModalData.searchParams },
      })
    );
  }

  private updateNote(): void {
    const { id } = this.nzModalData.noteData!;

    const model: RequestUpdatePatientNoteModel = {
      description: this.formGroup.value.note,
      id,
    };

    this.store$.dispatch(
      patientNoteActions.patientNoteUpdateAction({
        payload: { data: model, searchParams: this.nzModalData.searchParams },
      })
    );
  }
}
