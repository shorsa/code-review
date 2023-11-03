import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Editor, Toolbar, Validators } from 'ngx-editor';
import { Observable, filter } from 'rxjs';
import { selectIsLoading } from 'src/app/app-store/app-state/app-state.selectors';
import { RoutesConstants } from 'src/app/core/constants';
import { markAsDirtyForm } from 'src/app/shared/helpers';
import {
  RequestCreateTermsAndConditionsModel,
  RequestUpdateTermsAndConditionsModel,
} from '../../models';
import {
  selectClientDetails,
  selectTermsAndConditionsDetails,
} from '../../store/client.selectors';
import * as termsAndCondActions from '../../store/terms-and-conditions.actions';

@Component({
  selector: 'app-terms-and-conditions-editor',
  templateUrl: './terms-and-conditions-editor.component.html',
  styleUrls: ['./terms-and-conditions-editor.component.scss'],
})
export class TermsAndConditionsEditorComponent implements OnInit, OnDestroy {
  @Input() clientId!: string;

  formGroup!: FormGroup;
  editor?: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];
  isLoading$?: Observable<boolean>;
  isCreate: boolean = true;
  termsId?: string;
  clientCustomId?: string;
  errorMessage?: string;
  hideDownloadBtn: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private store$: Store,
    private router: Router
  ) {
    this.formBuild();
  }

  ngOnInit(): void {
    this.editor = new Editor();
    this.getTermsAndCond();
    this.initializingSelectors();
  }

  private formBuild(): void {
    this.formGroup = this.formBuilder.group({
      editorContent: ['', [Validators.required, Validators.minLength(60)]],
    });

    this.contentControl.valueChanges.subscribe((res) => (this.errorMessage = undefined));
  }

  get contentControl(): AbstractControl {
    return this.formGroup.get('editorContent')!;
  }

  private getTermsAndCond(): void {
    this.store$.dispatch(
      termsAndCondActions.clientTrmAndCondGetByClientIdAction({
        payload: { clientId: this.clientId },
      })
    );
  }

  private initializingSelectors(): void {
    this.isLoading$ = this.store$.select(selectIsLoading);
    this.store$
      .select(selectClientDetails)
      .pipe(filter((val) => val !== undefined))
      .subscribe((data) => {
        if (!data) return;
        this.clientCustomId = data.customClientId;
      });

    this.store$
      .select(selectTermsAndConditionsDetails)
      .pipe(filter((val) => val !== undefined))
      .subscribe((res) => {
        if (!res) return;
        if (!res.success) {
          this.hideDownloadBtn = true;
          return;
        }
        this.editor?.setContent(res.content);
        this.hideDownloadBtn = false;

        this.termsId = res.id;
        this.contentControl.setValue(res.content);
        this.isCreate = false;
      });
  }

  cancel(): void {
    this.router.navigate([
      RoutesConstants.DASHBOARD_INDEX,
      RoutesConstants.DASHBOARD_CLIENT,
    ]);
  }

  download(): void {
    this.store$.dispatch(
      termsAndCondActions.downloadClientTermsAndCondAction({
        payload: {
          clientId: this.clientId,
          fileName: `${this.clientCustomId}_terms&conditions.pdf`,
        },
      })
    );
  }

  save(): void {
    markAsDirtyForm(this.formGroup);
    if (this.contentControl.value.length < 60) {
      this.errorMessage = 'Too few characters';
      return;
    }
    if (this.formGroup.invalid) return;

    if (this.isCreate) {
      this.create();
    } else {
      this.update();
    }
  }

  private create(): void {
    const model: RequestCreateTermsAndConditionsModel = {
      clientId: this.clientId,
      content: this.contentControl.value,
    };

    this.store$.dispatch(
      termsAndCondActions.clientTrmAndCondCreateAction({ payload: model })
    );
  }

  private update(): void {
    const model: RequestUpdateTermsAndConditionsModel = {
      clientId: this.clientId,
      content: this.contentControl.value,
    };

    this.store$.dispatch(
      termsAndCondActions.clientTrmAndCondUpdateAction({ payload: model })
    );
  }

  ngOnDestroy(): void {
    this.editor?.destroy();
  }
}
