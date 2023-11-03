import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, debounceTime, filter } from 'rxjs';
import { CommonConstants } from 'src/app/core/constants';
import { markAsDirtyForm } from 'src/app/shared/helpers';
import { ComponentChanges, ProductModel } from 'src/app/shared/models';
import * as productSelectors from '../../store/products.selectors';
import { ReferralTypeEnum } from '../../../referral/enums';
import { Editor, Toolbar } from 'ngx-editor';

export type ProductFormGroupValueModel = Pick<
  ProductModel,
  | 'customProductId'
  | 'name'
  | 'description'
  | 'defaultPrice'
  | 'isAttendanceRequired'
  | 'isHealthSurveillance'
  | 'referralType'
>;

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductFormComponent implements OnInit, OnChanges, OnDestroy {
  @Output() valueChange: EventEmitter<ProductFormGroupValueModel> =
    new EventEmitter<ProductFormGroupValueModel>();
  @Output() formIsValidChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() productId?: string;
  @Input() set wasAttemptToSubmitForm(isTry: boolean) {
    if (isTry) {
      markAsDirtyForm(this.formGroup);
    }
    this._wasAttemptToSubmitForm = isTry;
  }

  readonly productReferralOptions = CommonConstants.productReferralOptions;

  editor?: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['ordered_list', 'bullet_list'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];
  errorMessage?: string;

  _wasAttemptToSubmitForm: boolean = false;
  formGroup!: FormGroup;
  productDetails?: ProductModel;
  isLoading$?: Observable<boolean>;

  constructor(
    private formBuilder: FormBuilder,
    private changeDetection: ChangeDetectorRef,
    private store$: Store
  ) {
    this.initForm();
    this.editor = new Editor();
  }

  get getEditorContentControl(): AbstractControl {
    return this.formGroup.get('templateHeading')!;
  }

  ngOnChanges(changes: ComponentChanges<ProductFormComponent>): void {
    if (changes?.productId?.currentValue !== changes?.productId?.previousValue) {
      this.changeDetection.detectChanges();
    }
  }

  ngOnInit() {
    this.store$
      .select(productSelectors.selectProductDetails)
      .pipe(filter((val) => val !== undefined))
      .subscribe((res) => {
        this.productDetails = res;
        this.setFormValue(res!);
      });
  }

  parserPoundSterling = (value: number): string => `£ ${value}`;

  private initForm(): void {
    this.formGroup = this.formBuilder.group({
      customProductId: [{ value: null, disabled: true }],
      name: [null, [Validators.required]],
      description: [null],
      defaultPrice: [0, [Validators.required]],
      referralType: [ReferralTypeEnum.Management, [Validators.required]],
      isAttendanceRequired: [false, [Validators.required]],
      isHealthSurveillance: [false, [Validators.required]],
      templateHeading: [''],
    });

    this.getEditorContentControl.valueChanges.subscribe(
      (res) => (this.errorMessage = undefined)
    );

    this.formGroup.valueChanges.pipe(debounceTime(300)).subscribe((res) => {
      this.valueChange.emit(this.formGroup.value);
    });

    this.formGroup.statusChanges.pipe(debounceTime(300)).subscribe((res) => {
      this.formIsValidChange.emit(res === 'VALID');
    });
  }

  private setFormValue(data: ProductModel): void {
    const model = {
      customProductId: data.customProductId,
      name: data.name,
      description: data.description,
      defaultPrice: data.defaultPrice,
      isAttendanceRequired: data.isAttendanceRequired,
      isHealthSurveillance: data.isHealthSurveillance,
      referralType: data.referralType,
      templateHeading: data.templateHeading,
    };
    this.formGroup.patchValue(model);
    this.changeDetection.detectChanges();
  }

  ngOnDestroy(): void {
    this.editor?.destroy();
  }
}
